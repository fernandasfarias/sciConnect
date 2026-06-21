import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Paper } from "../types";

interface PaperDetailProps {
  paper: Paper;
  onBack: () => void;
}

export default function PaperDetailView({ paper, onBack }: PaperDetailProps) {
  const [activeSummaryTab, setActiveSummaryTab] = useState<"ai" | "traditional">("ai");

  // Custom AI summarization sandbox state
  const [customText, setCustomText] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiResult, setAiResult] = useState<{
    resumoCurto: string;
    conceitosChave: { id: string; concepto: string; descricao: string }[];
  } | null>(null);
  const [aiError, setAiError] = useState("");

  const handleGenerateCustomSummary = async () => {
    if (!customText.trim()) {
      setAiError("Por favor, cole algum texto acadêmico para resumir.");
      return;
    }
    setAiError("");
    setIsLoadingAI(true);
    setAiResult(null);

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: customText, title: paper.title })
      });

      if (!response.ok) {
        throw new Error("Erro na rede ao tentar gerar o resumo.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setAiResult({
        resumoCurto: data.resumoCurto || "Resumo concluído com sucesso.",
        conceitosChave: data.conceitosChave || []
      });
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Falha ao gerar o resumo inteligente. Verifique as credenciais.");
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pb-16 font-sans"
    >
      {/* Navigation breadcrumb back */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 hover:gap-3 transition-all text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-extrabold text-xs tracking-wider uppercase cursor-pointer"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        Voltar ao Repositório
      </button>

      {/* Main Grid: Left details & actions, Right Metadata Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side Content */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 space-y-10 shadow-sm">
          {/* Header titles */}
          <div className="space-y-4">
            <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-105 dark:border-blue-900/40 px-3 py-1 rounded-full uppercase tracking-widest w-fit block">
              {paper.academicCenter} • {paper.department.split(" / ")[0]}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {paper.title}
            </h1>

            {/* Authoring line */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-500 dark:text-slate-405">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500 text-lg">person</span>
                <span>Autor: <strong className="text-slate-800 dark:text-slate-200 font-bold">{paper.author}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400 text-lg">supervisor_account</span>
                <span>{paper.advisor}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400 text-lg">calendar_today</span>
                <span>{paper.publishedDate}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap gap-4 pt-2 border-b border-slate-100 dark:border-slate-800 pb-6">
            <a 
              href={paper.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              Fazer Download do PDF Completo
            </a>
            <button 
              onClick={() => alert("Link de compartilhamento para o repositório do Dcomp copiado para a área de transferência!")}
              className="px-5 py-3 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">share</span>
              Compartilhar Metadados
            </button>
            <button 
              onClick={() => alert("Trabalho salvo em sua biblioteca de Iniciação Científica!")}
              className="px-5 py-3 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">bookmark</span>
              Salvar em Favoritos
            </button>
                 {/* Core summary tabs */}
          <div className="space-y-4">
            <div className="flex gap-1 border-b border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setActiveSummaryTab("ai")}
                className={`py-3 px-6 font-bold text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  activeSummaryTab === "ai"
                    ? "text-slate-900 dark:text-white border-slate-900 dark:border-blue-500 font-extrabold"
                    : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: activeSummaryTab === "ai" ? "'FILL' 1" : undefined }}>
                  auto_awesome
                </span>
                Resumo Inteligente por IA
              </button>
              <button
                onClick={() => setActiveSummaryTab("traditional")}
                className={`py-3 px-6 font-bold text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  activeSummaryTab === "traditional"
                    ? "text-slate-900 dark:text-white border-slate-900 dark:border-blue-500 font-extrabold"
                    : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <span className="material-symbols-outlined text-lg">subject</span>
                Resumo Tradicional (Abstract)
              </button>
            </div>

            <div className="p-6 bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 rounded-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {activeSummaryTab === "ai" ? (
                  <motion.div
                    key="ai"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                      <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                        auto_awesome
                      </span>
                      DeepInsights AI Summary
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 text-xs md:text-sm leading-relaxed whitespace-pre-line font-medium">
                      {paper.aiSummary}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="traditional"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Resumo Científico Submetido
                    </div>
                    <p className="text-slate-600 dark:text-slate-350 text-xs md:text-sm leading-relaxed italic font-sans">
                      "{paper.traditionalSummary}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Concepts Grid Section */}
          <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">5 Conceitos-Chave Explicados</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Conceitualizações essenciais levantadas nesta pesquisa do Dcomp de forma simplificada.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paper.keyConcepts.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="p-5 bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-2xl hover:border-slate-400 dark:hover:border-slate-705 hover:shadow-sm hover:scale-[1.01] transition-all duration-300 space-y-2 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-blue-600 text-white font-extrabold text-[12px] flex items-center justify-center shadow-sm">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-bold text-slate-950 dark:text-slate-100 text-xs leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.concept}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pl-11">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>        </div>

          {/* CUSTOM LIVE AI RESUMO SANDBOX (Very interactive) */}
          <div className="bg-slate-900 border border-slate-800 dark:bg-slate-900 text-slate-100 rounded-3xl p-8 space-y-6 relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full"></div>

            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_awesome
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Workspace de IA do Pesquisador</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white">Resumir Textos Acadêmicos Personalizados</h3>
              <p className="text-xs text-slate-400 max-w-xl">
                Cole trechos de periódicos, abstracts em inglês, artigos, ou dados de laboratório no campo abaixo para gerar um resumo executivo inteligente instantâneo via LLM do Dcomp.
              </p>
            </div>

            <div className="space-y-4 relative z-10">
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full h-32 px-4 py-3 bg-slate-850 dark:bg-slate-950 border border-slate-700 dark:border-slate-800 rounded-2xl text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-500 placeholder:text-slate-500 custom-scrollbar font-medium"
                placeholder="Cole o artigo, abstract ou anotações científicas aqui para resumir..."
              />

              {aiError && (
                <div className="text-xs text-rose-400 font-semibold bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                  {aiError}
                </div>
              )}

              <div className="flex justify-between items-center flex-wrap gap-4">
                <button
                  onClick={handleGenerateCustomSummary}
                  disabled={isLoadingAI}
                  className="px-6 py-3 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoadingAI ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                      Processando por IA...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">psychology</span>
                      Gerar Resumo por IA
                    </>
                  )}
                </button>
                <span className="text-[10px] text-slate-500 font-bold">Processado via Gemini 3.5 Flash</span>
              </div>
            </div>

            {/* AI Custom Result presentation placeholder */}
            {aiResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-slate-850/90 dark:bg-slate-950/90 border border-slate-700 dark:border-slate-800 rounded-2xl relative z-10 space-y-4"
              >
                <div className="flex items-center gap-2 text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                    task_alt
                  </span>
                  Análise Gerada com Sucesso
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-bold text-white text-[11px] uppercase tracking-wide">Resumo Executivo IA:</h5>
                    <p className="text-slate-300 text-xs leading-relaxed mt-1 whitespace-pre-line font-medium">
                      {aiResult.resumoCurto}
                    </p>
                  </div>

                  {aiResult.conceitosChave && aiResult.conceitosChave.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <h5 className="font-bold text-white text-[11px] uppercase tracking-wide">Conceitos-Chave Mapeados:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                        {aiResult.conceitosChave.map((conc, idx) => (
                          <div key={conc.id || idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                            <h6 className="text-[11px] font-bold text-teal-300">{conc.concepto}</h6>
                            <p className="text-[10px] text-slate-400 leading-relaxed mt-1">{conc.descricao}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Side Metadata Panel Card */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Metadados Científicos</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Identificadores oficiais da publicação repositório do Dcomp.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-transparent dark:border-slate-850 rounded-xl space-y-1">
              <span className="font-bold text-slate-400 dark:text-slate-500 text-[9px] uppercase tracking-wider">Departamento Principal</span>
              <p className="font-bold text-slate-800 dark:text-slate-200">{paper.department}</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-transparent dark:border-slate-850 rounded-xl space-y-1">
              <span className="font-bold text-slate-400 dark:text-slate-500 text-[9px] uppercase tracking-wider">Centro Acadêmico</span>
              <p className="font-bold text-slate-800 dark:text-slate-200">{paper.academicCenter} / Dcomp</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-transparent dark:border-slate-850 rounded-xl space-y-1">
              <span className="font-bold text-slate-400 dark:text-slate-500 text-[9px] uppercase tracking-wider">Citações no Portal</span>
              <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-slate-500">forum</span>
                {paper.citations} citações diretas
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-transparent dark:border-slate-850 rounded-xl space-y-1">
              <span className="font-bold text-slate-400 dark:text-slate-500 text-[9px] uppercase tracking-wider">Identificador Digital (DOI)</span>
              <p className="font-mono text-slate-800 dark:text-slate-300 text-[10px]">doi.org/10.22456/sci.dcomp.{paper.id}</p>
            </div>
          </div>

          {/* Quick Laboratory Contact Card */}
          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/60 dark:border-blue-900/30 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">Quer colaborar nesta pesquisa?</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              O autor está ativo no <span className="font-semibold text-slate-800 dark:text-slate-200">Intelligent Systems Lab (ISL)</span> em Aracaju. Envie uma proposta de fomento científica integrada.
            </p>
            <button 
              onClick={() => alert("Formulário de proposta enviado ao departamento correspondente!")}
              className="w-full text-center bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-bold text-[11px] py-2 rounded-xl transition-all cursor-pointer active:scale-95"
            >
              Enviar Mensagem
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
