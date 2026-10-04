export const normalizePhone = (v: string) => v.replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
export const isPhone = (v: string) => /^[6-9]\d{9}$/.test(normalizePhone(v));
export const isPin = (v: string) => /^\d{6}$/.test(v.trim());
export const isErodePin = (v: string) => /^638\d{3}$/.test(v.trim());
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
export const isMapsLink = (v: string) =>
  /^https?:\/\/((www\.|maps\.)?google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps)/i.test(v.trim());

export const mapsUrlFromCoords = (lat: number, lng: number) =>
  `https://www.google.com/maps?q=${lat.toFixed(6)},${lng.toFixed(6)}`;
export const isLinkedIn = (v: string) => /^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/(in|pub|company)\/[^\s]+$/i.test(v.trim());
export const isAge = (v: string) => /^\d{1,3}$/.test(v.trim()) && Number(v) >= 18 && Number(v) <= 100;
