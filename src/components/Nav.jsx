import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from './Container.jsx'

const links = [
  { label: 'BrandKob', to: '/work/brandkob' },
  { label: 'IRONLOG', to: '/work/ironlog' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 12,
  )
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-line bg-ink/85 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-sm font-medium tracking-tight"
        >
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125"
          />
          Anoop Baghel
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:text-fg sm:hidden"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d={open ? 'M3 3 L13 13 M13 3 L3 13' : 'M2 4.5 H14 M2 11.5 H14'}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-ink/95 backdrop-blur-md sm:hidden">
          <Container className="flex flex-col py-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="border-b border-line-soft py-3 text-sm text-muted last:border-0"
              >
                {link.label}
              </NavLink>
            ))}
          </Container>
        </div>
      )}
    </header>
  )
}

function NavItem({ label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-full px-3 py-1.5 text-sm transition-colors ${
          isActive && !to.includes('#')
            ? 'text-fg'
            : 'text-muted hover:text-fg'
        }`
      }
    >
      {label}
    </NavLink>
  )
}
