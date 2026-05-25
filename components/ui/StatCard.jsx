"use client";

const ACCENT = {
  green:  { text: "text-eco-green",  before: "before:bg-eco-green"  },
  blue:   { text: "text-eco-blue",   before: "before:bg-eco-blue"   },
  yellow: { text: "text-amber-600",  before: "before:bg-amber-400"  },
  red:    { text: "text-rose-500",   before: "before:bg-rose-400"   },
};

export default function StatCard({ icon, label, value, change, color = "green" }) {
  const { text, before } = ACCENT[color] || ACCENT.green;
  return (
    <div className={`eco-card relative overflow-hidden before:content-[''] before:absolute before:top-0 before:right-0 before:w-20 before:h-20 before:rounded-bl-full before:opacity-[.07] ${before}`}>
      <p className="text-[28px] mb-2">{icon}</p>
      <p className="text-xs font-semibold uppercase tracking-wider text-eco-muted mb-2">{label}</p>
      <p className={`font-display text-[28px] font-extrabold leading-none ${text}`}>{value}</p>
      {change && <p className="text-xs text-eco-muted mt-1.5">{change}</p>}
    </div>
  );
}