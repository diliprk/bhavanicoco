# Sri Bhavani Coconut Producers Society: website

Static Next.js site (English / Tamil) for the society.

## Develop
```
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to ./out
npm run export-roadmap   # regenerate public/roadmap.png (shareable image)
```

## Deploy to Cloudflare Pages
- Cloudflare Workers Builds (static assets): connect this GitHub repo; wrangler.jsonc serves ./out.
- Build command: `npm run build`. Deploy command: `npx wrangler deploy`.
- Environment variables: see `.env.example`. Backend setup: [google-apps-script/README.md](google-apps-script/README.md).

## Notes
- Tamil copy in `locales/ta.ts` is a draft pending review.
- Contacts, team and references live in `lib/config.ts`, `lib/team.ts`, `lib/references.ts`.
