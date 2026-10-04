"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/lib/config";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// Renders nothing when no site key is configured (e.g. local development).
export default function Turnstile({ onToken, resetKey }: { onToken: (t: string) => void; resetKey: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!SITE.turnstileSiteKey || !ref.current) return;
    const mount = () => {
      if (!window.turnstile || !ref.current || widget.current) return;
      widget.current = window.turnstile.render(ref.current, {
        sitekey: SITE.turnstileSiteKey,
        callback: onToken,
        "expired-callback": () => onToken(""),
      });
    };
    if (window.turnstile) mount();
    else {
      let s = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
      if (!s) {
        s = document.createElement("script");
        s.src = SRC;
        s.async = true;
        document.head.appendChild(s);
      }
      s.addEventListener("load", mount);
      return () => s?.removeEventListener("load", mount);
    }
  }, [onToken]);

  useEffect(() => {
    if (resetKey && widget.current) window.turnstile?.reset(widget.current);
  }, [resetKey]);

  return SITE.turnstileSiteKey ? <div ref={ref} /> : null;
}
