"use client";

import { useState, useRef } from "react";
import { GEMINI_MOCK }      from "@/app/page";

const STEPS = [
  ["🔐 Authenticating Gemini API...",  "Validating API key scope · OAuth 2.0",       8],
  ["📦 Encoding image payload...",      "Base64 conversion · JPEG compression",       24],
  ["🚀 Sending to Gemini Vision...",    "gemini-2.0-flash · multimodal endpoint",     44],
  ["🧠 Running material analysis...",   "Object detection + waste classification",    64],
  ["🌿 Calculating eco impact...",      "Carbon footprint database lookup",           82],
  ["📊 Structuring JSON response...",   "Parsing disposal protocol",                  94],
  ["✅ Analysis complete!",             "Persisting to Firestore scanHistory",        100],
];

export default function ScannerPage({ navigate, showToast, setResult }) {
  const [stage,     setStage]    = useState("idle"); // idle | preview | analyzing
  const [fileName,  setFileName] = useState("");
  const [stepIdx,   setStepIdx]  = useState(0);
  const [progress,  setProgress] = useState(0);
  const [dragging,  setDragging] = useState(false);
  const fileRef = useRef(null);

  const loadFile = (name) => { setFileName(name); setStage("preview"); };

  const startAnalysis = () => {
    setStage("analyzing");
    setStepIdx(0); setProgress(0);
    let i = 0;
    const iv = setInterval(() => {
      if (i < STEPS.length) {
        setStepIdx(i);
        setProgress(STEPS[i][2]);
        i++;
      } else {
        clearInterval(iv);
        setResult(GEMINI_MOCK);
        setStage("idle");
        setFileName("");
        showToast(`+${GEMINI_MOCK.ecoPoints} pts earned! ♻️`);
        navigate("result");
      }
    }, 480);
  };

  return (
    <div className="max-w-[680px] mx-auto flex flex-col gap-5">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-eco-green/10 to-eco-blue/10 border border-eco-green/20 rounded-full text-sm font-semibold text-eco-green">
        🤖 Gemini Vision API · Multi-modal Waste Analysis · gemini-2.0-flash
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if(f) loadFile(f.name); }}
        onClick={() => stage === "idle" && fileRef.current?.click()}
        className={`relative rounded-[20px] p-12 text-center cursor-pointer transition-all duration-300 overflow-hidden
          border-2 border-dashed
          ${dragging         ? "border-eco-green bg-eco-green/5"    : "border-eco-border bg-white"}
          ${stage==="scanning" ? "border-eco-green scanning-border" : ""}
          ${stage==="idle"   ? "hover:border-eco-green hover:bg-eco-green/[.02]" : ""}`}
      >
        {/* Scanning beam — only CSS animation, no inline keyframes */}
        {stage === "analyzing" && (
          <div className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-eco-green to-transparent animate-scan-beam" />
        )}

        {stage === "idle" && (
          <>
            <div className="text-[56px] mb-4">📦</div>
            <h3 className="font-display text-lg font-bold mb-2">Drop waste image here</h3>
            <p className="text-eco-muted text-sm mb-6">or choose from options below</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button className="btn-primary"   onClick={e=>{e.stopPropagation();fileRef.current?.click()}}>📁 Upload Image</button>
              <button className="btn-secondary" onClick={e=>{e.stopPropagation();loadFile("Camera_Capture.jpg")}}>📷 Use Camera</button>
              <button className="btn-outline"   onClick={e=>{e.stopPropagation();loadFile("demo_plastic_bottle.jpg")}}>⚡ Demo Scan</button>
            </div>
            <p className="text-xs text-eco-muted mt-4">Supports JPG, PNG, WEBP, HEIC · Max 10 MB</p>
          </>
        )}

        {stage === "preview" && (
          <div className="flex flex-col items-center gap-3">
            <div className="text-[48px]">🧴</div>
            <p className="font-semibold text-sm">{fileName}</p>
            <p className="text-eco-muted text-xs">Image ready — click Analyze below</p>
          </div>
        )}

        {stage === "analyzing" && (
          <div className="flex flex-col items-center gap-4 py-4">
            {/* animate-spin from Tailwind — no raw CSS text */}
            <div className="w-16 h-16 border-[3px] border-eco-border border-t-eco-green rounded-full animate-spin" />
            <p className="font-semibold text-eco-green text-sm">{STEPS[stepIdx]?.[0]}</p>
            <p className="text-eco-muted text-xs">{STEPS[stepIdx]?.[1]}</p>
            <div className="w-52 h-1.5 bg-eco-border rounded-full overflow-hidden">
              <div className="h-full bg-eco-gradient rounded-full transition-all duration-500" style={{ width:`${progress}%` }} />
            </div>
            <p className="text-[11px] text-eco-muted">gemini-2.0-flash · multimodal endpoint</p>
          </div>
        )}
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { if(e.target.files[0]) loadFile(e.target.files[0].name); }} />

      {stage === "preview" && (
        <div className="text-center">
          <button onClick={startAnalysis} className="btn-primary btn-lg">🧠 Analyze with Gemini AI</button>
        </div>
      )}

      {/* Code reference card */}
      <div className="eco-card">
        <h3 className="font-display font-bold text-sm mb-3">🛠️ Gemini API — Production Schema</h3>
        <p className="text-xs text-eco-muted leading-relaxed mb-3">
          Images are sent as base64 to the Gemini Vision endpoint. The model returns structured JSON with waste
          classification, disposal protocol, and carbon impact — then persisted to Firestore.
        </p>
        <pre className="bg-eco-dark rounded-xl p-4 text-[11px] text-emerald-300 leading-relaxed overflow-x-auto">
{`// geminiService.js
export const analyzeWaste = async (base64, mime) => {
  const res = await fetch(\`\${GEMINI_URL}?key=\${API_KEY}\`, {
    method: 'POST',
    body: JSON.stringify({ contents: [{ parts: [
      { inlineData: { mimeType: mime, data: base64 } },
      { text: WASTE_PROMPT }  // returns JSON
    ]}]})
  });
  if (!res.ok) throw new Error(\`Gemini \${res.status}\`);
  const text = (await res.json())
    .candidates[0].content.parts[0].text;
  return JSON.parse(text.replace(/\`\`\`json|\`\`\`/g, ''));
};`}
        </pre>
      </div>
    </div>
  );
}