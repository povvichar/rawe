"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";

const features = [
  "Blends in 3 seconds",
  "Lasts up to 8 hours",
  "No brush needed",
];

export default function LifestyleSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to("#lifestyle-product", {
        y: -12,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="lifestyle"
      className="relative py-24 md:py-32"
      style={{
        background: "linear-gradient(180deg, #F9F1EE 0%, #FFFFFF 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-12 grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-3">
          <h2 className="font-display text-4xl md:text-6xl font-light text-ink leading-[1.05]">
            Beauty That Fits
            <br />
            Your Everyday Life
          </h2>
          <p className="mt-6 text-mid leading-relaxed max-w-xl">
            Whether you&rsquo;re going to work, meeting friends, or attending a
            special event — RAWE blush gives you confidence with just one
            swipe.
          </p>
          <ul className="mt-8 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-ink">
                <span className="text-accent">✦</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 flex justify-center">
          <div id="lifestyle-product" className="will-change-transform">
            <Image
              src="/assets/main-pro1.png"
              alt="RAWE blush stick"
              width={320}
              height={580}
              className="h-[min(60vh,520px)] w-auto drop-shadow-xl"
              style={{ transform: "rotate(12deg)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
