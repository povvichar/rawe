import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/data/site";

const socials = [
  { label: "Tiktok",    href: site.social.tiktok,    icon: "/assets/tiktok.svg" },
  { label: "Instagram", href: site.social.instagram,  icon: "/assets/ig.svg" },
  { label: "Facebook",  href: site.social.facebook,   icon: "/assets/fb.svg" },
];

const legal = [
  { label: "Returns & Refunds", href: "/returns" },
  { label: "FAQs",              href: "/faqs" },
  { label: "Privacy Policy",    href: "/privacy" },
  { label: "Terms & Conditions",href: "/terms" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#E6E6E6" }} className="text-ink">
      <div className="mx-auto max-w-7xl px-8 md:px-14 py-14 md:py-16">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-8">

          {/* Logo */}
          <div className="flex flex-col items-start">
            <Image src="/assets/vertical-logo.svg" alt="RAWE" width={108} height={108} style={{ opacity: 0.7 }} />
          </div>

          {/* Right columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">

          {/* Nav links */}
          <div>
            <ul className="space-y-4 text-base font-display font-light text-ink">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="relative group inline-block hover:text-ink/60 transition-colors duration-300">
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ink transition-all duration-300 ease-out group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <ul className="space-y-4 text-base font-display font-light text-ink">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group inline-flex items-center gap-2.5 hover:text-ink/60 transition-colors duration-300"
                  >
                    <Image src={s.icon} alt={s.label} width={16} height={16} className="opacity-80" />
                    {s.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ink transition-all duration-300 ease-out group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <ul className="space-y-4 text-base font-display font-light text-ink">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="relative group inline-block hover:text-ink/60 transition-colors duration-300">
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ink transition-all duration-300 ease-out group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          </div>{/* end right columns */}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-ink/10 flex justify-center">
          <p className="text-sm text-ink/50">
            © {new Date().getFullYear()} RAWE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
