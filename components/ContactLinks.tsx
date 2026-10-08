"use client";

import { SITE, waLink } from "@/lib/config";
import { useI18n } from "@/lib/i18n";

// Lists the WhatsApp numbers with chat and call links, plus the society email.
export default function ContactLinks({ dark = false }: { dark?: boolean }) {
  const { t } = useI18n();
  const pill = dark
    ? "border-cream/60 text-cream hover:bg-cream/15"
    : "border-green text-green hover:bg-green hover:text-cream";
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {SITE.contacts.map((c) => (
        <div key={c.phone} className={`rounded-2xl border-2 p-4 ${dark ? "border-cream/30" : "border-brown/20 bg-white"}`}>
          <p className="font-bold">{c.name}</p>
          <p className="mt-0.5 text-lg font-semibold tabular-nums">{c.display}</p>
          <p className="text-xs opacity-80">WhatsApp</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={waLink(c.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full bg-[#1c9c52] px-4 text-sm font-bold text-white hover:bg-[#157a41]"
            >
              {t.contact.whatsapp}
            </a>
            <a href={`tel:${c.phone}`} className={`inline-flex min-h-11 items-center rounded-full border-2 px-4 text-sm font-bold ${pill}`}>
              {t.contact.call}
            </a>
          </div>
        </div>
      ))}
      <a
        href={`mailto:${SITE.email}`}
        className={`rounded-2xl border-2 p-4 sm:col-span-2 ${dark ? "border-cream/30 hover:bg-cream/10" : "border-brown/20 bg-white hover:border-green"}`}
      >
        <span className="block text-xs opacity-80">{t.contact.email}</span>
        <span className="break-all text-lg font-semibold">{SITE.email}</span>
      </a>
    </div>
  );
}
