import { useMemo, useState } from 'react'

/*
 * Everything below the QUESTIONS / OPTIONS / RULES constants is the renderer.
 * It contains no tailoring vocabulary at all — the same code renders any form
 * whose rows follow this shape. That is the whole argument of the chapter, so
 * the figure is built the way the real system is built.
 */

const QUESTIONS = [
  { id: 'q1', label: 'Garment type', type: 'select', required: true },
  { id: 'q2', label: 'Fabric', type: 'select', required: false },
  { id: 'q3', label: 'Lapel style', type: 'select', required: false },
  { id: 'q4', label: 'Collar', type: 'select', required: false },
  { id: 'q5', label: 'Monogram', type: 'select', required: false },
  { id: 'q6', label: 'Monogram text', type: 'text', required: false },
]

const OPTIONS = [
  { questionId: 'q1', value: 'shirt', label: 'Shirt' },
  { questionId: 'q1', value: 'suit', label: 'Suit' },
  { questionId: 'q1', value: 'sherwani', label: 'Sherwani' },
  { questionId: 'q2', value: 'cotton', label: 'Cotton' },
  { questionId: 'q2', value: 'linen', label: 'Linen' },
  { questionId: 'q2', value: 'wool', label: 'Wool' },
  { questionId: 'q3', value: 'notch', label: 'Notch' },
  { questionId: 'q3', value: 'peak', label: 'Peak' },
  { questionId: 'q4', value: 'spread', label: 'Spread' },
  { questionId: 'q4', value: 'cutaway', label: 'Cutaway' },
  { questionId: 'q5', value: 'yes', label: 'Yes' },
  { questionId: 'q5', value: 'no', label: 'No' },
]

const RULES = [
  { id: 'r1', when: 'q1', equals: 'suit', action: 'reveal', target: 'q3' },
  { id: 'r2', when: 'q1', equals: 'shirt', action: 'reveal', target: 'q4' },
  { id: 'r3', when: 'q5', equals: 'yes', action: 'reveal', target: 'q6' },
  { id: 'r4', when: 'q1', equals: 'sherwani', action: 'require', target: 'q2' },
]

const optionsFor = (id) => OPTIONS.filter((o) => o.questionId === id)
const labelFor = (id) => QUESTIONS.find((q) => q.id === id)?.label ?? id
const optionLabel = (qid, value) =>
  OPTIONS.find((o) => o.questionId === qid && o.value === value)?.label ?? value

/** Questions nobody reveals are visible from the start. */
const CONDITIONAL = new Set(RULES.filter((r) => r.action === 'reveal').map((r) => r.target))

