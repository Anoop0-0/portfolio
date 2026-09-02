import { useMemo, useState } from 'react'

const ROUTE = [
  { id: 'strategy', name: 'Content strategy & calendar', weight: 10 },
  { id: 'brief', name: 'Creative brief sign-off', weight: 10 },
  { id: 'shoot', name: 'Shoot production', weight: 25 },
  { id: 'edit', name: 'Editing & post', weight: 20 },
  { id: 'review', name: 'Client review loop', weight: 15 },
  { id: 'publish', name: 'Scheduling & publishing', weight: 12 },
  { id: 'report', name: 'Month-end report', weight: 8 },
]

const START = ['strategy', 'brief']

/**
 * Interactive demonstration of the difference between counting tasks and
 * weighting them. Toggle steps and watch the two bars disagree.
 */
export default function WeightedProgress() {
  const [done, setDone] = useState(() => new Set(START))

  const toggle = (id) =>
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const { weighted, counted } = useMemo(() => {
    const weighted = ROUTE.filter((s) => done.has(s.id)).reduce((sum, s) => sum + s.weight, 0)
    const counted = Math.round((done.size / ROUTE.length) * 100)
    return { weighted, counted }
  }, [done])

  const gap = weighted - counted

  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="label">Monthly route · bespoke tailoring client</p>
        <p className="label">Weights sum to 100</p>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        <Bar
          label="Effort-weighted progress"
          value={weighted}
          tone="var(--color-cobalt)"
          emphasis
        />
        <Bar label="Tasks ticked" value={counted} tone="var(--color-line)" />
      </div>

      <p className="mt-4 font-mono text-xs leading-relaxed text-dim">
        {gap === 0
          ? 'Both models agree here — they usually do not.'
          : `The two models disagree by ${Math.abs(gap)} points. ${
              gap < 0
                ? 'The checkbox count is flattering: the heavy steps are still open.'
                : 'The checkbox count understates it: the expensive work is already done.'
            }`}
      </p>

      <ul className="mt-7 grid gap-2 border-t border-line pt-6 sm:grid-cols-2">
        {ROUTE.map((step) => {
          const isDone = done.has(step.id)
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => toggle(step.id)}
                aria-pressed={isDone}
                className={`flex w-full items-center gap-3 border px-3 py-2.5 text-left transition-colors ${
                  isDone
                    ? 'border-cobalt/40 bg-cobalt/10 text-ink'
                    : 'border-line bg-transparent text-muted hover:border-dim'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${
                    isDone ? 'border-cobalt bg-cobalt' : 'border-dim'
                  }`}
                >
                  {isDone && (
                    <svg width="10" height="10" viewBox="0 0 10 10">
                      <path
                        d="M2 5 L4 7 L8 3"
                        stroke="var(--color-white)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  )}
                </span>
                <span className="flex-1 text-sm leading-snug">{step.name}</span>
                <span className="font-mono text-xs text-dim">{step.weight}%</span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-4 flex items-center gap-3 border border-dashed border-line px-3 py-2.5">
        <span aria-hidden="true" className="font-mono text-xs text-dim">
          +
        </span>
        <span className="flex-1 text-sm text-dim">
          Ad-hoc: emergency reel for a Friday launch
        </span>
        <span className="font-mono text-xs text-dim">tracked · 0%</span>
      </div>
    </div>
  )
}

function Bar({ label, value, tone, emphasis = false }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className={`text-sm ${emphasis ? 'text-ink' : 'text-dim'}`}>{label}</p>
        <p
          className={`font-mono tabular-nums ${
            emphasis ? 'text-xl text-ink' : 'text-sm text-dim'
          }`}
        >
          {value}%
        </p>
      </div>
      <div className="mt-2 h-2 overflow-hidden bg-line">
        <div
          className="h-full transition-[width] duration-500 ease-out"
          style={{ width: `${value}%`, backgroundColor: tone }}
        />
      </div>
    </div>
  )
}
