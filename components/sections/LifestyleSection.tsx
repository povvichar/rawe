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
      className="relative py-16 sm:py-20 md:py-32"
      style={{
        background: "linear-gradient(180deg, #F9F1EE 0%, #FFFFFF 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 grid md:grid-cols-5 gap-10 md:gap-12 items-center">
        <div className="md:col-span-3 text-center md:text-left">
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-ink leading-[1.05]">
            Beauty That Fits
            <br />
            Your Everyday Life
          </h2>
          <p className="mt-5 md:mt-6 text-sm md:text-base text-mid leading-relaxed max-w-xl mx-auto md:mx-0">
            Whether you&rsquo;re going to work, meeting friends, or attending a
            special event — RAWE blush gives you confidence with just one
            swipe.
          </p>
          <ul className="mt-6 md:mt-8 space-y-3 inline-block text-left">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-ink text-sm md:text-base">
                <span className="text-accent">✦</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 flex justify-center order-first md:order-last">
          <div id="lifestyle-product" className="will-change-transform">
            <Image
              src="/assets/main-pro1.webp"
              alt="RAWE blush stick"
              width={320}
              height={580}
              className="h-[min(40vh,360px)] md:h-[min(60vh,520px)] w-auto drop-shadow-xl"
              style={{ transform: "rotate(12deg)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
