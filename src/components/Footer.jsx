import { Link } from 'react-router-dom'
import { site } from '../data/site.js'
import Container from './Container.jsx'

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line py-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link to="/" className="font-display text-2xl">
            Anoop Baghel
          </Link>
          <p className="mt-2 max-w-sm text-sm text-dim">
            {site.role} · {site.location}. Currently building internal tooling at{' '}
            {site.current.org}.
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {site.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="text-sm text-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="mt-10 flex flex-col gap-1 border-t border-line-soft pt-6 sm:flex-row sm:justify-between">
        <p className="label">© {new Date().getFullYear()} Anoop Baghel</p>
        <p className="label">React · Vite · Tailwind · Vercel</p>
      </Container>
    </footer>
  )
}
