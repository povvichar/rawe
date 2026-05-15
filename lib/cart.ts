"use client";
import { useEffect, useState, useCallback } from "react";

export type CartItem = {
  shadeId: string;
  name: string;
  hex: string;
  priceUSD: number;
  qty: number;
};

const KEY = "rawe.cart.v1";

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("rawe:cart", { detail: items }));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(read());
    const onChange = (e: Event) =>
      setItems((e as CustomEvent<CartItem[]>).detail);
    window.addEventListener("rawe:cart", onChange);
    return () => window.removeEventListener("rawe:cart", onChange);
  }, []);

  const add = useCallback((item: Omit<CartItem, "qty">) => {
    const cur = read();
    const i = cur.findIndex((c) => c.shadeId === item.shadeId);
    if (i >= 0) cur[i].qty += 1;
    else cur.push({ ...item, qty: 1 });
    write(cur);
  }, []);

  const remove = useCallback((shadeId: string) => {
    write(read().filter((c) => c.shadeId !== shadeId));
  }, []);

  const changeQty = useCallback((shadeId: string, delta: number) => {
    const cur = read();
    const i = cur.findIndex((c) => c.shadeId === shadeId);
    if (i < 0) return;
    cur[i].qty = Math.max(1, cur[i].qty + delta);
    write(cur);
  }, []);

  const count = items.reduce((n, i) => n + i.qty, 0);

  return { items, add, remove, changeQty, count };
}
