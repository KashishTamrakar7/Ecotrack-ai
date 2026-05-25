"use client";

import { useState } from "react";

const TABS = ["🌍 Global","📍 Nearby","👥 Friends"];
const TOP3 = [
  { name:"Rajan Mehta",  pts:"7,180", rank:2, color:"bg-gray-200  text-gray-600", border:"border-gray-300"   },
  { name:"Priya Sharma", pts:"8,420", rank:1, color:"bg-amber-200 text-amber-700",border:"border-yellow-400" },
  { name:"Liu Wei",      pts:"6,930", rank:3, color:"bg-orange-100 text-orange-600",border:"border-orange-400"},
];
const OTHERS = [
  { name:"Alex Kumar (You)", pts:"3,420", level:"🌍 Planet Protector", streak:"28",  me:true },
  { name:"Sneha Rao",        pts:"4,210", level:"♻️ Green Warrior",     streak:"15", me:false },
  { name:"Tanvir Khan",      pts:"3,890", level:"♻️ Green Warrior",     streak:"7",  me:false },
  { name:"Maya Gupta",       pts:"2,840", level:"🌱 Eco Beginner",      streak:"4",  me:false },
];
const CHALLENGES = [
  { emoji:"🥤", title:"Plastic-Free Week",  sub:"Top 50 get 500 bonus pts",   badge:"2 days left",   bv:"yellow" },
  { emoji:"🔋", title:"E-Waste Drive",       sub:"Recycle 5 electronics",       badge:"5 days left",   bv:"blue"   },
  { emoji:"🌱", title:"Green Commute",       sub:"10 public transit trips",      badge:"7 days left",   bv:"green"  },
];

export default function LeaderboardPage() {
  const [tab, setTab] = useState(0);
  return (
    <div className="flex flex-col gap-6">
      {/* Tabs */}
      <div className="flex gap-1 bg-eco-bg rounded-xl p-1 w-fit">
        {TABS.map((t,i) => (
          <button key={t} onClick={() => setTab(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${tab===i ? "bg-white font-bold shadow-sm text-eco-dark" : "text-eco-muted"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="eco-card">
        <div className="flex items-end justify-center gap-4 py-4">
          {TOP3.map(p => (
            <div key={p.rank} className={`flex flex-col items-center ${p.rank===1?"order-2":p.rank===2?"order-1":"order-3"}`}>
              {p.rank===1 && <span className="text-2xl mb-1">👑</span>}
              <div className={`w-16 h-16 rounded-full border-2 ${p.border} flex items-center justify-center text-2xl bg-white shadow`}>
                {p.rank===1?"🦸":p.rank===2?"🌿":"🌱"}
              </div>
              <p className="font-bold text-sm mt-2">{p.name.split(" ")[0]}</p>
              <p className="font-display text-lg font-extrabold text-eco-green">{p.pts}</p>
              <div className={`w-20 h-${p.rank===1?20:p.rank===2?14:10} rounded-t-xl mt-2 flex items-center justify-center text-white font-bold ${p.rank===1?"bg-gradient-to-b from-yellow-400 to-orange-400":p.rank===2?"bg-gradient-to-b from-gray-400 to-gray-500":"bg-gradient-to-b from-orange-400 to-orange-600"}`}
                style={{ height: p.rank===1?80:p.rank===2?60:44 }}>
                {p.rank}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of table */}
      <div>
        {OTHERS.map((u,i) => (
          <div key={i} className={`flex items-center gap-3 p-4 rounded-xl border mb-2.5 transition-all duration-200 hover:shadow-eco hover:translate-x-1 cursor-pointer
            ${u.me ? "bg-eco-green/5 border-eco-green" : "bg-white border-eco-border"}`}>
            <span className="text-2xl w-10 text-center">{u.me?"🏅":`#${i+4}`}</span>
            <div className="w-10 h-10 rounded-xl bg-eco-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {u.name.charAt(0)}{u.name.split(" ")[1]?.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">{u.name}</p>
              <p className="text-xs text-eco-muted">{u.level} · {u.streak}-day streak</p>
            </div>
            <div className="text-right">
              <p className="font-display font-extrabold text-eco-green text-base">{u.pts}</p>
              <p className="text-[11px] text-eco-muted">pts</p>
            </div>
          </div>
        ))}
      </div>

      {/* Challenges */}
      <div className="eco-card">
        <h3 className="font-display font-bold text-sm mb-4">🎯 Active Challenges</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CHALLENGES.map(c => (
            <div key={c.title} className="bg-eco-bg rounded-xl p-4 border border-eco-border hover:border-eco-green transition-colors">
              <div className="text-3xl mb-2">{c.emoji}</div>
              <p className="font-bold text-sm mb-1">{c.title}</p>
              <p className="text-xs text-eco-muted mb-3">{c.sub}</p>
              <span className={`badge-${c.bv}`}>{c.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}