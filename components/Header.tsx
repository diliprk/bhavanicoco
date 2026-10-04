"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const links = [
    ["about", t.nav.about],
    ["eligibility", t.nav.eligibility],
    ["roadmap", t.nav.roadmap],
    ["team", t.nav.team],
    ["volunteer", t.nav.volunteer],
    ["contact", t.nav.contact],
  ];
  return (
    <header className="sticky top-0 z-40 bg-green text-cream shadow">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:bg-gold focus:p-2 focus:text-ink">
        {t.skip}
      </a>
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2">
        <a href="#top" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Sri Bhavani Coconut Producers Society" width={48} height={48} className="h-12 w-12" />
          <span className="hidden font-serif text-sm font-bold leading-tight sm:block">
            Sri Bhavani
            <br />
            Coconut Producers Society
          </span>
        </a>
        <nav className="ml-auto hidden items-center gap-5 text-sm font-medium lg:flex" aria-label="Main">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="hover:text-gold">
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-0" role="group" aria-label="Language">
          {(["en", "ta"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`min-h-10 rounded-full px-3 text-sm font-bold ${lang === l ? "bg-gold text-ink" : "border border-cream/50 hover:bg-cream/15"}`}
            >
              {l === "en" ? "EN" : "தமிழ்"}
            </button>
          ))}
        </div>
        <a href="#join" className="hidden min-h-10 items-center rounded-full bg-brand-red px-4 text-sm font-bold sm:inline-flex">
          {t.nav.apply}
        </a>
        <button
          className="min-h-10 rounded border border-cream/50 px-3 lg:hidden"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>
      {open && (
        <nav className="border-t border-cream/20 bg-green-dark px-4 py-2 lg:hidden" aria-label="Mobile">
          {[...links, ["join", t.nav.apply]].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block py-3 text-base font-medium">
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
