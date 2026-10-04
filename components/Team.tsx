"use client";

import { useI18n } from "@/lib/i18n";
import { ADVISORS, BOARD, type Person } from "@/lib/team";
import { Section } from "./ui";

const initials = (name: string) =>
  name
    .replace(/^[A-Z]\.\s*/, "")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function Card({ p }: { p: Person }) {
  const { lang } = useI18n();
  return (
    <div className="flex items-start gap-4 rounded-2xl border-2 border-brown/20 bg-white p-5">
      {p.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.photo} alt="" className="h-16 w-16 shrink-0 rounded-full object-cover" />
      ) : (
        <span aria-hidden className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green font-serif text-xl font-bold text-gold">
          {initials(p.name.en)}
        </span>
      )}
      <div>
        <h4 className="font-serif text-lg font-bold text-green">{p.name[lang]}</h4>
        <p className="font-semibold text-brand-red">{p.role[lang]}</p>
        {p.org && <p className="text-sm">{p.org[lang]}</p>}
        {p.phone && (
          <a href={`tel:${p.phone.tel}`} className="mt-1 inline-block text-sm font-semibold text-green underline decoration-gold decoration-2 underline-offset-2">
            {p.phone.display}
          </a>
        )}
      </div>
    </div>
  );
}

export default function Team() {
  const { t } = useI18n();
  return (
    <Section id="team" title={t.team.title}>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-brown">{t.team.board}</h3>
      <p className="mb-4 max-w-3xl">{t.team.boardNote}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {BOARD.map((p) => (
          <Card key={p.name.en} p={p} />
        ))}
      </div>
      <h3 className="mb-4 mt-10 text-sm font-bold uppercase tracking-wider text-brown">{t.team.advisors}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {ADVISORS.map((p) => (
          <Card key={p.name.en} p={p} />
        ))}
      </div>
    </Section>
  );
}
