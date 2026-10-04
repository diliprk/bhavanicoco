# Implementation Plan: SBCPS Website

Source: [proposal.md](proposal.md). Assets: [logo.svg](logo.svg), [logo.png](logo.png).

## Decisions (from Q&A)
| Topic | Decision |
|---|---|
| Framework | Next.js (App Router) with `output: 'export'` (static), TypeScript, Tailwind |
| Hosting | Cloudflare Pages, `*.pages.dev` for now; custom domain later |
| Form backend | Google Sheet via Google Apps Script web app (or Cloudflare Pages Function proxy) |
| Languages | English + Tamil toggle (Tamil copy needs native-speaker review) |
| Roadmap image | Custom illustrated 3-step SVG journey, logo palette |
| Eligibility | Min **10** fruit-bearing trees (CDB), farm in **Erode district**. **100+ trees = Priority** for the 40 founding spots, 10-99 = Standard |
| Name | Keep "Sri Bhavani Coconut Producers Society"; mention Erode district in eligibility |
| Contacts | Both numbers are WhatsApp numbers (also reachable by call): Iswarya Rajamanickam +91 97872 25256; Dilip Rajkumar +91 77083 85855; email sribhavani.cocosociety@gmail.com (also the Google account that owns the Sheet and Apps Script) |

