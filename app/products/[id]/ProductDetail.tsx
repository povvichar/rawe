"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { shades, type Shade } from "@/data/shades";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import Navbar from "@/components/Navbar";

export default function ProductDetail({ initialShade }: { initialShade: Shade }) {

  const [selected, setSelected] = useState(initialShade);
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const { show } = useToast();

  const handleAdd = () => {
    add({ shadeId: selected.id, name: selected.name, hex: selected.hex, priceUSD: selected.priceUSD });
    show(selected.name, selected.hex);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-hero">

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-24 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">

        {/* ── Left: Product image ── */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-20">
          <div
            className="relative w-full aspect-square rounded-3xl overflow-hidden"
            style={{
              background: "#F9F9F9",
              border: "1px solid rgba(255,255,255,0.55)",
            }}
          >
            <Image
              key={selected.id}
              src={selected.image}
              alt={selected.name}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover transition-opacity duration-500 translate-y-4"
            />
            {/* Shade label badge */}
            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase text-ink"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.70)",
              }}
            >
              {selected.label}
            </div>
          </div>
        </div>

        {/* ── Right: Details ── */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8 pt-2">

          {/* Brand + name */}
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-mid mb-2">RAWE · Creamy Blush Stick</p>
            <h1 className="font-display text-4xl sm:text-5xl font-light text-ink leading-tight">
              {selected.name}
            </h1>
            <p className="mt-3 font-sans text-2xl text-ink/80">${selected.priceUSD}.00</p>
          </div>

          <div style={{ height: "1px", background: "rgba(0,0,0,0.08)" }} />

          {/* Description */}
          <div className="space-y-3 text-sm text-mid leading-relaxed">
            <p>
              A lightweight, buildable blush stick that melts into skin for a natural, lit-from-within flush.
              Blends in seconds, lasts up to 8 hours.
            </p>
            <ul className="space-y-1.5">
              {["Creamy, skin-hugging formula", "Buildable from sheer to bold", "No transfer, no crease", "Fragrance-free & dermatologist tested"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ height: "1px", background: "rgba(0,0,0,0.08)" }} />

          {/* Shade picker */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-mid mb-4">
              Shade — <span className="text-ink">{selected.name}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {shades.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  title={s.name}
                  className="relative w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110"
                  style={{
                    background: s.hex,
                    boxShadow: selected.id === s.id
                      ? `0 0 0 2px #fff, 0 0 0 3.5px ${s.hex}`
                      : "0 0 0 1px rgba(0,0,0,0.10)",
                  }}
                >
                  {selected.id === s.id && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5.2l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={handleAdd}
              className="liquid-glass-btn w-full justify-center py-4 text-sm tracking-[0.18em]"
              style={added ? { background: "#1a1a1a", color: "#fff", borderColor: "#1a1a1a" } : {}}
            >
              {added ? "Added to Bag ✓" : `Add to Bag · $${selected.priceUSD}`}
            </button>
            <Link
              href="/#products"
              className="w-full text-center text-xs text-mid hover:text-ink transition-colors duration-200 py-2"
            >
              View all shades
            </Link>
          </div>

          <div style={{ height: "1px", background: "rgba(0,0,0,0.08)" }} />

          {/* Details rows */}
          <div className="space-y-4 text-sm">
            {[
              { label: "How to use", value: "Swipe directly onto cheeks and blend with fingertips in circular motions. Layer for intensity." },
              { label: "Ingredients", value: "Dimethicone, Cyclopentasiloxane, Talc, Mica, Phenyl Trimethicone. Full INCI on packaging." },
              { label: "Net weight", value: "4.5g / 0.16 oz" },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-4">
                <span className="w-28 flex-shrink-0 text-mid">{label}</span>
                <span className="text-ink/70">{value}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
    </>
  );
}
