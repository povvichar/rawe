"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { shades, type Shade } from "@/data/shades";
import { useCart } from "@/lib/cart";

function ShadeCard({ shade }: { shade: Shade }) {
  const { add } = useCart();
  return (
    <article className="shade-card group rounded-2xl bg-[#FAFAFA] p-5 flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white">
        <div
          className="absolute inset-0 mix-blend-multiply z-10"
          style={{ backgroundColor: shade.hex, opacity: 0.5 }}
          aria-hidden
        />
        <Image
          src="/assets/main-pro1.png"
          alt={shade.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full ring-1 ring-black/5"
          style={{ backgroundColor: shade.hex }}
          aria-hidden
        />
        <p className="text-sm font-medium text-ink">
          {shade.id} · {shade.name}
        </p>
      </div>
      <p className="text-xs text-mid mt-1">{shade.label}</p>
      <button
        onClick={() =>
          add({
            shadeId: shade.id,
            name: shade.name,
            hex: shade.hex,
            priceUSD: shade.priceUSD,
          })
        }
        className="mt-3 rounded-full text-xs tracking-[0.18em] uppercase px-4 py-2 text-ink hover:opacity-90 transition"
        style={{ backgroundColor: shade.hex }}
      >
        Add to Cart · ${shade.priceUSD}
      </button>
    </article>
  );
}

export default function ProductsSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".products-title-block",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            once: true,
          },
        }
      );
      gsap.fromTo(
        ".shade-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="products"
      className="relative bg-products py-24 md:py-32"
    >
      <div className="products-title-block text-center px-12 mb-14">
        <p className="text-[11px] tracking-[0.3em] uppercase text-mid mb-3">
          New Collection
        </p>
        <h2 className="font-display text-5xl md:text-6xl font-light text-ink">
          Our Products
        </h2>
        <p className="mt-3 text-sm text-mid">
          8 Shades, One for Every You
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shades.map((s) => (
          <ShadeCard key={s.id} shade={s} />
        ))}
      </div>
    </section>
  );
}
