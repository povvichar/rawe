import Link from "next/link";
import { nav, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <p className="font-display text-2xl text-white font-light tracking-[0.3em]">
              {site.name}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              A natural glow brand made for Cambodian skin tones.
            </p>
          </div>

          <div>
            <p className="text-white/80 text-sm uppercase tracking-widest mb-4">
              Shop
            </p>
            <ul className="space-y-2 text-sm text-white/40">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white/80 text-sm uppercase tracking-widest mb-4">
              Follow
            </p>
            <ul className="space-y-2 text-sm text-white/40">
              <li>
                <a
                  href={site.social.instagram}
                  className="hover:text-white transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.social.tiktok}
                  className="hover:text-white transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href={site.social.facebook}
                  className="hover:text-white transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs text-white/40 gap-3">
          <p>© {new Date().getFullYear()} RAWE. All rights reserved.</p>
          <Link href="/privacy" className="hover:text-white transition">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
