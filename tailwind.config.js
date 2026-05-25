/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "ui-sans-serif", "system-ui"],
        display: ["Syne", "ui-sans-serif"],
      },
      colors: {
        eco: {
          green:  "#00C97F",
          blue:   "#00A8E8",
          yellow: "#F9C74F",
          dark:   "#0D1F1A",
          bg:     "#F0F7F4",
          muted:  "#6B8C7E",
          border: "#DCE8E2",
          card:   "#FFFFFF",
        },
      },
      keyframes: {
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scanBeam: {
          "0%":   { top: "0%",   opacity: "1" },
          "100%": { top: "100%", opacity: "0.3" },
        },
        mapPing: {
          "0%":   { boxShadow: "0 0 0 0 rgba(0,168,232,.55)" },
          "100%": { boxShadow: "0 0 0 20px rgba(0,168,232,0)" },
        },
        liveFlash: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: ".35" },
        },
        floatUp: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-6px)" },
        },
        connDot: {
          "0%,100%": { backgroundColor: "#00C97F" },
          "50%":     { backgroundColor: "#80E8BF" },
        },
        typingBounce: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-4px)" },
        },
        slideChat: {
          from: { opacity: "0", transform: "translateY(20px) scale(.95)" },
          to:   { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        toastIn: {
          from: { opacity: "0", transform: "translate(-50%, 12px)" },
          to:   { opacity: "1", transform: "translate(-50%, 0)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: ".7" },
          "50%":     { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up":     "fadeInUp .3s ease both",
        "scan-beam":      "scanBeam 2s linear infinite",
        "map-ping":       "mapPing 2s ease-out infinite",
        "live-flash":     "liveFlash 1s ease-in-out infinite",
        "float-up":       "floatUp 3s ease-in-out infinite",
        "conn-dot":       "connDot 1.8s ease-in-out infinite",
        "typing-bounce":  "typingBounce .8s ease-in-out infinite",
        "slide-chat":     "slideChat .3s cubic-bezier(.34,1.56,.64,1) both",
        "toast-in":       "toastIn .3s ease both",
        "pulse-glow":     "pulseGlow .9s ease-in-out infinite",
      },
      boxShadow: {
        eco:    "0 4px 24px rgba(0,180,100,.08)",
        "eco-lg": "0 12px 48px rgba(0,0,0,.10)",
        "eco-glow": "0 6px 28px rgba(0,201,127,.5)",
      },
      borderRadius: {
        eco: "16px",
      },
    },
  },
  plugins: [],
};