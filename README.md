# Sri Bhavani Coconut Producers Society: website

Static Next.js site (English / Tamil) for the society. Plan: [PLAN.md](PLAN.md). Content source: [proposal.md](proposal.md).

## Develop
```
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to ./out
npm run export-roadmap   # regenerate public/roadmap.png (shareable image)
```

## Deploy to Cloudflare Pages
- Connect this GitHub repo in Cloudflare Pages.
- Build command: `npm run build`. Build output directory: `out`.
- Environment variables: see `.env.example`. Backend setup: [google-apps-script/README.md](google-apps-script/README.md).

## Notes
- Tamil copy in `locales/ta.ts` is a draft pending review.
- Contacts, team and references live in `lib/config.ts`, `lib/team.ts`, `lib/references.ts`.
