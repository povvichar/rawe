"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { shades, type Shade } from "@/data/shades";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import Link from "next/link";

function ShadeCard({ shade }: { shade: Shade }) {
  const { add } = useCart();
  const { show } = useToast();
  return (
    <Link href={`/products/${shade.id}`}>
      <article className="group relative aspect-[3/4] rounded-none overflow-hidden cursor-pointer bg-[#f9f9f9]">
        {/* Default image */}
        <Image
          src={shade.image}
          alt={shade.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain scale-[0.68] transition-all duration-500 ease-out group-hover:scale-[0.74]"
        />
        {/* Hover image — crossfades in */}
        <Image
          src={shade.hoverImage}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover scale-95 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:duration-300"
        />

        {/* Title + price overlay — visible by default, hidden on hover */}
        <div className="absolute inset-x-0 bottom-[2px] px-4 pb-4 flex flex-col gap-0 items-center text-center transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
          <p className="font-display text-base uppercase font-medium text-ink tracking-[0.15em]">{shade.name}</p>
          <p className="text-base font-base text-ink/70">${shade.priceUSD}.00</p>
        </div>

        {/* Add to Cart button — hidden by default, shown on hover */}
        <div className="absolute inset-x-0 bottom-[6px] flex justify-center pb-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
          <button
            onClick={(e) => {
              e.preventDefault();
              add({ shadeId: shade.id, name: shade.name, hex: shade.hex, priceUSD: shade.priceUSD });
              show(shade.name, shade.hex);
            }}
            className="rounded-none bg-white/80 backdrop-blur-sm text-ink text-xs tracking-[0.15em] uppercase px-6 py-2.5 hover:bg-ink hover:text-white transition-colors duration-200"
          >
            Add to Cart · ${shade.priceUSD}
          </button>
        </div>
      </article>
    </Link>
  );
}

export default function ProductsSection() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const [page, setPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  const triggerPulse = () => {
    setPulsing(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setPulsing(true)));
    setTimeout(() => setPulsing(false), 650);
  };
  const perPage = 4;
  const totalPages = Math.ceil(shades.length / perPage);

  const goTo = (direction: 1 | -1) => {
    const next = Math.max(0, Math.min(totalPages - 1, page + direction));
    if (next === page || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setPage(next);
      setTimeout(() => setAnimating(false), 350);
    }, 350);
  };

  useGSAP(
    () => {
      gsap.set(".section-word", { opacity: 0, y: 20 });
      gsap.to(".section-word", {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.08,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 110%", once: true },
      });
      gsap.fromTo(
        ".shade-card",
        { opacity: 0, y: 64, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 105%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  // Re-fade cards in on pagination (skip first render — scroll entrance handles that)
  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      gsap.fromTo(
        ".shade-card",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.08 }
      );
    },
    { scope: ref, dependencies: [page] }
  );

  const visible = shades.slice(page * perPage, page * perPage + perPage);

  return (
    <section
      ref={ref}
      id="products"
      className="relative z-[3] bg-transparent pt-2 pb-24 md:pt-2 md:pb-16"
    >
      {/* Title */}
      <div className="text-center px-5 sm:px-8 md:px-12 mb-12 sm:mb-18">
        <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-mid mb-2 sm:mb-3">
          {["The", "Collection"].map((word, i) => (
            <span key={i} className="section-word inline-block mr-[0.22em]">
              {word}
            </span>
          ))}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-ink">
          {["Our", "Products"].map((word, i) => (
            <span key={i} className="section-word inline-block mr-[0.22em]">
              {word}
            </span>
          ))}
        </h2>
      </div>

      {/* Cards + nav */}
      <div className="px-5 sm:px-8 md:px-12">
        <div
          ref={trackRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-5"
          style={{
            transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.35s ease, filter 0.35s ease",
            opacity: animating ? 0 : 1,
            filter: animating ? "blur(8px)" : "blur(0px)",
            transform: animating ? "scale(0.94)" : "scale(1)",
          }}
        >
          {visible.map((s, i) => (
            <div key={s.id} className="shade-card relative">
              <ShadeCard shade={s} />
              {/* Next arrow floats centered on the last card */}
              {i === visible.length - 1 && page < totalPages - 1 && (
                <button
                  onClick={() => { triggerPulse(); goTo(1); }}
                  aria-label="Next products"
                  className={`absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-none flex items-center justify-center z-10 transition-transform duration-300 hover:scale-110 ${pulsing ? "pulse-ring" : ""}`}
                  style={{
                    background: "rgba(255,255,255,0.35)",
                    border: "1px solid rgba(255,255,255,0.6)",
                    backdropFilter: "blur(24px) saturate(200%) brightness(1.05)",
                    WebkitBackdropFilter: "blur(24px) saturate(200%) brightness(1.05)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08), inset 0 0px 0 rgba(255,255,255,0.75)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              {/* Prev arrow floats centered on the first card */}
              {i === 0 && page > 0 && (
                <button
                  onClick={() => { triggerPulse(); goTo(-1); }}
                  aria-label="Previous products"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-none flex items-center justify-center z-10 transition-transform duration-300 hover:scale-110 ${pulsing ? "pulse-ring" : ""}`}
                  style={{
                    background: "rgba(255,255,255,0.35)",
                    border: "1px solid rgba(255,255,255,0.6)",
                    backdropFilter: "blur(24px) saturate(200%) brightness(1.05)",
                    WebkitBackdropFilter: "blur(24px) saturate(200%) brightness(1.05)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08), inset 0 0px 0 rgba(255,255,255,0.75)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8l5 5" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Page ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === page ? "w-5 h-1.5 bg-ink rounded-none" : "w-1.5 h-1.5 bg-ink/25 rounded-none"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
