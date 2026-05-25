"use client";

const NOTIFICATIONS = [
  { unread: true,  text: "🏆 You ranked #12 globally this week!",          time: "2 min ago" },
  { unread: true,  text: "♻️ Plastic-Free Week ends in 2 days",             time: "1 hr ago"  },
  { unread: true,  text: "🌱 You earned the Green Warrior badge!",          time: "3 hrs ago" },
  { unread: false, text: "📍 New recycling center opened 1.2km away",       time: "Yesterday" },
  { unread: false, text: "🏙️ Smart Bin #247 nearing capacity",              time: "Yesterday" },
];

export default function Topbar({ title, subtitle, navigate, notifOpen, setNotifOpen, showToast }) {
  return (
    <>
      {/* Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-eco-border px-8 h-16 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-xl font-bold text-eco-dark">{title}</h1>
          <p className="text-xs text-eco-muted mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Firebase synced indicator */}
          <div className="hidden sm:flex items-center gap-1.5 bg-eco-green/10 border border-eco-green/20 rounded-full px-3 py-1 text-[11px] font-semibold text-eco-green">
            <span className="w-1.5 h-1.5 rounded-full bg-eco-green animate-conn-dot" />
            Firestore Synced
          </div>

          {/* Notifications */}
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-10 h-10 rounded-xl bg-white border border-eco-border flex items-center justify-center text-lg hover:shadow-eco transition-all"
          >
            🔔
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 border-2 border-white" />
          </button>

          {/* Avatar */}
          <button
            onClick={() => navigate("rewards")}
            className="w-10 h-10 rounded-xl bg-eco-gradient flex items-center justify-center text-white font-bold text-sm hover:shadow-eco-glow transition-all"
          >
            AK
          </button>
        </div>
      </header>

      {/* Notification slide panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[340px] bg-white border-l border-eco-border z-50
                    shadow-eco-lg p-6 overflow-y-auto transition-transform duration-300 ease-in-out
                    ${notifOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-display text-base font-bold">Notifications</h2>
          <button
            onClick={() => setNotifOpen(false)}
            className="text-eco-muted hover:text-eco-dark text-xl leading-none"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-0">
          {NOTIFICATIONS.map((n, i) => (
            <div key={i} className="flex gap-2.5 items-start py-3 border-b border-eco-border">
              <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${n.unread ? "bg-eco-green" : "bg-transparent"}`} />
              <div>
                <p className={`text-sm leading-snug ${n.unread ? "font-semibold" : ""}`}>{n.text}</p>
                <p className="text-[11px] text-eco-muted mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay to close panel */}
      {notifOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/10"
          onClick={() => setNotifOpen(false)}
        />
      )}
    </>
  );
}