## Content changes vs. proposal.md
- Membership section: replace "100 trees / Bhavani taluk" with the 10-tree CDB minimum and Erode district; add a "100+ trees get priority for the 40 founding seats" note.
- Contact placeholder replaced by the two contacts above (each labelled "WhatsApp" on the page, with a `wa.me` chat link and a tap-to-call link; the same labelling is used in the form's success and error messages) plus the society email as a `mailto:` link.

## External references and source links
Wherever the page makes a claim that comes from the Coconut Development Board (CDB) or another official body, link to the source (opens in a new tab, `rel="noopener noreferrer"`).

- Central list in `lib/references.ts` (label EN/TA, URL, section), so links are easy to add or fix in one place.
- Rendered inline as small "Source" links next to the claim, plus a "Resources and References" section before the footer.
- Initial links:
  - CDB Producer Society bye-laws: https://coconutboard.gov.in/docs/CPS-Byelaw-Eng.pdf (use for: society structure, 10-tree minimum, democratic framework, Federation model)
  - CDB home: https://coconutboard.gov.in (use for: scheme/federation (CPS, CPF) background)
  - To find and add (I'll verify each URL loads before including it): CDB pages on Coconut Producers Federations/Companies, Tamil Nadu agriculture marketing/eNAM, Erode district official site (taluk list), and CDB material on desiccated coconut, copra and coir.
- A link check script (`npm run check-links`) runs before each deploy so dead links get caught.
- Only link to sources I have actually opened; anything uncertain is flagged to you rather than guessed.

## Page structure (single page, anchored sections)
1. Header: logo, nav, EN/தமிழ் toggle, "Apply" button
2. Hero: tagline "Uniting Farmers. Elevating Value. Empowering Bhavani.", CTA
3. Vision & Mission
4. Eligibility (3 cards: Location, Scale, Commitment) plus "40 founding seats" callout
5. **Roadmap** (image + step details for Step 0, 1, 2)
6. Sign-up form
7. Our Team: Board Members and External Advisors
8. Volunteer With Us (open positions)
9. Resources and References (official links)
10. Contact + footer

## Our Team section
Data lives in `lib/team.ts` (name, role EN/TA, optional photo, optional one-line bio), so people can be added later without touching components. No photos for now, so every person gets an initials avatar; photos can be dropped in later.

**Board Members**
- Iswarya Rajamanickam: CEO
- Dilip Rajkumar: Technology Consultant

**External Advisors**
- K. Rangaswamy: Director, Erode Precision Farm Producer Company Ltd, +91 98847 06410 (tap-to-call; company website is down, so no website link; he has agreed to his number being public)

## Volunteer With Us section
Intro line: we are looking for volunteers to join the society. Three position cards, each with a short description and an "Apply to volunteer" button that opens the volunteer form:
1. **Coconut Farm Agri Expert**: knowledge of coconut plantations and trees, including upkeep, disease and pest care, and the right time to harvest.
2. **Sales and Marketing Expert**: understands the open markets in Erode district for coconuts and shells, finds buyers for value-added products, and advises on when to sell.
3. **Harvesting Engineer / Manager**: experienced in harvesting coconut trees, can organise harvest manpower and bring in modern harvesting equipment, and knows the harvesting business.

**Volunteer form** (separate from the farmer membership form): name, phone/WhatsApp, email (optional), village/town, position(s) interested in (checkboxes for the three roles), years of experience, short note on background, consent checkbox. Goes to a second tab ("Volunteers") in the same Google Sheet and also emails sribhavani.cocosociety@gmail.com (cc diliprajkumar@gmail.com). Same Turnstile and honeypot protection.

## Roadmap image
- Inline SVG component `RoadmapJourney`, so it stays sharp and can be translated (text pulled from i18n). Also export a static PNG for sharing on WhatsApp.
- Winding path with 3 stops: **Step 0** (nut grading, husk/shell split, coco pith bags) → **Step 1** (federation, AMC 1,000+ trees, copra yards, desiccated coconut, shell sales) → **Step 2** (distribution, coir ropes/mattresses).
- Step 0 marked "Current Phase". Colors extracted from the logo. Vertical layout on mobile, horizontal on desktop.

## Sign-up form
Fields:
- Full legal name
- Phone/WhatsApp (10-digit Indian mobile validation)
- Village / Panchayat
- Town
- Taluk (dropdown of Erode district taluks)
- District (fixed to Erode, validated)
- PIN code (6 digits; warn if it is not a 638xxx Erode-range PIN)
- Number of fruit-bearing trees (min 10, hard validation)
- Total farm area (acres)
- Farm location: Google Maps pin link (paste a link, plus a "Use my current location" button that builds a maps URL from `navigator.geolocation`, plus short how-to: Maps → long-press → Share)
- Interested in AMC farm management? (Yes/No)
- Consent checkbox (data used only for membership)

Behaviour:
- Each submission also emails sribhavani.cocosociety@gmail.com with cc to diliprajkumar@gmail.com.
- Client-side validation, bilingual error messages, honeypot field plus Cloudflare Turnstile for spam.
- Submit → POST to Apps Script endpoint → appends a row with timestamp, language, and computed **Tier** (Priority if trees ≥ 100, else Standard). Sheet is the source of truth for the 40-seat cap.
- Success screen with the contact numbers; failure shows a WhatsApp fallback.
- Apps Script URL and Turnstile keys in env vars, never committed.

## Internationalisation
- Lightweight dictionary (`en.json`, `ta.json`) with a client toggle persisted in localStorage. Static export, so no locale routing.
- Noto Sans Tamil via `next/font` (subsetted).

## Performance and accessibility
Target phones on weak networks: Lighthouse ≥ 95, images optimised (`unoptimized` static export, so pre-compress), large tap targets, high contrast, semantic HTML, `lang` attribute switched with the toggle.

## Project layout
```
app/ (layout.tsx, page.tsx, globals.css)
components/ (Header, Hero, Eligibility, Roadmap, RoadmapJourney, SignupForm, Contact)
lib/ (i18n.ts, validation.ts, taluks.ts, config.ts)
locales/ (en.json, ta.json)
public/ (logo.svg, logo.png, roadmap.png, og-image.png)
google-apps-script/ (Code.gs, appsscript.json, README.md with deploy steps)
```

## Milestones
1. **Scaffold**: Next.js + Tailwind, static export, logo palette, layout, deploy hello-world to Cloudflare Pages.
2. **Content**: all sections in English from the updated proposal.
3. **Roadmap SVG** and PNG export.
4. **Form + Google Sheet**: Apps Script, validation, tier logic, Turnstile, end-to-end test.
5. **Tamil**: translations plus toggle; native review.
6. **QA and launch**: Lighthouse, mobile device testing, OG/share image, contact links, go live; domain later.

## Decisions resolved
- Rangasamy's company: K. Rangaswamy, Director, Erode Precision Farm Producer Company Ltd. Phone +91 98847 06410 shown instead of a website link (site is down); he has agreed to this.
- CEO name spelling: "Iswarya Rajamanickam".
- Membership stays the main call to action; volunteering is secondary.
- Apps Script is written in a separate `google-apps-script/` folder with a deploy README. Dilip, as admin of sribhavani.cocosociety@gmail.com, deploys it.
- Application emails go to sribhavani.cocosociety@gmail.com with cc to diliprajkumar@gmail.com.
- Tamil copy is reviewed by Dilip before launch.
- Beyond 40 members: we track total applicants in the Sheet (a summary tab shows total, Priority vs Standard, and count per taluk). Applicants past 40 are not rejected; they are grouped for additional societies. No public "seats filled" counter; the count of interested applicants is for internal use only.

## Verified: Erode district taluks
Confirmed against the official district site, https://erode.nic.in/about-district: "Now Erode District consists of 10 taluks viz., Erode, Modakkurichi, Kodumudi, Perundurai, Bhavani, Anthiyur, Gobichettipalayam, Sathyamangalam, Thalavadi and Nambiyur."
- The dropdown in `lib/taluks.ts` uses exactly these 10, spelled "Modakkurichi" as on the official site.
- The same page is added to the Resources and References links.

## Open items
- None blocking. Ready to start the build.
