"use client";

import { useI18n } from "@/lib/i18n";
import { Section, SourceLink } from "./ui";

export function Vision() {
  const { t } = useI18n();
  return (
    <Section id="about" title={t.vision.title} tone="cream">
      <p className="font-serif text-2xl font-bold text-brand-red sm:text-3xl">{t.vision.motto}</p>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">{t.vision.body1}</p>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed">
        {t.vision.body2} <SourceLink id="cdb" label="CDB" />
      </p>
    </Section>
  );
}

export function Eligibility() {
  const { t } = useI18n();
  return (
    <Section id="eligibility" title={t.eligibility.title}>
      <p className="max-w-3xl text-lg leading-relaxed">{t.eligibility.intro}</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {t.eligibility.cards.map((c, i) => (
          <div key={c.h} className="rounded-2xl border-2 border-brown/20 bg-white p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green font-bold text-gold">{i + 1}</span>
            <h3 className="mt-3 font-serif text-xl font-bold text-green">{c.h}</h3>
            <p className="mt-2 leading-relaxed">{c.t}</p>
            <p className="mt-3">
              {i === 0 && <SourceLink id="erode" label={t.eligibility.taluksSource} />}
              {i === 1 && <SourceLink id="byelaws" label={t.eligibility.source} />}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-8 rounded-2xl border-l-8 border-gold bg-cream p-5 text-lg leading-relaxed">{t.eligibility.priority}</p>
    </Section>
  );
}
