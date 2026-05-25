"use client";

import { useState } from "react";
import { SCAN_HISTORY } from "@/lib/appState";

const TABS = ["All","Plastic","E-Waste","Paper"];
const TYPE_BADGE = { Plastic:"blue", Paper:"green", "E-Waste":"red", Glass:"gray", Metal:"blue" };

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [tab,    setTab]    = useState("All");

  const filtered = SCAN_HISTORY.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                        item.type.toLowerCase().includes(search.toLowerCase());
    const matchTab    = tab === "All" || item.type === tab;
    return matchSearch && matchTab;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Search + tabs */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          className="eco-input flex-1 min-w-[200px] text-sm"
          type="search"
          placeholder="🔍 Search scans by name or type..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex gap-1 bg-eco-bg rounded-xl p-1">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                ${tab===t ? "bg-white font-bold shadow-sm text-eco-dark" : "text-eco-muted"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-eco-muted">No scans found 🔍</div>
      ) : (
        filtered.map((item, i) => (
          <div key={i}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-eco-border
                       transition-all duration-200 hover:shadow-eco hover:translate-x-1 cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-eco-bg flex items-center justify-center text-2xl flex-shrink-0">
              {item.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">{item.name}</p>
              <p className="text-xs text-eco-muted mt-0.5">{item.date}</p>
              <span className={`badge-${TYPE_BADGE[item.type]||"gray"} mt-1.5`}>{item.type}</span>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-eco-green">+{item.pts} pts</p>
              <span className={`mt-1.5 ${item.status==="recycled"?"badge-green":"badge-yellow"}`}>
                {item.status==="recycled"?"♻️ Recycled":"⚡ Special"}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}