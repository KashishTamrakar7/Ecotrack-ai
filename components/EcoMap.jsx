"use client";

import { useState } from "react";

const CENTERS = [
  { id:0, name:"Green Cycle Hub",   dist:"1.2 km", eta:"14 min", rating:"4.9", open:"8am–8pm", types:["♻️ Plastic","📦 Paper","🍶 Glass"], status:"ok"  },
  { id:1, name:"TechWaste Depot",   dist:"2.4 km", eta:"28 min", rating:"4.2", open:"9am–6pm", types:["🔋 E-Waste","📱 Mobiles"],          status:"ok"  },
  { id:2, name:"CleanCity Collect", dist:"0.8 km", eta:"9 min",  rating:"4.7", open:"7am–9pm", types:["🧴 Plastic","🍶 Glass"],             status:"ok"  },
  { id:3, name:"EcoAlert Zone",     dist:"3.1 km", eta:"Full",   rating:"3.4", open:"Closed",  types:["⚠️ Overflow"],                       status:"full"},
  { id:4, name:"GreenLeaf Center",  dist:"1.9 km", eta:"22 min", rating:"4.4", open:"8am–7pm", types:["🌿 Organics","📦 Paper"],            status:"ok"  },
];

const PINS = [
  { left:"24%", top:"22%", emoji:"♻️", color:"border-eco-green", dist:"1.2 km", distColor:"bg-eco-green",  centerId:0 },
  { left:"62%", top:"37%", emoji:"🔋", color:"border-eco-blue",  dist:"2.4 km", distColor:"bg-eco-blue",   centerId:1 },
  { left:"16%", top:"61%", emoji:"🧴", color:"border-eco-green", dist:"0.8 km", distColor:"bg-eco-green",  centerId:2 },
  { left:"79%", top:"18%", emoji:"⚠️", color:"border-rose-500",  dist:"3.1 km", distColor:"bg-rose-500",   centerId:3 },
  { left:"52%", top:"70%", emoji:"🌿", color:"border-eco-green", dist:"1.9 km", distColor:"bg-eco-green",  centerId:4 },
];

