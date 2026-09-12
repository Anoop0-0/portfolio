import { useState } from 'react'

/* Sample workspace. A real one invents its own columns, roles and ranks. */

const COLUMNS = [
  { key: 'planned', label: 'Planned' },
  { key: 'writing', label: 'Writing' },
  { key: 'design', label: 'Design' },
  { key: 'review', label: 'Review' },
  { key: 'approval', label: 'Client approval' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'posted', label: 'Posted', finishes: true },
]

const CAPABILITIES = [
  'canManage',
  'canManageRoles',
  'canManageClients',
  'canEditPlan',
  'canCreateTask',
  'canDeleteTask',
  'canViewReports',
]

const ROLES = [
  {
    key: 'owner',
    label: 'Owner',
    rank: 1,
    caps: CAPABILITIES,
    sees: COLUMNS.map((c) => c.key),
    moves: COLUMNS.map((c) => c.key),
  },
  {
    key: 'manager',
    label: 'Account manager',
    rank: 2,
    caps: ['canManage', 'canManageClients', 'canEditPlan', 'canCreateTask', 'canViewReports'],
    sees: COLUMNS.map((c) => c.key),
    moves: ['planned', 'writing', 'design', 'review'],
  },
  {
    key: 'designer',
    label: 'Designer',
    rank: 3,
    caps: ['canCreateTask'],
    sees: ['planned', 'design', 'review'],
    moves: ['design', 'review'],
  },
  {
    key: 'writer',
    label: 'Writer',
    rank: 3,
    caps: ['canCreateTask'],
    sees: ['planned', 'writing', 'review'],
    moves: ['writing', 'review'],
  },
  {
    key: 'liaison',
    label: 'Client liaison',
    rank: 4,
    caps: ['canManageClients', 'canViewReports'],
    sees: ['review', 'approval', 'scheduled', 'posted'],
    moves: ['approval', 'scheduled', 'posted'],
  },
]

/**
 * A role is a record, not a string. The two column lists are independent on
 * purpose — the gap between what you can see and what you can move work into
 * is where a hand-off happens.
 */
export default function RoleDesigner() {
  const [active, setActive] = useState('designer')
  const role = ROLES.find((r) => r.key === active)

  const handoff = role.sees.filter((k) => !role.moves.includes(k))

  return (
    <div className="p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="label text-dim">Role editor &middot; sample workspace</p>
        <p className="label text-dim">Ranked, not named</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {ROLES.map((r) => {
          const on = r.key === active
          return (
            <button
              key={r.key}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(r.key)}
              className={`border-2 px-3 py-1.5 text-sm transition-colors ${
                on
                  ? 'border-magenta bg-magenta text-white'
                  : 'border-ink bg-white text-ink hover:bg-acid'
              }`}
            >
              {r.label}
              <span className={`ml-2 font-mono text-xs ${on ? 'text-magenta-tint' : 'text-dim'}`}>
                r{r.rank}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <div>
          <p className="label text-magenta">capabilities</p>
          <ul className="mt-3 flex flex-col">
            {CAPABILITIES.map((cap) => {
              const on = role.caps.includes(cap)
              return (
                <li
                  key={cap}
                  className="flex items-center gap-3 border-t border-line py-1.5 font-mono text-xs last:border-b last:border-line"
                >
                  <span
                    aria-hidden="true"
                    className={`inline-block h-2.5 w-2.5 shrink-0 ${
                      on ? 'bg-magenta' : 'bg-line'
                    }`}
                  />
                  <span className={`flex-1 ${on ? 'text-ink' : 'text-dim'}`}>{cap}</span>
                  <span className={on ? 'text-magenta' : 'text-dim'}>
                    {on ? 'true' : 'false'}
                  </span>
                </li>
              )
            })}
          </ul>
          <p className="mt-3 font-mono text-[0.7rem] leading-relaxed text-dim">
            Code asks can(&lsquo;canManage&rsquo;). Nothing compares a role by name.
          </p>
        </div>

        <div>
          <p className="label text-magenta">the board this role gets</p>
          <ul className="mt-3 flex flex-col gap-1.5">
            {COLUMNS.map((col) => {
              const sees = role.sees.includes(col.key)
              const moves = role.moves.includes(col.key)
              return (
                <li
                  key={col.key}
                  className={`flex flex-wrap items-center gap-x-3 gap-y-1 border-2 px-3 py-2 transition-colors ${
                    !sees
                      ? 'border-line bg-white text-dim'
                      : moves
                        ? 'border-magenta bg-magenta/10 text-ink'
                        : 'border-ink bg-white text-ink'
                  }`}
                >
                  <span className="flex-1 text-sm">
                    {col.label}
                    {col.finishes && (
                      <span className="ml-2 font-mono text-[0.7rem] text-dim">finishes</span>
                    )}
                  </span>
                  <span className="font-mono text-[0.7rem]">
                    {!sees ? 'hidden' : moves ? 'can move into' : 'read-only'}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="mt-6 border-t-2 border-ink pt-4" aria-live="polite">
        <p className="font-mono text-[0.7rem] leading-relaxed text-muted">
          Sees {role.sees.length} of {COLUMNS.length} columns &middot; can move into{' '}
          {role.moves.length}
        </p>
        <p className="mt-1.5 font-mono text-[0.7rem] leading-relaxed text-dim">
          {handoff.length === 0
            ? 'No gap — this role can move work anywhere it can see.'
            : `The gap is the hand-off: ${handoff
                .map((k) => COLUMNS.find((c) => c.key === k).label)
                .join(', ')} — visible, but somebody else moves it.`}
        </p>
      </div>
    </div>
  )
}
