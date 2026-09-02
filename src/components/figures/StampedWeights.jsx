const AUGUST = [
  { name: 'Shoot production', weight: 25 },
  { name: 'Editing & post', weight: 20 },
  { name: 'Client review loop', weight: 15 },
]

const SEPTEMBER = [
  { name: 'Shoot production', weight: 30, changed: true },
  { name: 'Editing & post', weight: 20 },
  { name: 'Client review loop', weight: 10, changed: true },
]

/**
 * Why weights live on the task, not on the route definition: a template edit
 * in September must not reach backwards into a closed August.
 */
export default function StampedWeights() {
  return (
    <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
      <Month
        title="August · closed"
        note="Weights were copied onto each task when it was created. The month is frozen."
        steps={AUGUST}
        state="frozen"
      />
      <Month
        title="September · open"
        note="Route template edited on 1 Sep. New tasks carry the new weights."
        steps={SEPTEMBER}
        state="live"
      />
    </div>
  )
}

function Month({ title, note, steps, state }) {
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 ${
            state === 'frozen' ? 'bg-dim' : 'bg-cobalt'
          }`}
        />
        <p className="label">{title}</p>
      </div>

      <ul className="mt-5 flex flex-col gap-2">
        {steps.map((step) => (
          <li
            key={step.name}
            className={`flex items-center justify-between gap-4 border px-3 py-2.5 ${
              step.changed ? 'border-cobalt/40 bg-cobalt/5' : 'border-line'
            }`}
          >
            <span className="text-sm text-muted">{step.name}</span>
            <span
              className={`font-mono text-xs tabular-nums ${
                step.changed ? 'text-cobalt' : 'text-dim'
              }`}
            >
              {step.weight}%
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs leading-relaxed text-dim">{note}</p>
    </div>
  )
}