export default function FormEngine() {
  const [answers, setAnswers] = useState({ q1: 'suit' })

  const set = (id, value) =>
    setAnswers((prev) => ({ ...prev, [id]: prev[id] === value ? undefined : value }))

  // Visibility and requiredness are derived on every render, never stored.
  const { firing, visible, required } = useMemo(() => {
    const firing = RULES.filter((r) => answers[r.when] === r.equals)
    const revealed = new Set(firing.filter((r) => r.action === 'reveal').map((r) => r.target))
    const required = new Set([
      ...QUESTIONS.filter((q) => q.required).map((q) => q.id),
      ...firing.filter((r) => r.action === 'require').map((r) => r.target),
    ])
    const visible = QUESTIONS.filter((q) => !CONDITIONAL.has(q.id) || revealed.has(q.id))
    return { firing, visible, required }
  }, [answers])

  const firingIds = new Set(firing.map((r) => r.id))
  const missing = visible.filter((q) => required.has(q.id) && !answers[q.id])

  return (
    <div>
      <div className="grid lg:grid-cols-2">
        {/* ---------------- the rows ---------------- */}
        <div className="border-b-[3px] border-ink p-5 lg:border-r-[3px] lg:border-b-0">
          <p className="label text-dim">Definition &middot; rows in PostgreSQL</p>

          <p className="label mt-5 text-cobalt">question</p>
          <ul className="mt-2.5 flex flex-col">
            {QUESTIONS.map((q) => (
              <li
                key={q.id}
                className="flex items-baseline gap-3 border-t border-line py-1.5 font-mono text-xs last:border-b last:border-line"
              >
                <span className="w-6 shrink-0 text-dim">{q.id}</span>
                <span className="flex-1 text-ink">{q.label}</span>
                <span className="text-dim">{q.type}</span>
                {CONDITIONAL.has(q.id) && (
                  <span className="shrink-0 text-cobalt">conditional</span>
                )}
              </li>
            ))}
          </ul>

          <p className="label mt-6 text-cobalt">rule</p>
          <ul className="mt-2.5 flex flex-col gap-1.5" aria-live="polite">
            {RULES.map((r) => {
              const on = firingIds.has(r.id)
              return (
                <li
                  key={r.id}
                  className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 px-2.5 py-2 font-mono text-[0.7rem] leading-relaxed transition-colors ${
                    on ? 'bg-acid text-ink' : 'bg-white text-muted'
                  }`}
                >
                  <span className={on ? 'text-ink' : 'text-dim'}>{r.id}</span>
                  <span className="min-w-0 flex-1">
                    WHEN {r.when} = {r.equals} THEN {r.action} {r.target}
                  </span>
                  <span className="shrink-0">{on ? 'firing' : '\u2014'}</span>
                </li>
              )
            })}
          </ul>

          <p className="mt-5 font-mono text-[0.7rem] leading-relaxed text-dim">
            No tailoring vocabulary appears in the renderer. Adding a garment type is an
            INSERT.
          </p>
        </div>

        {/* ---------------- what the renderer produces ---------------- */}
        <div className="p-5">
          <p className="label text-dim">Rendered output</p>

          <div className="mt-5 flex flex-col gap-5">
            {visible.map((q) => (
              <fieldset key={q.id} className="border-0 p-0">
                <legend className="label mb-2.5 text-ink">
                  {q.label}
                  {required.has(q.id) && (
                    <span className="ml-2 text-cobalt">required</span>
                  )}
                </legend>

                {q.type === 'select' ? (
                  <div className="flex flex-wrap gap-2">
                    {optionsFor(q.id).map((o) => {
                      const on = answers[q.id] === o.value
                      return (
                        <button
                          key={o.value}
                          type="button"
                          aria-pressed={on}
                          onClick={() => set(q.id, o.value)}
                          className={`border-2 px-3 py-1.5 text-sm transition-colors ${
                            on
                              ? 'border-cobalt bg-cobalt text-white'
                              : 'border-ink bg-white text-ink hover:bg-acid'
                          }`}
                        >
                          {o.label}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={answers[q.id] ?? ''}
                    onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
                    placeholder="Up to 4 characters"
                    maxLength={4}
                    className="w-full max-w-56 border-2 border-ink bg-white px-3 py-1.5 font-mono text-sm text-ink placeholder:text-dim"
                  />
                )}
              </fieldset>
            ))}
          </div>

          <div className="mt-7 border-t-2 border-ink pt-4">
            <p className="font-mono text-[0.7rem] leading-relaxed text-muted">
              {visible.length} of {QUESTIONS.length} questions visible &middot;{' '}
              {firing.length} {firing.length === 1 ? 'rule' : 'rules'} firing
            </p>
            <p className="mt-1.5 font-mono text-[0.7rem] leading-relaxed text-dim">
              {missing.length === 0
                ? 'Submission would validate.'
                : `Blocked: ${missing.map((q) => labelFor(q.id)).join(', ')} still required.`}
            </p>
          </div>

          <p className="mt-5 font-mono text-[0.7rem] leading-relaxed break-words text-dim">
            answers ={' '}
            {JSON.stringify(
              Object.fromEntries(
                visible
                  .filter((q) => answers[q.id])
                  .map((q) => [
                    q.id,
                    q.type === 'select' ? optionLabel(q.id, answers[q.id]) : answers[q.id],
                  ]),
              ),
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
