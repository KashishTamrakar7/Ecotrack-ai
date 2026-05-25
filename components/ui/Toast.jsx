"use client";

export default function Toast({ message }) {
  return (
    <div className="fixed bottom-7 left-1/2 z-[9999] animate-toast-in
                    -translate-x-1/2 bg-eco-dark text-white text-sm font-medium
                    px-6 py-3 rounded-xl shadow-eco-lg flex items-center gap-2
                    whitespace-nowrap pointer-events-none">
      {message}
    </div>
  );
}