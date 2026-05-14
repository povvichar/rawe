"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { site } from "@/data/site";

const socials = [
  { label: "Instagram", href: site.social.instagram },
  { label: "TikTok", href: site.social.tiktok },
  { label: "Facebook", href: site.social.facebook },
];

const tiles = [
  { ratio: "aspect-[4/5]", tint: "#F2C5C0" },
  { ratio: "aspect-square", tint: "#E8A4A0" },
  { ratio: "aspect-[3/4]", tint: "#E8B89A" },
  { ratio: "aspect-[3/4]", tint: "#C4909A" },
  { ratio: "aspect-[4/5]", tint: "#D98C80" },
  { ratio: "aspect-square", tint: "#B07088" },
];

export default function CommunitySection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".gallery-tile",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="community" className="bg-hero py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="font-display text-4xl md:text-6xl font-light text-ink">
            Loved by Our Community
          </h2>
          <p className="mt-3 text-sm text-mid">
            Follow us {site.social.handle}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-5 py-2.5 text-sm text-ink hover:bg-accent hover:text-ink transition shadow-sm"
            >
              {s.label} · {site.social.handle}
            </a>
          ))}
        </div>

        <div className="mt-14 columns-2 md:columns-3 gap-4 [column-fill:_balance]">
          {tiles.map((t, i) => (
            <a
              key={i}
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`gallery-tile group block mb-4 break-inside-avoid rounded-2xl overflow-hidden ${t.ratio} relative`}
              style={{ backgroundColor: t.tint }}
            >
              <span className="absolute inset-0 flex items-center justify-center text-white/0 group-hover:text-white group-hover:bg-black/30 transition text-sm tracking-wide">
                View Post
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
