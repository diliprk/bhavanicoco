"use client";

import { useCallback, useState } from "react";
import { SITE } from "@/lib/config";
import { useI18n } from "@/lib/i18n";
import { submitToSheet } from "@/lib/submit";
import { ERODE_TALUKS, TALUKS_TA } from "@/lib/taluks";
import { isAge, isErodePin, isMapsLink, isPhone, isPin, mapsUrlFromCoords, normalizePhone } from "@/lib/validation";
import ContactLinks from "./ContactLinks";
import Turnstile from "./Turnstile";
import { Button, Field, Input, InfoTip, Section, Select } from "./ui";

const empty = {
  name: "", phone: "", age: "", village: "", town: "", taluk: "", pin: "",
  trees: "", acres: "", mapLink: "", amc: "", board: false, consent: false, website: "",
};
type Form = typeof empty;

export default function SignupForm() {
  const { t, lang } = useI18n();
  const f = t.form;
  const [v, setV] = useState<Form>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "fail">("idle");
  const [geo, setGeo] = useState<"idle" | "busy" | "denied">("idle");
  const [token, setToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const onToken = useCallback((x: string) => setToken(x), []);

  const set = (k: keyof Form) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    const req = (k: keyof Form) => !String(v[k]).trim() && (e[k] = f.errors.required);
    (["name", "village", "town", "taluk", "amc"] as const).forEach(req);
    if (!isPhone(v.phone)) e.phone = f.errors.phone;
    if (!isAge(v.age)) e.age = f.errors.age;
    if (!isPin(v.pin)) e.pin = f.errors.pin;
    if (!(Number(v.trees) >= SITE.minTrees)) e.trees = f.errors.trees;
    if (!(Number(v.acres) > 0)) e.acres = f.errors.acres;
    if (v.mapLink.trim() && !isMapsLink(v.mapLink)) e.mapLink = f.errors.map;
    if (!v.consent) e.consent = f.errors.consent;
    if (SITE.turnstileSiteKey && !token) e.captcha = f.errors.captcha;
    return e;
  };

  const locate = () => {
    if (!navigator.geolocation) return setGeo("denied");
    setGeo("busy");
    // Optional helper only: it never blocks submitting. Some browsers never call back if the
    // permission prompt is ignored, so a fallback timer always frees the button.
    let done = false;
    const finish = (next: "idle" | "denied") => {
      if (done) return;
      done = true;
      clearTimeout(fallback);
      setGeo(next);
    };
    const fallback = setTimeout(() => finish("denied"), 20000);
    try {
      navigator.geolocation.getCurrentPosition(
        (p) => {
          setV((s) => ({ ...s, mapLink: mapsUrlFromCoords(p.coords.latitude, p.coords.longitude) }));
          finish("idle");
        },
        () => finish("denied"),
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 },
      );
    } catch {
      finish("denied");
    }
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");
    const res = await submitToSheet({
      type: "member",
      lang,
      name: v.name.trim(),
      phone: normalizePhone(v.phone),
      age: Number(v.age),
      village: v.village.trim(),
      town: v.town.trim(),
      taluk: v.taluk,
      district: "Erode",
      pin: v.pin.trim(),
      trees: Number(v.trees),
      acres: Number(v.acres),
      mapLink: v.mapLink.trim(),
      amc: v.amc,
      board: v.board ? "Yes" : "No",
      website: v.website, // honeypot
      turnstileToken: token,
    });
    if (res.ok) {
      setStatus("ok");
      setV(empty);
    } else {
      setStatus("fail");
      setResetKey((k) => k + 1);
      setToken("");
    }
  };

  const pinWarn = isPin(v.pin) && !isErodePin(v.pin) ? f.errors.pinWarn : undefined;

  return (
    <Section id="join" title={f.title} tone="green">
      <p className="max-w-3xl text-lg text-cream/90">{f.intro}</p>
      <div className="mt-8 rounded-3xl bg-paper p-5 text-ink sm:p-8">
        {status === "ok" ? (
          <div role="status">
            <p className="font-serif text-2xl font-bold text-green">{f.ok}</p>
            <p className="mb-5 mt-2">{f.okSub}</p>
            <ContactLinks />
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
            <Field label={f.name} error={errors.name}>
              <Input value={v.name} onChange={set("name")} autoComplete="name" />
            </Field>
            <Field label={f.phone} hint={f.phoneHint} error={errors.phone}>
              <Input value={v.phone} onChange={set("phone")} type="tel" inputMode="numeric" autoComplete="tel" />
            </Field>
            <Field label={f.age} error={errors.age}>
              <Input value={v.age} onChange={set("age")} type="number" inputMode="numeric" min={18} max={100} />
            </Field>
            <Field label={f.village} error={errors.village}>
              <Input value={v.village} onChange={set("village")} />
            </Field>
            <Field label={f.town} error={errors.town}>
              <Input value={v.town} onChange={set("town")} />
            </Field>
            <Field label={f.taluk} error={errors.taluk}>
              <Select value={v.taluk} onChange={set("taluk")}>
                <option value="">{f.taluk0}</option>
                {ERODE_TALUKS.map((tk) => (
                  <option key={tk} value={tk}>
                    {lang === "ta" ? `${TALUKS_TA[tk]} (${tk})` : tk}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label={f.district}>
              <Input value={lang === "ta" ? "ஈரோடு (Erode)" : "Erode"} readOnly className="bg-cream" />
            </Field>
            <Field label={f.pin} error={errors.pin} warn={pinWarn}>
              <Input value={v.pin} onChange={set("pin")} inputMode="numeric" maxLength={6} autoComplete="postal-code" />
            </Field>
            <Field label={f.trees} hint={f.treesHint} error={errors.trees}>
              <Input value={v.trees} onChange={set("trees")} type="number" inputMode="numeric" min={SITE.minTrees} />
            </Field>
            <Field label={f.acres} error={errors.acres}>
              <Input value={v.acres} onChange={set("acres")} type="number" inputMode="decimal" min={0} step="0.01" />
            </Field>
            <Field label={f.amc} error={errors.amc}>
              <Select value={v.amc} onChange={set("amc")}>
                <option value="">{f.choose}</option>
                <option value="Yes">{f.yes}</option>
                <option value="No">{f.no}</option>
              </Select>
            </Field>
            <div className="flex min-h-11 items-center gap-3 sm:col-span-2">
              <label className="flex items-center gap-3 text-sm font-semibold text-green-dark">
                <input
                  type="checkbox"
                  checked={v.board}
                  onChange={(e) => setV((s) => ({ ...s, board: e.target.checked }))}
                  className="h-5 w-5 accent-[#1f5d3a]"
                />
                {f.board}
              </label>
              <InfoTip text={f.boardTip} />
            </div>
            <div className="sm:col-span-2">
              <Field label={f.map} hint={f.mapHint} error={errors.mapLink}>
                <Input value={v.mapLink} onChange={set("mapLink")} type="url" placeholder="https://maps.app.goo.gl/..." />
              </Field>
              <button type="button" onClick={locate} disabled={geo === "busy"} className="mt-2 min-h-11 rounded-full border-2 border-green px-4 text-sm font-bold text-green hover:bg-green hover:text-cream">
                {geo === "busy" ? f.mapBusy : f.mapBtn}
              </button>
              {geo === "denied" && <p className="mt-1 text-xs font-semibold text-brand-red">{f.mapDenied}</p>}
            </div>

            {/* Honeypot: hidden from people, bots fill it in */}
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
              <p className="mb-4 mt-2 text-sm text-ink/70">{f.notice}</p>
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? f.sending : f.submit}
              </Button>
            </div>

            {status === "fail" && (
              <div role="alert" className="rounded-xl border-2 border-brand-red p-4 sm:col-span-2">
                <p className="mb-3 font-semibold text-brand-red">{f.fail}</p>
                <ContactLinks />
              </div>
            )}
          </form>
        )}
      </div>
    </Section>
  );
}
