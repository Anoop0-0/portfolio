import { useState } from 'react'

const WS = 'ws_7f3a'
const OTHER = 'ws_2ab9'

/**
 * The same request, with and without the global scoping plugin. Without it,
 * isolation is a thing fourteen route files have to remember; with it, the
 * filter is added underneath them and forgetting is not an option.
 */
export default function TenantScope() {
  const [guarded, setGuarded] = useState(true)

  return (
    <div className="p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="label text-dim">GET /api/tasks/t_88f &middot; signed in to {WS}</p>
        <button
          type="button"
          onClick={() => setGuarded((v) => !v)}
          aria-pressed={guarded}
          className="border-2 border-ink bg-white px-3 py-1.5 font-mono text-[0.7rem] text-ink transition-colors hover:bg-acid"
        >
          {guarded ? 'Remove the plugin' : 'Restore the plugin'}
        </button>
      </div>

      <ol className="mt-6 flex flex-col">
        <Step
          n="1"
          title="Route code, unchanged either way"
          body={`Task.findOne({ _id: 't_88f' })`}
          note="Nothing here mentions a workspace. That is the point — it cannot be forgotten if it was never the route's job."
        />
        <Step
          n="2"
          title={guarded ? 'Global plugin rewrites the query' : 'Nothing rewrites the query'}
          body={
            guarded
              ? `{ _id: 't_88f', workspace: '${WS}' }`
              : `{ _id: 't_88f' }`
          }
          note={
            guarded
              ? 'Applied to every model that has a workspace field. Models without one are skipped automatically.'
              : 'The document belongs to ' + OTHER + ', and nothing in this query says otherwise.'
          }
          tone={guarded ? 'ok' : 'bad'}
        />
        <Step
          n="3"
          title="What the signed-in person receives"
          body={guarded ? '404 Not Found' : `200 OK  { workspace: '${OTHER}', … }`}
          note={
            guarded
              ? 'Not 403 — a workspace should not be able to learn that another workspace’s record exists.'
              : 'A cross-tenant read. One forgetful route file is all it takes.'
          }
          tone={guarded ? 'ok' : 'bad'}
          last
        />
      </ol>

      <div className="mt-2 border-t-2 border-ink pt-4">
        <p className="label text-cobalt">proved over the wire, not in a unit test</p>
        <ul className="mt-3 flex flex-col">
          {[
            ['leak-check', 'boots the real Express app against a scratch database and asserts a member of one workspace cannot read another’s data'],
            ['role-check', 'asserts each role receives exactly what its settings say it should'],
          ].map(([name, what]) => (
            <li
              key={name}
              className="flex flex-col gap-1 border-t border-line py-2.5 last:border-b last:border-line sm:flex-row sm:gap-4"
            >
              <span className="shrink-0 font-mono text-xs text-cobalt sm:w-24">{name}</span>
              <span className="text-sm leading-relaxed text-muted">{what}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Step({ n, title, body, note, tone = 'plain', last = false }) {
  const accent =
    tone === 'ok' ? 'var(--color-cobalt)' : tone === 'bad' ? 'var(--color-ink)' : 'var(--color-line)'
  return (
    <li className="grid grid-cols-[auto_1fr] gap-x-4">
      <div className="flex flex-col items-center">
        <span
          aria-hidden="true"
          className="mt-1 h-2.5 w-2.5 shrink-0"
          style={{ backgroundColor: accent }}
        />
        {!last && <span aria-hidden="true" className="my-1 w-0.5 flex-1 bg-line" />}
      </div>
      <div className="pb-6">
        <p className="label text-ink">
          <span className="mr-2 text-dim">{n}</span>
          {title}
        </p>
        <pre
          className="mt-2.5 overflow-x-auto border-2 px-3 py-2 font-mono text-xs leading-relaxed whitespace-pre"
          style={{
            borderColor: tone === 'plain' ? 'var(--color-line)' : accent,
            backgroundColor: 'var(--color-white)',
          }}
        >
          {body}
        </pre>
        <p className="mt-2 text-xs leading-relaxed text-dim">{note}</p>
      </div>
    </li>
  )
}
