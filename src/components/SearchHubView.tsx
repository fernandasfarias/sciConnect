import React, { useState } from "react";
import { motion } from "motion/react";
import { Paper } from "../types";

interface SearchHubProps {
  papers: Paper[];
  initialQuery: string;
  onSelectPaper: (paperId: string) => void;
}

export default function SearchHubView({ papers, initialQuery, onSelectPaper }: SearchHubProps) {
  // States of search
  const [searchWord, setSearchWord] = useState(initialQuery);
  const [selectedCenter, setSelectedCenter] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["artigo"]);
  const [activeSubTab, setActiveSubTab] = useState<"publicacoes" | "pesquisadores" | "laboratorios">("publicacoes");
  const [savedPaperIds, setSavedPaperIds] = useState<string[]>(["paper-cnn-heterogeneous"]);

  // Sidebar controls
  const centers = [
    { id: "CCET", label: "CCET (Exatas e Tecnologia)" },
    { id: "CCBS", label: "CCBS (Biológicas e Saúde)" },
    { id: "CCSA", label: "CCSA (Sociais Aplicadas)" },
    { id: "CECH", label: "CECH (Educação e Humanas)" },
  ];

  const productionTypes = [
    { id: "artigo", label: "Artigo Científico" },
    { id: "projeto", label: "Trabalho Temático / Extensão" },
    { id: "relatorio", label: "Relatórios Técnicos" },
    { id: "patente", label: "Patentes Registradas" },
  ];

  // Selected paper preview is by default the CNN one
  const [previewPaperId, setPreviewPaperId] = useState<string>("paper-cnn-heterogeneous");

  const previewPaper = papers.find(p => p.id === previewPaperId) || papers[0];

  // Filtering papers
  const filteredPapers = papers.filter(paper => {
    // Search word match
    const matchesSearch = searchWord 
      ? paper.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        paper.author.toLowerCase().includes(searchWord.toLowerCase()) ||
        paper.tags.some(t => t.toLowerCase().includes(searchWord.toLowerCase()))
      : true;

    // Academic center filter match
    const matchesCenter = selectedCenter.length > 0 
      ? selectedCenter.includes(paper.academicCenter) 
      : true;

    return matchesSearch && matchesCenter;
  });

  const toggleCenter = (centerId: string) => {
    setSelectedCenter(prev => 
      prev.includes(centerId) ? prev.filter(c => c !== centerId) : [...prev, centerId]
    );
  };

  const toggleType = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) ? prev.filter(t => t !== typeId) : [...prev, typeId]
    );
  };

  const handleToggleBookmark = (paperId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPaperIds(prev => 
      prev.includes(paperId) ? prev.filter(id => id !== paperId) : [...prev, paperId]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 font-sans items-start"
    >
      {/* 1. Left Side Filters Column */}
      <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-8 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Filtros de Pesquisa</h3>
          {(selectedCenter.length > 0 || searchWord !== "") && (
            <button 
              onClick={() => { setSelectedCenter([]); setSearchWord(""); }}
              className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Universal input */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Palavra-chave</label>
          <div className="relative">
            <input 
              type="text" 
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="w-full text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-slate-400 dark:focus:border-slate-700 focus:bg-white dark:focus:bg-slate-900 rounded-lg p-2.5 pl-8 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-200 dark:focus:ring-slate-800"
              placeholder="Digite termos de interesse..."
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 dark:text-slate-500 text-base">search</span>
          </div>
        </div>

        {/* Production Types checkboxes */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Tipo de Produção</h4>
          <div className="space-y-2">
            {productionTypes.map(t => {
              const checked = selectedTypes.includes(t.id);
              return (
                <label key={t.id} className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={checked}
                    onChange={() => toggleType(t.id)}
                    className="w-4 h-4 rounded text-blue-600 dark:text-blue-500 border-slate-300 dark:border-slate-700/80 focus:ring-slate-500 cursor-pointer"
                  />
                  <span className={checked ? "font-semibold text-slate-900 dark:text-white" : ""}>{t.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Academic Center checkboxes */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">De acordo com o Centro</h4>
          <div className="space-y-2">
            {centers.map(center => {
              const checked = selectedCenter.includes(center.id);
              return (
                <label key={center.id} className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={checked}
                    onChange={() => toggleCenter(center.id)}
                    className="w-4 h-4 rounded text-blue-600 dark:text-blue-500 border-slate-300 dark:border-slate-700/80 focus:ring-slate-500 cursor-pointer"
                  />
                  <span className={checked ? "font-semibold text-slate-900 dark:text-white" : ""}>{center.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Production Timeline selector */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Ano de Publicação</h4>
          <div className="space-y-2">
            <input 
              type="range" 
              min="2010" 
              max="2024" 
              defaultValue="2024"
              className="w-full accent-blue-600 dark:accent-blue-500 bg-slate-200 dark:bg-slate-800 cursor-pointer h-1.5 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-bold">
              <span>2010</span>
              <span>2017</span>
              <span>2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Results Stream */}
      <div className="lg:col-span-6 space-y-6">
        {/* Results Info Hub Tabs */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex gap-4">
            {[
              { id: "publicacoes", label: "Publicações", count: filteredPapers.length },
              { id: "pesquisadores", label: "Pesquisadores", count: 12 },
              { id: "laboratorios", label: "Laboratórios", count: 4 },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeSubTab === tab.id
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 py-0.5 px-2 rounded-full text-[9px] font-extrabold">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="text-[11px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-wide">
            {filteredPapers.length} resultados encontrados
          </div>
        </div>

        {/* Results Stream Listing */}
        {activeSubTab === "publicacoes" ? (
          <div className="space-y-4">
            {filteredPapers.length > 0 ? (
              filteredPapers.map(paper => {
                const isSelected = previewPaperId === paper.id;
                const isBookmarked = savedPaperIds.includes(paper.id);
                return (
                  <div
                    key={paper.id}
                    onClick={() => setPreviewPaperId(paper.id)}
                    className={`p-6 bg-white dark:bg-slate-900 border rounded-2xl transition-all duration-300 cursor-pointer hover:shadow-md ${
                      isSelected ? "border-slate-900 dark:border-blue-600 shadow-sm bg-slate-50/20 dark:bg-slate-800/10" : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <span className="font-extrabold text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 py-0.5 px-2 rounded-full uppercase tracking-wider">
                          {paper.department.split(" / ")[0]} • {paper.academicCenter}
                        </span>
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-sm leading-snug hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {paper.title}
                        </h3>
                      </div>
                      <button 
                        onClick={(e) => handleToggleBookmark(paper.id, e)}
                        className={`text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all ${isBookmarked ? "text-blue-600 dark:text-blue-400" : ""}`}
                      >
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : undefined }}>
                          {isBookmarked ? "bookmark_added" : "bookmark"}
                        </span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-3 leading-relaxed">
                      {paper.traditionalSummary}
                    </p>

                    <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 font-semibold">
                      Autores: <span className="text-slate-800 dark:text-slate-300">{paper.author}</span>
                    </div>

                    {/* Tag listings */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-4">
                      {paper.tags.map(tag => (
                        <span 
                          key={tag} 
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            tag === "DCOMP Priority" || tag === "UFS Priority"
                              ? "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40" 
                              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 mt-5 pt-4">
                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs font-semibold">
                        <span className="material-symbols-outlined text-base">forum</span>
                        <span>{paper.citations} citações acadêmicas</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPaper(paper.id);
                        }}
                        className="text-xs font-bold text-slate-900 dark:text-slate-200 hover:underline flex items-center gap-1.5 cursor-pointer"
                      >
                        Visualizar completo
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-500">
                <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-650">block</span>
                <p className="text-sm font-semibold mt-2 dark:text-slate-400">Nenhuma publicação encontrada para o seu filtro.</p>
              </div>
            )}
          </div>
        ) : activeSubTab === "pesquisadores" ? (
          <div className="space-y-4">
            {[
              { name: "Dr. Ricardo Silva", dept: "DCOMP / Computação", center: "CCET", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5eXyBucdctva8B8_bmiJJp3x94iAcmveWNbPqlaTuQRC6Ea3lBko3mEpUP1opbQ5hdsiQgI5hhuJXxOOEgfSXUV1U6DUmStdH5JsiFCk7VCFsO_YfW_rx9R73RF7kxt8T0nPqc4juOFKEpdm6oJv74hY-mLHKCvb6fbLE9UD2BKUPaLAc-Xu4EfvioTWSi8WAznBJlxpwAj8Bv7gJT_0Wl24VWJ2y-mQ6odMjEWVKihcDQkkSONjm5aeAdXhQwJzb_BkaTe5g17k", papers: 24, hIndex: 12 },
              { name: "Dra. Helena Souza", dept: "DCOMP / Computação", center: "CCET", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTItpvOz0SB0AAzo8JHnnCy7JQB5qtwVpZH7z4vFvZf7CebCeXy21iLGPGfwoNVjLrGQLC6eTSkSjy1_swAi6ecWRc-ceVEzb4pqavFs9q0QIEfkTIhDcD6sblbISXjvC1vt7cc0GUXDeOEZ3cgvd1h45ztCBEXGA9urgBtLeiqG67bI2HvaI7WPvG3AL4Z4rDaKPdU9HLKQlg0x0AEphaJzjrXPLtMUrcTKAxYGftp5XKzzDUtI2z7lNEMWppWzUc6TPo92qqzxc", papers: 42, hIndex: 21 },
              { name: "Prof. Dra. Maria Eduarda", dept: "DCOMP / Computação", center: "CCET", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_9577D5GkZAnH21vG7gK_jE_9gXF81m9Dk72rX_c2iG9V6N9_cCtGf9kRDvyi9_K6K7L7K6i_v_M-IeO6nZ7u-G5wHCqg029Vn-TvlSgtx-6A_06S46zPfvQvybZ90k_TvhNnSgs-GA9M", papers: 64, hIndex: 32 }
            ].map(res => (
              <div key={res.name} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-4 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <img src={res.avatar} alt={res.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800" />
                  <div>
                    <h4 className="font-bold text-slate-950 dark:text-white text-sm">{res.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{res.dept} • {res.center}</p>
                    <div className="flex gap-4 mt-1 text-[11px] text-slate-400 dark:text-slate-500 font-bold">
                      <span>{res.papers} Publicações</span>
                      <span>H-Index: {res.hIndex}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Enviando mensagem para canal lattes de ${res.name}...`)}
                  className="px-4 py-2 bg-slate-900 dark:bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-slate-800 dark:hover:bg-blue-500 transition-all cursor-pointer active:scale-95"
                >
                  Conectar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {[
              { name: "Intelligent Systems Lab (ISL)", coordinator: "Prof. Dra. Maria Eduarda", room: "Prédio DCOMP • Sala 10", focus: "Processamento Gráfico heterogêneo & Deep Learning" },
              { name: "Laboratório de Transição Energética", coordinator: "Dr. Ricardo Silva", room: "Laboratórios CCET • Sala 04", focus: "Energías Renováveis & Sistemas Hidráulicos" }
            ].map(lab => (
              <div key={lab.name} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-md transition-all space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{lab.name}</h4>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">{lab.room}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{lab.focus}</p>
                <div className="pt-2 text-[11px] text-slate-400 dark:text-slate-500 font-bold border-t border-slate-50 dark:border-slate-850">
                  Coordenador: <span className="text-slate-800 dark:text-slate-350">{lab.coordinator}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Right Side Quick-View Intelligent Panel */}
      <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden ai-glow dark:shadow-slate-950/20">
          {/* Glass banner for AI symbol */}
          <div className="flex items-center gap-2 mb-4 bg-blue-50/80 dark:bg-blue-900/25 border border-blue-100 dark:border-blue-900/40 rounded-xl px-3 py-1.5 w-fit">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest">Resumo Rápido IA</span>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-extrabold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Inspecionando:</h4>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm leading-snug mt-1">
                {previewPaper.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-1">Por: {previewPaper.author}</p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <h5 className="font-bold text-slate-800 dark:text-slate-300 text-[11px] uppercase tracking-wide">Destaque do Estudo:</h5>
              <div className="bg-slate-50 dark:bg-slate-950/65 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                {previewPaper.aiSummary.substring(0, 180)}...
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h5 className="font-bold text-slate-800 dark:text-slate-300 text-[11px] uppercase tracking-wide">Alguns Conceitos:</h5>
              <div className="space-y-1.5">
                {previewPaper.keyConcepts.slice(0, 3).map(c => (
                  <div key={c.id} className="flex gap-2 items-start text-[11px] text-slate-600 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 bg-slate-900 dark:bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>
                      <strong className="text-slate-900 dark:text-slate-200 font-bold">{c.concept}:</strong> {c.description.split(".")[0]}.
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectPaper(previewPaper.id)}
              className="w-full mt-6 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              Visualizar Análise Completa
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
