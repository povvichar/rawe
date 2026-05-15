"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { site } from "@/data/site";

const glassInput =
  "w-full rounded-2xl px-5 py-3.5 text-sm text-ink placeholder:text-mid/50 outline-none transition-all duration-200 focus:ring-2 focus:ring-black/10 bg-white/40 border border-white/60 backdrop-blur-sm";

const channels = [
  {
    icon: <Image src="/assets/telegram.svg" alt="Telegram" width={18} height={18} />,
    label: "Telegram",
    value: "@raweofficail",
    sub: "Message us on Telegram",
    href: "https://t.me/raweofficail",
  },
  {
    icon: <Image src="/assets/ig.svg" alt="Instagram" width={18} height={18} />,
    label: "Instagram",
    value: "@raweofficail",
    sub: "DM us anytime",
    href: site.social.instagram,
  },
  {
    icon: <Image src="/assets/tiktok.svg" alt="TikTok" width={18} height={18} />,
    label: "TikTok",
    value: "@raweofficail",
    sub: "Watch our latest content",
    href: site.social.tiktok,
  },
  {
    icon: <Image src="/assets/fb.svg" alt="Facebook" width={18} height={18} />,
    label: "Facebook",
    value: "RAWE Official",
    sub: "Like & message us",
    href: site.social.facebook,
  },
];

type Status = "idle" | "sending" | "sent";

export default function ContactPage() {
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  useGSAP(() => {
    gsap.fromTo(".hero-title-word",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.1, delay: 0.2 }
    );
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true } }
      );
    });
    gsap.utils.toArray<HTMLElement>(".reveal-slow").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true } }
      );
    });
    gsap.utils.toArray<HTMLElement>(".channel-card").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", delay: i * 0.07,
          scrollTrigger: { trigger: el, start: "top 92%", once: true } }
      );
    });
  }, { scope: ref });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1400);
  };

  return (
    <>
      <Navbar />
      <main ref={ref} className="bg-hero overflow-x-hidden">

        {/* ── Hero ── */}
        <section className="relative min-h-[52vh] flex flex-col items-center justify-center px-6 text-center pt-24">
          <p className="brand-watermark absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.05] text-[clamp(80px,18vw,260px)] font-display font-light tracking-[0.2em]">
            RAWE
          </p>
          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[0.4em] uppercase text-mid mb-5">Get in Touch</p>
            <h1 className="font-display font-light text-ink leading-[1.1] text-[clamp(38px,6vw,80px)]">
              {["We'd", "love", "to", "hear", "from", "you."].map((word, i) => (
                <span key={i} className="hero-title-word inline-block opacity-0 mr-[0.22em]">{word}</span>
              ))}
            </h1>
            <p className="mt-6 text-mid text-base leading-relaxed max-w-md mx-auto">
              Questions, feedback, collaborations — our team is here for all of it.
            </p>
          </div>
        </section>

        {/* ── Channels ── */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
            {channels.map(({ icon, label, value, sub, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="channel-card group rounded-2xl p-5 flex flex-col gap-3 opacity-0"
                style={{
                  background: "rgba(255,255,255,0.32)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.55)",
                  boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.75)",
                  transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease",
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-ink/70 group-hover:text-ink transition-colors"
                  style={{ background: "rgba(255,255,255,0.5)" }}>
                  {icon}
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-mid">{label}</p>
                  <p className="text-sm text-ink mt-0.5 font-display">{value}</p>
                  <p className="text-[10px] text-mid/60 mt-1">{sub}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Contact form + side info ── */}
        <section className="py-16 sm:py-24 px-6">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16 items-start">

            {/* Left — brand note */}
            <div className="space-y-8 reveal">
              <div className="space-y-4">
                <p className="text-[10px] tracking-[0.35em] uppercase text-mid">Send a Message</p>
                <h2 className="font-display font-light text-ink text-3xl sm:text-4xl leading-snug">
                  Real people.<br />Real replies.
                </h2>
                <p className="text-mid text-sm leading-relaxed">
                  We're a small team that genuinely cares. Every message is read by a real person — not an automated bot.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Response time", value: "Within 24 hours" },
                  { label: "Business hours", value: "Mon – Sat, 9am – 6pm" },
                  { label: "Language",       value: "English & Khmer" },
                  { label: "Based in",       value: "Phnom Penh, Cambodia" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-black/6 last:border-0">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-mid">{label}</span>
                    <span className="text-sm text-ink">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="reveal-slow">
              <div
                className="rounded-3xl p-7 sm:p-9"
                style={{
                  background: "rgba(255,255,255,0.38)",
                  backdropFilter: "blur(48px) saturate(180%)",
                  WebkitBackdropFilter: "blur(48px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.55)",
                  boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.85)",
                }}
              >
                {status === "sent" ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-5 text-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-display text-ink text-xl">Message sent!</p>
                      <p className="text-mid text-sm mt-2 leading-relaxed">We'll get back to you within 24 hours.</p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="liquid-glass-btn text-sm mt-2"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Name</label>
                        <input
                          type="text"
                          placeholder="Your name"
                          required
                          className={glassInput}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Email</label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          required
                          className={glassInput}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Subject</label>
                      <input
                        type="text"
                        placeholder="What's this about?"
                        className={glassInput}
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-[0.25em] uppercase text-mid">Message</label>
                      <textarea
                        rows={5}
                        placeholder="Tell us everything..."
                        required
                        className={glassInput + " resize-none"}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="liquid-glass-btn w-full justify-center text-sm py-3 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "sending" ? "Sending…" : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer strip ── */}
        <div className="border-t border-black/6 py-8 px-6 max-w-5xl mx-auto flex items-center justify-between gap-4 text-[11px] text-mid">
          <Link href="/" aria-label="RAWE home">
            <Image src="/assets/Logo.svg" alt="RAWE" width={72} height={24} />
          </Link>
          <p className="text-center">© {new Date().getFullYear()} RAWE. All rights reserved.</p>
          <div className="flex gap-5">
            {[
              { href: site.social.instagram, icon: "/assets/ig.svg",     label: "Instagram" },
              { href: site.social.tiktok,    icon: "/assets/tiktok.svg", label: "TikTok"    },
              { href: site.social.facebook,  icon: "/assets/fb.svg",     label: "Facebook"  },
            ].map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100 transition-opacity duration-200">
                <Image src={icon} alt={label} width={18} height={18} />
              </a>
            ))}
          </div>
        </div>

      </main>
    </>
  );
}
