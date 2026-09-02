import { useMemo, useState } from 'react'

const ROW_H = 56

const INITIAL = [
  { id: 'r', name: 'Rohan', score: 4820, you: false },
  { id: 'y', name: 'You', score: 4610, you: true },
  { id: 'k', name: 'Kabir', score: 4405, you: false },
  { id: 'i', name: 'Ishaan', score: 4180, you: false },
  { id: 'm', name: 'Meera', score: 3990, you: false },
]

const LIFTS = [
  { label: 'Bench 92.5 kg × 5', points: 180 },
  { label: 'Squat 140 kg × 3', points: 240 },
  { label: 'Deadlift 175 kg × 2', points: 260 },
]

/**
 * Logging a lift straight from the leaderboard and watching the group
 * re-rank. Scores settle within seconds for everyone in the group.
 */
export default function LiveLeaderboard() {
  const [rows, setRows] = useState(INITIAL)
  const [liftIndex, setLiftIndex] = useState(0)
  const [pulse, setPulse] = useState(false)

  const ranked = useMemo(
    () => [...rows].sort((a, b) => b.score - a.score).map((r, i) => ({ ...r, rank: i })),
    [rows],
  )

  const logLift = () => {
    const lift = LIFTS[liftIndex % LIFTS.length]
    setRows((prev) =>
      prev.map((r) => (r.you ? { ...r, score: r.score + lift.points } : r)),
    )
    setLiftIndex((i) => i + 1)
    setPulse(true)
    window.setTimeout(() => setPulse(false), 900)
  }

  const nextLift = LIFTS[liftIndex % LIFTS.length]

  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="label">Group · invite code IRN-4KQ2</p>
        <p className="flex items-center gap-2 label">
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full bg-iron ${pulse ? 'animate-ping' : ''}`}
          />
          live
        </p>
      </div>

      <div
        className="relative mt-6"
        style={{ height: ranked.length * ROW_H }}
        aria-live="polite"
      >
        {ranked.map((row) => (
          <div
            key={row.id}
            className="absolute inset-x-0 flex items-center gap-4 rounded-lg border px-4 transition-transform duration-500 ease-out"
            style={{
              height: ROW_H - 8,
              transform: `translateY(${row.rank * ROW_H}px)`,
              borderColor: row.you ? 'color-mix(in srgb, var(--color-iron) 40%, transparent)' : 'var(--color-line)',
              backgroundColor: row.you ? 'color-mix(in srgb, var(--color-iron) 8%, transparent)' : 'transparent',
            }}
          >
            <span className="font-mono text-xs text-dim">{row.rank + 1}</span>
            <span className={`flex-1 text-sm ${row.you ? 'text-fg' : 'text-muted'}`}>
              {row.name}
            </span>
            <span
              className="font-mono text-sm tabular-nums"
              style={{ color: row.you ? 'var(--color-iron)' : 'var(--color-muted)' }}
            >
              {row.score.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        <p className="text-xs text-dim">
          Log without leaving the board — the entry point is the row itself.
        </p>
        <button
          type="button"
          onClick={logLift}
          className="rounded-full border border-iron/50 bg-iron/10 px-4 py-2 font-mono text-[0.72rem] text-iron transition-colors hover:bg-iron/20"
        >
          Log {nextLift.label}
        </button>
      </div>
    </div>
  )
}
