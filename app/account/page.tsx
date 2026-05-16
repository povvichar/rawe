"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";

type Tab    = "login" | "register" | "forgot";
type View   = "profile" | "orders";

type User = {
  name: string;
  email: string;
  joinedDate: string;
  location: string;
};

const FAKE_USER: User = {
  name: "Sophea Meas",
  email: "sophea@raweofficail.com",
  joinedDate: "January 2025",
  location: "Phnom Penh, Cambodia",
};

const FAKE_ORDERS = [
  {
    id: "#RW-0031",
    date: "May 10, 2025",
    items: [
      { name: "Rosewood",     hex: "#A05870", qty: 1, price: 25 },
      { name: "Cotton Candy", hex: "#F2C5C0", qty: 1, price: 25 },
    ],
    total: 50,
    status: "Delivered",
    address: "St. 271, Phnom Penh",
  },
  {
    id: "#RW-0024",
    date: "Mar 22, 2025",
    items: [
      { name: "Cappucino", hex: "#C49A8A", qty: 1, price: 25 },
    ],
    total: 25,
    status: "Delivered",
    address: "St. 271, Phnom Penh",
  },
  {
    id: "#RW-0017",
    date: "Jan 5, 2025",
    items: [
      { name: "Champagne Glow", hex: "#D4B896", qty: 1, price: 25 },
      { name: "Plushing",       hex: "#E8A4A0", qty: 1, price: 25 },
      { name: "Spiced",         hex: "#D98C80", qty: 1, price: 25 },
    ],
    total: 75,
    status: "Delivered",
    address: "St. 271, Phnom Penh",
  },
];

const FAKE_EMAIL    = "sophea@raweofficail.com";
const FAKE_PASSWORD = "rawe2025";

const glassPanel = {
  background: "rgba(255,255,255,0.38)",
  backdropFilter: "blur(48px) saturate(180%)",
  WebkitBackdropFilter: "blur(48px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.55)",
} as React.CSSProperties;

const glassCard = {
  background: "rgba(255,255,255,0.50)",
  border: "1px solid rgba(255,255,255,0.70)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
} as React.CSSProperties;

const glassInput =
  "w-full rounded-none px-5 py-3.5 text-sm text-ink placeholder:text-mid/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-black/10 bg-white/50 border border-white/60 backdrop-blur-sm";

const statusStyle: Record<string, string> = {
  Delivered: "text-emerald-600 bg-emerald-50/80",
  Processing: "text-amber-600 bg-amber-50/80",
  Cancelled: "text-red-500 bg-red-50/80",
};

