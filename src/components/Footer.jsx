import { Link } from 'react-router-dom'
import { site } from '../data/site.js'
import Container from './Container.jsx'

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <Container className="py-16">
        <Link to="/" className="plate-type block text-[min(13vw,9rem)] leading-[0.82]">
          Anoop
          <br />
          Baghel
        </Link>

        <div className="mt-12 flex flex-col gap-8 border-t-2 border-paper/25 pt-8 sm:flex-row sm:justify-between">
          <p className="max-w-sm text-sm leading-relaxed text-paper/70">
            {site.role} in {site.location}. Currently building internal tooling at{' '}
            {site.current.org}.
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {site.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="label border-b-2 border-acid pb-1 text-paper transition-colors hover:bg-acid hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <p className="label text-paper/45">&copy; {new Date().getFullYear()} Anoop Baghel</p>
          <p className="label text-paper/45">React &middot; Vite &middot; Tailwind &middot; Vercel</p>
        </div>
      </Container>
    </footer>
  )
}
