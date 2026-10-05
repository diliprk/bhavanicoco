"use client";

import { useI18n } from "@/lib/i18n";
import { LinkButton } from "./ui";

export default function Hero() {
  const { t } = useI18n();
  return (
    <div id="top" className="bg-green text-cream">
      <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-14 sm:py-20 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h1 className="font-serif text-3xl font-bold leading-tight sm:text-5xl">Sri Bhavani Coconut Producers Society</h1>
          <p className="mt-4 text-xl font-semibold text-gold sm:text-2xl">{t.hero.tagline}</p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/90">{t.hero.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href="#join">{t.hero.cta}</LinkButton>
            <LinkButton href="#volunteer" variant="outline">
              {t.hero.cta2}
            </LinkButton>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="" width={320} height={320} className="mx-auto w-56 drop-shadow-xl sm:w-72" />
      </div>
    </div>
  );
}
