export default function ProgressBar({ value = 0, color = "eco" }) {
  const fill = color === "yellow"
    ? "bg-gradient-to-r from-amber-400 to-yellow-500"
    : color === "purple"
    ? "bg-gradient-to-r from-violet-500 to-purple-600"
    : "bg-eco-gradient";

  return (
    <div className="progress-bar">
      <div
        className={`progress-fill ${fill}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}