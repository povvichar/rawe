"use client";
import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface Toast {
  id: number;
  name: string;
  hex: string;
}

interface ToastCtx {
  show: (name: string, hex: string) => void;
}

const Ctx = createContext<ToastCtx>({ show: () => {} });

let _id = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const show = useCallback((name: string, hex: string) => {
    const id = ++_id;
    setToasts((p) => [...p, { id, name, hex }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3000);
  }, []);

  const toastList = (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="cart-toast flex items-center gap-3 px-4 py-3 rounded-none text-sm text-ink whitespace-nowrap"
          style={{
            background: "rgba(255,255,255,0.38)",
            backdropFilter: "blur(28px) saturate(200%) brightness(1.06)",
            WebkitBackdropFilter: "blur(28px) saturate(200%) brightness(1.06)",
            border: "1px solid rgba(255,255,255,0.60)",
            boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.80), 0 8px 32px rgba(0,0,0,0.08)",
          }}
        >
          <span
            className="w-3.5 h-3.5 rounded-full flex-shrink-0 ring-1 ring-black/10"
            style={{ background: t.hex }}
          />
          <span className="font-display tracking-wide">{t.name}</span>
          <span className="text-mid text-xs">added to bag</span>
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(0,0,0,0.08)" }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5.2l2 2 4-4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      {mounted && createPortal(toastList, document.documentElement)}
    </Ctx.Provider>
  );
}

export function useToast() {
  return useContext(Ctx);
}
