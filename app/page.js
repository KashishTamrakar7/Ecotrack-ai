"use client";

import { useState } from "react";
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

const PAGE_TITLES = {
  dashboard:   "Dashboard",
  scanner:     "AI Scanner",
  result:      "Scan Result",
  map:         "Eco Map",
  analytics:   "Analytics",
  leaderboard: "Leaderboard",
  rewards:     "Rewards & Profile",
  history:     "Scan History",
  admin:       "Smart City Dashboard",
  auth:        "Account",
};

const PAGE_SUBS = {
  dashboard:   "Welcome back, Alex 👋",
  scanner:     "Identify & recycle smarter with Gemini AI",
  result:      "AI analysis complete ✅",
  map:         "Find recycling centers near you",
  analytics:   "Your environmental impact",
  leaderboard: "Compete & inspire change",
  rewards:     "Your eco journey & achievements",
  history:     "All your scans in one place",
  admin:       "City sustainability control center · IoT Live",
  auth:        "Sign in to your account",
};

// Gemini mock result — replace with live analyzeWaste() call in production
export const GEMINI_MOCK = {
  wasteType:     "PET Plastic Bottle",
  material:      "Polyethylene Terephthalate (PET #1)",
  recyclable:    true,
  binColor:      "blue",
  disposalSteps: [
    "Remove cap — may be PP #5; recycle separately or discard",
    "Rinse bottle with a small amount of water to remove residue",
    "Squeeze flat to save space in the recycling bin",
    "Place in the blue recycling bin or bring to nearest plastic depot",
  ],
  carbonImpact: 0.08,
  ecoPoints:    25,
  confidence:   0.96,
};

export default function Home() {
  const [page,    setPage]    = useState("dashboard");
  const [toast,   setToast]   = useState(null);
  const [result, setResult] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const navigate = (p) => {
    setPage(p);
    setNotifOpen(false);
  };

  const isAuth = page === "auth";

  const pages = {
    dashboard:   <DashboardPage   navigate={navigate} showToast={showToast} />,
    scanner:     <ScannerPage     navigate={navigate} showToast={showToast} setResult={setResult} />,
    result:      <ResultPage      navigate={navigate} showToast={showToast} result={result} />,
    map:         <MapPage         navigate={navigate} showToast={showToast} />,
    analytics:   <AnalyticsPage  />,
    leaderboard: <LeaderboardPage />,
    rewards:     <RewardsPage    />,
    history:     <HistoryPage    />,
    admin:       <AdminPage      showToast={showToast} />,
    auth:        <AuthPage        navigate={navigate} showToast={showToast} />,
  };

  return (
    <>
      {isAuth ? (
        <div className="min-h-screen">{pages.auth}</div>
      ) : (
        <div className="flex min-h-screen">
          <SideBar currentPage={page} navigate={navigate} />

          <div className="ml-[240px] flex-1 min-h-screen">
            <TopBar
              title={PAGE_TITLES[page]}
              subtitle={PAGE_SUBS[page]}
              navigate={navigate}
              notifOpen={notifOpen}
              setNotifOpen={setNotifOpen}
              showToast={showToast}
            />
            <main className="p-8 animate-fade-in-up">
              {pages[page] ?? pages.dashboard}
            </main>
          </div>
        </div>
      )}

      {/* Floating ChatBot — rendered outside layout so it never overlaps */}
      {!isAuth && <ChatBot showToast={showToast} />}

      {/* Global Toast */}
      {toast && <Toast message={toast} />}
    </>
  );
}