"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";

const values = [
  { title: "Real over Perfect",   body: "We don't believe in covering who you are — we believe in enhancing it." },
  { title: "Quality over Quantity", body: "We will never compromise quality for quantity, or experience for ignorance." },
  { title: "Connection over Division", body: "Every product, every story, every interaction is guided by genuine human connection." },
  { title: "Inclusive Beauty",    body: "Beauty is not exclusive. Not performative. It belongs to everyone." },
];

export default function StoryPage() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".hero-title-word",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.1, delay: 0.2 }
    );

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true } }
      );
    });
    gsap.utils.toArray<HTMLElement>(".reveal-slow").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true } }
      );
    });
    gsap.utils.toArray<HTMLElement>(".reveal-line").forEach((el) => {
      gsap.fromTo(el,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 90%", once: true } }
      );
    });

    gsap.utils.toArray<HTMLElement>("h2, h3").forEach((heading) => {
      const words = heading.querySelectorAll(".stagger-title");
      if (!words.length) return;
      gsap.fromTo(words,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.1,
          scrollTrigger: { trigger: heading, start: "top 88%", once: true } }
      );
    });

    gsap.fromTo(".pull-quote-word",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.1,
        scrollTrigger: { trigger: ".pull-quote-word", start: "top 85%", once: true } }
    );
  }, { scope: ref });

  return (
    <>
      <Navbar />
      <main ref={ref} className="bg-hero overflow-x-hidden">

        {/* ── Hero ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
          {/* Background watermark */}
          <p className="brand-watermark absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.06] text-[clamp(80px,18vw,260px)] font-display font-light tracking-[0.2em]">
            RAWE
          </p>
          <div className="relative z-10 max-w-3xl mx-auto reveal">
            <p className="text-[10px] tracking-[0.4em] uppercase text-mid mb-6">Our Story</p>
            <h1 className="font-display font-light text-ink leading-[1.1] text-[clamp(42px,7vw,96px)]">
              {["Born", "from", "a", "dream."].map((word, i) => (
                <span key={i} className="hero-title-word inline-block opacity-0 mr-[0.22em]">{word}</span>
              ))}
            </h1>
            <p className="mt-8 text-mid text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              We grew up loving beauty — playing with makeup, experimenting, and discovering how fun and expressive it could be. Beauty was never about perfection for us; it was about possibility.
            </p>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-[10px] tracking-[0.3em] uppercase text-mid/50">Scroll</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="#6b6b6b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity=".5"/></svg>
          </div>
        </section>

        {/* ── Origin ── */}
        <section className="py-24 sm:py-32 px-6">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Photos grid */}
            <div className="reveal grid grid-cols-2 gap-3">
              {["/assets/social-media/img1.png","/assets/social-media/img2.png","/assets/social-media/img3.png"].map((src, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-none ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
                  style={{ border: "1px solid rgba(255,255,255,0.55)" }}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="400px" />
                </div>
              ))}
            </div>

            {/* Text */}
            <div className="space-y-6 reveal-slow">
              <p className="text-[10px] tracking-[0.35em] uppercase text-mid">The Beginning</p>
              <h2 className="font-display font-light text-ink text-3xl sm:text-4xl leading-snug">
                {"A gap we couldn't ignore.".split(" ").map((w, i) => (
                  <span key={i} className="stagger-title inline-block opacity-0 mr-[0.22em]">{w}</span>
                ))}
              </h2>
              <div className="space-y-4 text-mid text-sm sm:text-base leading-relaxed">
                <p>As trends evolved and the industry grew louder, we noticed something missing. In Cambodia, shelves were filled with mass-produced brands, but local voices and real stories were rare.</p>
                <p>That moment sparked something in us. We didn't just want to consume beauty — we wanted to create it. Locally, intentionally, and honestly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pull quote ── */}
        <section className="py-24 sm:py-32 px-6 bg-[#1a1a1a]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-display font-light text-white text-[clamp(24px,4.5vw,56px)] leading-[1.2]">
              {`"RAWE exists because we believe beauty should feel real.`.split(" ").map((word, i) => (
                <span key={i} className="pull-quote-word inline-block opacity-0 mr-[0.22em]">{word}</span>
              ))}
              <br className="hidden sm:block" />
              {`Real skin. Real people. Real connection."`.split(" ").map((word, i) => (
                <span key={i} className="pull-quote-word inline-block opacity-0 text-white/50 mr-[0.22em]">{word}</span>
              ))}
            </p>
          </div>
        </section>

        {/* ── Purpose ── */}
        <section className="py-24 sm:py-32 px-6">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-6 reveal-slow order-2 lg:order-1">
              <p className="text-[10px] tracking-[0.35em] uppercase text-mid">Our Purpose</p>
              <h2 className="font-display font-light text-ink text-3xl sm:text-4xl leading-snug">
                {"More than a business. Our life's purpose.".split(" ").map((w, i) => (
                  <span key={i} className="stagger-title inline-block opacity-0 mr-[0.22em]">{w}</span>
                ))}
              </h2>
              <div className="space-y-4 text-mid text-sm sm:text-base leading-relaxed">
                <p>This brand is not just a business to us — it's our life's purpose. We genuinely enjoy every step of the process: developing each product, curating only the best options we can find, and thinking deeply about how beauty can serve our community.</p>
                <p>For us, beauty is not a transaction. It's a shared experience.</p>
              </div>
            </div>
            <div className="reveal order-1 lg:order-2 grid grid-cols-2 gap-3">
              {["/assets/social-media/img5.png","/assets/social-media/img6.png","/assets/social-media/img4.png"].map((src, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-none ${i === 2 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
                  style={{ border: "1px solid rgba(255,255,255,0.55)" }}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="400px" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ── */}
        <section className="py-24 sm:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 reveal">
              <p className="text-[10px] tracking-[0.35em] uppercase text-mid mb-3">What Drives Us</p>
              <h2 className="font-display font-light text-ink text-3xl sm:text-4xl">
                {"Mission & Vision".split(" ").map((w, i) => (
                  <span key={i} className="stagger-title inline-block opacity-0 mr-[0.22em]">{w}</span>
                ))}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 reveal-slow">
              {[
                {
                  tag: "Mission",
                  headline: "Inspire confidence through beauty that feels real.",
                  body: "We inspire confidence and connection through beauty that feels real and effortless — products that work with your skin, not against it.",
                },
                {
                  tag: "Vision",
                  headline: "Redefine everyday cosmetics.",
                  body: "To redefine everyday cosmetics by creating minimalist, affordable products paired with honest storytelling — beauty that resonates beyond trends and time.",
                },
              ].map(({ tag, headline, body }) => (
                <div
                  key={tag}
                  className="rounded-none p-8 flex flex-col gap-4"
                  style={{
                    background: "rgba(255,255,255,0.28)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.55)",
                    boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.75)",
                  }}
                >
                  <span className="text-[10px] tracking-[0.3em] uppercase text-mid">{tag}</span>
                  <h3 className="font-display font-light text-ink text-xl sm:text-2xl leading-snug">{headline}</h3>
                  <p className="text-mid text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="py-24 sm:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 reveal">
              <p className="text-[10px] tracking-[0.35em] uppercase text-mid mb-3">What We Stand For</p>
              <h2 className="font-display font-light text-ink text-3xl sm:text-4xl">
                {"Our Values".split(" ").map((w, i) => (
                  <span key={i} className="stagger-title inline-block opacity-0 mr-[0.22em]">{w}</span>
                ))}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-px reveal-slow" style={{ background: "rgba(0,0,0,0.06)", borderRadius: "1rem", overflow: "hidden" }}>
              {values.map(({ title, body }) => (
                <div key={title} className="bg-hero p-8 flex flex-col gap-3">
                  <div className="w-6 h-px bg-accent reveal-line origin-left" />
                  <h3 className="font-display text-ink text-lg">{title}</h3>
                  <p className="text-mid text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Community closing ── */}
        <section className="py-24 sm:py-32 px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-8 reveal">
            <p className="text-[10px] tracking-[0.35em] uppercase text-mid">A Community</p>
            <h2 className="font-display font-light text-ink text-[clamp(28px,5vw,56px)] leading-[1.1]">
              {"More than a brand.".split(" ").map((w, i) => (
                <span key={i} className="stagger-title inline-block opacity-0 mr-[0.22em]">{w}</span>
              ))}
            </h2>
            <div className="space-y-4 text-mid text-sm sm:text-base leading-relaxed">
              <p>A space where we come together to feel beautiful, express ourselves freely, and give back to society. Where beauty is not exclusive, but inclusive. Not performative, but meaningful.</p>
              <p className="text-ink font-display text-lg">RAWE started with a simple desire: something real.<br /><span className="text-mid text-base font-sans">And this is just the beginning.</span></p>
            </div>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link href="/#products" className="liquid-glass-btn text-sm">Shop the Collection</Link>
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
              { href: "https://www.instagram.com/raweofficail", icon: "/assets/ig.svg",     label: "Instagram" },
              { href: "https://www.tiktok.com/@raweofficail",   icon: "/assets/tiktok.svg", label: "TikTok" },
              { href: "https://www.facebook.com/raweofficail",  icon: "/assets/fb.svg",     label: "Facebook" },
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
