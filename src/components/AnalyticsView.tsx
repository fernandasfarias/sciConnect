import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AnalyticsData } from "../types";

export default function AnalyticsView() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [academicYear, setAcademicYear] = useState("2024");
  const [centerSelect, setCenterSelect] = useState("Todos");
  const [deptSelect, setDeptSelect] = useState("Todos");

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/analytics");
        const analyticsData = await res.json();
        setData(analyticsData);
      } catch (err) {
        console.error("Failed to fetch analytical metrics from mock database:", err);
      }
    }
    fetchAnalytics();
  }, []);

  if (!data) {
    return <div className="text-center font-semibold text-slate-500 dark:text-slate-400 py-12">Carregando métricas estatísticas...</div>;
  }

  // SVG parameters for Meta PDI
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (data.metaPdiPercentage / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-10 pb-16 font-sans"
    >
      {/* 1. Configuration header and filters */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">Indicadores e Analytics Estratégicos</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Acompanhamento de metas do Plano de Desenvolvimento Institucional (PDI-Dcomp).</p>
        </div>

        {/* Dynamic drop-down selects looking like top controls */}
        <div className="flex flex-wrap gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-extrabold">Ano Acadêmico</span>
            <select 
              value={academicYear} 
              onChange={e => setAcademicYear(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-350 rounded-lg p-2 focus:outline-none"
            >
              <option value="2024">Academic Year: 2024</option>
              <option value="2023">Academic Year: 2023</option>
              <option value="2022">Academic Year: 2022</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-extrabold">Centro de Pesquisa</span>
            <select 
              value={centerSelect} 
              onChange={e => setCenterSelect(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-350 rounded-lg p-2 focus:outline-none"
            >
              <option value="Todos">Todos os Centros</option>
              <option value="CCET font-sans">CCET</option>
              <option value="CCBS">CCBS</option>
              <option value="CCSA">CCSA</option>
              <option value="CECH">CECH</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 text-xs">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-extrabold">Departamento</span>
            <select 
              value={deptSelect} 
              onChange={e => setDeptSelect(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-350 rounded-lg p-2 focus:outline-none"
            >
              <option value="Todos">Todos os Departamentos</option>
              <option value="DCOMP">DCOMP / Computação</option>
              <option value="DEE">DEE / Engenharia Elétrica</option>
              <option value="DGE">DGE / Geografia</option>
            </select>
          </div>
        </div>
      </section>

      {/* 2. Executive KPIs Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* KPI 1 - Circular Gauge Meta PDI */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[180px] relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Meta PDI</span>
            {/* Custom Circular SVG gauge */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-95">
                <circle cx="32" cy="32" r={radius} fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                <circle 
                  cx="32" 
                  cy="32" 
                  r={radius} 
                  fill="transparent" 
                  stroke="#38bdf8" 
                  strokeWidth="6" 
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-slate-100 font-extrabold text-[12px]">{data.metaPdiPercentage}%</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-extrabold font-sans">Meta de Produção</h3>
            <p className="text-[10px] text-slate-400 mt-1 leading-snug">Metas de registros complementares atingidos para o quadrante.</p>
          </div>
        </div>

        {/* KPI 2 - Ações no Portal */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[180px]">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Ações Registradas</span>
            <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 text-lg">fact_check</span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{data.actionsRegistered}</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              +12% comparado a 2023
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-400 pt-1 leading-snug">Projetos, publicações acadêmicas e extensões de fomento ativos.</p>
          </div>
        </div>

        {/* KPI 3 - Acessos Externos */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[180px]">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Acessos Externos</span>
            <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-lg">visibility</span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{data.externalAccesses}</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              Alta Visibilidade Qualis
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-400 pt-1 leading-snug">Leituras de artigos por instituições e pesquisadores externos.</p>
          </div>
        </div>

        {/* KPI 4 - H-index */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[180px]">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">H-Index Médio</span>
            <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 text-lg">grade</span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{data.hIndex}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Saber Consolidado</div>
            <p className="text-[10px] text-slate-400 dark:text-slate-400 pt-1 leading-snug">Pontuação qualificada média dos docentes e laboratórios parceiros.</p>
          </div>
        </div>

        {/* KPI 5 - Propriedade Intelectual */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[180px]">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Inovação Ativa</span>
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg">spatial_tracking</span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{data.activeIntellectualProperty}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold leading-normal">
              +{data.pendingApproval} em aprovação
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-400 leading-snug">Patentes, registros de softwares e protótipos de engenharia.</p>
          </div>
        </div>
      </section>

      {/* 3. Column Chart: Monthly Trend */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6">
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Evolução Mensal da Produção Científica</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Comparativo do volume de pesquisas indexadas na base do Dcomp entre 2023 e 2024.</p>
        </div>

        {/* CSS/SVG Column Graph */}
        <div className="space-y-4">
          <div className="h-64 flex items-end gap-1 sm:gap-6 border-b border-l border-slate-100 dark:border-slate-800 pb-2 pt-6 px-4">
            {data.monthlyTrend.map((t, idx) => {
              // Normalize based on max value 900
              const maxVal = 950;
              const barHeight2024 = (t.value2024 / maxVal) * 100;
              const barHeight2023 = (t.value2023 / maxVal) * 100;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute mb-28 bg-slate-900 dark:bg-slate-950 border border-slate-800 text-white text-[10px] p-2 rounded-lg transition-opacity pointer-events-none shadow z-10 flex flex-col">
                    <span>2024: <strong>{t.value2024}</strong></span>
                    <span>2023: <strong>{t.value2023}</strong></span>
                  </div>

                  {/* Comparative bars */}
                  <div className="flex items-end gap-1.5 w-full max-w-[40px] h-full justify-center">
                    <div 
                      className="bg-slate-300 dark:bg-slate-800 hover:bg-slate-250 dark:hover:bg-slate-705 w-2.5 sm:w-4 rounded-t-sm transition-all shadow-sm" 
                      style={{ height: `${barHeight2023}%` }}
                    ></div>
                    <div 
                      className="bg-gradient-to-t from-blue-600 to-indigo-500 hover:brightness-110 w-2.5 sm:w-4 rounded-t-sm transition-all shadow-sm" 
                      style={{ height: `${barHeight2024}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2">{t.month}</span>
                </div>
              );
            })}
          </div>

          {/* Graphic legend */}
          <div className="flex justify-center gap-6 text-xs font-bold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 bg-slate-300 dark:bg-slate-800 rounded-sm inline-block"></span>
              <span>Exercício Acadêmico 2023</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 bg-gradient-to-t from-blue-600 to-indigo-500 rounded-sm inline-block"></span>
              <span>Exercício Acadêmico 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Split Section: Publications by center (left) & Rising Research trends (right) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Publications by center */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Pesquisas por Centro Acadêmico</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Distribuição do volume atual de publicações registradas por divisão de campus.</p>
          </div>

          <div className="space-y-5">
            {data.publicationsByCenter.map((cnt) => (
              <div key={cnt.center} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-bold">
                  <span className="text-slate-800 dark:text-slate-300 font-bold">{cnt.center} ({cnt.label})</span>
                  <span>{cnt.count} pesquisas • {cnt.percentage}%</span>
                </div>
                {/* Horizontal Progress Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-950 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all" 
                    style={{ width: `${cnt.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Rising Research Trends Word Web map */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Mapas de Tendências Emergentes</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Termos e focos científicos que obtiveram maior taxa de crescimento de citações.</p>
          </div>

          {/* Word Cloud */}
          <div className="p-4 bg-slate-50/50 dark:bg-slate-950/40 rounded-2xl border border-slate-180 dark:border-slate-800 flex flex-wrap gap-3 justify-center items-center min-h-[220px]">
            {data.risingTrends.map((trend) => {
              const sizeClasses = {
                sm: "text-[10px] font-medium text-slate-500 px-2 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-full",
                md: "text-xs font-semibold text-slate-700 dark:text-slate-300 px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850/80 rounded-full shadow-sm",
                lg: "text-sm font-bold text-slate-900 dark:text-slate-100 px-3.5 py-2 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 border border-slate-300 dark:border-slate-800 rounded-full",
                xl: "text-base font-extrabold text-white px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white rounded-full shadow-md"
              };

              return (
                <div 
                  key={trend.tag} 
                  className={`${sizeClasses[trend.size]} transition-transform hover:scale-105 cursor-default flex items-center gap-1.5 select-none`}
                >
                  <span>{trend.tag}</span>
                  {trend.growthRate && (
                    <span className="text-[9px] bg-emerald-500 dark:bg-emerald-600 text-white font-extrabold px-1 rounded">
                      {trend.growthRate}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Highlight Researchers cards */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6">
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-sm font-sans">Destaques em Impacto Científico</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Pesquisadores que obtiveram destaque em relevância internacional no portal este mês.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.topResearchers.map(researcher => (
            <div key={researcher.name} className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-4 flex-wrap hover:shadow-sm hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300">
              <div className="flex items-center gap-4">
                <img src={researcher.avatar} alt={researcher.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 flex-shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-955 dark:text-white text-sm leading-none">{researcher.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">{researcher.achievement}</p>
                  <span className="inline-block text-[9px] font-bold text-slate-500 dark:text-slate-300 bg-slate-150 dark:bg-slate-800 px-2.5 py-0.5 rounded uppercase tracking-wider">
                    Fomento ativo: {researcher.type === "patented" ? "Inovação Tecnológica" : "Pesquisa Teórica"}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-center min-w-[100px] border border-slate-200/50 dark:border-slate-800">
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{researcher.metricLabel}</span>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">{researcher.metricValue}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
