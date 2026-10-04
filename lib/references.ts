// Every URL here was opened and checked before being added. Run `npm run check-links` to re-verify.
export type Reference = {
  id: string;
  url: string;
  label: { en: string; ta: string };
  note: { en: string; ta: string };
};

export const REFERENCES: Record<string, Reference> = {
  byelaws: {
    id: "byelaws",
    url: "https://coconutboard.gov.in/docs/CPS-Byelaw-Eng.pdf",
    label: {
      en: "CDB model bye-laws for Coconut Producers Societies (PDF)",
      ta: "தேங்காய் உற்பத்தியாளர் சங்கங்களுக்கான CDB மாதிரி விதிகள் (PDF)",
    },
    note: {
      en: "Society structure, membership and the democratic framework we follow.",
      ta: "சங்க அமைப்பு, உறுப்பினர் சேர்க்கை மற்றும் நாங்கள் பின்பற்றும் ஜனநாயக அமைப்பு.",
    },
  },
  cdb: {
    id: "cdb",
    url: "https://coconutboard.gov.in",
    label: { en: "Coconut Development Board (Government of India)", ta: "தேங்காய் வளர்ச்சி வாரியம் (இந்திய அரசு)" },
    note: {
      en: "Schemes and background on Producer Societies, Federations and Companies.",
      ta: "உற்பத்தியாளர் சங்கங்கள், கூட்டமைப்புகள் மற்றும் நிறுவனங்கள் பற்றிய திட்டங்கள்.",
    },
  },
  erode: {
    id: "erode",
    url: "https://erode.nic.in/about-district",
    label: { en: "Erode District official website", ta: "ஈரோடு மாவட்ட அதிகாரப்பூர்வ இணையதளம்" },
    note: {
      en: "The 10 taluks of Erode district used in our eligibility rules.",
      ta: "எங்கள் தகுதி விதிகளில் பயன்படுத்தப்படும் ஈரோடு மாவட்டத்தின் 10 வட்டங்கள்.",
    },
  },
};

export const REFERENCE_LIST = Object.values(REFERENCES);
