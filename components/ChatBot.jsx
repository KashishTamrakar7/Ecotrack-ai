"use client";

import { useState } from "react";

const BOT_RESPONSES = {
  pizza:    "🍕 Greasy pizza boxes are tricky! If heavily soaked in grease, compost it. The clean top half can be torn off and recycled in the blue bin.",
  battery:  "🔋 Batteries are hazardous e-waste — never put them in regular bins! Drop them at dedicated e-waste collection points or battery boxes at electronics stores.",
  styrofoam:"❌ Most styrofoam (polystyrene #6) is NOT recyclable in regular bins. Look for specialised foam recycling programs, or reduce usage by choosing paper-based packaging.",
  plastic:  "🌊 To reduce plastic: use reusable bags & bottles, buy in bulk, use beeswax wraps, and choose bamboo alternatives. Small daily changes = massive long-term impact!",
  default:  "🌿 Great eco question! Clean materials recycle better. Separate waste by category and always verify with your local municipality. Every correctly recycled item makes a difference. ♻️",
};

function getResponse(msg) {
  const m = msg.toLowerCase();
  if (m.includes("pizza"))                        return BOT_RESPONSES.pizza;
  if (m.includes("batter") || m.includes("electr")) return BOT_RESPONSES.battery;
  if (m.includes("styro")  || m.includes("foam"))   return BOT_RESPONSES.styrofoam;
  if (m.includes("plastic") || m.includes("reduce")) return BOT_RESPONSES.plastic;
  return BOT_RESPONSES.default;
}

export default function ChatBot({ showToast }) {
  const [open,   setOpen]   = useState(false);
  const [msgs,   setMsgs]   = useState([
    { role: "bot", text: "Hey! 👋 I'm EcoBot. Ask me anything about recycling, eco habits, or waste disposal!" },
  ]);
  const [input,  setInput]  = useState("");
  const [typing, setTyping] = useState(false);
  const [showQR, setShowQR] = useState(true);

  const sendMsg = (text) => {
    if (!text.trim()) return;
    setShowQR(false);
    setMsgs(prev => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(prev => [...prev, { role: "bot", text: getResponse(text) }]);
    }, 1400 + Math.random() * 400);
  };

  return (
    <>
      {/* FAB — fixed bottom-right, well above page content */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-7 right-7 z-[500] w-14 h-14 rounded-full
                   bg-eco-gradient shadow-eco-glow flex items-center justify-center
                   text-2xl text-white border-none transition-all duration-300
                   hover:scale-110 hover:shadow-[0_8px_32px_rgba(0,201,127,.65)]
                   active:scale-95"
        aria-label="Open EcoBot"
      >
        {open ? "✕" : "🌿"}
      </button>

      {/* Chat window — anchored above FAB, never overlapping content */}
      {open && (
        <div
          className="fixed bottom-24 right-7 z-[499] w-[360px] h-[500px]
                     bg-white rounded-[20px] shadow-eco-lg border border-eco-border
                     flex flex-col overflow-hidden animate-slide-chat"
        >
          {/* Header */}
          <div className="bg-dark-gradient px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-eco-gradient flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <p className="text-white font-bold text-sm">EcoBot AI</p>
              <p className="text-[#8BA99E] text-[11px]">Powered by Gemini · Always online</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-[#8BA99E] text-xl leading-none bg-transparent border-none cursor-pointer hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === "bot"
                      ? "bg-eco-bg text-eco-dark rounded-bl-sm"
                      : "bg-eco-gradient text-white rounded-br-sm"
                  }`}
                >
                  {m.text}
                </div>
                {m.role === "bot" && (
                  <span className="text-[10px] text-eco-blue bg-sky-50 px-1.5 py-0.5 rounded mt-1 font-semibold">
                    🤖 gemini-2.0-flash
                  </span>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex items-start">
                <div className="bg-eco-bg rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex gap-1 items-center">
                  {[0, 150, 300].map(d => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full bg-eco-muted animate-typing-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick replies */}
          {showQR && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {["🍕 Pizza boxes?", "🔋 Batteries", "🌊 Less plastic"].map(q => (
                <button
                  key={q}
                  onClick={() => sendMsg(q)}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full
                             border border-eco-border bg-white text-eco-muted
                             hover:border-eco-green hover:text-eco-green transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input row */}
          <div className="px-4 py-3 border-t border-eco-border flex gap-2 items-center">
            <input
              className="eco-input flex-1 text-sm"
              placeholder="Ask about recycling..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMsg(input)}
            />
            <button
              onClick={() => sendMsg(input)}
              className="w-9 h-9 rounded-xl bg-eco-gradient flex items-center justify-center
                         text-white text-sm border-none cursor-pointer hover:scale-105 transition-transform"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}