export default function EcoMap({ showToast }) {
  const [selected, setSelected]  = useState(0);
  const [activeFilter, setFilter] = useState("All");

  const FILTERS = ["All", "♻️ Plastic", "🔋 E-Waste", "📦 Paper", "🍶 Glass"];
  const { name: selName, eta: selEta } = CENTERS[selected];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
      {/* ── MAP CANVAS ── */}
      <div>
        {/* Filter chips */}
        <div className="flex gap-2 flex-wrap mb-4 items-center">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => { setFilter(f); showToast?.(`Filter: ${f} 📍`); }}
              className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200
                ${activeFilter === f
                  ? "bg-eco-green text-white border-eco-green"
                  : "bg-white border-eco-border text-eco-muted hover:border-eco-green hover:text-eco-green"
                }`}
            >
              {f}
            </button>
          ))}
          <button
            onClick={() => showToast?.("📍 Location acquired — centers updated!")}
            className="ml-auto btn-outline btn-sm"
          >
            📍 My Location
          </button>
          <span className="iot-chip">
            <span className="w-1 h-1 rounded-full bg-eco-blue animate-live-flash" />
            Live
          </span>
        </div>

        {/* Map container — premium vector city style */}
        <div
          className="relative rounded-[20px] overflow-hidden h-[430px] border border-eco-border"
          style={{
            background: "linear-gradient(160deg,#D4EEE2 0%,#C6E5F5 50%,#CCE8D8 100%)",
          }}
        >
          {/*
            ── ROAD NETWORK ──
            All roads are rendered as absolutely-positioned divs with
            inline style dimensions — zero raw CSS text in the DOM.
          */}

          {/* Major horizontal arterials */}
          <div className="absolute left-0 right-0 bg-white/[.82] rounded-sm z-[2]" style={{ top:"28%", height:8 }} />
          <div className="absolute left-0 right-0 bg-white/[.82] rounded-sm z-[2]" style={{ top:"55%", height:8 }} />
          {/* Minor horizontal streets */}
          <div className="absolute left-0 right-0 bg-white/[.5] rounded-sm z-[2]"  style={{ top:"15%", height:4 }} />
          <div className="absolute left-0 right-0 bg-white/[.5] rounded-sm z-[2]"  style={{ top:"70%", height:4 }} />
          <div className="absolute left-0 right-0 bg-white/[.5] rounded-sm z-[2]"  style={{ top:"84%", height:4 }} />

          {/* Major vertical arterials */}
          <div className="absolute top-0 bottom-0 bg-white/[.82] rounded-sm z-[2]" style={{ left:"28%", width:8 }} />
          <div className="absolute top-0 bottom-0 bg-white/[.82] rounded-sm z-[2]" style={{ left:"60%", width:8 }} />
          {/* Minor vertical streets */}
          <div className="absolute top-0 bottom-0 bg-white/[.5] rounded-sm z-[2]"  style={{ left:"14%", width:4 }} />
          <div className="absolute top-0 bottom-0 bg-white/[.5] rounded-sm z-[2]"  style={{ left:"44%", width:4 }} />
          <div className="absolute top-0 bottom-0 bg-white/[.5] rounded-sm z-[2]"  style={{ left:"78%", width:4 }} />

          {/* City blocks — parks */}
          <div className="absolute z-[1] rounded" style={{ left:"4%",top:"18%",width:"9%",height:"9%",  background:"rgba(0,170,90,.15)",border:"1px solid rgba(0,160,80,.2)" }} />
          <div className="absolute z-[1] rounded" style={{ left:"65%",top:"60%",width:"12%",height:"16%",background:"rgba(0,170,90,.15)",border:"1px solid rgba(0,160,80,.2)" }} />
          {/* City blocks — buildings */}
          <div className="absolute z-[1] rounded" style={{ left:"32%",top:"4%", width:"10%",height:"10%",background:"rgba(160,195,215,.38)",border:"1px solid rgba(130,170,200,.3)" }} />
          <div className="absolute z-[1] rounded" style={{ left:"63%",top:"6%", width:"9%", height:"8%", background:"rgba(160,195,215,.38)",border:"1px solid rgba(130,170,200,.3)" }} />
          <div className="absolute z-[1] rounded" style={{ left:"6%", top:"60%",width:"7%", height:"13%",background:"rgba(160,195,215,.38)",border:"1px solid rgba(130,170,200,.3)" }} />
          <div className="absolute z-[1] rounded" style={{ left:"80%",top:"32%",width:"11%",height:"13%",background:"rgba(160,195,215,.38)",border:"1px solid rgba(130,170,200,.3)" }} />
          <div className="absolute z-[1] rounded" style={{ left:"36%",top:"72%",width:"12%",height:"13%",background:"rgba(160,195,215,.38)",border:"1px solid rgba(130,170,200,.3)" }} />

          {/* Intersection dots */}
          {[
            {l:"28%",t:"28%"},{l:"60%",t:"28%"},{l:"28%",t:"55%"},{l:"60%",t:"55%"},
            {l:"44%",t:"28%"},{l:"44%",t:"55%"},{l:"78%",t:"28%"},{l:"78%",t:"55%"},
          ].map((d,i) => (
            <div key={i} className="absolute z-[3] w-2 h-2 rounded-full bg-white/90" style={{ left:d.l, top:d.t, border:"1px solid rgba(0,140,80,.18)", transform:"translate(-50%,-50%)" }} />
          ))}

          {/* Heatmap pollution blobs */}
          <div className="absolute z-[3] rounded-full pointer-events-none" style={{ width:130,height:85,background:"radial-gradient(ellipse,rgba(255,77,109,.13),transparent)",left:"5%",top:"40%" }} />
          <div className="absolute z-[3] rounded-full pointer-events-none" style={{ width:110,height:70,background:"radial-gradient(ellipse,rgba(249,199,79,.11),transparent)",left:"58%",top:"57%" }} />

          {/* ETA banner */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-eco-dark/85 text-white px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-eco-green animate-live-flash" />
            {selName} · {selEta === "Full" ? "⚠️ At capacity" : `${selEta} walk`}
          </div>

          {/* You-are-here */}
          <div className="absolute z-[6]" style={{ left:"45%", top:"42%", transform:"translate(-50%,-50%)" }}>
            <div className="absolute inset-[-20px] rounded-full bg-eco-blue/[.07]" />
            <div className="w-4 h-4 rounded-full bg-eco-blue border-[3px] border-white animate-map-ping" />
          </div>

          {/* Center pins */}
          {PINS.map(pin => (
            <div
              key={pin.centerId}
              onClick={() => setSelected(pin.centerId)}
              className={`absolute z-[5] flex flex-col items-center cursor-pointer
                          transition-transform duration-200 hover:scale-[1.2] hover:-translate-y-1`}
              style={{ left:pin.left, top:pin.top, transform:"translate(-50%,-100%)" }}
            >
              <div className={`group relative w-11 h-11 rounded-full bg-white border-[2.5px] ${pin.color} flex items-center justify-center text-lg shadow-md`}>
                {pin.emoji}
                {/* Hover label */}
                <span className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-eco-dark text-white text-[10px] font-semibold px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
                  {CENTERS[pin.centerId].name}
                </span>
              </div>
              {/* Triangle tail */}
              <div className={`w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent`}
                   style={{ borderTopColor: pin.distColor.replace("bg-","").includes("rose") ? "#FF4D6D" : pin.distColor.includes("eco-blue") ? "#00A8E8" : "#00C97F" }} />
              {/* Distance chip */}
              <span className={`${pin.distColor} text-white text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5 whitespace-nowrap`}>
                {pin.dist}
              </span>
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl p-2.5 text-[11px] z-[8] border border-eco-border leading-relaxed">
            <p className="font-bold mb-1">Legend</p>
            <p>🟢 Recycling Center</p>
            <p>🔵 E-Waste Hub</p>
            <p>🔴 Overflow Alert</p>
            <p>🔵 Your Location</p>
          </div>

          {/* API badge */}
          <div className="absolute bottom-3 right-3 bg-eco-dark/80 text-emerald-300 rounded-xl px-3 py-1.5 text-[10px] font-semibold z-[8] backdrop-blur-sm">
            Google Maps · Distance Matrix API
          </div>
        </div>

        {/* Geo status */}
        <div className="mt-3 flex items-center gap-3 flex-wrap text-xs text-eco-muted">
          <span className="iot-chip">
            <span className="w-1 h-1 rounded-full bg-eco-blue animate-live-flash" />
            Maps API Ready
          </span>
          <span>Geolocation: 21.2514°N, 81.6296°E (Raipur)</span>
        </div>
      </div>

      {/* ── CENTER LIST ── */}
      <div className="flex flex-col gap-3 max-h-[490px] overflow-y-auto pr-1">
        <h3 className="font-display font-bold text-sm text-eco-muted">5 Centers Found</h3>
        {CENTERS.map(c => (
          <div
            key={c.id}
            onClick={() => setSelected(c.id)}
            className={`eco-card cursor-pointer transition-all duration-200
              ${selected === c.id ? "border-eco-green ring-2 ring-eco-green/15" : ""}`}
          >
            <div className="flex justify-between items-start gap-2 mb-1">
              <p className="font-bold text-sm">{c.name}</p>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap
                ${c.status === "full" ? "bg-rose-100 text-rose-600" : "bg-sky-100 text-sky-600"}`}>
                {c.dist} · {c.eta}
              </span>
            </div>
            <p className="text-xs text-eco-muted mb-2">
              {c.status === "full" ? "⚠️ At capacity — avoid if possible" : `Open · ${c.open}`}
            </p>
            <div className="flex flex-wrap gap-1 mb-2">
              {c.types.map(t => <span key={t} className="badge-gray">{t}</span>)}
            </div>
            <p className="text-xs mb-2">⭐ {c.rating}</p>
            {c.status !== "full" && (
              <button
                onClick={e => { e.stopPropagation(); showToast?.(`🧭 Directions to ${c.name} — opening Maps...`); }}
                className="btn-primary btn-sm w-full justify-center"
              >
                Get Directions →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}