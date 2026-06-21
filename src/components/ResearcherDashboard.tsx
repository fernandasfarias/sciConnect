import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { PortfolioItem, MatchOffer } from "../types";

interface DashboardProps {
  onSelectPaper: (paperId: string) => void;
}

export default function ResearcherDashboard({ onSelectPaper }: DashboardProps) {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [matches, setMatches] = useState<MatchOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from API
  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [portRes, matchRes] = await Promise.all([
          fetch("/api/portfolio"),
          fetch("/api/match-feed")
        ]);
        const portData = await portRes.json();
        const matchData = await matchRes.json();
        setPortfolio(portData);
        setMatches(matchData);
      } catch (err) {
        console.error("Failed to load dashboard metrics:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const studentInterests = [
    "Java", "Spring Boot", "Data Science", "Computer Vision", 
    "Cloud Computing", "PostgreSQL", "Microsserviços"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-10 pb-16 font-sans"
    >      {/* 1. Header Card detailing Gabriel Santos */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-slate-100 dark:ring-slate-800 flex-shrink-0">
            <img 
              alt="Gabriel Santos Academic Avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOpkSXxfVchxS9RCMN8O5KvIv6m7vs1rieBTokcEi9ILOPXFVfzJ7BQv4HQn1UVgAU-c-nEYM79HJEPKmjfEia46Lsw_ZApP1307mc6mp8vuxF-iY2-pPqOOHy6gHCq34gWPdug-EQl_nc1fmf00XMd6fQ09C-rYFuO8DcgtXjMa-fHth60_-PjchFLW91g4PuQoyaBianFQq45uW1oYVLr_UiEeNu1vB2-bVLXLtmnhrR6YKYb4he3UUsMrt06PnRvIiZbkudE2A" 
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white leading-none">Gabriel Santos</h2>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Grau Acadêmico
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Discente de <strong className="text-slate-800 dark:text-slate-200 font-bold">Sistemas de Informação</strong> (5º Período) • Matrícula Dcomp: 202201414
            </p>
          </div>
        </div>

        {/* Action button triggers list */}
        <div className="flex gap-3">
          <button 
            onClick={() => window.open("https://lattes.cnpq.br/", "_blank")}
            className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-205 dark:hover:bg-slate-700/80 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">school</span>
            Curriculum Lattes
          </button>
          <button 
            onClick={() => alert("Exibindo relatórios de Iniciação Científica submetidos ao PIBIC...")}
            className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-205 dark:hover:bg-slate-700/80 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">task</span>
            Relatórios PIBIC
          </button>
        </div>
      </section>

      {/* Main split grid: Interests + Matches, Portfolio list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Interests + Personalized Matching Offers */}
        <div className="lg:col-span-5 space-y-8">
          {/* Interests card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-950 dark:text-white text-sm">Interesses Científicos</h3>
            <div className="flex flex-wrap gap-2">
              {studentInterests.map(tag => (
                <span 
                  key={tag}
                  className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300 rounded-full transition-transform hover:scale-105 select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* AI Personalized Match Feed ("Para Você") */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Fomento Científico Para Você</h3>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center text-xs text-slate-400 dark:text-slate-500">
                  Carregando sugestões personalizadas...
                </div>
              ) : (
                matches.map(match => (
                  <div 
                    key={match.id} 
                    className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 cursor-pointer hover:border-slate-400 dark:hover:border-slate-705 transition-all shadow-sm"
                  >
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        match.matchType === "98% Match" 
                          ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-990/20" 
                          : "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-105 dark:border-blue-995/20"
                      }`}>
                        {match.matchType} Match
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{match.deadlineOrRoom}</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-sm leading-snug">{match.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{match.description}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {match.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-[#f1f5f9] dark:bg-slate-800 rounded text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Portfolio listings */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <h3 className="font-extrabold text-slate-955 dark:text-white text-sm">Meu Portfólio Científico</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Visão unificada das pesquisas, códigos, e projetos de extensão que você lidera.</p>
            </div>
            <button 
              onClick={() => alert("Ativação de fluxo PIBIC para preenchimento de novo formulário de projeto") }
              className="px-4 py-2 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Novo Trabalho
            </button>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center text-xs text-slate-400 dark:text-slate-500 py-6">Carregando portfólio...</div>
            ) : (
              portfolio.map(work => (
                <div key={work.id} className="p-5 border border-slate-200/80 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 hover:shadow-sm rounded-2xl transition-all space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#d97706] dark:text-amber-500 bg-amber-50 dark:bg-amber-950/20 px-2.5 py-0.5 rounded-full inline-block border border-amber-100/10 dark:border-amber-900/30">
                      {work.type === "article" ? "Artigo Acadêmico" : "Repositório Git"}
                    </span>
                    {work.stars && (
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-bold">
                        <span className="material-symbols-outlined text-sm text-yellow-500">star</span>
                        <span>{work.stars}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-950 dark:text-white text-sm leading-snug">{work.title}</h4>
                    <p className="text-xs text-slate-400">{work.subTitle}</p>
                  </div>

                  {work.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {work.tags.map(t => (
                        <span key={t} className="text-[9px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
