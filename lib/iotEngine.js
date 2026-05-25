/**
 * iotEngine.js
 * Simulated IoT telemetry engine for Smart City Dashboard.
 * Emulates MQTT push from city-wide smart bins at 3-second intervals.
 *
 * In production, replace with:
 *   - Firebase Realtime Database onValue() listeners, OR
 *   - MQTT.js connecting to a broker (e.g. HiveMQ, Mosquitto)
 */

export const INITIAL_BINS = [
  { id: "bin247", label: "Bin #247 — Sector 7",     fill: 96, status: "critical" },
  { id: "bin112", label: "Bin #112 — Pandri",        fill: 81, status: "warn"     },
  { id: "bin089", label: "Bin #089 — Shankar Nagar", fill: 74, status: "warn"     },
  { id: "bin301", label: "Bin #301 — Mowa",          fill: 42, status: "ok"       },
  { id: "bin156", label: "Bin #156 — Amanaka",       fill: 28, status: "ok"       },
];

/**
 * Simulates one IoT telemetry tick — small fill fluctuation per bin.
 * @param {Array} bins - current bin state array
 * @returns {Array}    - updated bin state array
 */
export function iotTick(bins) {
  return bins.map((bin) => {
    const newFill = Math.max(5, Math.min(100, bin.fill + (Math.random() - 0.42) * 2));
    const pct     = Math.round(newFill);
    return {
      ...bin,
      fill:   newFill,
      status: pct >= 90 ? "critical" : pct >= 70 ? "warn" : "ok",
    };
  });
}

/** Returns the Tailwind colour class for a bin fill level. */
export function binColorClass(status) {
  if (status === "critical") return "bg-gradient-to-r from-red-400 to-rose-500";
  if (status === "warn")     return "bg-gradient-to-r from-amber-400 to-yellow-500";
  return "bg-gradient-to-r from-eco-green to-eco-blue";
}

/** Returns the text colour class for a bin fill label. */
export function binLabelClass(status) {
  if (status === "critical") return "text-rose-500";
  if (status === "warn")     return "text-amber-600";
  return "text-eco-green";
}