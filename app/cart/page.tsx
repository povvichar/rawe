"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/cart";

const shadeImg: Record<string, string> = {
  "Rosewood":       "/assets/products/Rosewood.webp",
  "Cotton Candy":   "/assets/products/Cotton candy.webp",
  "Champagne Glow": "/assets/products/Champagne glow.webp",
  "Cappuccino":     "/assets/products/Cappucino.webp",
  "Plushing":       "/assets/products/Plushing.webp",
  "Rosy Posy":      "/assets/products/Rosy Posy.webp",
  "Spiced":         "/assets/products/Spiced.webp",
  "Summer Orange":  "/assets/products/Summer orange.webp",
};

const SHIPPING = 4.99;

type Step = "bag" | "shipping" | "payment";

export default function CartPage() {
  const { items, remove, changeQty } = useCart();
  const [step, setStep] = useState<Step>("bag");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", province: "", zip: "",
  });
  const [payMethod, setPayMethod] = useState<"khqr" | "aba">("khqr");

  const subtotal = items.reduce((s, i) => s + i.priceUSD * i.qty, 0);
  const total    = subtotal + (items.length > 0 ? SHIPPING : 0);
  const count    = items.reduce((s, i) => s + i.qty, 0);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const glassPanel = {
    background: "rgba(255,255,255,0.38)",
    backdropFilter: "blur(48px) saturate(180%)",
    WebkitBackdropFilter: "blur(48px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.55)",
   
  } as React.CSSProperties;

  const inputCls = "w-full px-4 py-3 rounded-none text-sm text-ink bg-white/60 border border-white/70 outline-none focus:border-ink/30 focus:bg-white/80 transition-all duration-200 placeholder:text-mid/60";

  /* ── Steps indicator ── */
  const steps: Step[] = ["bag", "shipping", "payment"];
  const stepLabel: Record<Step, string> = { bag: "Bag", shipping: "Shipping", payment: "Payment" };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-hero pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">

          {/* Header */}
          <div className="mb-10 text-center">
            <p className="text-[10px] tracking-[0.35em] uppercase text-mid mb-1">RAWE</p>
            <h1 className="font-display text-3xl sm:text-4xl font-light text-ink">Checkout</h1>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-0 mb-10">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => step !== "bag" && s !== "payment" && setStep(s)}
                  className={`flex items-center gap-2 text-xs tracking-[0.15em] uppercase transition-colors duration-200 ${step === s ? "text-ink" : steps.indexOf(step) > i ? "text-mid hover:text-ink" : "text-mid/40"}`}
                >
                  <span
                    className={`w-5 h-5 rounded-none flex items-center justify-center text-[10px] transition-all duration-300 ${step === s ? "bg-ink text-white" : steps.indexOf(step) > i ? "bg-ink/20 text-ink" : "bg-ink/8 text-mid/40"}`}
                  >
                    {steps.indexOf(step) > i ? "✓" : i + 1}
                  </span>
                  {stepLabel[s]}
                </button>
                {i < steps.length - 1 && (
                  <span className="mx-3 w-8 h-px bg-ink/15" />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* ── Left: Step content ── */}
            <div className="w-full lg:flex-1">

              {/* ── Step 1: Bag ── */}
              {step === "bag" && (
                <div className="rounded-none overflow-hidden" style={glassPanel}>
                  <div className="px-6 py-5 border-b border-ink/0.1">
                    <span className="font-display text-ink text-lg tracking-wide">My Bag</span>
                    {count > 0 && <span className="ml-2 text-xs text-mid">· {count} {count === 1 ? "item" : "items"}</span>}
                  </div>

                  {items.length === 0 ? (
                    <div className="px-6 py-16 text-center">
                      <p className="text-mid text-sm mb-4">Your bag is empty.</p>
                      <Link href="/#products" className="liquid-glass-btn text-sm">Shop Now</Link>
                    </div>
                  ) : (
                    <ul>
                      {items.map((item, idx) => (
                        <li
                          key={item.shadeId}
                          className="flex items-center gap-4 px-6 py-4"
                          style={{ borderBottom: idx < items.length - 1 ? "1px solid rgba(255,255,255,0.35)" : "none" }}
                        >
                          {/* Image */}
                          <div className="relative flex-shrink-0 w-16 h-16 rounded-none overflow-hidden bg-[#f9f9f9]">
                            {shadeImg[item.name]
                              ? <Image src={shadeImg[item.name]} alt={item.name} fill className="object-cover" sizes="64px" />
                              : <div className="w-full h-full" style={{ background: item.hex }} />
                            }
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-ink text-sm">{item.name}</p>
                            <p className="text-mid text-xs mt-0.5">Creamy Blush Stick</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button onClick={() => changeQty(item.shadeId, -1)} className="w-6 h-6 rounded-none text-ink text-xs flex items-center justify-center hover:scale-110 transition-transform" style={{ background: "rgba(255,255,255,0.60)", border: "1px solid rgba(255,255,255,0.70)" }}>−</button>
                              <span className="text-ink text-xs w-5 text-center">{item.qty}</span>
                              <button onClick={() => changeQty(item.shadeId, 1)} className="w-6 h-6 rounded-none text-ink text-xs flex items-center justify-center hover:scale-110 transition-transform" style={{ background: "rgba(255,255,255,0.60)", border: "1px solid rgba(255,255,255,0.70)" }}>+</button>
                            </div>
                          </div>

                          {/* Price + remove */}
                          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                            <span className="font-sans text-ink text-sm font-medium">${(item.priceUSD * item.qty).toFixed(2)}</span>
                            <button onClick={() => remove(item.shadeId)} className="text-[10px] text-mid hover:text-ink transition-colors">Remove</button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {items.length > 0 && (
                    <div className="px-6 py-4">
                      <button
                        onClick={() => setStep("shipping")}
                        className="liquid-glass-btn w-full justify-center py-3.5 text-sm"
                      >
                        Continue to Shipping
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ── Step 2: Shipping ── */}
              {step === "shipping" && (
                <div className="rounded-none overflow-hidden" style={glassPanel}>
                  <div className="px-6 py-5 border-b border-white/40 flex items-center gap-3">
                    <button onClick={() => setStep("bag")} className="text-xs text-mid hover:text-ink transition-colors duration-200 tracking-[0.1em] uppercase">←</button>
                    <span className="font-display text-ink text-lg tracking-wide">Shipping Details</span>
                  </div>
                  <div className="px-6 py-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-mid block mb-1.5">First Name</label>
                        <input className={inputCls} placeholder="Sophea" value={form.firstName} onChange={set("firstName")} />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-mid block mb-1.5">Last Name</label>
                        <input className={inputCls} placeholder="Chan" value={form.lastName} onChange={set("lastName")} />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase text-mid block mb-1.5">Email</label>
                      <input className={inputCls} type="email" placeholder="sophea@email.com" value={form.email} onChange={set("email")} />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase text-mid block mb-1.5">Phone</label>
                      <input className={inputCls} type="tel" placeholder="+855 12 345 678" value={form.phone} onChange={set("phone")} />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase text-mid block mb-1.5">Address</label>
                      <input className={inputCls} placeholder="Street address" value={form.address} onChange={set("address")} />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-1">
                        <label className="text-[10px] tracking-[0.2em] uppercase text-mid block mb-1.5">City</label>
                        <input className={inputCls} placeholder="Phnom Penh" value={form.city} onChange={set("city")} />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-mid block mb-1.5">Province</label>
                        <input className={inputCls} placeholder="PP" value={form.province} onChange={set("province")} />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-mid block mb-1.5">ZIP</label>
                        <input className={inputCls} placeholder="12000" value={form.zip} onChange={set("zip")} />
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <button onClick={() => setStep("payment")} className="liquid-glass-btn w-full justify-center py-3.5 text-sm">Continue to Payment</button>
                  </div>
                </div>
              )}

              {/* ── Step 3: Payment ── */}
              {step === "payment" && (
                <div className="rounded-none overflow-hidden" style={glassPanel}>
                  <div className="px-6 py-5 border-b border-white/40 flex items-center gap-3">
                    <button onClick={() => setStep("shipping")} className="text-xs text-mid hover:text-ink transition-colors duration-200 tracking-[0.1em] uppercase">←</button>
                    <span className="font-display text-ink text-lg tracking-wide">Payment</span>
                  </div>

                  {/* Method tabs */}
                  <div className="flex gap-3 px-6 pt-5">
                    {(["khqr", "aba"] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setPayMethod(m)}
                        className={`flex-1 py-3 rounded-none flex items-center justify-center gap-2 transition-all duration-200 ${payMethod === m ? "bg-ink" : "hover:bg-white/60"}`}
                        style={payMethod !== m ? { background: "rgba(255,255,255,0.40)", border: "1px solid rgba(255,255,255,0.60)" } : {}}
                      >
                        <Image
                          src={m === "khqr" ? "/assets/KHQR.png" : "/assets/ABA.png"}
                          alt=""
                          width={m === "khqr" ? 48 : 44}
                          height={20}
                          className="object-contain"
                        />
                        <span className={`text-xs tracking-[0.15em] uppercase font-medium ${payMethod === m ? "text-white" : "text-mid"}`}>
                          {m === "khqr" ? "KHQR" : "ABA Pay"}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="px-6 py-6">
                    {/* KHQR */}
                    {payMethod === "khqr" && (
                      <div className="flex flex-col items-center gap-5">
                        <p className="text-xs text-mid text-center leading-relaxed">
                          Scan with any Cambodian banking app that supports KHQR — ABA, ACLEDA, Wing, and more.
                        </p>
                        {/* QR placeholder */}
                        <div
                          className="w-52 h-52 rounded-none flex items-center justify-center relative overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.70)", border: "1px solid rgba(255,255,255,0.80)" }}
                        >
                          {/* Decorative QR grid */}
                          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Corner markers */}
                            <rect x="10" y="10" width="44" height="44" rx="6" fill="#1a1a1a"/>
                            <rect x="16" y="16" width="32" height="32" rx="4" fill="white"/>
                            <rect x="22" y="22" width="20" height="20" rx="2" fill="#1a1a1a"/>
                            <rect x="106" y="10" width="44" height="44" rx="6" fill="#1a1a1a"/>
                            <rect x="112" y="16" width="32" height="32" rx="4" fill="white"/>
                            <rect x="118" y="22" width="20" height="20" rx="2" fill="#1a1a1a"/>
                            <rect x="10" y="106" width="44" height="44" rx="6" fill="#1a1a1a"/>
                            <rect x="16" y="112" width="32" height="32" rx="4" fill="white"/>
                            <rect x="22" y="118" width="20" height="20" rx="2" fill="#1a1a1a"/>
                            {/* Data dots */}
                            {[64,72,80,88,96].map(x => [64,72,80,88,96].map(y => (
                              Math.sin(x * y) > 0.2
                                ? <rect key={`${x}${y}`} x={x} y={y} width="6" height="6" rx="1" fill="#1a1a1a"/>
                                : null
                            )))}
                            {/* Center logo area */}
                            <rect x="68" y="68" width="24" height="24" rx="4" fill="white"/>
                            <rect x="71" y="71" width="18" height="18" rx="3" fill="#1a1a1a"/>
                            <rect x="74" y="74" width="12" height="12" rx="2" fill="white"/>
                          </svg>
                        </div>
                        <div className="text-center space-y-1">
                          <p className="font-display text-ink text-sm">RAWE Official</p>
                          <p className="font-sans text-ink font-semibold">${total.toFixed(2)}</p>
                          <p className="text-[10px] text-mid tracking-wide">Valid for this session only</p>
                        </div>
                        <div
                          className="w-full rounded-none px-4 py-3 flex items-center gap-3"
                          style={{ background: "rgba(255,255,255,0.50)", border: "1px solid rgba(255,255,255,0.70)" }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3v4l3 1.5" stroke="#6b6b6b" strokeWidth="1.3" strokeLinecap="round"/></svg>
                          <p className="text-xs text-mid">After scanning, tap <span className="text-ink font-medium">Confirm Payment</span> below once transfer is complete.</p>
                        </div>
                      </div>
                    )}

                    {/* ABA Pay */}
                    {payMethod === "aba" && (
                      <div className="space-y-4">
                        <p className="text-xs text-mid leading-relaxed">
                          Transfer to the ABA account below, then tap <span className="text-ink font-medium">Confirm Payment</span>.
                        </p>
                        {[
                          { label: "Bank", value: "ABA Bank" },
                          { label: "Account Name", value: "RAWE Official" },
                          { label: "Account Number", value: "000 123 456" },
                          { label: "Amount", value: `$${total.toFixed(2)}` },
                          { label: "Reference", value: `RAWE-${Date.now().toString().slice(-6)}` },
                        ].map(({ label, value }) => (
                          <div
                            key={label}
                            className="flex justify-between items-center px-4 py-3 rounded-none"
                            style={{ background: "rgba(255,255,255,0.50)", border: "1px solid rgba(255,255,255,0.70)" }}
                          >
                            <span className="text-xs text-mid">{label}</span>
                            <span className="text-sm text-ink font-medium font-sans">{value}</span>
                          </div>
                        ))}
                        <div
                          className="rounded-none px-4 py-3 flex items-start gap-3"
                          style={{ background: "rgba(234,148,173,0.12)", border: "1px solid rgba(234,148,173,0.30)" }}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 flex-shrink-0"><circle cx="7" cy="7" r="6" stroke="#ea94ad" strokeWidth="1.2"/><path d="M7 4v3.5M7 9.5v.5" stroke="#ea94ad" strokeWidth="1.3" strokeLinecap="round"/></svg>
                          <p className="text-[11px] text-mid leading-relaxed">Use the exact reference number so we can match your payment.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="px-6 pb-6">
                    <button className="liquid-glass-btn w-full justify-center py-3.5 text-sm">
                      Confirm Payment · ${total.toFixed(2)}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Right: Order summary ── */}
            <div className="w-full lg:w-[300px] flex-shrink-0">
              <div className="rounded-none overflow-hidden sticky top-24" style={glassPanel}>
                <div className="px-5 py-4 border-b border-white/40">
                  <span className="font-display text-ink text-lg tracking-wide">Order Summary</span>
                </div>

                {/* Mini item list */}
                <ul className="px-5 py-4 space-y-4">
                  {items.map((item) => (
                    <li key={item.shadeId} className="flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-none overflow-hidden flex-shrink-0 bg-[#f9f9f9]">
                        {shadeImg[item.name]
                          ? <Image src={shadeImg[item.name]} alt={item.name} fill className="object-cover" sizes="36px" />
                          : <div className="w-full h-full" style={{ background: item.hex }} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-ink text-xs font-display truncate">{item.name}</p>
                        <p className="text-mid text-[10px]">x{item.qty}</p>
                      </div>
                      <span className="font-sans text-ink text-xs">${(item.priceUSD * item.qty).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>

                {/* Totals */}
                <div className="px-5 py-5 border-t border-white/40 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-mid">Subtotal</span>
                    <span className="font-sans text-ink">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-mid">Shipping</span>
                    <span className="font-sans text-ink">{items.length > 0 ? `$${SHIPPING.toFixed(2)}` : "—"}</span>
                  </div>
                  <div style={{ height: "1px", background: "rgba(0,0,0,0.07)" }} />
                  <div className="flex justify-between">
                    <span className="text-sm text-ink font-medium">Total</span>
                    <span className="font-sans text-ink font-semibold">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo */}
                <div className="px-5 pb-5">
                  <div className="flex gap-2">
                    <input
                      className="flex-1 px-3 py-2 rounded-none text-xs text-ink bg-white/50 border border-white/60 outline-none focus:border-ink/30 placeholder:text-mid/50 transition-all"
                      placeholder="Promo code"
                    />
                    <button className="px-3 py-2 rounded-none text-xs text-ink font-medium hover:bg-white/60 transition-colors" style={{ background: "rgba(255,255,255,0.40)", border: "1px solid rgba(255,255,255,0.60)" }}>
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
