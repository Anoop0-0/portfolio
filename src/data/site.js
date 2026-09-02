export const site = {
  name: 'Anoop Baghel',
  role: 'Full-stack web developer',
  location: 'Delhi, India',
  url: 'https://anoopbaghel.in',
  email: 'anoop28042005@gmail.com',
  education: {
    degree: 'B.Tech, Electrical Engineering',
    school: 'Delhi Technological University',
    span: '2023 – 2027',
  },
  current: {
    title: 'Software Developer Intern',
    org: 'BrandKob',
    since: 'Jun 2026',
  },
  links: [
    { label: 'Email', href: 'mailto:anoop28042005@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/Anoop0-0' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anoopbaghel/' },
  ],
}

/** The recruiter question the case studies do not answer. */
export const fundamentals = [
  { figure: '220+', label: 'LeetCode solved', sub: 'C++ / DSA' },
  { figure: '5\u2605', label: 'HackerRank', sub: 'SQL Advanced' },
  { figure: '2', label: 'Systems shipped', sub: 'to real users' },
]

export const stack = [
  {
    group: 'Frontend',
    items: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Recharts', 'PWA / service workers'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'JWT auth', 'Google OAuth', 'Transactional writes'],
  },
  {
    group: 'Data',
    items: ['PostgreSQL', 'Prisma', 'MongoDB', 'Mongoose', 'Relational modelling', 'Schema design'],
  },
  {
    group: 'Ways of working',
    items: ['Domain modelling', 'Internal tooling', 'Role-based access', 'Shipping to real users'],
  },
]
