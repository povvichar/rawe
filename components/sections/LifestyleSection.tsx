"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import coverProduct from "@/assets/cover-prodcut.webp";

// ── Vertical position of the headline behind the products ──
// Smaller % = higher up · Larger % = further down (it's % of the image height)
const HEADLINE_TOP = "18%";

export default function LifestyleSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".ls-label",
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true } }
    );
    gsap.fromTo(".ls-headline",
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true } }
    );
    gsap.fromTo(".ls-image",
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true } }
    );
  }, { scope: ref });

  return (
    <section ref={ref} id="lifestyle" className="relative overflow-hidden bg-hero pt-32 sm:pt-44 md:pt-60">

      {/* Label — fixed near the top */}
      <p
        className="ls-label absolute inset-x-0 top-[12%] z-0 text-center text-[9px] sm:text-[11px] tracking-[0.45em] uppercase select-none pointer-events-none"
        style={{ color: "rgba(0,0,0,0.45)" }}
      >
        Made for real life
      </p>

      {/* Headline behind — move up/down with HEADLINE_TOP above */}
      <h2
        className="ls-headline absolute inset-x-0 z-0 px-4 text-center font-display font-light leading-[1.0] text-[clamp(34px,7vw,120px)] select-none pointer-events-none"
        style={{ top: HEADLINE_TOP, color: "rgba(0,0,0,0.05)" }}
      >
        Beauty That Fits
        <br />
        Your Everyday Life
      </h2>

      {/* Product image in front — defines section height, hides text behind it */}
      <div className="ls-image relative z-10">
        <Image
          src={coverProduct}
          alt="RAWE blush sticks lineup"
          width={3840}
          height={983}
          className="w-full h-auto block"
          style={{ mixBlendMode: "multiply" }}
          priority
        />
      </div>

    </section>
  );
}
