"use client";

import { useState } from "react";

const NAV = [
  { section: "Main" },
  { id: "dashboard",   icon: "🏠", label: "Dashboard" },
  { id: "scanner",     icon: "📷", label: "AI Scanner",    badge: "AI" },
  { id: "map",         icon: "🗺️", label: "Eco Map" },
  { divider: true },
  { section: "Personal" },
  { id: "history",     icon: "📋", label: "Scan History" },
  { id: "rewards",     icon: "🏆", label: "Rewards" },
  { id: "leaderboard", icon: "🥇", label: "Leaderboard" },
  { id: "analytics",   icon: "📊", label: "Analytics" },
  { divider: true },
  { section: "Admin" },
  { id: "admin",       icon: "🏙️", label: "City Dashboard" },
  { divider: true },
  { id: "auth",        icon: "👤", label: "Account", bottom: true },
];

export default function SideBar({ currentPage, navigate }) {
  // 📱 Mobile grid alignment controller
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 📱 MOBILE NAVIGATION BAR: Standard structural sticky wrapper */}
      <div className="md:hidden flex items-center justify-between bg-eco-dark border-b border-white/[.08] p-4 sticky top-0 z-50 w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-eco-gradient flex items-center justify-center text-lg">
            🌿
          </div>
          <span className="font-display text-white text-[17px] font-bold tracking-tight">
            EcoTrack AI
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white hover:bg-white/[.05] rounded-lg transition-colors focus:outline-none"
        >
          {isOpen ? (
            <span className="text-xl font-bold">✕</span>
          ) : (
            <span className="text-xl font-bold">☰</span>
          )}
        </button>
      </div>

      {/* 🧭 UNTOUCHED ORIGINAL CORE THEME SYSTEM & FRAMEWORK */}
      <aside
        className={`fixed left-0 bg-eco-dark flex flex-col z-50 overflow-y-auto w-[240px] transition-transform duration-300 md:translate-x-0
          ${isOpen ? "translate-x-0 top-[61px] h-[calc(100vh-61px)]" : "-translate-x-full md:top-0 md:h-screen"}
        `}
      >
        {/* Logo Section (Hidden on mobile to prioritize structural content) */}
        <div className="hidden md:flex items-center gap-2.5 px-5 py-6 border-b border-white/[.08]">
          <div className="w-9 h-9 rounded-xl bg-eco-gradient flex items-center justify-center text-lg">
            🌿
          </div>
          <span className="font-display text-white text-[17px] font-bold tracking-tight">
            EcoTrack AI
          </span>
        </div>

        {/* Dynamic Navigation Mapping - Identical to your core configuration */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          {NAV.map((item, i) => {
            if (item.section)
              return (
                <p key={i} className="text-[11px] font-semibold uppercase tracking-widest text-[#4A6B60] px-3 pt-4 pb-1">
                  {item.section}
                </p>
              );
            if (item.divider)
              return <hr key={i} className="border-white/[.07] my-2 mx-3" />;

            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  navigate(item.id);
                  setIsOpen(false); // Closes menu safely upon touch events
                }}
                className={`nav-item w-full text-left ${active ? "nav-item-active" : ""}`}
              >
                <span className="text-[17px] w-5 text-center">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-eco-green text-white text-[10px] font-bold rounded-full px-2 py-0.5">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Footer Profile View Area */}
        <div className="px-4 py-4 border-t border-white/[.08] flex items-center gap-3 bg-eco-dark">
          <div className="w-9 h-9 rounded-xl bg-eco-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            AK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">Alex Kumar</p>
            <p className="text-eco-green text-[11px]">🌍 Planet Protector</p>
          </div>
        </div>
      </aside>

      {/* BACKGROUND VIEWPORT COVER OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity"
        />
      )}
    </>
  );
}