import { useState } from 'react'

const SETS = [
  { id: 'a1', reps: 8, weight: 60 },
  { id: 'a2', reps: 8, weight: 65 },
  { id: 'a3', reps: 6, weight: 70 },
  { id: 'a4', reps: 5, weight: 75 },
]

/**
 * Per-set persistence versus a bulk submit at the end of the workout.
 * Log a few sets, then interrupt the session and compare what survives.
 */
export default function SetPersistence() {
  const [saved, setSaved] = useState([])
  const [interrupted, setInterrupted] = useState(false)

  const logSet = (id) => {
    if (saved.includes(id) || interrupted) return
    setSaved((prev) => [...prev, id])
  }

  const reset = () => {
    setSaved([])
    setInterrupted(false)
  }

  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="label">Bench press · working sets</p>
        <p className="label">{saved.length} of {SETS.length} logged</p>
      </div>

      <ul className="mt-6 flex flex-col gap-2">
        {SETS.map((set, i) => {
          const isSaved = saved.includes(set.id)
          return (
            <li key={set.id}>
              <button
                type="button"
                onClick={() => logSet(set.id)}
                disabled={isSaved || interrupted}
                className={`flex w-full items-center gap-4 rounded-lg border px-4 py-3 text-left transition-colors ${
                  isSaved
                    ? 'border-iron/40 bg-iron/10'
                    : interrupted
                      ? 'cursor-not-allowed border-line opacity-40'
                      : 'border-line hover:border-dim'
                }`}
              >
                <span className="font-mono text-xs text-dim">SET {i + 1}</span>
                <span className="flex-1 font-mono text-sm text-fg">
                  {set.weight} kg × {set.reps}
                </span>
                <span
                  className="font-mono text-[0.7rem]"
                  style={{ color: isSaved ? 'var(--color-iron)' : 'var(--color-dim)' }}
                >
                  {isSaved ? 'PUT 200 · saved' : 'tap to log'}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <p className="mt-4 overflow-x-auto font-mono text-[0.7rem] whitespace-nowrap text-dim">
        PUT /workouts/:workoutId/exercises/:exerciseId/sets/:setId
      </p>

      <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => setInterrupted(true)}
          disabled={interrupted}
          className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.7rem] text-muted transition-colors hover:border-dim hover:text-fg disabled:opacity-40"
        >
          Phone locks · tab evicted
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.7rem] text-muted transition-colors hover:border-dim hover:text-fg"
        >
          Reset
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Result
          model="IRONLOG · per-set write"
          kept={interrupted ? saved.length : null}
          total={SETS.length}
          tone="var(--color-iron)"
          detail="Each tap is its own committed write. The interruption costs nothing already logged."
        />
        <Result
          model="Bulk submit at workout end"
          kept={interrupted ? 0 : null}
          total={SETS.length}
          tone="var(--color-dim)"
          detail="State lived in a component until a final POST that never happened."
        />
      </div>
    </div>
  )
}

function Result({ model, kept, total, tone, detail }) {
  return (
    <div className="rounded-lg border border-line p-4">
      <p className="label">{model}</p>
      <p className="mt-3 font-mono text-lg" style={{ color: kept === null ? 'var(--color-dim)' : tone }}>
        {kept === null ? '—' : `${kept} / ${total} sets kept`}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-dim">{detail}</p>
    </div>
  )
}
