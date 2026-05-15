"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart";

const shadeImg: Record<string, string> = {
  "Rosewood":       "/assets/products/Rosewood.webp",
  "Cotton Candy":   "/assets/products/Cotton candy.webp",
  "Champagne Glow": "/assets/products/Champagne glow.webp",
  "Cappuccino":     "/assets/products/Cappucino.webp",
  "Plushing":       "/assets/products/Plushing.webp",
  "Rosy Posy":      "/assets/products/Rosy Posy.webp",
  "Spiced":         "/assets/products/Spiced.webp",
  "Summer Orange":  "/assets/products/Summer orange.webp",
};

interface Props {
  onClose: () => void;
}

export default function CartDropdown({ onClose }: Props) {
  const { items, remove, changeQty } = useCart();
  const ref = useRef<HTMLDivElement>(null);

  const total = items.reduce((s, i) => s + i.priceUSD * i.qty, 0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="cart-dropdown-pop absolute right-0 mt-3 w-[340px] rounded-3xl overflow-hidden z-50"
      style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(80px) saturate(220%) brightness(1.08)",
        WebkitBackdropFilter: "blur(80px) saturate(220%) brightness(1.08)",
        border: "1px solid rgba(255,255,255,0.55)",
        boxShadow:
          "inset 0 1.5px 0 rgba(255,255,255,0.75), 0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.40)" }}
      >
        <span className="font-display text-ink text-base tracking-wide">My Bag</span>
        {items.length > 0 && (
          <span
            className="text-xs text-mid px-2 py-0.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.40)" }}
          >
            {items.reduce((s, i) => s + i.qty, 0)} {items.reduce((s, i) => s + i.qty, 0) === 1 ? "item" : "items"}
          </span>
        )}
      </div>

      {/* Empty state */}
      {items.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <p className="text-mid text-sm">Your bag is empty.</p>
          <button
            onClick={onClose}
            className="mt-4 text-xs text-ink underline underline-offset-2"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Items */}
          <ul className="max-h-[300px] overflow-y-auto">
            {items.map((item) => (
              <li
                key={item.shadeId}
                className="flex items-center gap-3 px-5 py-3.5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.30)" }}
              >
                {/* Thumbnail */}
                <div
                  className="relative flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden"
                  style={{
                    background: item.hex ?? "rgba(255,255,255,0.35)",
                    border: "1px solid rgba(255,255,255,0.55)",
                  }}
                >
                  {shadeImg[item.name] ? (
                    <Image src={shadeImg[item.name]} alt={item.name} fill className="object-cover" sizes="56px" />
                  ) : (
                    <div className="w-full h-full rounded-xl" style={{ background: item.hex }} />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-display text-ink text-sm truncate">{item.name}</p>
                  <p className="text-mid text-xs mt-0.5">Creamy Blush Stick</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button
                      onClick={() => changeQty(item.shadeId, -1)}
                      className="w-5 h-5 rounded-full text-ink text-xs flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                      style={{
                        background: "rgba(255,255,255,0.50)",
                        border: "1px solid rgba(255,255,255,0.60)",
                      }}
                    >
                      −
                    </button>
                    <span className="text-ink text-xs w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => changeQty(item.shadeId, 1)}
                      className="w-5 h-5 rounded-full text-ink text-xs flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                      style={{
                        background: "rgba(255,255,255,0.50)",
                        border: "1px solid rgba(255,255,255,0.60)",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price + remove */}
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className="font-sans text-ink text-sm">${(item.priceUSD * item.qty).toFixed(2)}</span>
                  <button
                    onClick={() => remove(item.shadeId)}
                    className="text-mid text-[10px] hover:text-ink transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="px-5 py-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-mid text-sm font-medium">Total</span>
              <span className="font-sans text-ink text-base font-medium">${total.toFixed(2)}</span>
            </div>
            <a href="/cart" className="liquid-glass-btn w-full justify-center text-sm py-3">
              Checkout
            </a>
            <button
              className="w-full text-center text-xs text-mid mt-3 hover:text-ink transition-colors duration-200"
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
}
