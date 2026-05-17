"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";

const PRODUCTS = [
  { name: "Summer Orange", src: "/assets/new-products/Summer orange_v1.webp" },
  { name: "Cappucino",     src: "/assets/new-products/Cappucino_v1.webp" },
  { name: "Spiced",        src: "/assets/new-products/Spiced_v1.webp" },
  { name: "Rosewood",      src: "/assets/new-products/Rosewood_v1.webp" },
  { name: "Plushing",      src: "/assets/new-products/Plushing_v1.webp" },
  { name: "Rosy Posy",     src: "/assets/new-products/Rosy Posy_v1.webp" },
  { name: "Cotton Candy",  src: "/assets/new-products/Cotton candy_v1.webp" },
  { name: "Champagne",     src: "/assets/new-products/Champagne_v1.webp" },
];

// Render the list twice so the track can loop seamlessly.
const LOOP = [...PRODUCTS, ...PRODUCTS];

// Seconds for one full pass — higher = slower drift.
const LOOP_DURATION = 58;

export default function LifestyleSection() {
  const ref      = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sticks = gsap.utils.toArray<HTMLElement>(".ls-stick");
    let drift: gsap.core.Tween | null = null;
    const reveal = { p: 0 };   // 0 → hidden/blurred, 1 → fully shown

    // Per-frame center focus: the stick nearest the viewport center
    // scales up and becomes fully opaque; others shrink and fade.
    const focus = () => {
      const vp = viewport.current;
      if (!vp) return;
      const r = vp.getBoundingClientRect();
      const mid = r.left + r.width / 2;
      const reach = r.width / 2;
      const ARC = r.width * 0.16;                   // how high the sides lift
      sticks.forEach((el) => {
        const b = el.getBoundingClientRect();
        const d = Math.abs(b.left + b.width / 2 - mid);
        const t = Math.min(d / reach, 1);          // 0 at center → 1 at edge
        const scale   = gsap.utils.interpolate(1.18, 0.6, t);
        const opacity = gsap.utils.interpolate(1, 0.4, t);
        const lift    = -ARC * t * t;              // parabolic arc — rises toward the edges
        el.style.transform = `translateY(${lift}px) scale(${scale})`;
        el.style.opacity = `${opacity * reveal.p}`;
        el.style.filter = reveal.p < 1 ? `blur(${(1 - reveal.p) * 16}px)` : "none";
        el.style.zIndex = `${Math.round((1 - t) * 100)}`;
      });
    };

    // Infinite horizontal drift — two copies, slide exactly one copy width.
    drift = gsap.to(track.current, {
      xPercent: -50,
      duration: LOOP_DURATION,
      ease: "none",
      repeat: -1,
    });
    gsap.ticker.add(focus);

    // ── Label + headline reveal ──
    const intro = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
    });

    intro
      .fromTo(".ls-label",
        { opacity: 0, y: 18, letterSpacing: "0.9em", filter: "blur(6px)" },
        { opacity: 1, y: 0, letterSpacing: "0.45em", filter: "blur(0px)", duration: 1, ease: "power3.out" }
      )
      .fromTo(".ls-word",
        { opacity: 0, yPercent: 120, rotateX: -75, filter: "blur(10px)" },
        { opacity: 1, yPercent: 0, rotateX: 0, filter: "blur(0px)",
          duration: 1.1, ease: "power4.out", stagger: 0.09 },
        "-=0.5"
      )
      .to(reveal, { p: 1, duration: 1.3, ease: "power2.out" }, "-=0.8");

    return () => {
      gsap.ticker.remove(focus);
      drift?.kill();
      intro.kill();
    };
  }, { scope: ref });

  return (
    <section
      ref={ref}
      id="lifestyle"
      className="relative overflow-hidden bg-hero pt-14 sm:pt-20 md:pt-24 pb-0"
    >
      {/* Label + ghost headline */}
      <div className="relative z-10 text-center px-5">
        <p className="ls-label text-[10px] sm:text-[11px] tracking-[0.45em] uppercase text-mid/50">
          Made for real life
        </p>
        <h2
          className="mt-5 font-display font-light leading-[1.0] text-[clamp(34px,6.5vw,104px)]"
          style={{ perspective: "800px", color: "rgba(0,0,0,0.13)" }}
        >
          {["Beauty", "That", "Fits"].map((w, i) => (
            <span key={i} className="ls-word inline-block mr-[0.22em]">{w}</span>
          ))}
          <br />
          {["Your", "Everyday", "Life"].map((w, i) => (
            <span key={i} className="ls-word inline-block mr-[0.22em]">{w}</span>
          ))}
        </h2>
      </div>

      {/* Looping carousel */}
      <div
        ref={viewport}
        className="relative z-10 -mt-[14vw] overflow-hidden pt-[16vw]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div ref={track} className="flex w-max items-end will-change-transform">
          {LOOP.map((p, i) => (
            <div
              key={i}
              className="ls-stick relative shrink-0 w-[26vw] sm:w-[22vw] md:w-[19vw] px-[4vw]"
              style={{ transformOrigin: "bottom center" }}
            >
              <Image
                src={p.src}
                alt={p.name}
                width={700}
                height={1629}
                className="w-full h-auto block"
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent 96%)",
                  maskImage: "linear-gradient(to bottom, #000 82%, transparent 96%)",
                }}
                priority={i < PRODUCTS.length}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
