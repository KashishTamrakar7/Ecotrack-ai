"use client";

import Chart from "chart.js/auto";
import StatCard    from "@/components/ui/StatCard";
import ProgressBar from "@/components/ui/ProgressBar";
import { WeeklyBarChart } from "@/components/DashboardCharts";
import { SCAN_HISTORY }   from "@/lib/appState";

const MOCK_SCAN_HISTORY = [
  { emoji: "🍾", label: "Plastic Bottle", ecoPoints: 10 },
  { emoji: "📰", label: "Newspaper", ecoPoints: 5 },
  { emoji: "🥫", label: "Aluminum Can", ecoPoints: 15 },
  { emoji: "📦", label: "Cardboard Box", ecoPoints: 8 }
];

export default function DashboardPage({ navigate, showToast }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="🌿" label="CO₂ Saved"      value="47.3kg" change="↑ 12% vs last week" color="green" />
        <StatCard icon="♻️" label="Items Recycled"  value="284"    change="↑ 8 today"          color="blue"  />
        <StatCard icon="⚡" label="Eco Points"      value="3,420"  change="↑ +180 today"       color="yellow"/>
        <StatCard icon="🏅" label="Global Rank"     value="#12"    change="Top 0.1%"            color="red"   />
      </div>

      {/* Charts + Profile row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="eco-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display font-bold text-sm">Weekly Recycling Activity</h3>
            <span className="badge-green">↑ 23%</span>
          </div>
          <div className="h-48"><WeeklyBarChart /></div>
        </div>
<div className="eco-card">
  <h3 className="font-display font-bold text-sm mb-4">Your Eco Profile</h3>
  <div className="flex items-center gap-4 mb-5">
    {/* Profile Avatar: Initials automatically generate honge (e.g., Sneha Rao -> SR) */}
    <div className="w-16 h-16 rounded-[18px] bg-eco-gradient flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
      {typeof window !== 'undefined' && require("@/lib/firebaseConfig").auth.currentUser?.displayName 
        ? require("@/lib/firebaseConfig").auth.currentUser.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
        : "AK"}
    </div>
    <div>
      {/* User Name: Firebase se dynamic naam aayega, nahi to default Alex Kumar dikhayega */}
      <p className="font-bold text-base">
        {(typeof window !== 'undefined' && require("@/lib/firebaseConfig").auth.currentUser?.displayName) || "Alex Kumar"}
      </p>
      <span className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 bg-eco-green/10 border border-eco-green/20 rounded-full text-eco-green text-xs font-semibold">
        🌍 Planet Protector
      </span>
    </div>
  </div>
  <div className="mb-4">
    <div className="flex justify-between text-xs text-eco-muted mb-1.5">
      <span>Level 14 → 15</span><span className="font-semibold">3,420 / 4,000 XP</span>
    </div>
    <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
      <div className="h-full w-[85%] bg-eco-gradient rounded-full" />
    </div>
  </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[["28","Day Streak","text-eco-green"],["12","Badges","text-eco-blue"],["5","Challenges","text-amber-600"]].map(([v,l,c]) => (
              <div key={l} className="text-center py-3 bg-eco-bg rounded-xl">
                <p className={`font-display text-xl font-extrabold ${c}`}>{v}</p>
                <p className="text-[11px] text-eco-muted">{l}</p>
              </div>
            ))}
          </div>
        </div>

      {/* Challenges + Recent scans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="eco-card">
          <h3 className="font-display font-bold text-sm mb-4">Active Challenges</h3>
          {[
            { title:"🥤 Plastic-Free Week", sub:"Recycle 20 plastic items", prog:70, label:"14 / 20", badge:"2 days left", variant:"yellow" },
            { title:"🔋 E-Waste Drive",     sub:"Recycle 5 electronics",    prog:40, label:"2 / 5",   badge:"5 days left", variant:"blue"   },
          ].map(ch => (
            <div key={ch.title} className="bg-eco-bg rounded-xl p-4 mb-3 last:mb-0 border border-eco-border hover:border-eco-green transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div><p className="font-bold text-sm">{ch.title}</p><p className="text-xs text-eco-muted mt-1">{ch.sub}</p></div>
                <span className={`badge-${ch.variant}`}>{ch.badge}</span>
              </div>
              <div className="flex justify-between text-xs text-eco-muted mb-1"><span>Progress</span><span>{ch.label}</span></div>
              <ProgressBar value={ch.prog} color={ch.variant === "yellow" ? "yellow" : "eco"} />
            </div>
          ))}
        </div>

        <div className="eco-card">
          <h3 className="font-display font-bold text-sm mb-4">Recent Scans</h3>
          {MOCK_SCAN_HISTORY.slice(0,4).map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 border-b border-eco-border last:border-none">
              <span className="text-xl">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{item.name}</p>
                <p className="text-[11px] text-eco-muted">{item.date}</p>
              </div>
              <span className="font-bold text-eco-green text-sm">+{item.pts}</span>
            </div>
          ))}
          <button onClick={() => navigate("history")} className="btn-outline btn-sm w-full justify-center mt-4">
            View All History →
          </button>
        </div>
      </div>

      <div className="text-center pt-2">
        <button onClick={() => navigate("scanner")} className="btn-primary btn-lg">
          📷 Scan New Item
        </button>
      </div>
    </div>
  );
}