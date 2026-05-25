"use client";

import { useState } from "react";

const BIN_NAMES  = { blue:"🔵 Blue Recycling Bin", green:"🟢 Green Organic Bin", red:"🔴 Red Waste Bin", yellow:"🟡 Yellow E-Waste Bin", black:"⬛ General Waste" };
const BIN_COLORS = { blue:"#00A8E8", green:"#00C97F", red:"#FF4D6D", yellow:"#E8A800", black:"#333" };

export default function ResultPage({ navigate, showToast, result }) {
  const [jsonOpen, setJsonOpen] = useState(false);
  const [saved,    setSaved]    = useState(false);

  if (!result) return null;

  return (
    <div className="max-w-[760px] mx-auto flex flex-col gap-5">
      {/* Waste type hero */}
      <div className="bg-dark-gradient rounded-[20px] p-7 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-white/50 font-semibold mb-2">Gemini AI Identified</p>
            <h2 className="font-display text-2xl font-extrabold mb-1">
              {result.recyclable ? "♻️" : "🚫"} {result.wasteType}
            </h2>
            <p className="text-white/60 text-sm">Material: {result.material}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-display text-4xl font-extrabold text-eco-green">+{result.ecoPoints}</p>
            <p className="text-white/50 text-xs">Eco Points Earned</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${result.recyclable ? "bg-emerald-400/20 text-emerald-300" : "bg-rose-400/20 text-rose-300"}`}>
              {result.recyclable ? "♻️ Recyclable" : "⛔ Non-recyclable"}
            </span>
          </div>
        </div>
        {/* Bin recommendation */}
        <div className="flex items-center gap-3 mt-5 bg-white/10 rounded-xl px-4 py-3">
          <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: BIN_COLORS[result.binColor] }} />
          <div>
            <p className="font-bold text-sm">{BIN_NAMES[result.binColor]}</p>
            <p className="text-white/60 text-xs">Plastic, glass & metal accepted</p>
          </div>
          <span className="ml-auto text-2xl">♻️</span>
        </div>
      </div>

      {/* Steps + Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="eco-card">
          <h3 className="font-display font-bold text-sm mb-4">📋 Disposal Instructions</h3>
          {result.disposalSteps.map((step, i) => (
            <div key={i} className="flex gap-3 py-2.5 border-b border-eco-border last:border-none">
              <div className="w-6 h-6 rounded-full bg-eco-green text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                {i+1}
              </div>
              <p className="text-sm leading-relaxed">{step}</p>
            </div>
          ))}
        </div>

        <div className="eco-card">
          <h3 className="font-display font-bold text-sm mb-4">🌍 Environmental Impact</h3>
          {[
            ["🌿","Carbon Footprint Reduced",`${result.carbonImpact} kg CO₂ prevented`],
            ["🔋","Energy Saved","Enough to charge a phone 2.4 hrs"],
            ["💧","Water Conserved","1.5 litres of water saved"],
            ["🌊","Ocean Protection","1 less plastic entering ocean"],
          ].map(([icon,title,sub]) => (
            <div key={title} className="flex items-center gap-3 py-3 border-b border-eco-border last:border-none">
              <span className="text-xl">{icon}</span>
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-eco-muted">{sub}</p>
              </div>
            </div>
          ))}
          <button
            onClick={() => setJsonOpen(!jsonOpen)}
            className="mt-3 text-[11px] text-eco-blue bg-sky-50 border border-sky-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-sky-100 transition-colors"
          >
            {"{}"} {jsonOpen ? "Hide" : "View"} Gemini JSON Response
          </button>
          {jsonOpen && (
            <pre className="mt-2 bg-eco-dark rounded-xl p-3 text-[10px] text-emerald-300 leading-relaxed max-h-48 overflow-y-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => { setSaved(true); showToast("Scan saved to Firestore ✅"); setTimeout(()=>setSaved(false),2200); }}
          className={`btn-primary ${saved ? "opacity-75" : ""}`}
        >
          {saved ? "✅ Saved!" : "💾 Save Scan"}
        </button>
        <button onClick={() => showToast("Achievement shared! 🌿")} className="btn-secondary">📤 Share</button>
        <button onClick={() => navigate("map")}     className="btn-outline">📍 Find Center</button>
        <button onClick={() => navigate("scanner")} className="btn-outline">📷 Scan Another</button>
      </div>
    </div>
  );
}