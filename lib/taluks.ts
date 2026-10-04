// Source: https://erode.nic.in/about-district ("Now Erode District consists of 10 taluks viz., ...")
export const ERODE_TALUKS = [
  "Erode",
  "Modakkurichi",
  "Kodumudi",
  "Perundurai",
  "Bhavani",
  "Anthiyur",
  "Gobichettipalayam",
  "Sathyamangalam",
  "Thalavadi",
  "Nambiyur",
] as const;

export const TALUKS_TA: Record<(typeof ERODE_TALUKS)[number], string> = {
  Erode: "ஈரோடு",
  Modakkurichi: "மொடக்குறிச்சி",
  Kodumudi: "கொடுமுடி",
  Perundurai: "பெருந்துறை",
  Bhavani: "பவானி",
  Anthiyur: "அந்தியூர்",
  Gobichettipalayam: "கோபிசெட்டிபாளையம்",
  Sathyamangalam: "சத்தியமங்கலம்",
  Thalavadi: "தாளவாடி",
  Nambiyur: "நம்பியூர்",
};
