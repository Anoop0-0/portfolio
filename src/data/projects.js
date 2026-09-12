export const projects = [
  {
    slug: 'curl-o',
    path: '/work/curl-o',
    name: 'Curl-O',
    kicker: 'Personal product · Live',
    title: 'A board that refuses to hard-code the agency using it',
    tagline:
      'A multi-tenant board for marketing agencies. Every workspace defines its own columns, roles, branding and task form, so two agencies using it can have boards that look nothing alike.',
    period: 'Aug – Sep 2026',
    role: 'Sole engineer and designer',
    scope: 'Schema, API, UI, design',
    stack: ['React 19', 'Vite', 'Express', 'MongoDB', 'Mongoose', 'Tailwind CSS'],
    hue: '--color-magenta',
    hueDeep: '--color-magenta',
    hueTint: '--color-magenta-tint',
    field: '--color-magenta-field',
    onHue: '#ffffff',
    plateClass: 'bg-magenta text-white',
    liveUrl: 'https://task-manager-kappa-sable-65.vercel.app',
    plateFacts: [
      { k: 'Tenancy', v: 'Per workspace' },
      { k: 'Roles', v: 'Data' },
      { k: 'Client deps', v: 'Three' },
    ],
    highlights: [
      'Multi-tenant from the schema up — a global Mongoose plugin scopes every query to a workspace',
      'Roles are records with capability flags and two column lists, never enum strings',
      'A workspace defines its own board columns, branding and task form questions',
      'Two permission harnesses boot the real Express app to prove one workspace cannot read another',
      'Three client runtime dependencies — drag-and-drop, popovers and motion are hand-written',
    ],
  },
  {
    slug: 'brandkob',
    path: '/work/brandkob',
    name: 'BrandKob',
    kicker: 'Internship · Internal platform',
    title: 'An internal platform that measures effort, not checkboxes',
    tagline:
      'A task manager for a 6-person team running 10 client accounts, built around a progress model that tells you how much work is left instead of how many rows are ticked.',
    period: 'Jun 2026 – present',
    role: 'Software Developer Intern',
    scope: 'Data modelling, backend, frontend',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    hue: '--color-cobalt',
    hueDeep: '--color-cobalt',
    hueTint: '--color-cobalt-tint',
    field: '--color-cobalt-field',
    onHue: '#ffffff',
    plateClass: 'bg-cobalt text-white',
    plateFacts: [
      { k: 'Progress model', v: 'Weighted' },
      { k: 'Access tiers', v: 'Three' },
      { k: 'Client links', v: 'Single-use' },
    ],
    highlights: [
      'Effort-weighted progress: steps carry percentage weights summing to 100 per monthly route',
      'Weights stamped at task creation, so editing a route never rewrites a closed month',
      '3-tier role-based access gating stage visibility across employee, manager and admin',
      'Schema-driven order forms modelled relationally — new forms are configured as data, not code',
      'Single-use client links with burn-on-submit semantics inside one PostgreSQL transaction',
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
