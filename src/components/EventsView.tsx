import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AcademicEvent } from "../types";

interface EventsProps {
  onSelectEvent: (id: string) => void;
  onEnrollmentChange: () => void;
}

export default function EventsView({ onSelectEvent, onEnrollmentChange }: EventsProps) {
  const [events, setEvents] = useState<AcademicEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Proposed event wizard form states
  const [showWizard, setShowWizard] = useState(false);
  const [wizardName, setWizardName] = useState("");
  const [wizardDescription, setWizardDescription] = useState("");
  const [wizardDate, setWizardDate] = useState("");
  const [wizardCenter, setWizardCenter] = useState("CCET");

  async function loadEventsData() {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events list:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadEventsData();
  }, []);

  const handleEnrollToggle = async (eventId: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/events/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: eventId, enroll: !currentStatus })
      });
      if (res.ok) {
        // Reload events locally
        await loadEventsData();
        // Invoke callback to notify other views (like sidebar badge)
        onEnrollmentChange();
      }
    } catch (err) {
      console.error("Failed to enroll event:", err);
    }
  };

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wizardName || !wizardDescription) {
      alert("Por favor preencha todos os campos da proposta.");
      return;
    }

    // Insert locally for immediate display
    const newEvt: AcademicEvent = {
      id: `wizard-${Date.now()}`,
      title: wizardName,
      description: wizardDescription,
      date: wizardDate || "30 Nov, 2024",
      timeSlot: "14:00 - 17:00",
      type: "Lecture",
      tags: ["Extensão", "Inovação"],
      location: `Anfiteatro ${wizardCenter}, Campus São Cristóvão`,
      isEnrolled: false,
      matchScore: 90
    };

    setEvents(prev => [newEvt, ...prev]);
    setShowWizard(false);
    setWizardName("");
    setWizardDescription("");
    setWizardDate("");
    alert("Proposta de evento submetida com sucesso ao Núcleo de Extensão do Dcomp!");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 font-sans items-start animate-fade-in"
    >
      {/* Central Listing of Academic Events */}
      <div className="lg:col-span-8 space-y-6">
        {/* Events landing banner info */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex justify-between items-center flex-wrap gap-4 shadow-sm">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Fóruns, Palestras e Extensões</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Inscreva-se com um clique para validar suas horas de atividades complementares no Dcomp.</p>
          </div>
          <button 
            onClick={() => setShowWizard(true)}
            className="px-5 py-2.5 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">assignment</span>
            Propor Evento
          </button>
        </div>

        {/* Dynamic events cards listings */}
        {isLoading ? (
          <div className="text-center text-slate-400 dark:text-slate-505 py-12">Carregando calendário de eventos do Dcomp...</div>
        ) : (
          <div className="space-y-4">
            {events.map((evt) => (
              <div 
                key={evt.id} 
                className={`p-6 bg-white dark:bg-slate-900 border rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all hover:shadow-sm ${
                  evt.isEnrolled 
                    ? "border-emerald-600 dark:border-emerald-500 bg-emerald-50/5 dark:bg-emerald-950/10" 
                    : "border-slate-200 dark:border-slate-800"
                }`}
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-extrabold px-3 py-0.5 rounded uppercase tracking-wider">
                      {evt.type}
                    </span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                      {evt.matchScore}% Match
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">{evt.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{evt.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 dark:text-slate-500 font-bold items-center pt-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">calendar_month</span>
                      {evt.date} ({evt.timeSlot})
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">pin_drop</span>
                      {evt.location}
                    </span>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2.5 w-full md:w-auto mt-2 md:mt-0">
                  <button 
                    onClick={() => handleEnrollToggle(evt.id, evt.isEnrolled)}
                    className={`w-full md:w-36 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                      evt.isEnrolled 
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-205 dark:hover:bg-slate-700" 
                        : "bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white shadow-sm"
                    }`}
                  >
                    {evt.isEnrolled ? "Inscrito" : "Inscrever-se"}
                  </button>
                  <button 
                    onClick={() => {
                      alert(`Detalhes rápidos de ${evt.title}:\nLocalização: ${evt.location}.\nAtividades adicionais estarão anexadas no SIGAA.`);
                    }}
                    className="w-full md:w-36 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar containing: Active Proposal Wizard modal + Side Calendar card */}
      <div className="lg:col-span-4 space-y-6">
        <AnimatePresence>
          {showWizard && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-blue-600 rounded-3xl p-6 shadow-md space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-800 dark:text-slate-200 text-lg">edit_note</span>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Propor Novo Evento</h3>
                </div>
                <button 
                  onClick={() => setShowWizard(false)}
                  className="material-symbols-outlined text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                >
                  close
                </button>
              </div>

              <form onSubmit={handleCreateProposal} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Nome da Palestra / Evento</label>
                  <input 
                    type="text" 
                    value={wizardName} 
                    onChange={e => setWizardName(e.target.value)}
                    required
                    placeholder="ex. Microsserviços com Quarkus em 2024"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-slate-800 dark:focus:border-slate-400 focus:bg-white dark:focus:bg-slate-900 rounded-lg text-slate-900 dark:text-slate-105 focus:outline-none focus:ring-1 focus:ring-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Descrição e Foco Acadêmico</label>
                  <textarea 
                    value={wizardDescription} 
                    onChange={e => setWizardDescription(e.target.value)}
                    required
                    placeholder="Descreva os temas gerais que serão expostos nesta extensão do Dcomp..."
                    className="w-full h-20 p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-slate-800 dark:focus:border-slate-400 focus:bg-white dark:focus:bg-slate-900 rounded-lg text-slate-900 dark:text-slate-105 focus:outline-none focus:ring-1 focus:ring-slate-300 custom-scrollbar"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 dark:text-slate-400">Data Proposta</label>
                    <input 
                      type="text" 
                      value={wizardDate} 
                      onChange={e => setWizardDate(e.target.value)}
                      placeholder="e.g. 25 Out, 2024"
                      className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-105 focus:border-slate-800 dark:focus:border-slate-400 focus:bg-white dark:focus:bg-slate-900 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 dark:text-slate-400">Departamento/Centro</label>
                    <select 
                      value={wizardCenter} 
                      onChange={e => setWizardCenter(e.target.value)}
                      className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-150 rounded-lg"
                    >
                      <option value="CCET">CCET</option>
                      <option value="CCBS">CCBS</option>
                      <option value="CCSA">CCSA</option>
                      <option value="CECH">CECH</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-bold rounded-xl shadow transition-all cursor-pointer"
                >
                  Submeter Proposta Científica
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Side mini-calendar widget */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 select-none">
          <div>
            <h3 className="font-extrabold text-slate-950 dark:text-white text-sm">Meus Eventos Salvos</h3>
            <p className="text-[11px] text-slate-400">Atividades complementares agendadas para esta semana.</p>
          </div>

          <div className="space-y-3">
            {[
              { id: "cal-1", day: "20", month: "out", title: "Escrita Científica de Alto Impacto", hours: "3 horas complementares", category: "Workshop" }
            ].map(item => (
              <div key={item.id} className="flex gap-4 items-center p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-100 dark:border-slate-850">
                <div className="w-12 h-12 bg-slate-900 dark:bg-blue-600 text-white rounded-xl flex flex-col justify-center items-center flex-shrink-0 shadow-sm leading-none">
                  <span className="text-[14px] font-extrabold uppercase tracking-tight">{item.day}</span>
                  <span className="text-[9px] font-bold uppercase text-slate-300 dark:text-slate-200 mt-1">{item.month}</span>
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs truncate leading-snug">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5 font-semibold">{item.category} • {item.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
