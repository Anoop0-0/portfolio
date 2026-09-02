import Container from './Container.jsx'
import Reveal from './Reveal.jsx'

/** Section heading: mono eyebrow above wide plate lettering, over a 3px rule. */
export function SectionHeading({ eyebrow, title, className = '' }) {
  return (
    <div className={`border-t-[3px] border-ink pt-5 ${className}`}>
      {eyebrow && <p className="label text-muted">{eyebrow}</p>}
      <h2 className="head-type mt-4 text-3xl sm:text-5xl">{title}</h2>
    </div>
  )
}

/**
 * A numbered case-study chapter. The numeral is oversized and set in the
 * project's hue — chapters here are a real sequence, so the number is data.
 */
export function Chapter({ index, title, summary, hue, children }) {
  return (
    <Reveal as="section" className="border-t-[3px] border-ink py-12 sm:py-16">
      <div className="grid gap-7 lg:grid-cols-[11rem_1fr] lg:gap-14">
        <div className="min-w-0 lg:sticky lg:top-20 lg:self-start">
          <p
            className="num-type text-6xl sm:text-7xl"
            style={{ color: `var(${hue})` }}
            aria-hidden="true"
          >
            {String(index).padStart(2, '0')}
          </p>
          <h2 className="head-type mt-4 text-xl leading-[1.05] sm:text-2xl">{title}</h2>
        </div>

        <div className="min-w-0 max-w-[62ch]">
          {summary && (
            <p className="text-lg leading-[1.45] font-medium sm:text-xl">{summary}</p>
          )}
          <div className="mt-6 flex flex-col gap-6">{children}</div>
        </div>
      </div>
    </Reveal>
  )
}

export function P({ children }) {
  return <p className="leading-[1.68] text-muted">{children}</p>
}

export function Em({ children }) {
  return <strong className="font-semibold text-ink">{children}</strong>
}

export function Code({ children }) {
  return (
    <code className="bg-ink px-1.5 py-0.5 font-mono text-[0.82em] text-acid [overflow-wrap:anywhere]">
      {children}
    </code>
  )
}

/** The sharpest idea in a chapter, knocked out of ink. */
export function Callout({ label = 'The idea', children }) {
  return (
    <aside className="bg-ink px-6 py-6 text-paper">
      <p className="label text-acid">{label}</p>
      <p className="head-type mt-4 text-lg leading-[1.25] sm:text-xl">{children}</p>
    </aside>
  )
}

export function List({ items }) {
  return (
    <ul className="flex flex-col">
      {items.map((item, i) => (
        <li
          key={i}
          className="border-t border-line py-3.5 leading-relaxed text-muted last:border-b last:border-line"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

/** Decision / trade-off pairs — the part of a case study people actually read. */
export function Tradeoffs({ rows, hueDeep }) {
  return (
    <div className="border-[3px] border-ink">
      {rows.map((row, i) => (
        <div
          key={i}
          className="grid gap-2 border-b border-line px-5 py-5 last:border-0 sm:grid-cols-[1fr_1.4fr] sm:gap-7"
        >
          <p className="head-type text-sm" style={{ color: `var(${hueDeep})` }}>
            {row.decision}
          </p>
          <p className="text-sm leading-relaxed text-muted">{row.because}</p>
        </div>
      ))}
    </div>
  )
}

/** Figures sit on a tinted field of their project's hue, not a neutral panel. */
export function Figure({ caption, children, bleed = false, tint }) {
  return (
    <figure className={`min-w-0 ${bleed ? 'lg:-mr-28' : ''}`}>
      <div
        className="border-[3px] border-ink"
        style={tint ? { backgroundColor: `var(${tint})` } : { backgroundColor: 'var(--color-white)' }}
      >
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-xs leading-relaxed text-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export { Container }
