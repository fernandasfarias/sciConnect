import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI client (will lazy fail if key is missing when executing endpoint)
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required but missing.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}

// In-Memory status registers
let enrolledEventIds = ["event-scientific-writing"];

// Real API targets mirroring academic papers, events, and metrics
import { INITIAL_PAPERS, INITIAL_EVENTS, MOCK_ANALYTICS, MOCK_PORTFOLIO, MOCK_MATCH_FEED } from "./src/data";

app.get("/api/papers", (req, res) => {
  res.json(INITIAL_PAPERS);
});

app.get("/api/events", (req, res) => {
  const events = INITIAL_EVENTS.map(evt => ({
    ...evt,
    isEnrolled: enrolledEventIds.includes(evt.id)
  }));
  res.json(events);
});

app.post("/api/events/enroll", (req, res) => {
  const { eventId, enroll } = req.body;
  if (!eventId) {
    return res.status(400).json({ error: "Missing eventId" });
  }
  if (enroll) {
    if (!enrolledEventIds.includes(eventId)) {
      enrolledEventIds.push(eventId);
    }
  } else {
    enrolledEventIds = enrolledEventIds.filter(id => id !== eventId);
  }
  res.json({ success: true, enrolled: enrolledEventIds });
});

app.get("/api/analytics", (req, res) => {
  res.json(MOCK_ANALYTICS);
});

app.get("/api/portfolio", (req, res) => {
  res.json(MOCK_PORTFOLIO);
});

app.get("/api/match-feed", (req, res) => {
  res.json(MOCK_MATCH_FEED);
});

// AI endpoints proxying to Gemini
app.post("/api/summarize", async (req, res) => {
  const { text, title } = req.body;
  if (!text) {
    return res.status(400).json({ error: "O texto para o resumo é obrigatório." });
  }

  try {
    const ai = getGeminiClient();
    const prompt = `Analise o seguinte artigo de pesquisa científica do Departamento de Computação (Dcomp) da UFS intitulado "${title || 'Sem título'}". 
Forneça um resumo executivo inteligente focado em leitura rápida no idioma português do Brasil.
Além disso, forneça uma lista com no máximo 4 conceitos-chave explicados resumidamente relevantes para o trabalho.
Retorne o resumo formatado em formato JSON válido com as chaves "resumoCurto" (string contendo 1 ou 2 parágrafos resumidos) e "conceitosChave" (um array de objetos com "id", "concepto" e "descricao" do conceito).
Documento:\n${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "Você é um assistente acadêmico do Dcomp / UFS com especialidade em resumir artigos de computação e exatas."
      }
    });

    const outputText = response.text || "{}";
    res.json(JSON.parse(outputText));
  } catch (error: any) {
    console.error("Erro na API Gemini de Resumo:", error);
    res.status(500).json({ error: error.message || "Falha ao gerar resumo inteligente." });
  }
});

app.post("/api/chat", async (req, res) => {
  const { messages, userProfile } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "O histórico de mensagens é obrigatório." });
  }

  try {
    const ai = getGeminiClient();
    const chatHistory = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));

    // Generate response using systemInstruction and last message
    const prompt = messages[messages.length - 1].text;
    const systemInstruction = `Você é o "SciConnect AI Assistant" do Portal do Pesquisador do Departamento de Computação (Dcomp) da UFS.
Você interage com Gabriel Santos, discente de Sistemas de Informação do 5º Período no Dcomp/UFS.
Seus interesses incluem: Java, Spring Boot, Data Science, Computer Vision, Cloud Computing, PostgreSQL e Microserviços.
Preste auxílio inteligente, oriente em áreas científicas acadêmicas, sugira caminhos de pesquisa ou comente sobre os artigos de computação do portal de forma construtiva e amigável. Responda em português de maneira sofisticada e inspiradora.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Erro na API Gemini Chat:", error);
    res.status(500).json({ error: error.message || "Falha do Assistente de IA." });
  }
});

// Configure Vite or production folder serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SciConnect Server] Ativo em http://localhost:${PORT}`);
  });
}

startServer();
