# anoopbaghel.in

Personal portfolio for Anoop Baghel. React + Vite + Tailwind CSS v4, deployed to
Vercel at [anoopbaghel.in](https://anoopbaghel.in).

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint
```

## Structure

```
src/
  data/
    site.js               name, contact, education, toolkit — edit this first
    projects.js           case-study metadata used by cards, nav and prev/next
  components/
    Nav, Footer, Container, Reveal, ScrollToTop
    CaseStudyCard.jsx     the two cards on the home page
    ProjectLayout.jsx     case-study shell: hero, meta grid, next-project link
    Prose.jsx             Chapter, Callout, List, Tradeoffs, Figure, P, Em, Code
    figures/              the interactive diagrams inside the case studies
  pages/
    Home.jsx
    BrandKob.jsx          case study 1
    Ironlog.jsx           case study 2
    NotFound.jsx
```

Case-study prose lives directly in `pages/BrandKob.jsx` and `pages/Ironlog.jsx`,
composed from the `Prose.jsx` primitives. Edit the text there.

## Design tokens

Colours, fonts and the custom `label` / `grid-veil` / `reveal` utilities are all
defined in `src/index.css` under `@theme` (Tailwind v4 — no `tailwind.config.js`).
Change `--color-accent` there to re-skin the whole site.

Fonts are Instrument Serif (display), Inter (body) and JetBrains Mono (labels),
loaded from Google Fonts in `index.html`.

## Deploying to Vercel

The repo is a stock Vite SPA, so Vercel's defaults work:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

`vercel.json` adds the SPA rewrite so that deep links like `/work/brandkob`
resolve to `index.html` instead of 404ing, plus long-lived caching for hashed
assets.

To point the domain at it: add `anoopbaghel.in` under the project's **Domains**
tab and follow the DNS records Vercel shows for your registrar.

## Before going live

- [ ] Add a live URL and repo link for IRONLOG if you want them on the page
- [ ] Read the case-study prose end to end — it is a first draft written from
      your notes, so make the voice yours
