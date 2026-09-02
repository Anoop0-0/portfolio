import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import { projects } from '../data/projects.js'

export default function NotFound() {
  return (
    <Container className="py-32">
      <p className="label">404</p>
      <h1 className="mt-5 font-display text-5xl tracking-tight sm:text-6xl">
        Nothing here.
      </h1>
      <p className="mt-5 max-w-md leading-relaxed text-muted">
        That page does not exist. The two case studies are probably what you were
        looking for.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link
          to="/"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
        >
          Home
        </Link>
        {projects.map((p) => (
          <Link
            key={p.slug}
            to={p.path}
            className="rounded-full border border-line px-5 py-2.5 text-sm text-muted transition-colors hover:border-dim hover:text-fg"
          >
            {p.name}
          </Link>
        ))}
      </div>
    </Container>
  )
}
