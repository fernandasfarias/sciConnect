import React from "react";
import Logo from "./Logo";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  enrolledCount: number;
  isOpen?: boolean;
  onClose?: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Sidebar({ 
  currentTab, 
  onTabChange, 
  enrolledCount, 
  isOpen, 
  onClose,
  isDarkMode,
  onToggleDarkMode
}: SidebarProps) {
  const menuItems = [
    { id: "discover", label: "Descobrir", icon: "explore" },
    { id: "search", label: "Hub de Pesquisa", icon: "science" },
    { id: "profile", label: "Painel do Aluno", icon: "dashboard" },
    { id: "events", label: "Eventos", icon: "event", badge: enrolledCount > 0 ? enrolledCount : undefined },
    { id: "analytics", label: "Analítico", icon: "monitoring" },
  ];

  const categoryItems = [
    { name: "Ciência", icon: "science_flex" },
    { name: "Academia", icon: "school" },
    { name: "Inovação", icon: "precision_manufacturing" },
    { name: "Saúde", icon: "medical_services" },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 lg:z-30 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen flex-shrink-0 select-none transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:h-screen ${
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      }`}>
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800/80">
          <Logo className="h-10" />
          {/* Close button inside sidebar for mobile */}
          <button 
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center"
            aria-label="Minimizar menu"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* User Mini Profile */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-blue-500/20">
                <img 
                  alt="Gabriel Santos" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOpkSXxfVchxS9RCMN8O5KvIv6m7vs1rieBTokcEi9ILOPXFVfzJ7BQv4HQn1UVgAU-c-nEYM79HJEPKmjfEia46Lsw_ZApP1307mc6mp8vuxF-iY2-pPqOOHy6gHCq34gWPdug-EQl_nc1fmf00XMd6fQ09C-rYFuO8DcgtXjMa-fHth60_-PjchFLW91g4PuQoyaBianFQq45uW1oYVLr_UiEeNu1vB2-bVLXLtmnhrR6YKYb4he3UUsMrt06PnRvIiZbkudE2A" 
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </div>
            <div className="overflow-hidden">
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate">Gabriel Santos</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">Sistemas de Informação</p>
            </div>
          </div>

          <button 
            onClick={() => onTabChange("profile")}
            className="w-full mt-3 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white dark:text-white py-2 px-3 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-sm">account_circle</span>
            Portal do Pesquisador
          </button>
        </div>

        {/* Navigation Main */}
        <nav className="flex-1 py-4 px-3 space-y-6 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-2">Principal</h5>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-sm" 
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span 
                        className={`material-symbols-outlined text-lg ${isActive ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}`}
                        style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}
                      >
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-blue-600 dark:bg-purple-600 text-white rounded-full px-2 py-0.5 text-[10px] font-extrabold shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories Section */}
          <div>
            <h5 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-2">Áreas</h5>
            <div className="space-y-1">
              {categoryItems.map((category) => (
                <button
                  key={category.name}
                  onClick={() => onTabChange("search")}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white text-sm transition-all"
                >
                  <span className="material-symbols-outlined text-lg text-slate-400 dark:text-slate-500">
                    {category.icon === "science_flex" ? "science" : category.icon}
                  </span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Sugestão AI */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Sugestão AI</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal mb-2.5">
              Com base no seu interesse em <span className="font-semibold text-slate-700 dark:text-slate-300">Data Science</span>.
            </p>
            <button 
              onClick={() => onTabChange("search")}
              className="text-[12px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center justify-between w-full"
            >
              <span>Python para Ecólogos</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
          {/* Theme Toggler at bottom of Sidebar */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-100 dark:border-slate-800 mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-sm">
                {isDarkMode ? "dark_mode" : "light_mode"}
              </span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isDarkMode ? "Modo Escuro" : "Modo Claro"}
              </span>
            </div>
            <button
              onClick={onToggleDarkMode}
              className="w-10 h-6 bg-slate-200 dark:bg-blue-600 rounded-full p-0.5 transition-colors relative cursor-pointer"
              aria-label="Mudar tema"
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                  isDarkMode ? "translate-x-4" : "translate-x-0"
                } flex items-center justify-center`}
              >
                <span className="material-symbols-outlined text-[10px] text-slate-500 dark:text-blue-600 font-bold">
                  {isDarkMode ? "dark_mode" : "light_mode"}
                </span>
              </div>
            </button>
          </div>

          <button
            onClick={() => {
              alert("Acesse a central do Dcomp ou envie e-mail para suporte@dcomp.ufs.br");
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all"
          >
            <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-base">help</span>
            Suporte Técnico
          </button>
          <button
            onClick={() => {
              alert("Manual do Usuário e termos acadêmicos do Dcomp disponíveis no repositório.");
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all font-sans"
          >
            <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-base">description</span>
            Documentação
          </button>
        </div>
      </aside>
    </>
  );
}
