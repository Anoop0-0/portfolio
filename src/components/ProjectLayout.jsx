import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { otherProject } from '../data/projects.js'
import Container from './Container.jsx'

export default function ProjectLayout({ project, lede, children }) {
  const next = otherProject(project.slug)

  useEffect(() => {
    document.title = `${project.name} — Anoop Baghel`
    return () => {
      document.title = 'Anoop Baghel — Full-stack developer'
    }
  }, [project.name])

  return (
    <article>
      <Container as="header" className="pt-16 pb-14 sm:pt-24">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M13 8 H4 M8 4 L4 8 L8 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          </svg>
          All work
        </Link>

        <p className="label mt-12">{project.kicker}</p>

        <h1 className="mt-5 max-w-3xl font-display text-[2.75rem] leading-[1.05] tracking-tight sm:text-6xl">
          <span style={{ color: `var(${project.accentVar})` }}>{project.name}</span>
          <span className="text-dim"> / </span>
          {project.title}
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{lede}</p>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-8 sm:grid-cols-4">
          <Meta term="Role" value={project.role} />
          <Meta term="Timeline" value={project.period} />
          <Meta term="Scope" value={project.scope} />
          <Meta term="Stack" value={project.stack.join(' · ')} />
        </dl>
      </Container>

      <Container>{children}</Container>

      <Container className="mt-8">
        <Link
          to={next.path}
          className="group flex flex-col gap-3 rounded-2xl border border-line bg-ink-2 p-8 transition-colors hover:bg-surface sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="label">Next case study</p>
            <p className="mt-3 font-display text-3xl tracking-tight">
              <span style={{ color: `var(${next.accentVar})` }}>{next.name}</span>
              <span className="text-muted"> — {next.title}</span>
            </p>
          </div>
          <svg
            width="22"
            height="22"
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M3 8 H12 M8 4 L12 8 L8 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </Link>
      </Container>
    </article>
  )
}

function Meta({ term, value }) {
  return (
    <div>
      <dt className="label">{term}</dt>
      <dd className="mt-2.5 text-sm leading-relaxed text-fg/90">{value}</dd>
    </div>
  )
}
