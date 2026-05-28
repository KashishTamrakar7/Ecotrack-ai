"use client";

import { useState, useEffect } from "react";
import SideBar   from "@/components/SideBar";
import TopBar    from "@/components/TopBar";
import ChatBot   from "@/components/ChatBot";
import Toast     from "@/components/ui/Toast";

import DashboardPage  from "@/components/pages/DashboardPage";
import ScannerPage    from "@/components/pages/ScannerPage";
import ResultPage     from "@/components/pages/ResultPage";
import MapPage        from "@/components/pages/MapPage";
import HistoryPage    from "@/components/pages/HistoryPage";
import RewardsPage    from "@/components/pages/RewardsPage";
import LeaderboardPage from "@/components/pages/LeaderboardPage";
import AnalyticsPage  from "@/components/pages/AnalyticsPage";
import AdminPage      from "@/components/pages/AdminPage";
import AuthPage       from "@/components/pages/AuthPage";

export default function Home() {
  const [page, setPage] = useState("dashboard");
  const [toast, setToast] = useState(null);
  const [result, setResult] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);

  // 🎯 BROWSER BACK BUTTON FIX
  useEffect(() => {
    window.history.replaceState({ page: "dashboard" }, "");

    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setPage(event.state.page);
      } else {
        setPage("dashboard");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const navigate = (p) => {
    setPage(p);
    setNotifOpen(false);
    window.history.pushState({ page: p }, "", p === "dashboard" ? "/" : `#${p}`);
  };

  const isAuth = page === "auth";

  const pages = {
    dashboard:   <DashboardPage  navigate={navigate} showToast={showToast} />,
    scanner:     <ScannerPage    navigate={navigate} showToast={showToast} setResult={setResult} />,
    result:      <ResultPage     navigate={navigate} showToast={showToast} result={result} />,
    map:         <MapPage        navigate={navigate} showToast={showToast} />,
    analytics:   <AnalyticsPage  />,
    leaderboard: <LeaderboardPage />,
    rewards:     <RewardsPage    />,
    history:     <HistoryPage    />,
    admin:       <AdminPage      showToast={showToast} />,
    auth:        <AuthPage       navigate={navigate} showToast={showToast} />,
  };

  return (
    <>
      {isAuth ? (
        <div className="min-h-screen">{pages.auth}</div>
      ) : (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 overflow-x-hidden">
          
          {/* Sidebar component wrapper */}
          <SideBar currentPage={page} navigate={navigate} />

          {/* 📱 MOBILE RESPONSIVE WRAPPER: Fixed horizontal spacing padding */}
          <div className="flex-1 min-h-screen w-full transition-all duration-300 md:ml-[240px]">
            <TopBar
              title={page === "result" ? "AI Analysis Result" : "EcoTrack AI"}
              subtitle={page === "result" ? "AI analysis complete ✅" : "Identify & recycle smarter"}
              navigate={navigate}
              notifOpen={notifOpen}
              setNotifOpen={setNotifOpen}
              showToast={showToast}
            />
            
            {/* Main view injection with safe responsive paddings */}
            <main className="p-3 sm:p-6 md:p-8 max-w-full overflow-hidden animate-fade-in-up">
              {pages[page] ?? pages.dashboard}
            </main>
          </div>
        </div>
      )}

      {!isAuth && <ChatBot showToast={showToast} />}
      {toast && <Toast message={toast} />}
    </>
  );
}