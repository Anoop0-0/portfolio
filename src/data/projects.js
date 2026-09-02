export const projects = [
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
    accent: 'text-brand',
    accentVar: '--color-brand',
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
    accent: 'text-iron',
    accentVar: '--color-iron',
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

export const otherProject = (slug) => projects.find((p) => p.slug !== slug)
