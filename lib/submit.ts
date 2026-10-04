import { SITE } from "./config";

export type SubmitResult = { ok: true } | { ok: false; error: string };

// Posts JSON as text/plain (a "simple" request) so the browser skips the CORS preflight,
// which Google Apps Script web apps do not answer.
export async function submitToSheet(payload: Record<string, unknown>): Promise<SubmitResult> {
  if (!SITE.appsScriptUrl) return { ok: false, error: "NEXT_PUBLIC_APPS_SCRIPT_URL is not set" };
  try {
    const res = await fetch(SITE.appsScriptUrl, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data?.ok ? { ok: true } : { ok: false, error: String(data?.error ?? "unknown") };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "network" };
  }
}
