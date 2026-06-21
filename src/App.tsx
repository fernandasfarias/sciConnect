import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import DiscoveryView from "./components/DiscoveryView";
import SearchHubView from "./components/SearchHubView";
import PaperDetailView from "./components/PaperDetailView";
import ResearcherDashboard from "./components/ResearcherDashboard";
import EventsView from "./components/EventsView";
import AnalyticsView from "./components/AnalyticsView";
import ChatBotWidget from "./components/ChatBotWidget";
import { Paper } from "./types";

export default function App() {
  const [currentTab, setCurrentTab] = useState("discover");
  const [searchPhrase, setSearchPhrase] = useState("");
  const [papers, setPapers] = useState<Paper[]>([]);
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null);
  const [enrolledCount, setEnrolledCount] = useState(1); // Default PIBIC workshop is registered
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  // Apply dark class to document on theme change
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Load publication list on mount from Express API
  useEffect(() => {
    async function fetchPapers() {
      try {
        const res = await fetch("/api/papers");
        const data = await res.json();
        setPapers(data);
      } catch (err) {
        console.error("Unable to load academic papers:", err);
      }
    }
    fetchPapers();
    updateEnrollmentCount();
  }, []);

  const updateEnrollmentCount = async () => {
    try {
      const res = await fetch("/api/events");
      const list = await res.json();
      const count = list.filter((e: any) => e.isEnrolled).length;
      setEnrolledCount(count);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGlobalSearch = (query: string) => {
    setSearchPhrase(query);
    setCurrentTab("search");
    setIsSidebarOpen(false);
  };

  const handleSelectPaperId = (id: string) => {
    setSelectedPaperId(id);
    setCurrentTab("paper-detail");
    setIsSidebarOpen(false);
  };

  const handleSelectEventId = (id: string) => {
    setCurrentTab("events");
    setIsSidebarOpen(false);
  };

  const currentSelectedPaper = papers.find((p) => p.id === selectedPaperId);

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-slate-900 antialiased font-sans max-w-[100vw] overflow-x-hidden transition-colors duration-200">
      {/* 1. Left Sidebar menu control */}
      <Sidebar 
        currentTab={currentTab} 
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (tab !== "paper-detail") {
            setSelectedPaperId(null);
          }
          setIsSidebarOpen(false);
        }} 
        enrolledCount={enrolledCount} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
      />

      {/* 2. Right Side Main panel container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
        <TopBar 
          currentTab={currentTab} 
          onTabChange={(tab) => {
            setCurrentTab(tab);
            setIsSidebarOpen(false);
          }} 
          onSearchSubmit={handleGlobalSearch} 
          onOpenSidebar={() => setIsSidebarOpen(true)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-y-auto no-scrollbar">
          {(() => {
            switch (currentTab) {
              case "discover":
                return (
                  <DiscoveryView 
                    onSearch={handleGlobalSearch} 
                    onSelectPaper={handleSelectPaperId} 
                    onSelectEvent={handleSelectEventId} 
                  />
                );
              case "search":
                return (
                  <SearchHubView 
                    papers={papers} 
                    initialQuery={searchPhrase} 
                    onSelectPaper={handleSelectPaperId} 
                  />
                );
              case "paper-detail":
                return currentSelectedPaper ? (
                  <PaperDetailView 
                    paper={currentSelectedPaper} 
                    onBack={() => {
                        setSelectedPaperId(null);
                        setCurrentTab("search");
                    }} 
                  />
                ) : (
                  <div className="text-center text-slate-500 py-12">Nenhuma publicação selecionada.</div>
                );
              case "profile":
                return <ResearcherDashboard onSelectPaper={handleSelectPaperId} />;
              case "events":
                return (
                  <EventsView 
                    onSelectEvent={handleSelectEventId} 
                    onEnrollmentChange={updateEnrollmentCount} 
                  />
                );
              case "analytics":
                return <AnalyticsView />;
              default:
                return <div className="text-center text-slate-500 py-12">Esta página está em desenvolvimento.</div>;
            }
          })()}
        </main>
      </div>

      {/* 3. Global Floating AI Dialog Bot drawer */}
      <ChatBotWidget />
    </div>
  );
}
