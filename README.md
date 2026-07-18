# DevTools

A clean, fast, multi-purpose developer utilities platform. Every tool runs **entirely in your browser** — nothing is uploaded.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- System-aware light / dark theme (manual toggle + no-flash boot script)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `NEXT_PUBLIC_SITE_URL=https://devtools.sartajalam.in` for production canonical URLs and sitemap (defaults to that host if unset).

## Deploy (GitHub Pages)

This app builds as a **static export** (`out/`) for GitHub Pages.

1. Push to `main` — [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys automatically.
2. Repo **Settings → Pages**:
   - Source: **GitHub Actions**
3. Custom domain: add `devtools.sartajalam.in` (a `CNAME` file is already in [`public/CNAME`](public/CNAME)).
4. DNS: create a **CNAME** record:
   - Name: `devtools`
   - Value: `sak03.github.io` (or your GitHub Pages host)

Local static build:

```bash
npm run build   # writes to out/
```

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development |
| `npm run build` | Static export to `out/` (GitHub Pages) |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright smoke tests |

## Adding a tool

1. Create `src/tools/<slug>/index.tsx` with a default export client component.
2. Add metadata in [`src/lib/tools/registry.ts`](src/lib/tools/registry.ts).
3. Wire the lazy import in [`src/app/tools/[slug]/tool-client.tsx`](src/app/tools/[slug]/tool-client.tsx).
4. Sitemap, static params, search, and SEO metadata pick it up automatically.

## Privacy

All transforms are client-side. Prefer pure helpers in `src/lib/tools/transforms.ts` so logic stays testable.
