import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Olá Gabriel! Sou o SciConnect AI Assistant, o assistente virtual do Dcomp. Como discente de Sistemas de Informação, posso te apoiar na escolha de projetos de PIBIC, sugerir artigos sobre Java e Deep Learning ou recomendar eventos. No que posso te ajudar hoje?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      // Direct call to our full-stack secure proxy endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      });

      if (!response.ok) {
        throw new Error("Falha no servidor.");
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.text || "Desculpe, obtive uma resposta vazia. Tente perguntar novamente.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "bot",
        text: "Desculpe, ocorreu um erro de conexão com nosso serviço de inteligência artificial do Dcomp. Certifique-se de configurar a chave API nas Configurações.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="bg-white border border-slate-200 w-[calc(100vw-32px)] sm:w-96 h-[510px] rounded-3xl shadow-xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header branding */}
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-blue-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_awesome
                </span>
                <div>
                  <h4 className="font-extrabold text-xs">SciConnect AI</h4>
                  <p className="text-[10px] text-slate-400">Conselheiro Acadêmico Dcomp</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="material-symbols-outlined hover:text-slate-300 cursor-pointer text-lg"
              >
                close
              </button>
            </div>

            {/* Chat Messages flow scrollarea */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-slate-50"
            >
              {messages.map(msg => {
                const isBot = msg.sender === "bot";
                return (
                  <div key={msg.id} className={`flex ${isBot ? "" : "justify-end"} items-end gap-2.5`}>
                    {isBot && (
                      <div className="w-7 h-7 rounded-lg bg-slate-800 text-blue-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                        S
                      </div>
                    )}
                    <div className="max-w-[80%] space-y-1">
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isBot 
                          ? "bg-white border border-slate-200 text-slate-800" 
                          : "bg-slate-900 text-white"
                      }`}>
                        {msg.text}
                      </div>
                      <p className="text-[9px] text-slate-400 font-bold px-1.5 text-right">{msg.timestamp}</p>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-end gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-blue-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    S
                  </div>
                  <div className="bg-white border border-slate-200 p-3.5 rounded-2xl flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-300"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom input area form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Pergunte sobre pesquisa no Dcomp..."
                className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-800 focus:bg-white rounded-full focus:outline-none focus:ring-1 focus:ring-slate-300 font-medium"
              />
              <button 
                type="submit"
                className="w-10 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Action button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 cursor-pointer"
      >
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          {isOpen ? "close" : "auto_awesome"}
        </span>
      </button>
    </div>
  );
}
