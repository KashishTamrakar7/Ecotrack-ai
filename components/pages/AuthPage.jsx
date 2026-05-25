"use client";

import { useState } from "react";

export default function AuthPage({ navigate, showToast }) {
  const [isLogin,  setIsLogin]  = useState(true);
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [name,     setName]     = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleEmail = () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6)  { setError("Password must be at least 6 characters."); return; }
    setError(""); setLoading(true);
    /* PRODUCTION: signInWithEmailAndPassword / createUserWithEmailAndPassword */
    setTimeout(() => {
      setLoading(false);
      showToast("✅ Signed in — Firestore syncing...");
      navigate("dashboard");
    }, 1500);
  };

  const handleGoogle = () => {
    setLoading(true);
    /* PRODUCTION: signInWithPopup(auth, new GoogleAuthProvider()) */
    setTimeout(() => {
      setLoading(false);
      showToast("✅ Google sign-in successful!");
      navigate("dashboard");
    }, 1300);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="flex-1 bg-dark-gradient hidden lg:flex flex-col justify-center items-center p-16 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute w-80 h-80 rounded-full opacity-15 -top-20 -left-20" style={{background:"#00C97F"}} />
        <div className="absolute w-52 h-52 rounded-full opacity-15 bottom-10 -right-10" style={{background:"#00A8E8"}} />
        <div className="absolute w-28 h-28 rounded-full opacity-15" style={{background:"#F9C74F",top:"40%",left:"60%"}} />
        <div className="relative z-10 text-center text-white">
          <div className="text-6xl mb-4 animate-float-up">🌍</div>
          <h1 className="font-display text-3xl font-extrabold mb-2">Recycle Smarter.</h1>
          <h2 className="font-display text-3xl font-extrabold text-eco-green">Live Greener.</h2>
          <p className="text-sm opacity-60 mt-3 max-w-xs mx-auto leading-relaxed">
            AI-powered sustainability platform. Powered by Gemini, Firebase & Google Maps.
          </p>
          <div className="flex gap-6 justify-center mt-8">
            {[["50K+","Eco Warriors"],["2.4M","Items Recycled"],["18t","CO₂ Saved"]].map(([v,l]) => (
              <div key={l} className="text-center">
                <p className="font-display text-2xl font-extrabold">{v}</p>
                <p className="text-xs opacity-60">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-[460px] flex flex-col justify-center px-10 py-12 bg-white">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-eco-gradient flex items-center justify-center text-lg">🌿</div>
          <span className="font-display text-base font-bold">EcoTrack AI</span>
        </div>

        <h2 className="font-display text-3xl font-extrabold mb-1">
          {isLogin ? "Welcome back" : "Create account"}
        </h2>
        <p className="text-sm text-eco-muted mb-7">
          {isLogin ? "Sign in to continue your eco journey" : "Join 50,000+ eco warriors"}
        </p>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 rounded-xl px-4 py-2.5 text-sm mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="text-xs font-semibold text-eco-dark mb-1.5 block">Full Name</label>
              <input className="eco-input" type="text" placeholder="Alex Kumar" value={name} onChange={e=>setName(e.target.value)} />
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-eco-dark mb-1.5 block">Email address</label>
            <input className="eco-input" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-eco-dark mb-1.5 block">Password</label>
            <input className="eco-input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleEmail()} />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-4 text-eco-muted text-sm">
            {/* Use Tailwind animate-spin — no inline keyframes */}
            <div className="w-5 h-5 border-2 border-eco-border border-t-eco-green rounded-full animate-spin" />
            Connecting to Firebase...
          </div>
        ) : (
          <button className="btn-primary justify-center mt-5 w-full" onClick={handleEmail}>
            {isLogin ? "🌱 Sign In" : "🚀 Create Account"}
          </button>
        )}

        <div className="flex items-center gap-3 my-4 text-eco-muted text-sm">
          <hr className="flex-1 border-eco-border" />or<hr className="flex-1 border-eco-border" />
        </div>

        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl
                     border-[1.5px] border-eco-border bg-white text-sm font-semibold
                     hover:bg-eco-bg hover:border-eco-green transition-all duration-200"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"/>
            <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-1.5 mt-4 text-[11px] text-eco-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-eco-green animate-conn-dot" />
          Secured by Firebase Auth · OAuth 2.0
        </div>

        <p className="text-sm text-eco-muted text-center mt-5">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => { setIsLogin(!isLogin); setError(""); }} className="text-eco-green font-semibold">
            {isLogin ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}