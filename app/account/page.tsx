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
  phone: string;
  joinedDate: string;
  location: string;
};

const FAKE_USER: User = {
  name: "Sophea Meas",
  email: "sophea@raweofficail.com",
  phone: "+855 12 345 678",
  joinedDate: "January 2025",
  location: "Phnom Penh, Cambodia",
};

const FAKE_ORDERS = [
  {
    id: "#RW-0031",
    date: "May 10, 2025",
    items: [
      { name: "Rosewood",     hex: "#A05870", img: "/assets/products/Rosewood.webp",     qty: 1, price: 25 },
      { name: "Cotton Candy", hex: "#F2C5C0", img: "/assets/products/Cotton candy.webp", qty: 1, price: 25 },
    ],
    subtotal: 50,
    shipping: 0,
    total: 50,
    status: "Processing",
    payment: "ABA Pay",
    tracking: "VET-984210773",
    address: "St. 271, Sangkat Tuol Tumpung, Phnom Penh",
    placedOn: "May 10, 2025 · 14:32",
    eta: "Arriving May 14, 2025",
  },
  {
    id: "#RW-0024",
    date: "Mar 22, 2025",
    items: [
      { name: "Cappucino", hex: "#C49A8A", img: "/assets/products/Cappucino.webp", qty: 1, price: 25 },
    ],
    subtotal: 25,
    shipping: 2,
    total: 27,
    status: "Delivered",
    payment: "Visa ···· 4291",
    tracking: "VET-771203984",
    address: "St. 271, Sangkat Tuol Tumpung, Phnom Penh",
    placedOn: "Mar 22, 2025 · 09:11",
    eta: "Delivered Mar 25, 2025",
  },
  {
    id: "#RW-0017",
    date: "Jan 5, 2025",
    items: [
      { name: "Champagne Glow", hex: "#D4B896", img: "/assets/products/Champagne glow.webp", qty: 1, price: 25 },
      { name: "Plushing",       hex: "#E8A4A0", img: "/assets/products/Plushing.webp",       qty: 1, price: 25 },
      { name: "Spiced",         hex: "#D98C80", img: "/assets/products/Spiced.webp",         qty: 1, price: 25 },
    ],
    subtotal: 75,
    shipping: 0,
    total: 75,
    status: "Delivered",
    payment: "ABA Pay",
    tracking: "VET-550118827",
    address: "St. 271, Sangkat Tuol Tumpung, Phnom Penh",
    placedOn: "Jan 5, 2025 · 18:47",
    eta: "Delivered Jan 9, 2025",
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
  const [registerData, setRegisterData] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPass,     setShowPass]     = useState(false);
  const [error,        setError]        = useState("");
  const [user,         setUser]         = useState<User | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [forgotEmail,  setForgotEmail]  = useState("");
  const [forgotSent,   setForgotSent]   = useState(false);
  const [editing,      setEditing]      = useState(false);
  const [editData,     setEditData]     = useState({ name: "", email: "", phone: "", location: "" });
  const [savedMsg,     setSavedMsg]     = useState(false);
  const [signOutOpen,  setSignOutOpen]  = useState(false);
  const savedTimer = useRef<ReturnType<typeof setTimeout>>();

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
    if (!registerData.name || !registerData.email || !registerData.phone || !registerData.password) { setError("Please fill in all fields."); return; }
    if (registerData.password !== registerData.confirm) { setError("Passwords don't match."); return; }
    transitionToProfile({
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      location: "Cambodia",
    });
  };

  const buildInvoiceHTML = (order: (typeof FAKE_ORDERS)[number], logoSvg: string) => {
    const rows = order.items
      .map(
        (i) =>
          `<tr><td>${i.name}<span class="muted"> · Blush Stick</span></td><td class="c">${i.qty}</td><td class="r">$${i.price}.00</td><td class="r">$${i.price * i.qty}.00</td></tr>`
      )
      .join("");
    return `<!doctype html><html><head><meta charset="utf-8"><title>Invoice ${order.id} · RAWE</title>
<style>
*{box-sizing:border-box}body{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;margin:0;padding:48px;background:#fff}
.wrap{max-width:640px;margin:0 auto}
.top{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid #eee;padding-bottom:24px}
.logo svg{height:38px;width:auto;display:block}
.tag{font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:#999;margin-top:6px}
.meta{font-size:12px;color:#666;text-align:right;line-height:1.7}
.sec{margin-top:28px;font-size:13px;line-height:1.7}
.lbl{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#999;margin-bottom:2px}
table{width:100%;border-collapse:collapse;margin-top:24px;font-size:13px}
th{text-align:left;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:#999;border-bottom:1px solid #eee;padding:8px 0}
td{padding:10px 0;border-bottom:1px solid #f3f3f3}
.c{text-align:center}.r{text-align:right}.muted{color:#aaa}
.tot{margin-top:18px;margin-left:auto;width:240px;font-size:13px}
.tot div{display:flex;justify-content:space-between;padding:5px 0}
.tot .grand{border-top:1px solid #ddd;margin-top:6px;padding-top:10px;font-weight:600;font-size:15px}
.foot{margin-top:48px;text-align:center;font-size:11px;color:#aaa;letter-spacing:.1em}
@media print{body{padding:24px}.noprint{display:none}}
button{font:inherit;padding:10px 22px;border:1px solid #1a1a1a;background:#1a1a1a;color:#fff;cursor:pointer;letter-spacing:.15em;text-transform:uppercase;font-size:11px}
</style></head><body><div class="wrap">
<div class="top">
  <div><div class="logo">${logoSvg}</div><div class="tag" style="margin-top:10px">Invoice</div></div>
  <div class="meta"><strong>${order.id}</strong><br>${order.placedOn}<br>Status: ${order.status}</div>
</div>
<div class="sec" style="display:flex;justify-content:space-between;gap:32px">
  <div><div class="lbl">Billed To</div>${user ? user.name : ""}<br>${user ? user.email : ""}<br>${user ? user.phone : ""}</div>
  <div style="text-align:right"><div class="lbl">Ship To</div>${order.address}<br>${order.eta}</div>
</div>
<table><thead><tr><th>Item</th><th class="c">Qty</th><th class="r">Price</th><th class="r">Amount</th></tr></thead><tbody>${rows}</tbody></table>
<div class="tot">
  <div><span>Subtotal</span><span>$${order.subtotal}.00</span></div>
  <div><span>Shipping</span><span>${order.shipping === 0 ? "Free" : `$${order.shipping}.00`}</span></div>
  <div><span>Payment</span><span>${order.payment}</span></div>
  <div class="grand"><span>Total</span><span>$${order.total}.00</span></div>
</div>
<div class="foot">Thank you for shopping with RAWE · raweofficail.com<br>Tracking: ${order.tracking}</div>
<div class="noprint" style="text-align:center;margin-top:32px"><button onclick="window.print()">Print / Save as PDF</button></div>
</div></body></html>`;
  };

  const fetchLogo = async () => {
    try {
      const res = await fetch("/assets/Logo.svg");
      return res.ok ? await res.text() : "RAWE";
    } catch {
      return "RAWE";
    }
  };

  const viewInvoice = async (order: (typeof FAKE_ORDERS)[number]) => {
    const w = window.open("", "_blank");
    const logo = await fetchLogo();
    if (w) { w.document.write(buildInvoiceHTML(order, logo)); w.document.close(); }
  };

  const downloadInvoice = async (order: (typeof FAKE_ORDERS)[number]) => {
    const logo = await fetchLogo();
    const blob = new Blob([buildInvoiceHTML(order, logo)], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RAWE-Invoice-${order.id.replace("#", "")}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) { setError("Please enter your email."); return; }
    setError("");
    setForgotSent(true);
  };

  const startEditing = () => {
    if (!user) return;
    setEditData({ name: user.name, email: user.email, phone: user.phone, location: user.location });
    setEditing(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData.name.trim() || !editData.email.trim()) {
      setError("Name and email can't be empty.");
      return;
    }
    setError("");
    setUser((prev) => prev && {
      ...prev,
      name: editData.name.trim(),
      email: editData.email.trim(),
      phone: editData.phone.trim() || prev.phone,
      location: editData.location.trim() || prev.location,
    });
    setEditing(false);
    setSavedMsg(true);
    clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleSignOut = () => {
    setSignOutOpen(false);
    setEditing(false);
    gsap.to(".account-panel", {
      opacity: 0, y: 12, scale: 0.97, duration: 0.3, ease: "power2.in",
      onComplete: () => {
        setUser(null);
        setView("profile");
        setLoginData({ email: "", password: "" });
        setRegisterData({ name: "", email: "", phone: "", password: "", confirm: "" });
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

      <p className="brand-watermark absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0] text-[clamp(80px,18vw,260px)] font-display font-light tracking-[0.2em]">
        RAWE
      </p>

      <div className={`relative z-10 w-full transition-[max-width] duration-500 ${user ? "max-w-3xl" : "max-w-md"}`}>

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
                editing ? (
                <form onSubmit={handleSaveProfile} className="space-y-5">

                  {/* Edit header */}
                  <div className="flex items-center justify-between pb-4 border-b border-black/6">
                    <p className="font-display text-ink text-lg tracking-wide">Edit Profile</p>
                    <button
                      type="button"
                      onClick={() => { setEditing(false); setError(""); }}
                      className="text-[11px] tracking-[0.15em] uppercase text-mid/50 hover:text-ink transition-colors"
                    >
                      Cancel
                    </button>
                  </div>

                  {error && <p className="text-[11px] text-red-500/80 text-center tracking-wide">{error}</p>}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Full Name</label>
                      <input type="text" className={glassInput} value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Email</label>
                      <input type="email" className={glassInput} value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Phone Number</label>
                      <input type="tel" className={glassInput} value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Location</label>
                      <input type="text" className={glassInput} value={editData.location}
                        onChange={(e) => setEditData({ ...editData, location: e.target.value })} />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button type="submit" className="liquid-glass-btn flex-1 justify-center text-sm py-3">
                      Save Changes
                    </button>
                  </div>
                </form>
                ) : (
                <div className="space-y-5">

                  {savedMsg && (
                    <div
                      className="flex items-center gap-2.5 px-4 py-3 rounded-none text-emerald-700"
                      style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.30)" }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      <span className="text-[12px] tracking-wide">Profile updated successfully.</span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-center gap-5 pb-7 border-b border-black/6">
                    <div
                      className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center text-3xl font-display text-ink"
                      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.5))", border: "1px solid rgba(255,255,255,0.9)"}}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-ink text-2xl leading-tight tracking-wide break-words">{user.name}</p>
                      <p className="text-sm text-mid/60 mt-1.5 tracking-[0.04em] break-all">{user.email}</p>
                    </div>
                    <button
                      onClick={startEditing}
                      className="self-start flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-none text-[10px] tracking-[0.15em] uppercase text-mid/60 hover:text-ink transition-colors"
                      style={glassCard}
                      aria-label="Edit profile"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                      </svg>
                      Edit
                    </button>
                  </div>

                  {/* Info list */}
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {[
                      { label: "Phone",        value: user.phone,                      icon: "/assets/phone-call.svg" },
                      { label: "Location",     value: user.location,                   icon: "/assets/location.svg"   },
                      { label: "Member Since", value: user.joinedDate,                 icon: "/assets/calendar.svg"   },
                      { label: "Total Orders", value: `${FAKE_ORDERS.length} orders`,  icon: "/assets/cart.svg"       },
                    ].map(({ label, value, icon }) => (
                      <div key={label} className="rounded-none p-5 flex items-center gap-4" style={glassCard}>
                        <div className="w-10 h-10 rounded-none flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.05)" }}>
                          <Image src={icon} alt="" width={18} height={18} className="opacity-70" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] tracking-[0.3em] uppercase text-mid/50">{label}</p>
                          <p className="text-base text-ink font-sans font-normal leading-snug mt-1 break-words">{value}</p>
                        </div>
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
                        <Image src="/assets/cart-large.svg" alt="" width={20} height={20} className="opacity-70" />
                      </div>
                      <div className="text-left">
                        <p className="font-sans text-sm text-ink tracking-wide">Order History</p>
                        <p className="text-[11px] text-mid/50 mt-0.5 tracking-[0.08em]">{FAKE_ORDERS.length} past orders</p>
                      </div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-mid/40 group-hover:text-ink group-hover:translate-x-0.5 transition-all duration-200">
                      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {/* Shop + sign out */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <Link href="/#products" className="liquid-glass-btn flex-1 justify-center text-sm py-3">
                      Shop Collection
                    </Link>
                    <button
                      onClick={() => setSignOutOpen(true)}
                      className="sm:w-44 py-3 rounded-none text-[11px] tracking-[0.2em] uppercase text-red-500 hover:text-red-700 transition-colors duration-200"
                      style={glassCard}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
                )
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
                      <p className="text-[11px] text-mid/60 mt-0.5 tracking-wide">{FAKE_ORDERS.length} orders · {user.name}</p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Orders",   value: `${FAKE_ORDERS.length}` },
                      { label: "Items",    value: `${FAKE_ORDERS.reduce((s, o) => s + o.items.reduce((n, i) => n + i.qty, 0), 0)}` },
                      { label: "Spent",    value: `$${FAKE_ORDERS.reduce((s, o) => s + o.total, 0)}` },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-none px-3 py-3 flex flex-col gap-1 items-center" style={glassCard}>
                        <span className="font-sans text-ink text-xl leading-none">{value}</span>
                        <span className="text-[9px] tracking-[0.25em] uppercase text-mid/50">{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Orders list */}
                  <div className="space-y-2">
                    {FAKE_ORDERS.map((order) => {
                      const open = expandedOrder === order.id;
                      const itemCount = order.items.reduce((n, i) => n + i.qty, 0);
                      return (
                        <div key={order.id} className="rounded-none overflow-hidden" style={glassCard}>
                          {/* Row */}
                          <button
                            className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                            onClick={() => setExpandedOrder(open ? null : order.id)}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Order icon */}
                              <div className="w-9 h-9 rounded-none flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,0,0,0.05)" }}>
                                <Image src="/assets/cart.svg" alt="" width={16} height={16} className="opacity-60" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-mono text-[11px] text-ink tracking-wider">{order.id}</p>
                                  <span className={`text-[8px] tracking-[0.12em] uppercase px-1.5 py-0.5 rounded-none ${statusStyle[order.status]}`}>
                                    {order.status}
                                  </span>
                                </div>
                                <p className="text-[10px] text-mid/60 mt-0.5">{order.date} · {itemCount} item{itemCount > 1 ? "s" : ""}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
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
                            <div className="px-4 pb-4 space-y-4 border-t border-black/5">

                              {/* Items */}
                              <div className="pt-3 space-y-2.5">
                                {order.items.map((item) => (
                                  <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                      <div className="w-10 h-10 rounded-none border border-white/80 flex-shrink-0 overflow-hidden bg-white/50">
                                        <Image src={item.img} alt={item.name} width={40} height={40} className="w-full h-full object-cover" />
                                      </div>
                                      <div>
                                        <p className="text-sm text-ink leading-tight">{item.name}</p>
                                        <p className="text-[10px] text-mid/50 mt-0.5">Blush Stick · Qty {item.qty}</p>
                                      </div>
                                    </div>
                                    <span className="text-sm font-sans font-medium text-ink">${item.price}.00</span>
                                  </div>
                                ))}
                              </div>

                              {/* Price breakdown */}
                              <div className="space-y-1.5 pt-3 border-t border-black/5 text-[12px]">
                                <div className="flex justify-between text-mid/70">
                                  <span>Subtotal</span><span>${order.subtotal}.00</span>
                                </div>
                                <div className="flex justify-between text-mid/70">
                                  <span>Shipping</span>
                                  <span>{order.shipping === 0 ? "Free" : `$${order.shipping}.00`}</span>
                                </div>
                                <div className="flex justify-between text-ink font-medium pt-1.5 border-t border-black/5">
                                  <span>Total</span><span>${order.total}.00</span>
                                </div>
                              </div>

                              {/* Meta */}
                              <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3 border-t border-black/5">
                                <div>
                                  <p className="text-[9px] tracking-[0.2em] uppercase text-mid/50">Payment</p>
                                  <p className="text-[12px] text-ink mt-0.5">{order.payment}</p>
                                </div>
                                <div>
                                  <p className="text-[9px] tracking-[0.2em] uppercase text-mid/50">Tracking No.</p>
                                  <p className="text-[12px] text-ink mt-0.5 font-mono">{order.tracking}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-[9px] tracking-[0.2em] uppercase text-mid/50">Shipping Address</p>
                                  <p className="text-[12px] text-ink mt-0.5">{order.address}</p>
                                </div>
                                <div>
                                  <p className="text-[9px] tracking-[0.2em] uppercase text-mid/50">Placed</p>
                                  <p className="text-[12px] text-ink mt-0.5">{order.placedOn}</p>
                                </div>
                                <div>
                                  <p className="text-[9px] tracking-[0.2em] uppercase text-mid/50">Delivery</p>
                                  <p className="text-[12px] text-ink mt-0.5">{order.eta}</p>
                                </div>
                              </div>

                              {/* Invoice actions */}
                              <div className="flex gap-2 pt-3 border-t border-black/5">
                                <button
                                  onClick={() => viewInvoice(order)}
                                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-none text-[10px] tracking-[0.18em] uppercase text-ink transition-colors hover:bg-black/5"
                                  style={glassCard}
                                >
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                                  </svg>
                                  View Invoice
                                </button>
                                <button
                                  onClick={() => downloadInvoice(order)}
                                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-none text-[10px] tracking-[0.18em] uppercase text-ink transition-colors hover:bg-black/5"
                                  style={glassCard}
                                >
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                                  </svg>
                                  Download
                                </button>
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
                      <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Phone Number</label>
                      <input type="tel" placeholder="+855 12 345 678" className={glassInput}
                        value={registerData.phone} onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })} />
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

      {/* Sign out confirmation modal */}
      {signOutOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          role="dialog"
          aria-modal="true"
          onClick={() => setSignOutOpen(false)}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-sm rounded-none p-8 text-center"
            style={glassPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-12 h-12 mx-auto rounded-none flex items-center justify-center mb-5"
              style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.25)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <p className="font-display text-ink text-xl tracking-wide">Sign out?</p>
            <p className="text-[13px] text-mid/70 mt-2 leading-relaxed">
              You&apos;ll need to sign in again to access your account.
            </p>
            <div className="flex gap-2 mt-7">
              <button
                onClick={() => setSignOutOpen(false)}
                className="flex-1 py-3 rounded-none text-[11px] tracking-[0.2em] uppercase text-ink transition-colors hover:bg-black/5"
                style={glassCard}
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 py-3 rounded-none text-[11px] tracking-[0.2em] uppercase text-white transition-colors"
                style={{ background: "#ef4444" }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
