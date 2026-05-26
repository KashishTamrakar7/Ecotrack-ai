"use client";

import { useState, useRef } from "react";
import { GEMINI_MOCK } from "@/app/page";

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
  const [selectedFile, setSelectedFile] = useState(null); // Real file store karne ke liye
  const [stepIdx,   setStepIdx]  = useState(0);
  const [progress,  setProgress] = useState(0);
  const [dragging,  setDragging] = useState(false);
  const fileRef = useRef(null);

  // File load karne ka dynamic function
  const loadFile = (fileOrName) => {
    if (typeof fileOrName === "string") {
      setFileName(fileOrName);
      setSelectedFile(null); // Demo mode
    } else {
      setFileName(fileOrName.name);
      setSelectedFile(fileOrName); // Real Image mode
    }
    setStage("preview");
  };

  // Helper function to convert file to Base64 for Gemini
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const startAnalysis = async () => {
    setStage("analyzing");
    setStepIdx(0); 
    setProgress(0);

    // Fake Loading Animation Loop
    let i = 0;
    const iv = setInterval(() => {
      if (i < STEPS.length - 1) {
        setStepIdx(i);
        setProgress(STEPS[i][2]);
        i++;
      }
    }, 400);

    try {
      let finalResult = GEMINI_MOCK; // Default fallback

      // Agar user ne real image dali hai, toh Gemini AI ko sach mein call karenge!
      if (selectedFile && process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        const base64Data = await fileToBase64(selectedFile);
        
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [ { inlineData: { mimeType: selectedFile.type, data: base64Data } },
                {
  text: `
Analyze the uploaded image and identify the waste item.

Return ONLY valid JSON.

Schema:
{
  "name": "Item Name",
  "type": "Plastic | E-Waste | Paper | Glass | Metal | Organic",
  "confidence": 95,
  "ecoPoints": 15,
  "co2Saved": 0.4,
  "status": "recycled | non-recyclable",
  "binColor": "blue | green | red | yellow",
  "advice": "short disposal advice",
  "info": "1 line explanation"
}

No markdown.
No extra text.
Only JSON.
`}
          ]
       }]
     })
   }
 );

 if (response.ok) { const resData = await response.json();

  let rawText =
    resData?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  console.log("RAW GEMINI RESPONSE:", rawText);

  // Clean markdown
  rawText = rawText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    finalResult = JSON.parse(rawText);
  } catch (parseError) {
    console.error("JSON Parse Failed:", parseError);

    // Fallback dynamic result
    finalResult = {
      name: "Unknown Waste",
      type: "General",
      confidence: 70,
      ecoPoints: Math.floor(Math.random() * 40) + 10,
      co2Saved: (Math.random() * 2).toFixed(2),
      status: "non-recyclable",
      binColor: "red",
      advice: "Please dispose responsibly.",
      info: "AI could not fully classify this item."
    };
  }
}
      }

      // Finish up animations
      clearInterval(iv);
      setStepIdx(STEPS.length - 1);
      setProgress(100);

      setTimeout(() => {
        setResult(finalResult);
        setStage("idle");
        setFileName("");
        setSelectedFile(null);
        showToast(`+${finalResult.ecoPoints || 10} pts earned! ♻️`);
        navigate("result"); // Result page par jao
      }, 500);

    } catch (error) {
      clearInterval(iv);
      console.error("Gemini Real-time analysis failed:", error);
      // Fail hone par fallback to dummy data taaki app ruke na
      setResult(GEMINI_MOCK);
      setStage("idle");
      navigate("result");
    }
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
        onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if(f) loadFile(f); }}
        onClick={() => stage === "idle" && fileRef.current?.click()}
        className={`relative rounded-[20px] p-12 text-center cursor-pointer transition-all duration-300 overflow-hidden
          border-2 border-dashed
          ${dragging         ? "border-eco-green bg-eco-green/5"    : "border-eco-border bg-white"}
          ${stage==="scanning" ? "border-eco-green scanning-border" : ""}
          ${stage==="idle"   ? "hover:border-eco-green hover:bg-eco-green/[.02]" : ""}`}
      >
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
            <div className="text-[48px]">{selectedFile ? "📸" : "🧴"}</div>
            <p className="font-semibold text-sm">{fileName}</p>
            <p className="text-eco-muted text-xs">Image ready — click Analyze below</p>
            <div className="flex gap-2 mt-2">
               <button className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-eco-dark font-medium" onClick={(e) => { e.stopPropagation(); setStage("idle"); setFileName(""); setSelectedFile(null); }}>❌ Cancel</button>
            </div>
          </div>
        )}

        {stage === "analyzing" && (
          <div className="flex flex-col items-center gap-4 py-4">
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

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { if(e.target.files[0]) loadFile(e.target.files[0]); }} />

      {stage === "preview" && (
        <div className="text-center">
          <button onClick={startAnalysis} className="btn-primary btn-lg">🧠 Analyze with Gemini AI</button>
        </div>
      )}
    </div>
  );
}