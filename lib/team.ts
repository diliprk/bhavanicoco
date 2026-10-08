export type Person = {
  name: { en: string; ta: string };
  role: { en: string; ta: string };
  org?: { en: string; ta: string };
  phone?: { tel: string; display: string };
  photo?: string; // optional, e.g. "/team/name.jpg"; initials avatar is used when absent
};

export const BOARD: Person[] = [
  {
    name: { en: "Dilip Rajkumar", ta: "திலீப் ராஜ்குமார்" },
    role: { en: "Founding Member", ta: "நிறுவன உறுப்பினர்" },
  },
  {
    name: { en: "Iswarya Rajamanickam", ta: "ஈஸ்வர்யா ராஜமாணிக்கம்" },
    role: { en: "Founding Member", ta: "நிறுவன உறுப்பினர்" },
  },
  {
    name: { en: "Ponpradeepa Jayanth", ta: "பொன்பிரதீபா ஜெயந்த்" },
    role: { en: "Founding Member", ta: "நிறுவன உறுப்பினர்" },
  },
];

export const ADVISORS: Person[] = [
  {
    name: { en: "K. Rangaswamy", ta: "கே. ரங்கசாமி" },
    role: { en: "Director", ta: "இயக்குநர்" },
    org: {
      en: "Erode Precision Farm Producer Company Ltd",
      ta: "ஈரோடு பிரிசிஷன் ஃபார்ம் புரொட்யூசர் கம்பெனி லிமிடெட்",
    },
    phone: { tel: "+919884706410", display: "+91 98847 06410" },
  },
];
