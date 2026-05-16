"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { nav } from "@/data/site";
import { useCart } from "@/lib/cart";
import CartDropdown from "@/components/ui/CartDropdown";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartPop, setCartPop] = useState(false);
  const lastY = useRef(0);
  const { count } = useCart();

  useEffect(() => {
    const onAdd = () => {
      setCartPop(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setCartPop(true)));
      setTimeout(() => setCartPop(false), 600);
    };
    window.addEventListener("rawe:cart", onAdd);
    return () => window.removeEventListener("rawe:cart", onAdd);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // Hide (slide up + fade) when scrolling down past 80px; reveal on scroll up
      if (y > lastY.current && y > 80) {
        setHidden(true);
      } else if (y < lastY.current) {
        setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
        ${scrolled ? "backdrop-blur-md bg-white/​50  border-black/1" : "bg-transparent"}
        ${hidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}
      `}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-14 py-4">
        <Link href="/" aria-label="RAWE home">
          <Image src="/assets/logo-circle.svg" alt="RAWE" width={48} height={48} priority />
        </Link>

        <ul className="hidden md:flex items-center gap-12 text-base">
          {nav.links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="relative group inline-block font-display hover:text-ink transition-colors duration-300"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ink transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/account"
            aria-label="Account"
            className="p-2 transition-all duration-300 hover:opacity-60 hover:scale-110"
          >
            <Image src="/assets/user.svg" width={20} height={20} alt="" />
          </Link>
          <div className="relative">
            <button
              onClick={() => setCartOpen((v) => !v)}
              aria-label="Cart"
              className={`relative p-2 transition-all duration-300 hover:opacity-60 hover:scale-110 ${cartPop ? "cart-pop" : ""}`}
            >
              <Image src="/assets/cart.svg" width={20} height={20} alt="" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-ink text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            {cartOpen && <CartDropdown onClose={() => setCartOpen(false)} />}
          </div>
        </div>
      </nav>
    </header>
  );
}
