import { useState } from 'react'

const STEPS = [
  { sql: 'BEGIN', note: 'One transaction, one connection.' },
  {
    sql:"UPDATE client_link SET used_at = now()\n  WHERE token = $1 AND used_at IS NULL",
    note: 'The guard is the WHERE clause, not an earlier read.',
  },
  {
    sql: 'if rowCount = 0 → ROLLBACK',
    note: 'The link was already burned. Nothing was written.',
    branch: true,
  },
  { sql: 'INSERT INTO submission (...) VALUES (...)', note: 'The order is recorded.' },
  { sql: 'COMMIT', note: 'Burn and submission land together, or neither does.' },
]

/**
 * The double-submit race, and why the invalidation has to be a conditional
 * write inside the same transaction as the insert.
 */
export default function BurnOnSubmit() {
  const [fired, setFired] = useState(false)

  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="label">Single-use client link · POST /order/:token</p>
        <button
          type="button"
          onClick={() => setFired((v) => !v)}
          className="border border-line px-3 py-1.5 font-mono text-[0.7rem] text-muted transition-colors hover:border-dim hover:text-ink"
        >
          {fired ? 'Reset' : 'Simulate a double submit'}
        </button>
      </div>

      <ol className="mt-6 flex flex-col">
        {STEPS.map((step, i) => (
          <li key={i} className="grid grid-cols-[auto_1fr] gap-x-4">
            <div className="flex flex-col items-center">
              <span
                aria-hidden="true"
                className="mt-1.5 h-2 w-2 shrink-0"
                style={{
                  backgroundColor: step.branch
                    ? 'var(--color-acid)'
                    : 'var(--color-line)',
                }}
              />
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" className="my-1 w-px flex-1 bg-line" />
              )}
            </div>
            <div className="pb-6">
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre text-ink">
                {step.sql}
              </pre>
              <p className="mt-1.5 text-xs leading-relaxed text-dim">{step.note}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
        <Outcome
          who="Request A"
          verdict="201 Created"
          detail="Claimed the row, inserted the submission, committed."
          tone="var(--color-magenta)"
          active={fired}
        />
        <Outcome
          who="Request B — the duplicate tab"
          verdict={fired ? '410 Gone' : 'idle'}
          detail={
            fired
              ? 'Its UPDATE matched zero rows, so it rolled back before touching submissions.'
              : 'Press the button above to race it against A.'
          }
          tone="var(--color-acid)"
          active={fired}
        />
      </div>
    </div>
  )
}

function Outcome({ who, verdict, detail, tone, active }) {
  return (
    <div
      className="border p-4 transition-colors duration-300"
      style={{
        borderColor: active ? tone : 'var(--color-line)',
        backgroundColor: active ? 'rgba(0,0,0,0.035)' : 'transparent',
      }}
    >
      <p className="label">{who}</p>
      <p
        className="mt-3 font-mono text-sm"
        style={{ color: active ? tone : 'var(--color-dim)' }}
      >
        {verdict}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-dim">{detail}</p>
    </div>
  )
}
