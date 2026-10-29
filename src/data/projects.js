export const projects = [
  {
    slug: 'curl-o',
    path: '/work/curl-o',
    name: 'Curl-O',
    kicker: 'Product · Live · Running an agency\u2019s month',
    title: 'A board that refuses to hard-code the agency using it',
    tagline:
      'A multi-tenant board built around one number: how much of a client\u2019s agreed month is actually finished. Every workspace defines its own columns, roles, branding and forms, so nothing about the agency is baked into the code.',
    period: '2026 – present',
    role: 'Sole engineer and designer',
    scope: 'Schema, API, UI, design',
    stack: ['React 19', 'Vite', 'Express', 'MongoDB', 'Mongoose', 'Tailwind CSS'],
    hue: '--color-cobalt',
    hueDeep: '--color-cobalt',
    hueTint: '--color-cobalt-tint',
    field: '--color-cobalt-field',
    onHue: '#ffffff',
    plateClass: 'bg-cobalt text-white',
    liveUrl: 'https://curl-o.brandkob.com',
    plateFacts: [
      { k: 'Progress model', v: 'Weighted' },
      { k: 'Tenancy', v: 'Per workspace' },
      { k: 'Roles', v: 'Data' },
    ],
    highlights: [
      'Effort-weighted progress: a percentage of what was promised, not a count of cards',
      'Weights stamped at creation, so editing a plan never rewrites a closed month',
      'Multi-tenant from the schema up — a global Mongoose plugin scopes every query to a workspace',
      'Roles are records with capability flags and two column lists, never enum strings',
      'Three client runtime dependencies — drag-and-drop, popovers and motion are hand-written',
    ],
  },
  {
    slug: 'be-spoken',
    path: '/work/be-spoken',
    name: 'Be-Spoken',
    kicker: 'Client system · Bespoke tailoring',
    title: 'An order system where the form is rows, not code',
    tagline:
      'Intake forms for a bespoke tailoring client that change by garment, fabric and season. Questions, options and conditional rules are modelled relationally, so a new form is a seed script rather than a deploy.',
    period: '2026',
    role: 'Data modelling, backend, frontend',
    scope: 'Schema, API, form renderer',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    hue: '--color-magenta',
    hueDeep: '--color-magenta',
    hueTint: '--color-magenta-tint',
    field: '--color-magenta-field',
    onHue: '#ffffff',
    plateClass: 'bg-magenta text-white',
    plateFacts: [
      { k: 'Form shape', v: 'Rows' },
      { k: 'Conditions', v: 'Data' },
      { k: 'Client links', v: 'Single-use' },
    ],
    highlights: [
      'Forms, questions, options and conditional rules modelled relationally in PostgreSQL via Prisma',
      'A renderer that walks the rows and contains no tailoring vocabulary at all',
      'Visibility and requiredness derived on every render, never stored',
      'Single-use client links with burn-on-submit semantics inside one transaction',
      'Forms versioned so a submitted order still renders the way it was captured',
    ],
  },
  {
    slug: 'ironlog',
    path: '/work/ironlog',
    name: 'IRONLOG',
    kicker: 'Personal product · Live',
    title: 'A gym tracker that never loses a set',
    tagline:
      'A MERN progress tracker with real-time social competition, per-set durability, and analytics that surface personal records without being asked.',
    period: '2025 – present',
    role: 'Designer and sole engineer',
    scope: 'Product, frontend, backend, deployment',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Recharts'],
    hue: '--color-vermilion',
    hueDeep: '--color-vermilion-deep',
    hueTint: '--color-vermilion-tint',
    field: '--color-vermilion-field',
    onHue: '#14161a',
    plateClass: 'bg-vermilion text-ink',
    plateFacts: [
      { k: 'Durability', v: 'Per set' },
      { k: 'Install', v: 'PWA' },
      { k: 'Ranking', v: 'Derived' },
    ],
    highlights: [
      'JWT + Google OAuth, installable as a PWA on both iOS and Android',
      'Invite-code friend groups with leaderboards that update within seconds',
      'Every set persists on tap — no bulk submit, nothing lost to a mid-workout tab switch',
      'Set-level PUT updates via nested document traversal',
      'Recharts analytics: weekly volume, automatic PR detection, body-part filtered leaderboards',
    ],
  },
]

export const bySlug = (slug) => projects.find((p) => p.slug === slug)

export const nextProject = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
