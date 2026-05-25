export default function Badge({ children, variant = "green" }) {
  const map = {
    green:  "badge-green",
    blue:   "badge-blue",
    yellow: "badge-yellow",
    red:    "badge-red",
    gray:   "badge-gray",
  };
  return <span className={map[variant] || "badge-gray"}>{children}</span>;
}