export default function AccountPage() {
  const ref   = useRef<HTMLElement>(null);
  const [tab,          setTab]          = useState<Tab>("login");
  const [view,         setView]         = useState<View>("profile");
  const [loginData,    setLoginData]    = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass,     setShowPass]     = useState(false);
  const [error,        setError]        = useState("");
  const [user,         setUser]         = useState<User | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [forgotEmail,  setForgotEmail]  = useState("");
  const [forgotSent,   setForgotSent]   = useState(false);

  useGSAP(() => {
    gsap.fromTo(".account-panel",
      { opacity: 0, y: 32, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", delay: 0.15 }
    );
    gsap.fromTo(".account-logo",
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.05 }
    );
  }, { scope: ref });

  const switchTab = (next: Tab) => {
    if (next === tab) return;
    setError("");
    gsap.to(".tab-content", {
      opacity: 0, y: 8, duration: 0.18, ease: "power2.in",
      onComplete: () => {
        setTab(next);
        gsap.fromTo(".tab-content", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" });
      },
    });
  };

  const switchView = (next: View) => {
    gsap.to(".view-content", {
      opacity: 0, x: next === "orders" ? -20 : 20, duration: 0.2, ease: "power2.in",
      onComplete: () => {
        setView(next);
        setExpandedOrder(null);
        gsap.fromTo(".view-content",
          { opacity: 0, x: next === "orders" ? 20 : -20 },
          { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
        );
      },
    });
  };

  const transitionToProfile = (u: User) => {
    gsap.to(".account-panel", {
      opacity: 0, y: -16, scale: 0.97, duration: 0.3, ease: "power2.in",
      onComplete: () => {
        setUser(u);
        gsap.fromTo(".account-panel",
          { opacity: 0, y: 20, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
        );
      },
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (loginData.email === FAKE_EMAIL && loginData.password === FAKE_PASSWORD) {
      transitionToProfile(FAKE_USER);
    } else {
      setError("Incorrect email or password.");
      gsap.fromTo(".account-panel", { x: -8 }, { x: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!registerData.name || !registerData.email || !registerData.password) { setError("Please fill in all fields."); return; }
    if (registerData.password !== registerData.confirm) { setError("Passwords don't match."); return; }
    transitionToProfile({
      name: registerData.name,
      email: registerData.email,
      joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      location: "Cambodia",
    });
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) { setError("Please enter your email."); return; }
    setError("");
    setForgotSent(true);
  };

  const handleSignOut = () => {
    gsap.to(".account-panel", {
      opacity: 0, y: 12, scale: 0.97, duration: 0.3, ease: "power2.in",
      onComplete: () => {
        setUser(null);
        setView("profile");
        setLoginData({ email: "", password: "" });
        setRegisterData({ name: "", email: "", password: "", confirm: "" });
        setError("");
        setTab("login");
        gsap.fromTo(".account-panel",
          { opacity: 0, y: 20, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
        );
      },
    });
  };

  const eyeOpen = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
  const eyeOff = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

  return (
    <main ref={ref} className="bg-hero min-h-screen flex flex-col items-center justify-center px-5 py-16 overflow-x-hidden">

      <p className="brand-watermark absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.05] text-[clamp(80px,18vw,260px)] font-display font-light tracking-[0.2em]">
        RAWE
      </p>

      <div className="relative z-10 w-full max-w-md">

        {!user && (
          <div className="account-logo flex justify-center mb-10">
            <Link href="/"><Image src="/assets/Logo.svg" alt="RAWE" width={88} height={28} priority /></Link>
          </div>
        )}

        <div className="account-panel rounded-none p-8 sm:p-10" style={glassPanel}>

          {user ? (
            <div className="view-content">

              {/* ── Profile view ── */}
              {view === "profile" && (
                <div className="space-y-5">

                  {/* Header */}
                  <div className="flex items-center gap-4 pb-6 border-b border-black/6">
                    <div
                      className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-3xl font-display text-ink"
                      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.5))", border: "1px solid rgba(255,255,255,0.9)"}}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-ink text-2xl leading-tight tracking-wide truncate">{user.name}</p>
                      <p className="text-xs text-mid/60 mt-1 tracking-[0.08em] truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Member Since", value: user.joinedDate },
                      { label: "Location",     value: user.location   },
                      { label: "Total Orders", value: `${FAKE_ORDERS.length} orders` },
                      { label: "Total Spent",  value: `$${FAKE_ORDERS.reduce((s, o) => s + o.total, 0)}.00` },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-none p-4 flex flex-col gap-1.5" style={glassCard}>
                        <span className="text-[9px] tracking-[0.3em] uppercase text-mid/50">{label}</span>
                        <span className="text-sm text-ink font-sans font-normal leading-tight">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Order History row — clickable */}
                  <button
                    onClick={() => switchView("orders")}
                    className="w-full flex items-center justify-between px-5 py-4 rounded-none group transition-all duration-200"
                    style={glassCard}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-none flex items-center justify-center" style={{ background: "rgba(0,0,0,0.05)" }}>
                        <Image src="/assets/shopping-history.svg" alt="" width={18} height={18} />
                      </div>
                      <div className="text-left">
                        <p className="font-sans text-sm text-ink tracking-wide">Order History</p>
                        <p className="text-[10px] text-mid/50 mt-0.5 tracking-[0.08em]">{FAKE_ORDERS.length} past orders</p>
                      </div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-mid/40 group-hover:text-ink group-hover:translate-x-0.5 transition-all duration-200">
                      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {/* Shop + sign out */}
                  <div className="space-y-2 pt-1">
                    <Link href="/#products" className="liquid-glass-btn w-full justify-center text-sm py-3">
                      Shop Collection
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full py-3 rounded-none text-[11px] tracking-[0.2em] uppercase text-mid/50 hover:text-red-500 transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}

              {/* ── Orders view ── */}
              {view === "orders" && (
                <div className="space-y-5">
                  {/* Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-black/6">
                    <button
                      onClick={() => switchView("profile")}
                      className="w-8 h-8 rounded-none flex items-center justify-center transition-colors hover:bg-black/5"
                      aria-label="Back to profile"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M10 3L5 8l5 5" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div>
                      <p className="font-display text-ink text-base leading-tight">Order History</p>
                      <p className="text-[10px] text-mid/60 mt-0.5 tracking-wide">{FAKE_ORDERS.length} orders · {user.name}</p>
                    </div>
                  </div>

                  {/* Orders list */}
                  <div className="space-y-2">
                    {FAKE_ORDERS.map((order) => {
                      const open = expandedOrder === order.id;
                      return (
                        <div key={order.id} className="rounded-none overflow-hidden" style={glassCard}>
                          {/* Row */}
                          <button
                            className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                            onClick={() => setExpandedOrder(open ? null : order.id)}
                          >
                            <div className="flex items-center gap-3">
                              {/* Shade dots */}
                              <div className="flex -space-x-1.5">
                                {order.items.slice(0, 3).map((item) => (
                                  <div key={item.name} className="w-5 h-5 rounded-none border-2 border-white flex-shrink-0" style={{ background: item.hex }} />
                                ))}
                              </div>
                              <div>
                                <p className="font-mono text-[11px] text-ink tracking-wider">{order.id}</p>
                                <p className="text-[10px] text-mid/60 mt-0.5">{order.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-sans text-sm font-medium text-ink">${order.total}.00</span>
                              <svg
                                width="12" height="12" viewBox="0 0 12 12" fill="none"
                                className={`text-mid/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                              >
                                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </button>

                          {/* Expanded detail */}
                          {open && (
                            <div className="px-4 pb-4 space-y-3 border-t border-black/5">
                              <div className="pt-3 space-y-2">
                                {order.items.map((item) => (
                                  <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                      <div className="w-4 h-4 rounded-none border border-white/80" style={{ background: item.hex }} />
                                      <span className="text-sm text-ink">{item.name}</span>
                                      <span className="text-[11px] text-mid/50">×{item.qty}</span>
                                    </div>
                                    <span className="text-sm font-sans font-medium text-ink">${item.price}.00</span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center justify-between pt-2 border-t border-black/5">
                                <div>
                                  <p className="text-[10px] tracking-[0.2em] uppercase text-mid/60">Delivered to</p>
                                  <p className="text-sm text-ink mt-0.5">{order.address}</p>
                                </div>
                                <span className={`text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-none ${statusStyle[order.status]}`}>
                                  {order.status}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          ) : (
            /* ── Auth view ── */
            <>
              {tab !== "forgot" && (
                <div className="flex rounded-none p-1 mb-8" style={{ background: "rgba(0,0,0,0.05)" }}>
                  {(["login", "register"] as Tab[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => switchTab(t)}
                      className="flex-1 py-2.5 rounded-none text-[11px] tracking-[0.2em] uppercase font-display transition-all duration-300"
                      style={
                        tab === t
                          ? { background: "rgba(255,255,255,0.85)", color: "#1a1a1a", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }
                          : { color: "#6b6b6b" }
                      }
                    >
                      {t === "login" ? "Sign In" : "Create Account"}
                    </button>
                  ))}
                </div>
              )}

              {error && <p className="text-[11px] text-red-500/80 text-center mb-4 tracking-wide">{error}</p>}

              <div className="tab-content">
                {tab === "forgot" ? (
                  forgotSent ? (
                    <div className="flex flex-col items-center text-center gap-4 py-4">
                      <div className="w-12 h-12 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.60)", border: "1px solid rgba(255,255,255,0.80)" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-display text-ink text-base tracking-wide">Check your inbox</p>
                        <p className="text-[11px] text-mid/60 mt-1.5 leading-relaxed">
                          We sent a reset link to<br />
                          <span className="text-ink font-mono">{forgotEmail}</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setForgotSent(false); setForgotEmail(""); switchTab("login"); }}
                        className="text-[11px] text-ink underline underline-offset-2 mt-2"
                      >
                        Back to sign in
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleForgot} className="space-y-5">
                      <div>
                        <p className="font-display text-ink text-base tracking-wide mb-1">Reset your password</p>
                        <p className="text-[11px] text-mid/60 leading-relaxed">Enter your email and we'll send you a link to reset your password.</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Email</label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className={glassInput}
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="liquid-glass-btn w-full justify-center text-sm py-3">Send Reset Link</button>
                      <button
                        type="button"
                        onClick={() => { setError(""); switchTab("login"); }}
                        className="w-full text-center text-[11px] text-mid/60 hover:text-ink transition-colors"
                      >
                        ← Back to sign in
                      </button>
                    </form>
                  )
                ) : tab === "login" ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Email</label>
                      <input type="email" placeholder="your@email.com" className={glassInput}
                        value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Password</label>
                      <div className="relative">
                        <input type={showPass ? "text" : "password"} placeholder="••••••••" className={glassInput + " pr-12"}
                          value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                        <button type="button" onClick={() => setShowPass(!showPass)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-mid/60 hover:text-ink transition-colors">
                          {showPass ? eyeOff : eyeOpen}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-[10px] text-mid/50 tracking-wide">
                        Hint: <span className="font-mono select-all">sophea / rawe2025</span>
                      </p>
                      <button type="button" onClick={() => { setError(""); setForgotSent(false); setForgotEmail(""); switchTab("forgot"); }} className="text-[11px] text-mid/60 hover:text-ink transition-colors">Forgot password?</button>
                    </div>
                    <button type="submit" className="liquid-glass-btn w-full justify-center mt-2 text-sm py-3">Sign In</button>
                    <p className="text-center text-[11px] text-mid/60 pt-1">
                      No account?{" "}
                      <button type="button" onClick={() => switchTab("register")} className="text-ink underline underline-offset-2">Create one</button>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Full Name</label>
                      <input type="text" placeholder="Your name" className={glassInput}
                        value={registerData.name} onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Email</label>
                      <input type="email" placeholder="your@email.com" className={glassInput}
                        value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Password</label>
                      <div className="relative">
                        <input type={showPass ? "text" : "password"} placeholder="At least 8 characters" className={glassInput + " pr-12"}
                          value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
                        <button type="button" onClick={() => setShowPass(!showPass)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-mid/60 hover:text-ink transition-colors">
                          {showPass ? eyeOff : eyeOpen}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Confirm Password</label>
                      <input type={showPass ? "text" : "password"} placeholder="Repeat password" className={glassInput}
                        value={registerData.confirm} onChange={(e) => setRegisterData({ ...registerData, confirm: e.target.value })} />
                    </div>
                    <button type="submit" className="liquid-glass-btn w-full justify-center mt-2 text-sm py-3">Create Account</button>
                    <p className="text-center text-[11px] text-mid/60 pt-1">
                      Already have an account?{" "}
                      <button type="button" onClick={() => switchTab("login")} className="text-ink underline underline-offset-2">Sign in</button>
                    </p>
                  </form>
                )}
              </div>
            </>
          )}
        </div>

        {!user && (
          <p className="text-center text-[10px] text-mid/50 mt-6 tracking-wide">
            By continuing, you agree to RAWE&apos;s{" "}
            <span className="underline underline-offset-2 cursor-pointer hover:text-ink transition-colors">Terms</span>
            {" "}&amp;{" "}
            <span className="underline underline-offset-2 cursor-pointer hover:text-ink transition-colors">Privacy Policy</span>.
          </p>
        )}
      </div>

    </main>
  );
}
