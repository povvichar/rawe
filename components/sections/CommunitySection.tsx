"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { site } from "@/data/site";

const socials = [
  { label: "Instagram", handle: "@raweofficail", href: site.social.instagram, icon: "/assets/ig.svg" },
  { label: "TikTok",    handle: "@raweofficail", href: site.social.tiktok,    icon: "/assets/tiktok.svg" },
  { label: "Facebook",  handle: "@raweofficail", href: site.social.facebook,  icon: "/assets/fb.svg" },
];

const photos = [
  "/assets/social-media/img1.png",
  "/assets/social-media/img2.png",
  "/assets/social-media/img3.png",
  "/assets/social-media/img4.png",
  "/assets/social-media/img5.png",
  "/assets/social-media/img6.png",
];

export default function CommunitySection() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".community-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        }
      );

      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth / 2;
      gsap.to(track, {
        x: -totalWidth,
        duration: 40,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="community" className="bg-hero py-16 sm:py-20 md:py-28 overflow-hidden">
      {/* Title */}
      <div className="community-title text-center px-5 mb-10 sm:mb-12">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-ink">
          Loved by Our Community
        </h2>
       {/* <p className="mt-2 text-xs sm:text-sm text-mid">Follow us {site.social.handle}</p>*/}
      </div>

      {/* Social pills — liquid glass */}
      <div className="community-title flex justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-5">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 sm:px-4 py-2 sm:py-1.5 rounded-full text-xs sm:text-sm text-ink transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.20)",
              border: "0px solid rgba(255,255,255,0.4)",
              backdropFilter: "blur(24px) saturate(200%) brightness(1.05)",
              WebkitBackdropFilter: "blur(24px) saturate(200%) brightness(1.05)",
              boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.75)",
            }}
          >
            <Image src={s.icon} alt={s.label} width={16} height={16} />
            <span>{s.handle}</span>
          </a>
        ))}
      </div>

      {/* Infinite marquee gallery */}
      <div className="relative w-full">
        <div ref={trackRef} className="flex gap-4 w-max">
          {[...photos, ...photos].map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[250px] sm:w-[280px] md:w-[320px] aspect-square rounded-2xl overflow-hidden"
              style={{ border: "6px solid rgba(255,255,255,0.35)", boxShadow: "none" }}
            >
              <Image
                src={src}
                alt={`Community photo ${(i % photos.length) + 1}`}
                fill
                sizes="380px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
