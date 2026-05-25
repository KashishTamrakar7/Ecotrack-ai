"use client";

import ProgressBar from "@/components/ui/ProgressBar";

const BADGES = [
  { emoji:"🌱", name:"First Scan",    desc:"Completed",     unlocked:true  },
  { emoji:"🔥", name:"7-Day Streak",  desc:"Completed",     unlocked:true  },
  { emoji:"♻️", name:"Recycler Pro",  desc:"25+ items",     unlocked:true  },
  { emoji:"🏆", name:"Top 10 City",   desc:"Ranked #12",    unlocked:true  },
  { emoji:"🌍", name:"Planet Hero",   desc:"100+ items",    unlocked:false },
  { emoji:"⚡", name:"E-Warrior",     desc:"5 e-waste",     unlocked:false },
  { emoji:"🌊", name:"Ocean Saver",   desc:"Special event", unlocked:false },
  { emoji:"👑", name:"Eco Legend",    desc:"Reach Lv. 20",  unlocked:false },
];

export default function RewardsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Profile hero */}
      <div className="bg-dark-gradient rounded-[24px] p-7 text-white relative overflow-hidden">
        <div className="absolute w-72 h-72 rounded-full bg-eco-green/10 -top-16 -right-16 pointer-events-none" />
        <div className="relative z-10 flex items-start gap-5">
          <div className="relative flex-shrink-0">
            <div className="w-[72px] h-[72px] rounded-[18px] bg-eco-gradient flex items-center justify-center text-white font-bold text-2xl">AK</div>
            <span className="absolute -bottom-1.5 -right-1.5 bg-amber-300 text-amber-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded-lg border-2 border-white">Lv.14</span>
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-extrabold">Alex Kumar</h2>
            <p className="text-white/60 text-sm mt-0.5">alex@ecotrack.ai</p>
            <div className="flex gap-2 mt-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-eco-green/15 border border-eco-green/20 rounded-full text-eco-green text-xs font-semibold">🌍 Planet Protector</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 border border-amber-400/20 rounded-full text-amber-300 text-xs font-semibold">🔥 28 Day Streak</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-white/70 text-xs mb-1.5"><span>XP to next level</span><span>3,420 / 4,000</span></div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-eco-gradient rounded-full" style={{width:"85%"}} /></div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-display text-4xl font-extrabold text-eco-green">3,420</p>
            <p className="text-white/50 text-xs">Eco Points</p>
            <p className="font-display text-xl font-bold text-eco-blue mt-2">#12</p>
            <p className="text-white/50 text-xs">Global Rank</p>
          </div>
        </div>
      </div>

      {/* Score + Levels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="eco-card text-center">
          <h3 className="font-display font-bold text-sm mb-4">Sustainability Score</h3>
          <div className="relative inline-block">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="56" fill="none" stroke="#E8EFEB" strokeWidth="12"/>
              <circle cx="70" cy="70" r="56" fill="none" stroke="url(#g)" strokeWidth="12" strokeLinecap="round" strokeDasharray="352" strokeDashoffset="70" transform="rotate(-90 70 70)"/>
              <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%"><stop offset="0%" stopColor="#00C97F"/><stop offset="100%" stopColor="#00A8E8"/></linearGradient></defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="font-display text-3xl font-extrabold text-eco-green">82</p>
              <p className="text-[11px] text-eco-muted">Eco Score</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[["284","Items Recycled","text-eco-green"],["47kg","CO₂ Saved","text-eco-blue"]].map(([v,l,c])=>(
              <div key={l} className="py-2.5 bg-eco-bg rounded-xl">
                <p className={`font-display text-xl font-extrabold ${c}`}>{v}</p>
                <p className="text-[11px] text-eco-muted">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="eco-card">
          <h3 className="font-display font-bold text-sm mb-4">Level Milestones</h3>
          <div className="flex flex-col gap-2.5">
            {[
              {emoji:"🌱",name:"Eco Beginner",   lvl:"Lv. 1–5 · 0–500 XP",   done:true},
              {emoji:"♻️",name:"Green Warrior",   lvl:"Lv. 6–10 · 500–2,000", done:true},
              {emoji:"🌍",name:"Planet Protector",lvl:"Lv. 11–15 · 2,000–5,000",current:true},
              {emoji:"⚡",name:"Planet Warrior",  lvl:"Lv. 16–20 · 5,000+ XP", locked:true},
            ].map(m => (
              <div key={m.name} className={`flex items-center gap-3 px-4 py-3 rounded-xl
                ${m.current ? "bg-eco-green/5 border border-eco-green/15" : "bg-eco-bg border border-eco-border"}
                ${m.locked ? "opacity-50" : ""}`}>
                <span className="text-xl">{m.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{m.name}</p>
                  <p className="text-[11px] text-eco-muted">{m.lvl}</p>
                </div>
                <span className={m.done?"badge-green":m.current?"badge-blue":""}>
                  {m.done?"✓ Done":m.current?"Current":m.locked?"🔒":""}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement badges */}
      <div className="eco-card">
        <h3 className="font-display font-bold text-sm mb-5">🏅 Achievement Badges</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BADGES.map(b => (
            <div key={b.name}
              className={`p-4 rounded-xl text-center border transition-all duration-200 cursor-pointer
                hover:-translate-y-0.5 hover:shadow-eco
                ${b.unlocked
                  ? "border-eco-green/30 bg-eco-green/4"
                  : "border-eco-border bg-eco-bg opacity-50 grayscale"}`}>
              <div className="text-3xl mb-2">{b.emoji}</div>
              <p className="font-bold text-xs">{b.name}</p>
              <p className="text-[10px] text-eco-muted mt-0.5">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}