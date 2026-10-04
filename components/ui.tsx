"use client";

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
