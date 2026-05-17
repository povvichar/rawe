"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { shades, type Shade } from "@/data/shades";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import Navbar from "@/components/Navbar";


const features = [
  "Creamy, skin-hugging formula",
  "Buildable from sheer to bold",
  "No transfer, no crease",
  "Fragrance-free & dermatologist tested",
];

const details = [
  {
    label: "How to use",
    value: "Swipe directly onto cheeks and blend with fingertips in circular motions. Layer for intensity.",
  },
  {
    label: "Ingredients",
    value: "Dimethicone, Cyclopentasiloxane, Talc, Mica, Phenyl Trimethicone. Full INCI on packaging.",
  },
  { label: "Net weight", value: "4.5g / 0.16 oz" },
];

const GALLERY_LIFESTYLE = [
  "/assets/social-media/img1.png",
  "/assets/social-media/img2.png",
  "/assets/social-media/img5.png",
];

const THUMB_VISIBLE = 4;

export default function ProductDetail({ initialShade }: { initialShade: Shade }) {
  const [selected, setSelected] = useState(initialShade);
  const [added, setAdded] = useState(false);
  const [openDetail, setOpenDetail] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
  const [galleryOffset, setGalleryOffset] = useState(0);
  const displayedPhoto = hoveredPhoto ?? activePhoto;

  const gallery = [selected.image, selected.hoverImage, ...GALLERY_LIFESTYLE];

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
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-0">
          <nav className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-mid">
            <Link href="/" className="hover:text-ink transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <Link href="/#products" className="hover:text-ink transition-colors">Products</Link>
            <span className="opacity-30">/</span>
            <span className="text-ink">{selected.name}</span>
          </nav>
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-10 pb-24 flex flex-col lg:flex-row gap-10 lg:gap-20">

          {/* ── Left: Photo gallery ── */}
          <div className="w-full lg:w-[52%] lg:sticky lg:top-24 self-start">
            <div
              className="relative w-full aspect-[4/5] rounded-none overflow-hidden"
              style={{
                background: displayedPhoto === 0
                  ? "radial-gradient(circle at 50% 38%, #ffffff 0%, #f0eeec 55%, #e6e3df 100%)"
                  : "#F2F2F2",
              }}
            >

              {/* Active photo */}
              <Image
                key={displayedPhoto + selected.id}
                src={gallery[displayedPhoto]}
                alt={selected.name}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 52vw"
                className={`transition-opacity duration-300 ${
                  displayedPhoto === 0
                    ? "object-contain scale-[0.62]"
                    : "object-cover"
                }`}
              />

              {/* Gallery thumbnails — overlaid on left */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                {/* Up arrow */}
                <button
                  onClick={() => setGalleryOffset((o) => Math.max(0, o - 1))}
                  disabled={galleryOffset === 0}
                  className="w-8 h-8 rounded-none flex items-center justify-center transition-all duration-200 disabled:opacity-0"
                  style={{
                    background: "rgba(255,255,255,0.70)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
              
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 6.5l3-3 3 3" stroke="#1a1a1a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {gallery.slice(galleryOffset, galleryOffset + THUMB_VISIBLE).map((src, i) => {
                  const idx = galleryOffset + i;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActivePhoto(idx)}
                      onMouseEnter={() => setHoveredPhoto(idx)}
                      onMouseLeave={() => setHoveredPhoto(null)}
                      className="relative w-14 h-14 rounded-none overflow-hidden flex-shrink-0 transition-all duration-300"
                      style={{
                        background: "#F2F2F2",
                        boxShadow: activePhoto === idx
                          ? `0 0 0 2px #fff, 0 0 0 3px ${selected.hex}`
                          : "0 0 0 1.5px rgba(255,255,255,0.6)",
                        opacity: activePhoto === idx || hoveredPhoto === idx ? 1 : 0.6,
                        transform: activePhoto === idx || hoveredPhoto === idx ? "scale(1.08)" : "scale(1)",
                      }}
                    >
                      <Image src={src} alt={`Photo ${idx + 1}`} fill sizes="56px" className="object-cover" />
                    </button>
                  );
                })}

                {/* Down arrow */}
                <button
                  onClick={() => setGalleryOffset((o) => Math.min(gallery.length - THUMB_VISIBLE, o + 1))}
                  disabled={galleryOffset >= gallery.length - THUMB_VISIBLE}
                  className="w-8 h-8 rounded-none flex items-center justify-center transition-all duration-200 disabled:opacity-0"
                  style={{
                    background: "rgba(255,255,255,0.70)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5l3 3 3-3" stroke="#1a1a1a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Shade label */}
              <div
                className="absolute top-5 right-5 flex items-center gap-2 px-3 py-1.5 rounded-none"
                style={{
                  background: "rgba(255,255,255,0.60)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.80)",
                }}
              >
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: selected.hex }} />
                <span className="text-[9px] tracking-[0.28em] uppercase text-ink font-medium">{selected.label}</span>
              </div>

              {/* Photo counter */}
              <div
                className="absolute bottom-5 right-5 text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-none"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.70)",
                  color: "#1a1a1a",
                }}
              >
                {displayedPhoto + 1} / {gallery.length}
              </div>
            </div>
          </div>

          {/* ── Right: Info ── */}
          <div className="w-full lg:w-[48%] flex flex-col gap-0 pt-1">

            {/* Header */}
            <div className="mb-4">
              <p className="text-[9px] tracking-[0.4em] uppercase text-mid mb-3">
                RAWE · Creamy Blush Stick
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-light text-ink leading-[1.05] tracking-tight mb-4">
                {selected.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl text-ink font-light">${selected.priceUSD}.00</span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-mid border border-mid/30 rounded-none px-3 py-1">
                  In Stock
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-ink/8 mb-8" />

            {/* Description */}
            <p className="text-sm text-mid leading-relaxed mb-5">
              A lightweight, buildable blush stick that melts into skin for a natural,
              lit-from-within flush. Blends in seconds, lasts up to 8 hours.
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-mid">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,0,0,0.07)" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4.2l1.6 1.6 3.4-3.4" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="h-px bg-ink/8 mb-8" />

            {/* Shade picker */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] tracking-[0.25em] uppercase text-mid">
                  Shade
                </p>
                <span className="text-sm text-ink">{selected.name}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {shades.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelected(s)}
                    title={s.name}
                    className="group relative w-11 h-11 rounded-none overflow-hidden transition-all duration-200 hover:scale-110 flex-shrink-0"
                    style={{
                      boxShadow: selected.id === s.id
                        ? `0 0 0 2px #fff, 0 0 0 3.5px ${s.hex}`
                        : "none",
                    }}
                  >
                    <Image src={s.swatch} alt={s.name} fill sizes="44px" className="object-cover" />
                    {selected.id === s.id && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5.2l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                    {/* Tooltip */}
                    <span
                      className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-none px-2 py-0.5 text-[9px] tracking-wide text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                      style={{ background: "#1a1a1a" }}
                    >
                      {s.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAdd}
                className="flex-1 liquid-glass-btn justify-center py-4 text-sm tracking-[0.18em]"
                style={added ? { background: "#1a1a1a", color: "#fff", borderColor: "#1a1a1a" } : {}}
              >
                {added ? "Added to Bag ✓" : `Add to Bag · $${selected.priceUSD}`}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              {[
                { icon: "🚚", label: "Free Shipping", sub: "Orders over $50" },
                { icon: "↩", label: "Easy Returns", sub: "30-day policy" },
                { icon: "✦", label: "Clean Formula", sub: "Dermatologist tested" },
              ].map(({ icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-1 py-3 px-2 rounded-none"
                  style={{
                    background: "rgba(255,255,255,0.45)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.65)",
                  }}
                >
                  <span className="text-base">{icon}</span>
                  <span className="text-[9px] tracking-[0.15em] uppercase text-ink font-medium leading-tight">{label}</span>
                  <span className="text-[8px] text-mid leading-tight">{sub}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-ink/8 mb-0" />

            {/* Accordion details */}
            <div>
              {details.map(({ label, value }) => (
                <div key={label} className="border-b border-ink/8">
                  <button
                    onClick={() => setOpenDetail(openDetail === label ? null : label)}
                    className="w-full flex items-center justify-between py-4 text-left group"
                  >
                    <span className="text-xs tracking-[0.2em] uppercase text-ink group-hover:text-mid transition-colors">
                      {label}
                    </span>
                    <svg
                      width="14" height="14" viewBox="0 0 14 14" fill="none"
                      className="flex-shrink-0 transition-transform duration-300 text-mid"
                      style={{ transform: openDetail === label ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: openDetail === label ? "120px" : "0px" }}
                  >
                    <p className="text-sm text-mid leading-relaxed pb-4">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* View all link */}
            <Link
              href="/#products"
              className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-mid hover:text-ink transition-colors duration-200 group"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:-translate-x-1">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              View all shades
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
