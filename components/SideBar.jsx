"use client";

import { useState } from "react";

export default function SideBar({ currentPage, navigate }) {
  // 📱 Mobile par menu open/close karne ke liye state
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "dashboard",   label: "📊 Dashboard" },
    { id: "scanner",     label: "📸 AI Scanner" },
    { id: "map",         label: "🗺️ Eco Map" },
    { id: "analytics",   label: "📈 Analytics" },
    { id: "leaderboard", label: "🏆 Leaderboard" },
    { id: "rewards",     label: "🎁 Rewards" },
    { id: "history",     label: "📜 Scan History" },
  ];

  return (
    <>
      {/* 📱 MOBILE HEADER BAR: Yeh sirf mobile par dikhega aur top par menu button dega */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 p-4 sticky top-0 z-50 w-full">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌿</span>
          <span className="font-bold text-gray-800 tracking-tight">EcoTrack AI</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
        >
          {isOpen ? (
            <span className="text-xl font-bold">✕</span> // Close Icon
          ) : (
            <span className="text-xl font-bold">☰</span> // Hamburger Menu Icon
          )}
        </button>
      </div>

      {/* 🧭 NAVIGATION SIDEBAR: Desktop par fixed rahega, Mobile par slide-down hoga */}
      <aside
        className={`fixed top-[61px] md:top-0 left-0 h-[calc(100vh-61px)] md:h-screen w-full md:w-[240px] bg-white border-r border-gray-200 z-40 transition-transform duration-300 md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo Section (Hidden on Mobile because of the mobile bar) */}
        <div className="hidden md:flex items-center gap-3 px-6 py-6 border-b border-gray-100">
          <span className="text-2xl">🌿</span>
          <span className="font-bold text-xl text-gray-800 tracking-tight">EcoTrack AI</span>
        </div>

        {/* Menu Navigation Links */}
        <nav className="p-4 flex flex-col gap-1.5 overflow-y-auto h-full pb-20">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                navigate(item.id);
                setIsOpen(false); // Mobile par click karte hi menu automatic close ho jaye
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left
                ${currentPage === item.id
                  ? "bg-green-50 text-green-700 font-bold shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* OVERLAY: Mobile par jab menu khule toh background thoda dark karne ke liye */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/20 z-30 transition-opacity"
        />
      )}
    </>
  );
}