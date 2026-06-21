import React, { useState } from "react";
import { motion } from "motion/react";

interface DiscoveryProps {
  onSearch: (query: string) => void;
  onSelectPaper: (paperId: string) => void;
  onSelectEvent: (eventId: string) => void;
}

export default function DiscoveryView({ onSearch, onSelectPaper, onSelectEvent }: DiscoveryProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  const handlePopularTagClick = (tag: string) => {
    setSearchInput(tag);
    onSearch(tag);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-16 pb-16 transition-colors duration-200"
    >
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex flex-col items-center justify-center text-center px-4 py-12 bg-gradient-to-b from-white via-slate-50 to-slate-100/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 rounded-3xl border border-slate-200/60 dark:border-slate-800 overflow-hidden shadow-sm transition-all duration-200">
        {/* Ambient abstract decor inspired by Logo's colors */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] rounded-full"></div>

        <div className="max-w-3xl space-y-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Conectando o Conhecimento à Sociedade
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A plataforma central de pesquisa, inovação e extensão do Departamento de Computação (Dcomp) da UFS.
          </p>

          {/* Semantic Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative mt-8 group max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-45 transition duration-500"></div>
            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-md">
              <span className="material-symbols-outlined ml-3 text-slate-400 dark:text-slate-500 text-2xl">search</span>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
                placeholder="Explore a ciência desenvolvida no Dcomp. Digite o que quer descobrir..."
              />
              <button
                type="submit"
                className="bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold text-xs mr-1 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              >
                Descobrir
              </button>
            </div>
          </form>

          {/* Popular Tag suggestions */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6 text-xs text-slate-500 dark:text-slate-400">
            <span>Populares agora:</span>
            {["Inteligência Artificial", "Biodiversidade Caatinga", "Energias Renováveis"].map(tag => (
              <button
                key={tag}
                onClick={() => handlePopularTagClick(tag)}
                className="px-3.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 rounded-full font-semibold transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Academical Banner */}
      <section className="bg-slate-900 dark:bg-slate-900/40 text-slate-100 py-10 rounded-2xl shadow-md border border-slate-800">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-1">
            <span className="text-3xl font-extrabold font-sans tracking-tight text-white">+1.500</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Trabalhos Publicados</span>
          </div>
          <div className="hidden md:block h-12 w-px bg-slate-800"></div>
          <div className="flex flex-col items-center md:items-start space-y-1">
            <span className="text-3xl font-extrabold font-sans tracking-tight text-white">+80</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Laboratórios Conectados</span>
          </div>
          <div className="hidden md:block h-12 w-px bg-slate-800"></div>
          <div className="flex flex-col items-center md:items-start space-y-1">
            <span className="text-3xl font-extrabold font-sans tracking-tight text-white">100%</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Integração Dcomp</span>
          </div>
        </div>
      </section>

      {/* Featured Bento Column */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Tendências em Destaque</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">O que há de mais relevante no ecossistema acadêmico do Dcomp.</p>
          </div>
          <button 
            onClick={() => onSearch("")}
            className="flex items-center gap-1 font-bold text-xs text-slate-900 dark:text-slate-300 hover:underline hover:opacity-85 transition-all cursor-pointer"
          >
            Ver todos 
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Microalgas (Paper) */}
          <div 
            onClick={() => onSelectPaper("paper-cnn-heterogeneous")}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden hover:shadow-md dark:hover:shadow-slate-950/40 transition-all duration-300"
          >
            <div className="h-52 overflow-hidden relative">
              <img 
                alt="Pesquisa Microalgas" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuARlMPMXnrj9_YTj7KasFlAdFt9uA7sykFjtHFFIOZyC3egaHw8UGi6t1kqfGgyzTCkqdVWlpG7YO3pt5I8jYkef-q-sDvmNyvxLlZUTB0vicf2DpZ6ijD4_XINrHqrBKgBNbIisb18lCGudv8pf0ko6Som9QBS-QB3aszvC7FPAAtNS6ZQNyAkfcQfebfJB67C25usf6g-sqhsHBHXN4Fig3-dCpp9T_iuvXxeAWHZ2Z4OmN98vE5RmfKQUjxaZx7YcXlLPf7oSLA" 
              />
              <div className="absolute top-4 left-4 bg-slate-900 text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Pesquisa
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Biocombustíveis de Microalgas
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                Estudo pioneiro do Lab de Biotecnologia sobre a viabilidade econômica e ambiental do uso de algas do litoral sergipano.
              </p>
              <div className="flex items-center justify-between pt-3 text-[11px] text-slate-400 dark:text-slate-500 font-semibold border-t border-slate-50 dark:border-slate-850 mt-1">
                <span>Publicado há 2 dias</span>
                <span className="material-symbols-outlined text-[16px] text-slate-400 dark:text-slate-500">bookmark</span>
              </div>
            </div>
          </div>

          {/* Card 2: Literacia Digital (Extension) */}
          <div 
            onClick={() => onSelectPaper("paper-refine-environment")}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden hover:shadow-md dark:hover:shadow-slate-950/40 transition-all duration-300"
          >
            <div className="h-52 overflow-hidden relative">
              <img 
                alt="Extensão Escolas" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCqajuTPvIKbCAhEtPkio4gJBwrEuK5DGzp9VCGfSLKp3dH8rXHuKJSEIDo5_WyT1cilVK-KFiZe4Sx47Ca9z3YauReRIjx6I4gFKYtL_qmYZBztJuBS09hsMNIvB0PK2Sef-Bxi4SRRS7473qiwZq0Or6hM095PSxCDpbiixFOB7Y-8WYV130x44NUH_zh9rOtc76oLmQ-ZC5B6bTmybDaCqVTTrdwkm59V6CUsdWo5l3_k47yKY2n_HgrvRD2ObB3-8Pyh4bpXc" 
              />
              <div className="absolute top-4 left-4 bg-orange-600 text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Extensão
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Literacia Digital em Escolas
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                Projeto que leva capacitação tecnológica para estudantes de escolas públicas do agreste sergipano.
              </p>
              <div className="flex items-center justify-between pt-3 text-[11px] text-slate-400 dark:text-slate-500 font-semibold border-t border-slate-50 dark:border-slate-850 mt-1">
                <span>840 participantes</span>
                <span className="material-symbols-outlined text-[16px] text-slate-400 dark:text-slate-500">group</span>
              </div>
            </div>
          </div>

          {/* Card 3: Innovation Week (Event) */}
          <div 
            onClick={() => onSelectEvent("event-innovation-week")}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden hover:shadow-md dark:hover:shadow-slate-950/40 transition-all duration-300"
          >
            <div className="h-52 overflow-hidden relative">
              <img 
                alt="Eventos Científicos" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATYDdtqFZcqnU7z0i8DDlcyP2MvDBGHoZDkTq1ClWhI5MCHljxEpNm5rETIyqS8kTBNM1d_UUZ30GmbGcn3N4Y8M7VkyecZND7rosmplrf8CTnnyWQLqoEY3DveUleugsXb3QbOId4SSqty75k9kRZwqOv_cCt8wGFUKLoU2cBqJJVv3vtBpzyMCzGS8ol_KWAVxyZ8byDkQ1QIe-Fz71d9SpPvJNiFkzSDljvt471INlIvp1i5KR-jlLLgIfq0TYdsTc1tcVUNaE" 
              />
              <div className="absolute top-4 left-4 bg-blue-650 dark:bg-blue-600 text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Fórum Evento
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Dcomp Innovation Week 2024
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                O maior encontro de inovação e tecnologia do estado, reunindo pesquisadores, alunos, e investidores de mercado.
              </p>
              <div className="flex items-center justify-between pt-3 text-[11px] text-red-650 dark:text-red-400 font-extrabold border-t border-slate-50 dark:border-slate-850 mt-1">
                <span>Inscrições Abertas</span>
                <span className="material-symbols-outlined text-[16px] text-red-650 dark:text-red-400">event</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Support Labs logo block */}
      <section className="py-8 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-200/50 dark:border-slate-800/80">
        <h3 className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">
          Laboratórios Associados Integrados
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-10 opacity-70 group px-4">
          {["LAB-BIOTEC", "INFRO-SEC", "ECO-LOGIC", "NE-TECH", "HUMAN-DCOMP"].map((lab) => (
            <div 
              key={lab} 
              className="px-6 py-2 bg-slate-200/60 dark:bg-slate-800/60 rounded-lg text-slate-700 dark:text-slate-300 font-extrabold text-sm border border-slate-300/40 dark:border-slate-700/40 hover:bg-white dark:hover:bg-slate-900 hover:text-black dark:hover:text-white hover:opacity-100 hover:shadow-sm hover:scale-102 transition-all duration-300 cursor-default"
            >
              {lab}
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
