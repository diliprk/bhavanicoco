"use client";

import { useState } from "react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { REFERENCES } from "@/lib/references";
import { useI18n } from "@/lib/i18n";

export function Section({
  id,
  title,
  tone = "paper",
  children,
}: {
  id: string;
  title: string;
  tone?: "paper" | "cream" | "green";
  children: ReactNode;
}) {
  const bg = tone === "green" ? "bg-green text-cream" : tone === "cream" ? "bg-cream" : "bg-paper";
  return (
    <section id={id} className={`${bg} px-4 py-14 sm:py-20`}>
      <div className="mx-auto max-w-5xl">
        <h2 className={`font-serif text-3xl font-bold sm:text-4xl ${tone === "green" ? "text-gold" : "text-green"}`}>
          {title}
        </h2>
        <div className="mt-2 h-1 w-16 rounded bg-gold" />
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

// Renders text with [label](url) links, so locale strings can carry inline links.
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\(https:\/\/[^)\s]+\))/g);
  return (
    <>
      {parts.map((p, i) => {
        const m = p.match(/^\[([^\]]+)\]\((https:\/\/[^)\s]+)\)$/);
        return m ? (
          <a
            key={i}
            href={m[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-green underline decoration-gold decoration-2 underline-offset-2 hover:text-green-dark"
          >
            {m[1]} ↗
          </a>
        ) : (
          p
        );
      })}
    </>
  );
}

export function SourceLink({ id, label }: { id: keyof typeof REFERENCES; label: string }) {
  const { t } = useI18n();
  return (
    <a
      href={REFERENCES[id].url}
      target="_blank"
      rel="noopener noreferrer"
      title={t.refs.open}
      className="whitespace-nowrap text-sm font-medium text-green underline decoration-gold decoration-2 underline-offset-2 hover:text-green-dark"
    >
      {label} ↗
    </a>
  );
}

const inputCls =
  "mt-1 block w-full rounded-lg border-2 border-brown/30 bg-white px-3 py-3 text-base text-ink placeholder:text-ink/40 focus:border-green";

export function Field({
  label,
  hint,
  error,
  warn,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  warn?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold text-green-dark">
      {label}
      {children}
      {hint && !error && <span className="mt-1 block text-xs font-normal text-ink/70">{hint}</span>}
      {error && <span className="mt-1 block text-xs font-semibold text-brand-red">{error}</span>}
      {!error && warn && <span className="mt-1 block text-xs font-semibold text-brown">{warn}</span>}
    </label>
  );
}

export function InfoTip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-label={text}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-green text-xs font-bold text-green hover:bg-green hover:text-cream"
      >
        i
      </button>
      {open && (
        <span role="tooltip" className="absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-lg bg-green-dark p-3 text-xs font-normal leading-relaxed text-cream shadow-lg sm:w-80">
          {text}
        </span>
      )}
    </span>
  );
}

export const Input = (p: InputHTMLAttributes<HTMLInputElement>) => <input {...p} className={inputCls} />;
export const Select = (p: SelectHTMLAttributes<HTMLSelectElement>) => <select {...p} className={inputCls} />;
export const Textarea = (p: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...p} className={inputCls} rows={3} />
);

export function Button({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...p}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-red px-7 py-3 text-base font-bold text-cream shadow transition hover:bg-[#9d0f19] disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export const LinkButton = ({
  href,
  children,
  variant = "red",
}: {
  href: string;
  children: ReactNode;
  variant?: "red" | "outline";
}) => (
  <a
    href={href}
    className={`inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-base font-bold transition ${
      variant === "red"
        ? "bg-brand-red text-cream shadow hover:bg-[#9d0f19]"
        : "border-2 border-cream text-cream hover:bg-cream/15"
    }`}
  >
    {children}
  </a>
);
