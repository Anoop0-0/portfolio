import Container from './Container.jsx'
import Reveal from './Reveal.jsx'

/** Section heading with a monospace eyebrow and a rule. */
export function SectionHeading({ eyebrow, title, className = '' }) {
  return (
    <div className={`border-t border-line pt-6 ${className}`}>
      {eyebrow && <p className="label">{eyebrow}</p>}
      <h2 className="mt-4 font-display text-3xl leading-[1.15] tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  )
}

/** A numbered case-study chapter: sticky index on the left, body on the right. */
export function Chapter({ index, title, summary, children }) {
  return (
    <Reveal as="section" className="border-t border-line py-14 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[10rem_1fr] lg:gap-12">
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <p className="label">{String(index).padStart(2, '0')}</p>
          <h2 className="mt-3 font-display text-2xl leading-tight tracking-tight lg:text-[1.75rem]">
            {title}
          </h2>
        </div>
        <div className="min-w-0 max-w-2xl">
          {summary && (
            <p className="text-lg leading-relaxed text-fg/90 sm:text-xl">{summary}</p>
          )}
          <div className="mt-6 flex flex-col gap-6">{children}</div>
        </div>
      </div>
    </Reveal>
  )
}

export function P({ children }) {
  return <p className="leading-[1.75] text-muted">{children}</p>
}

export function Em({ children }) {
  return <strong className="font-medium text-fg">{children}</strong>
}

export function Code({ children }) {
  return (
    <code className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-fg/90 [overflow-wrap:anywhere]">
      {children}
    </code>
  )
}

/** Pull-out for the single sharpest idea in a chapter. */
export function Callout({ label = 'The idea', children }) {
  return (
    <aside className="relative rounded-lg border border-line bg-surface/60 p-5 pl-6">
      <span
        aria-hidden="true"
        className="absolute top-5 bottom-5 left-0 w-[2px] rounded-full bg-accent"
      />
      <p className="label">{label}</p>
      <p className="mt-3 leading-relaxed text-fg/90">{children}</p>
    </aside>
  )
}

export function List({ items }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-muted">
          <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-line" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Decision / trade-off pairs — the part of a case study people actually read. */
export function Tradeoffs({ rows }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      {rows.map((row, i) => (
        <div
          key={i}
          className="grid gap-2 border-b border-line p-5 last:border-0 sm:grid-cols-[1fr_1.4fr] sm:gap-6"
        >
          <p className="font-mono text-[0.8rem] leading-relaxed text-fg">{row.decision}</p>
          <p className="text-sm leading-relaxed text-muted">{row.because}</p>
        </div>
      ))}
    </div>
  )
}

/** Caption wrapper for the inline SVG / interactive figures. */
export function Figure({ caption, children, bleed = false }) {
  return (
    <figure className={`min-w-0 ${bleed ? 'lg:-mr-24' : ''}`}>
      <div className="overflow-hidden rounded-xl border border-line bg-ink-2">{children}</div>
      {caption && (
        <figcaption className="mt-3 font-mono text-xs leading-relaxed text-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export { Container }
