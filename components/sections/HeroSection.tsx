"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

/**
 * Frame breakdown (animation breakdown.pdf):
 *  01  hero copy top, product tilted below with clouds around
 *  02  product scales up & rises
 *  03  hero copy fades out
 *  04  RAEW watermark fades in behind product
 *  05  watermark scales larger
 *  06  product exits top, watermark dominates
 *  07  watermark fades up, "Our Products" peeks in
 *  08  watermark gone, "Our Products" centered
 *  09  white bg, products grid revealed
 */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      // Page load — karaoke word-by-word entrance
      gsap.set([".hero-word", ".hero-sub", ".hero-btn"], { opacity: 0, y: 18 });
      gsap.set(["#cloud-left", "#cloud-right", "#product-float", "#smoke"], { opacity: 0, y: -30 });

      gsap.timeline({ delay: 0.15 })
        .to(".hero-word",     { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power2.out" })
        .to(".hero-sub",      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "-=0.15")
        .to(".hero-btn",      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.25")
        .to("#cloud-left",    { opacity: 0.95, y: 0, duration: 1,   ease: "power3.out" }, 0.2)
        .to("#cloud-right",   { opacity: 0.95, y: 0, duration: 1,   ease: "power3.out" }, 0.1)
        .to("#product-float", { opacity: 1,    y: 0, duration: 1.1, ease: "power3.out" }, 0.3)
        .to("#smoke",         { opacity: 1,    y: 0, duration: 1.2, ease: "power3.out" }, 0.2);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          anticipatePin: 1,
          start: "top top",
          end: "+=160%",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Smoke transition — rises into products section as hero scrolls away
      const smokeEl = sectionRef.current!.querySelector<HTMLElement>("#smoke");
      const productsEl = document.querySelector<HTMLElement>("#products");
      if (smokeEl && productsEl) {
        gsap.fromTo(
          smokeEl,
          { y: 0, opacity: 0.9 },
          {
            y: "-60vh",
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: productsEl,
              start: "top bottom",
              end: "top 10%",
              scrub: 1.4,
            },
          }
        );
      }

      tl
        // 0 → 0.18 — product scales up & rises (frames 01 → 02)
        .fromTo(
          "#product-img",
          { scale: 1, y: 0 },
          { scale: 1.3, y: -80, ease: "power2.out" },
          0
        )
        // 0.05 → 0.22 — clouds drift outward & fade
        .fromTo(
          "#cloud-left",
          { x: 0, opacity: 0.95 },
          { x: "-22vw", opacity: 0.25, ease: "none" },
          0.05
        )
        .fromTo(
          "#cloud-right",
          { x: 0, opacity: 0.95 },
          { x: "22vw", opacity: 0.25, ease: "none" },
          0.05
        )
        // 0.10 → 0.28 — hero copy fades up & out (frame 02 → 03)
        .to(
          "#hero-copy",
          { opacity: 0, y: -30, ease: "power1.in" },
          0.1
        )
        // 0.20 → 0.55 — product keeps growing & rising (frames 03 → 06)
        .to(
          "#product-img",
          { scale: 1.7, y: -220, ease: "power1.inOut" },
          0.2
        )
        // 0.50 → 0.70 — product exits top (frame 06 → 07)
        .to(
          "#product-img",
          { y: -420, opacity: 0, ease: "power2.in" },
          0.50
        )
        // smoke handled by products-entry ScrollTrigger below (rises & fades as products enters)
        ;

      gsap.to("#product-float", {
        y: -14,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen bg-hero z-[2]"
    >
      {/* smoke — behind product, fills lower half */}
      <div
        id="smoke"
        className="absolute inset-x-0 z-[10] pointer-events-none"
        style={{
          bottom: "-30%",
          height: "65%",
          opacity: 1,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 35%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 35%)",
        }}
      >
        <Image
          src="/assets/main-smoke.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* hero copy — top center (frame 01) */}
      <div
        id="hero-copy"
        className="absolute z-[5] inset-x-0 top-[18vh] sm:top-[22vh] text-center px-5 sm:px-8 md:px-12 will-change-transform"
      >
        <h1 className="font-display font-bold leading-[1.05] text-ink text-[clamp(22px,3.8vw,58px)] mb-4 whitespace-nowrap">
          {["Natural", "Glow,", "Made", "for", "Your", "Skin"].map((word, i, arr) => (
            <span key={i} className="hero-word inline-block">
              {word}{i < arr.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
        <p className="hero-sub text-mid mx-auto leading-relaxed mb-8 sm:mb-10 text-[clamp(12px,1.3vw,17px)] whitespace-nowrap">
          A creamy blush that blends effortlessly and flatters every Cambodian skin tone.
        </p>
        <a href="#products" className="hero-btn liquid-glass-btn group/btn inline-flex items-center">
          <span className="inline-flex items-center justify-center overflow-hidden max-w-0 group-hover/btn:max-w-[16px] opacity-0 group-hover/btn:opacity-100 group-hover/btn:mr-2 transition-all duration-300 ease-out shrink-0">
            <Image src="/assets/cart.svg" alt="" width={20} height={20} className="invert shrink-0" />
          </span>
          Order Now
        </a>
      </div>

      {/* cloud left — flanking product */}
      <div
        id="cloud-left"
        className="absolute z-[6] pointer-events-none will-change-transform"
        style={{ top: "46%", left: "2%", width: "81vw", maxWidth: "1064px" }}
      >
        <Image
          src="/assets/cloud-left.webp"
          alt=""
          width={700}
          height={500}
          priority
          className="w-full h-auto"
        />
      </div>

      {/* cloud right — flanking product */}
      <div
        id="cloud-right"
        className="absolute z-[6] pointer-events-none will-change-transform"
        style={{ top: "40%", right: "2%", width: "81vw", maxWidth: "1064px" }}
      >
        <Image
          src="/assets/cloud-right.webp"
          alt=""
          width={700}
          height={500}
          priority
          className="w-full h-auto"
        />
      </div>

      {/* product — center, tilted, ON TOP of smoke */}
      <div
        id="product-float"
        className="absolute z-[7] left-1/2 will-change-transform pointer-events-none"
        style={{
          top: "82%",
          transform: "translate(-50%, -50%)",
          width: "min(92vw, 960px)",
        }}
      >
        <div id="product-img" className="relative will-change-transform w-full">
          <Image
            src="/assets/main-pro1.webp"
            alt="RAWE creamy blush stick"
            width={2251}
            height={1158}
            priority
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>
      </div>

    </section>
  );
}
