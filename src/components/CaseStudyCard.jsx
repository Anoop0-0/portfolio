import { Link } from 'react-router-dom'

export default function CaseStudyCard({ project, index }) {
  return (
    <Link
      to={project.path}
      className="group relative block overflow-hidden rounded-2xl border border-line bg-ink-2 p-7 transition-colors duration-300 hover:border-line/0 hover:bg-surface sm:p-10"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, var(${project.accentVar}), transparent)`,
        }}
      />

      <div className="flex items-baseline justify-between gap-4">
        <p className="label">
          {String(index).padStart(2, '0')} — {project.kicker}
        </p>
        <p className="label">{project.period}</p>
      </div>

      <h3 className="mt-6 font-display text-3xl leading-[1.1] tracking-tight sm:text-[2.75rem]">
        <span style={{ color: `var(${project.accentVar})` }}>{project.name}</span>
        <span className="text-fg"> — {project.title}</span>
      </h3>

      <p className="mt-5 max-w-2xl leading-relaxed text-muted">{project.tagline}</p>

      <ul className="mt-7 flex flex-col gap-2.5 border-t border-line pt-6">
        {project.highlights.slice(0, 3).map((h) => (
          <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span
              aria-hidden="true"
              className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full"
              style={{ backgroundColor: `var(${project.accentVar})` }}
            />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] text-dim"
            >
              {tech}
            </li>
          ))}
        </ul>

        <span className="flex items-center gap-2 text-sm font-medium text-fg">
          Read the case study
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
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
        </span>
      </div>
    </Link>
  )
}
