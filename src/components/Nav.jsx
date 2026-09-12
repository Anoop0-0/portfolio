import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from './Container.jsx'

const links = [
  { label: 'Curl-O', to: '/work/curl-o' },
  { label: 'IRONLOG', to: '/work/ironlog' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 bg-ink text-paper">
      <Container className="flex h-14 items-center justify-between gap-6">
        <Link to="/" className="head-type text-base tracking-tight">
          Anoop Baghel
        </Link>

        <nav className="hidden items-stretch gap-0 sm:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `label px-3 py-2 transition-colors ${
                  isActive && !link.to.includes('#')
                    ? 'bg-acid text-ink'
                    : 'text-paper hover:bg-acid hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="label -mr-2 px-2 py-2 text-paper transition-colors hover:bg-acid hover:text-ink sm:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </Container>

      {open && (
        <div className="border-t-2 border-paper/20 sm:hidden">
          <Container className="flex flex-col py-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="head-type border-b border-paper/15 py-4 text-xl text-paper last:border-0"
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
