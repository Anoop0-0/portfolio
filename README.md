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

## Design system — "Signal Plate"

Colour is structural, not decorative: each project owns a hue and floods its own
page, and a project's hue never appears on the other project's page.

| Token | Value | Job |
| --- | --- | --- |
| `--color-ink` | `#14161a` | Type, rules, plate borders |
| `--color-paper` | `#f2f3f5` | Reading ground |
| `--color-cobalt` | `#1f3be0` | BrandKob identity |
| `--color-vermilion` | `#ff3b1f` | IRONLOG identity |
| `--color-acid` | `#d8ff2e` | Interaction and live state only |
| `--color-jade` | `#00a878` | Fourth data series in charts |

Two contrast rules the palette depends on, both verified against WCAG AA:

- Vermilion carries **ink** type, never white (white on vermilion is ~3:1).
- Vermilion as *text on paper* uses `--color-vermilion-deep` (`#c02a0c`, 5.3:1).
  The raw hue is for plates and fills only.

Type is a **width** contrast rather than a size contrast: **Archivo** wide and
heavy in caps for plates, **Instrument Sans** narrow for body, **DM Mono** for
labels, weights and endpoints. The `plate-type`, `head-type`, `num-type` and
`label` utilities in `src/index.css` encode the three display roles.

Layout: no border-radius anywhere, no shadows, 3px ink rules instead of
hairlines. Case studies are full-bleed plates at unequal heights, and the
reading column is left-weighted so figures can break the grid to the right.

All of it lives in the `@theme` block in `src/index.css` (Tailwind v4 — there is
no `tailwind.config.js`). Fonts are loaded from Google Fonts in `index.html`.

## Deploying

This repo is connected to the Vercel project `portfolio_website`, so **pushing to
`main` deploys to production** at [anoopbaghel.in](https://anoopbaghel.in). Pull
requests get their own preview URLs.

To deploy by hand instead (bypasses git entirely):

```bash
npx vercel@latest --prod
```

Vercel's Vite defaults handle the build (`npm run build` into `dist`).
`vercel.json` adds the SPA rewrite so deep links like `/work/brandkob` resolve to
`index.html` instead of 404ing, plus long-lived caching for hashed assets.

## Before going live

- [ ] Add a live URL and repo link for IRONLOG if you want them on the page
- [ ] Read the case-study prose end to end — it is a first draft written from
      your notes, so make the voice yours
