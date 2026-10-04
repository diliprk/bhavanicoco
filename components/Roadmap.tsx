"use client";

import { useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { buildRoadmapSvg } from "@/lib/roadmapSvg";
import { RichText, Section } from "./ui";

export default function Roadmap() {
  const { t } = useI18n();
  const { wide, tall } = useMemo(
    () => ({
      wide: buildRoadmapSvg(t.roadmap, "wide"),
      tall: buildRoadmapSvg(t.roadmap, "tall"),
    }),
    [t],
  );
  return (
    <Section id="roadmap" title={t.roadmap.title} tone="cream">
      <p className="max-w-3xl text-lg">{t.roadmap.intro}</p>
      {/* Static, trusted SVG strings built from our own dictionaries */}
      <div className="mt-8 hidden md:block" dangerouslySetInnerHTML={{ __html: wide }} />
      <div className="mx-auto mt-8 max-w-sm md:hidden" dangerouslySetInnerHTML={{ __html: tall }} />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {t.roadmap.steps.map((s, i) => (
          <article key={s.title} className="rounded-2xl border-2 border-brown/20 bg-white p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-red">
              {t.roadmap.stepLabel} {i}
              {i === 0 && <span className="ml-2 rounded bg-brand-red px-2 py-0.5 text-xs text-cream">{t.roadmap.current}</span>}
            </p>
            <h3 className="mt-1 font-serif text-xl font-bold text-green">{s.title}</h3>
            <p className="mt-1 italic text-ink/80">{s.sub}</p>
            <ul className="mt-4 space-y-3">
              {s.items.map((it) => (
                <li key={it.h} className="leading-relaxed">
                  <strong className="text-green-dark">{it.h}:</strong> <RichText text={it.t} />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
