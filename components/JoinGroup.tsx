"use client";

import { SITE } from "@/lib/config";
import { useI18n } from "@/lib/i18n";

export default function JoinGroup() {
  const { t } = useI18n();
  const j = t.form.joinGroup;
  return (
    <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-green/20 bg-white p-5 text-center sm:flex-row sm:text-left">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/whatsapp-qr.png" alt={SITE.name} width={160} height={160} className="h-40 w-40 shrink-0" />
      <div>
        <p className="font-serif text-xl font-bold text-green">{j.title}</p>
        <p className="mt-1 text-sm">{j.sub}</p>
        <a
          href={SITE.whatsappGroup}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded-full bg-green px-5 py-2 font-semibold text-white"
        >
          {j.button}
        </a>
      </div>
    </div>
  );
}
