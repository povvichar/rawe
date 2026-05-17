"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { site } from "@/data/site";

const footerNav = [
  { label: "Shop",       href: "/#products" },
  { label: "Our Story",  href: "/story" },
  { label: "Contact us", href: "/contact" },
];

const legal = [
  { label: "Returns & Refunds",  href: "/returns" },
  { label: "FAQs",               href: "/faqs" },
  { label: "Privacy Policy",     href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const socials = [
  { label: "TikTok",    href: site.social.tiktok,    icon: "/assets/tiktok.svg" },
  { label: "Instagram", href: site.social.instagram, icon: "/assets/ig.svg" },
  { label: "Facebook",  href: site.social.facebook,  icon: "/assets/fb.svg" },
];

function LinkItem({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="relative group inline-block font-display font-light text-normal text-ink hover:text-ink/55 transition-colors duration-300"
      >
        {label}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ink transition-all duration-300 ease-out group-hover:w-full" />
      </Link>
    </li>
  );
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      style={{ backgroundColor: "#FFFFFF" }}
      className={`text-ink transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="mx-auto max-w-7xl px-8 md:px-16 pt-10 md:pt-12 pb-6">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-14 lg:gap-8">

          {/* Brand */}
          <div className="max-w-md">
            <Image
              src="/assets/Logo.svg"
              alt="RAWE"
              width={170}
              height={56}
              className="h-12 md:h-14 w-auto"
            />
            <p className="mt-7 text-sm md:text-[14px] leading-relaxed text-ink/45">
              <span className="block text-ink/70">Natural Glow, Made for Your Skin.</span>
              A creamy blush that blends effortlessly and flatters every
              Cambodian skin tone.
            </p>

            {/* Socials */}
            <div className="mt-8 flex items-center gap-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  <Image src={s.icon} alt={s.label} width={18} height={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-12 sm:gap-20 lg:gap-28 lg:pr-4">
            <ul className="space-y-5">
              {footerNav.map((l) => (
                <LinkItem key={l.href} {...l} />
              ))}
            </ul>
            <ul className="space-y-5">
              {legal.map((l) => (
                <LinkItem key={l.href} {...l} />
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-ink/10 flex justify-center">
          <p className="text-sm md:text-[13px] text-ink/40">
            © {new Date().getFullYear()} RAWE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
