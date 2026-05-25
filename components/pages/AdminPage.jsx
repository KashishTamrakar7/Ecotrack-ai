"use client";

import { useState, useEffect } from "react";
import { INITIAL_BINS, iotTick, binColorClass, binLabelClass } from "@/lib/iotEngine";
import { AreaBarChart } from "@/components/DashboardCharts";

const HEATMAP_COLORS = ["#D4F5E7","#A7E4C4","#FFF0C2","#FFD580","#FFB3B3","#FF4D6D"];

export default function AdminPage({ showToast }) {
  const [bins,         setBins]         = useState(INITIAL_BINS);
  const [cityRate,     setCityRate]     = useState(94.2);
  const [overflowCount,setOverflow]     = useState(12);
  const [heatmap,      setHeatmap]      = useState(() => Array.from({length:64},()=>Math.floor(Math.random()*6)));

  /* IoT simulation engine — tick every 3s */
  useEffect(() => {
    const iv = setInterval(() => {
      setBins(prev => iotTick(prev));
      setCityRate(r => Math.min(99, Math.max(88, r + (Math.random()-.5)*.3)));
      if (Math.random() < .04) setOverflow(c => Math.max(0, c + (Math.random()<.5?1:-1)));
      // Refresh one random heatmap cell
      setHeatmap(prev => {
        const next = [...prev];
        next[Math.floor(Math.random()*64)] = Math.floor(Math.random()*6);
        return next;
      });
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <div className="bg-admin-gradient rounded-[22px] px-8 py-7 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[.025]"
          style={{ backgroundImage:"repeating-linear-gradient(45deg,rgba(0,200,150,1) 0,rgba(0,200,150,1) 1px,transparent 1px,transparent 40px)" }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🏙️</span>
            <h2 className="font-display text-xl font-extrabold text-emerald-300">Smart City Command Center</h2>
            <span className="live-badge"><span className="w-2 h-2 rounded-full bg-emerald-300 animate-live-flash" />LIVE</span>
          </div>
          <p className="text-emerald-300/50 text-sm">AI-powered city recycling intelligence — Raipur Smart City Initiative · IoT Telemetry Active</p>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-eco-green/[.07] border border-eco-green/[.18] rounded-xl p-5">
          <p className="font-display text-[26px] font-extrabold text-emerald-300">2,847</p>
          <p className="text-xs text-emerald-300/55">Active Smart Bins</p>
        </div>
        <div className="bg-eco-green/[.07] border border-eco-green/[.18] rounded-xl p-5">
          <p className="font-display text-[26px] font-extrabold text-emerald-300">{cityRate.toFixed(1)}%</p>
          <p className="text-xs text-emerald-300/55">City Recycling Rate</p>
        </div>
        <div className="bg-rose-500/[.06] border border-rose-500/[.22] rounded-xl p-5">
          <p className="font-display text-[26px] font-extrabold text-red-300">{overflowCount}</p>
          <p className="text-xs text-red-300/55">Overflow Alerts</p>
        </div>
        <div className="bg-eco-green/[.07] border border-eco-green/[.18] rounded-xl p-5">
          <p className="font-display text-[26px] font-extrabold text-emerald-300">18.6 t</p>
          <p className="text-xs text-emerald-300/55">CO₂ Saved This Month</p>
        </div>
      </div>

      {/* Alerts + Bin status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-eco border border-eco-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-sm">⚠️ Live Alerts</h3>
            <span className="iot-chip"><span className="w-1 h-1 rounded-full bg-eco-blue animate-live-flash" />IoT Stream</span>
          </div>
          {[
            {variant:"red",    icon:"🚨", title:"Bin #247 — Sector 7",        sub:"96% full · Immediate collection needed"},
            {variant:"red",    icon:"🔋", title:"E-Waste Hub — Civil Lines",   sub:"Exceeded capacity. Rerouted."},
            {variant:"yellow", icon:"⚡", title:"Bin #384 — Telibandha",       sub:"78% full · Recommend collection"},
            {variant:"green",  icon:"✅", title:"Sector 4 Route Completed",   sub:"All bins cleared successfully"},
          ].map(a => (
            <div key={a.title} className={`flex gap-3 px-3.5 py-3 rounded-xl mb-2 last:mb-0 text-sm items-start
              ${a.variant==="red"?"bg-rose-50 border border-rose-200":a.variant==="yellow"?"bg-amber-50 border border-amber-200":"bg-emerald-50 border border-emerald-200"}`}>
              <span className="text-lg">{a.icon}</span>
              <div><p className="font-bold">{a.title}</p><p className="text-xs text-eco-muted mt-0.5">{a.sub}</p></div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-eco border border-eco-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-sm">🗑️ Smart Bin Status</h3>
            <span className="text-[11px] text-eco-muted">Live · updates every 3s</span>
          </div>
          <div className="flex flex-col gap-3">
            {bins.map(bin => (
              <div key={bin.id} className="flex items-center gap-3 px-3.5 py-2.5 bg-white rounded-xl border border-eco-border">
                <span className="text-base">🗑️</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold mb-1 truncate">{bin.label}</p>
                  <div className="h-2 bg-eco-bg rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${binColorClass(bin.status)} ${bin.status==="critical"?"animate-pulse-glow":""}`}
                      style={{ width:`${Math.round(bin.fill)}%` }}
                    />
                  </div>
                </div>
                <span className={`text-xs font-bold flex-shrink-0 w-8 text-right ${binLabelClass(bin.status)}`}>
                  {Math.round(bin.fill)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Area chart */}
      <div className="bg-white rounded-eco border border-eco-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-sm">Area-wise Recycling Performance</h3>
          <span className="iot-chip"><span className="w-1 h-1 rounded-full bg-eco-blue animate-live-flash" />Simulated IoT Feed</span>
        </div>
        <div className="h-56"><AreaBarChart /></div>
      </div>

      {/* Heatmap grid */}
      <div className="bg-white rounded-eco border border-eco-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-sm">City Recycling Heatmap — Zone Grid</h3>
          <span className="text-xs text-eco-muted">8×8 matrix · refreshes every 3s</span>
        </div>
        <div className="grid grid-cols-8 gap-1">
          {heatmap.map((v,i) => (
            <div key={i}
              className="h-7 rounded cursor-pointer transition-all duration-500 hover:scale-110 hover:brightness-110"
              style={{ background: HEATMAP_COLORS[v] }}
              title={`Zone ${Math.floor(i/8)+1}-${(i%8)+1}: ${["Low","Moderate","Average","Elevated","High","Critical"][v]}`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-3 text-[11px]">
          {["Low","Moderate","Average","Elevated","High","Critical"].map((l,i)=>(
            <span key={l} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm inline-block" style={{background:HEATMAP_COLORS[i]}} />
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}