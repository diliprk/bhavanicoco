export const SITE = {
  name: "Sri Bhavani Coconut Producers Society",
  email: "sribhavani.cocosociety@gmail.com",
  // Both numbers are WhatsApp numbers and also accept calls.
  contacts: [
    { name: "Iswarya Rajamanickam", phone: "+919787225256", display: "+91 97872 25256" },
    { name: "Dilip Rajkumar", phone: "+917708385855", display: "+91 77083 85855" },
  ],
  appsScriptUrl: process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? "",
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
  foundingSeats: 40,
  priorityTrees: 100,
  minTrees: 10,
} as const;

export const waLink = (phone: string, text?: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
