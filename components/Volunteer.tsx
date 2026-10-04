"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/config";
import { submitToSheet } from "@/lib/submit";
import { isAge, isEmail, isLinkedIn, isPhone, normalizePhone } from "@/lib/validation";
import ContactLinks from "./ContactLinks";
import Turnstile from "./Turnstile";
import { Button, Field, Input, Section, Textarea } from "./ui";

export default function Volunteer() {
  const { t, lang } = useI18n();
  const vt = t.volunteer;
  const f = vt.form;
  const formRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [v, setV] = useState({ name: "", phone: "", age: "", email: "", linkedin: "", place: "", exp: "", note: "", consent: false, website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "fail">("idle");
  const [token, setToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const onToken = useCallback((x: string) => setToken(x), []);
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));

  const choose = (id: string) => {
    setRoles((r) => (r.includes(id) ? r : [...r, id]));
    setOpen(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (!v.name.trim()) e.name = t.form.errors.required;
    if (!isPhone(v.phone)) e.phone = t.form.errors.phone;
    if (!isAge(v.age)) e.age = t.form.errors.age;
    if (!isEmail(v.email)) e.email = f.errors.email;
    if (v.linkedin.trim() && !isLinkedIn(v.linkedin)) e.linkedin = f.errors.linkedin;
    if (!v.place.trim()) e.place = t.form.errors.required;
    if (!/^\d{1,2}$/.test(v.exp.trim()) || Number(v.exp) > 70) e.exp = f.errors.exp;
    if (!v.note.trim()) e.note = t.form.errors.required;
    if (!roles.length) e.roles = f.errors.roles;
    if (!v.consent) e.consent = t.form.errors.consent;
    if (SITE.turnstileSiteKey && !token) e.captcha = t.form.errors.captcha;
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");
    const res = await submitToSheet({
      type: "volunteer",
      lang,
      name: v.name.trim(),
      phone: normalizePhone(v.phone),
      age: Number(v.age),
      email: v.email.trim(),
      linkedin: v.linkedin.trim(),
      place: v.place.trim(),
      roles,
      experience: v.exp.trim(),
      note: v.note.trim(),
      website: v.website,
      turnstileToken: token,
    });
    if (res.ok) setStatus("ok");
    else {
      setStatus("fail");
      setResetKey((k) => k + 1);
      setToken("");
    }
  };

  return (
    <Section id="volunteer" title={vt.title} tone="cream">
      <p className="max-w-3xl text-lg">{vt.intro}</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {vt.roles.map((r) => (
          <div key={r.id} className="flex flex-col rounded-2xl border-2 border-brown/20 bg-white p-6">
            <h3 className="font-serif text-xl font-bold text-green">{r.h}</h3>
            <p className="mt-2 flex-1 leading-relaxed">{r.t}</p>
            <button
              onClick={() => choose(r.id)}
              className="mt-4 min-h-11 self-start rounded-full border-2 border-green px-5 text-sm font-bold text-green hover:bg-green hover:text-cream"
            >
              {vt.apply}
            </button>
          </div>
        ))}
      </div>

      {open && (
        <div ref={formRef} className="mt-8 rounded-3xl bg-paper p-5 sm:p-8">
          <h3 className="font-serif text-2xl font-bold text-green">{f.title}</h3>
          {status === "ok" ? (
            <div role="status" className="mt-4">
              <p className="mb-4 text-lg font-semibold text-green">{f.ok}</p>
              <ContactLinks />
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label={f.name} error={errors.name}>
                <Input value={v.name} onChange={set("name")} autoComplete="name" />
              </Field>
              <Field label={f.phone} error={errors.phone}>
                <Input value={v.phone} onChange={set("phone")} type="tel" inputMode="numeric" autoComplete="tel" />
              </Field>
              <Field label={t.form.age} error={errors.age}>
                <Input value={v.age} onChange={set("age")} type="number" inputMode="numeric" min={18} max={100} />
              </Field>
              <Field label={f.email} error={errors.email}>
                <Input value={v.email} onChange={set("email")} type="email" autoComplete="email" />
              </Field>
              <div className="sm:col-span-2">
                <Field label={f.linkedin} error={errors.linkedin}>
                  <Input value={v.linkedin} onChange={set("linkedin")} type="url" placeholder="https://www.linkedin.com/in/your-name" />
                </Field>
              </div>
              <Field label={f.place} error={errors.place}>
                <Input value={v.place} onChange={set("place")} />
              </Field>
              <fieldset className="sm:col-span-2">
                <legend className="text-sm font-semibold text-green-dark">{f.roles}</legend>
                <div className="mt-2 flex flex-wrap gap-3">
                  {vt.roles.map((r) => (
                    <label key={r.id} className="flex min-h-11 items-center gap-2 rounded-full border-2 border-brown/30 bg-white px-4 text-sm">
                      <input
                        type="checkbox"
                        checked={roles.includes(r.id)}
                        onChange={() => setRoles((x) => (x.includes(r.id) ? x.filter((i) => i !== r.id) : [...x, r.id]))}
                        className="h-5 w-5 accent-[#1f5d3a]"
                      />
                      {r.h}
                    </label>
                  ))}
                </div>
                {errors.roles && <p className="mt-1 text-xs font-semibold text-brand-red">{errors.roles}</p>}
              </fieldset>
              <Field label={f.exp} error={errors.exp}>
                <Input value={v.exp} onChange={set("exp")} inputMode="numeric" />
              </Field>
              <div className="sm:col-span-2">
                <Field label={f.note} error={errors.note}>
                  <Textarea value={v.note} onChange={set("note")} />
                </Field>
              </div>
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Website
                  <input tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} />
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={v.consent}
                    onChange={(e) => setV((s) => ({ ...s, consent: e.target.checked }))}
                    className="mt-1 h-5 w-5 accent-[#1f5d3a]"
                  />
                  <span>{f.consent}</span>
                </label>
                {errors.consent && <p className="mt-1 text-xs font-semibold text-brand-red">{errors.consent}</p>}
              </div>
              <div className="sm:col-span-2">
                <Turnstile onToken={onToken} resetKey={resetKey} />
                {errors.captcha && <p className="mt-1 text-xs font-semibold text-brand-red">{errors.captcha}</p>}
                <div className="mt-3">
                  <Button type="submit" disabled={status === "sending"}>
                    {status === "sending" ? t.form.sending : f.submit}
                  </Button>
                </div>
              </div>
              {status === "fail" && (
                <div role="alert" className="rounded-xl border-2 border-brand-red p-4 sm:col-span-2">
                  <p className="mb-3 font-semibold text-brand-red">{t.form.fail}</p>
                  <ContactLinks />
                </div>
              )}
            </form>
          )}
        </div>
      )}
    </Section>
  );
}
