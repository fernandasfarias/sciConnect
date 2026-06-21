import React, { useState } from "react";

interface TopBarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onSearchSubmit: (query: string) => void;
  onOpenSidebar?: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function TopBar({ 
  currentTab, 
  onTabChange, 
  onSearchSubmit, 
  onOpenSidebar,
  isDarkMode,
  onToggleDarkMode
}: TopBarProps) {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      onSearchSubmit(query);
      setQuery("");
    }
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 select-none flex-shrink-0 transition-colors duration-200">
      <div className="flex justify-between items-center w-full px-4 sm:px-8 h-18 max-w-7xl mx-auto">
        {/* Navigation Tabs (Discover, Projects, Events) */}
        <div className="flex items-center gap-2 sm:gap-6 lg:gap-12">
          {/* Mobile hamburger menu toggle */}
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer flex items-center justify-center"
            aria-label="Abrir menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          {/* Quick tab filters looking like top header links in user images */}
          <nav className="flex gap-4 sm:gap-8 items-center h-18">
            <button
              onClick={() => onTabChange("discover")}
              className={`font-semibold text-sm h-full flex items-center border-b-2 hover:text-slate-900 dark:hover:text-white transition-all ${
                currentTab === "discover"
                  ? "text-slate-900 dark:text-white border-slate-900 dark:border-white font-bold"
                  : "text-slate-500 dark:text-slate-400 border-transparent"
              }`}
            >
              Descobrir
            </button>
            <button
              onClick={() => onTabChange("search")}
              className={`font-semibold text-sm h-full flex items-center border-b-2 hover:text-slate-900 dark:hover:text-white transition-all ${
                currentTab === "search" || currentTab === "paper-detail"
                  ? "text-slate-900 dark:text-white border-slate-900 dark:border-white font-bold"
                  : "text-slate-500 dark:text-slate-400 border-transparent"
              }`}
            >
              Projetos
            </button>
            <button
              onClick={() => onTabChange("events")}
              className={`font-semibold text-sm h-full flex items-center border-b-2 hover:text-slate-900 dark:hover:text-white transition-all ${
                currentTab === "events"
                  ? "text-slate-900 dark:text-white border-slate-900 dark:border-white font-bold"
                  : "text-slate-500 dark:text-slate-400 border-transparent"
              }`}
            >
              Eventos
            </button>
          </nav>
        </div>

        {/* Global Search Interface */}
        <div className="flex-1 max-w-lg mx-4 lg:mx-12 hidden md:block">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 dark:group-focus-within:text-slate-200 transition-colors">
              search
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-10 pl-10 pr-4 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 focus:border-slate-400 dark:focus:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-slate-300 dark:focus:ring-slate-700 rounded-full font-medium text-xs text-slate-800 dark:text-slate-200 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
              placeholder="Pesquisar projetos, publicações ou pesquisadores [Pressione Enter]..."
            />
          </div>
        </div>

        {/* User Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Quick Toggle Icon */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all cursor-pointer flex items-center justify-center"
            title={isDarkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
          >
            <span className="material-symbols-outlined text-lg">
              {isDarkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>

          <button 
            onClick={() => alert("Nenhuma notificação pendente no momento.")}
            className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all cursor-pointer flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-lg">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
          </button>
          <button 
            onClick={() => onTabChange("analytics")}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all cursor-pointer flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-lg">settings</span>
          </button>

          <a 
            href="https://sigaa.ufs.br"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 sm:px-5 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-bold text-xs rounded-full hover:shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">login</span>
            <span className="hidden sm:inline">SIGAA</span>
          </a>
        </div>
      </div>
    </header>
  );
}
