const FIELD = 'var(--color-muted)'

/**
 * The order system's relational shape. Forms, questions, options and
 * conditional rules are rows — so a new form is a seed script, not a deploy.
 */
export default function SchemaGraph() {
  return (
    <div className="overflow-x-auto p-4 sm:p-6">
      <svg
        viewBox="0 0 760 400"
        className="h-auto w-full min-w-[38rem]"
        role="img"
        aria-label="Entity diagram: a Form has many Questions, a Question has many Options, and a Rule references a trigger question, an expected option, and a target question."
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill="var(--color-dim)" />
          </marker>
        </defs>

        <Entity
          x={20}
          y={40}
          title="Form"
          fields={['id', 'clientId', 'name', 'version']}
        />
        <Entity
          x={280}
          y={40}
          title="Question"
          fields={['id', 'formId →', 'label', 'type', 'order']}
          accent
        />
        <Entity
          x={560}
          y={40}
          title="Option"
          fields={['id', 'questionId →', 'label', 'value']}
        />
        <Entity
          x={280}
          y={252}
          title="Rule"
          fields={['whenQuestionId →', 'whenOptionId →', 'action', 'targetQuestionId →']}
          w={200}
        />

        {/* Form 1:N Question */}
        <line
          x1={200}
          y1={100}
          x2={272}
          y2={100}
          stroke="var(--color-dim)"
          strokeWidth="1.25"
          markerEnd="url(#arrow)"
        />
        <text x={236} y={90} textAnchor="middle" fill="var(--color-dim)" fontSize="10" fontFamily="var(--font-mono)">
          1:N
        </text>

        {/* Question 1:N Option */}
        <line
          x1={460}
          y1={100}
          x2={552}
          y2={100}
          stroke="var(--color-dim)"
          strokeWidth="1.25"
          markerEnd="url(#arrow)"
        />
        <text x={506} y={90} textAnchor="middle" fill="var(--color-dim)" fontSize="10" fontFamily="var(--font-mono)">
          1:N
        </text>

        {/* Rule -> trigger question */}
        <path
          d="M320 252 L320 178"
          stroke="var(--color-cobalt)"
          strokeWidth="1.25"
          strokeDasharray="4 4"
          fill="none"
          markerEnd="url(#arrow)"
        />
        <text x={312} y={220} textAnchor="end" fill="var(--color-cobalt)" fontSize="10" fontFamily="var(--font-mono)">
          when
        </text>

        {/* Rule -> target question */}
        <path
          d="M430 252 L430 178"
          stroke="var(--color-cobalt)"
          strokeWidth="1.25"
          strokeDasharray="4 4"
          fill="none"
          markerEnd="url(#arrow)"
        />
        <text x={438} y={220} fill="var(--color-cobalt)" fontSize="10" fontFamily="var(--font-mono)">
          then reveal
        </text>

        {/* Rule -> expected option */}
        <path
          d="M480 300 L640 300 L640 162"
          stroke="var(--color-cobalt)"
          strokeWidth="1.25"
          strokeDasharray="4 4"
          fill="none"
          markerEnd="url(#arrow)"
        />
        <text x={560} y={292} textAnchor="middle" fill="var(--color-cobalt)" fontSize="10" fontFamily="var(--font-mono)">
          equals
        </text>

        <text x={20} y={388} fill="var(--color-dim)" fontSize="10" fontFamily="var(--font-mono)">
          → foreign key · dashed = conditional logic evaluated at render time
        </text>
      </svg>
    </div>
  )
}

function Entity({ x, y, title, fields, w = 180, accent = false }) {
  const h = 34 + fields.length * 18 + 12
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="0"
        fill="var(--color-white)"
        stroke={accent ? 'var(--color-cobalt)' : 'var(--color-ink)'}
        strokeWidth="1.25"
      />
      <rect
        x={x}
        y={y}
        width={w}
        height="34"
        rx="0"
        fill={accent ? 'var(--color-cobalt-tint)' : 'rgba(0,0,0,0.04)'}
      />
      <text
        x={x + 14}
        y={y + 22}
        fill="var(--color-ink)"
        fontSize="13"
        fontFamily="var(--font-mono)"
      >
        {title}
      </text>
      {fields.map((field, i) => (
        <text
          key={field}
          x={x + 14}
          y={y + 52 + i * 18}
          fill={FIELD}
          fontSize="11"
          fontFamily="var(--font-mono)"
        >
          {field}
        </text>
      ))}
    </g>
  )
}
