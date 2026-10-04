"use client";

import { useI18n } from "@/lib/i18n";
import { REFERENCE_LIST } from "@/lib/references";
import ContactLinks from "./ContactLinks";
import { Section } from "./ui";

export function References() {
  const { t, lang } = useI18n();
  return (
    <Section id="references" title={t.refs.title}>
      <p className="mb-5 text-lg">{t.refs.intro}</p>
      <ul className="grid gap-4 md:grid-cols-3">
        {REFERENCE_LIST.map((r) => (
          <li key={r.id} className="rounded-2xl border-2 border-brown/20 bg-white p-5">
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-green underline decoration-gold decoration-2 underline-offset-2"
            >
              {r.label[lang]} ↗
            </a>
            <p className="mt-2 text-sm">{r.note[lang]}</p>
            <p className="mt-2 break-all text-xs text-ink/60">{r.url}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Contact() {
  const { t } = useI18n();
  return (
    <Section id="contact" title={t.contact.title} tone="green">
      <p className="mb-6 text-lg text-cream/90">{t.contact.intro}</p>
      <ContactLinks dark />
    </Section>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-green-dark px-4 py-6 text-center text-sm text-cream/80">
      © {new Date().getFullYear()} {t.footer.rights}
    </footer>
  );
}
