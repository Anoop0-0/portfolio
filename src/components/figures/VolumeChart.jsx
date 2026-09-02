const WEEKS = [
  { label: 'W1', volume: 18200, pr: null },
  { label: 'W2', volume: 19600, pr: null },
  { label: 'W3', volume: 17100, pr: null },
  { label: 'W4', volume: 21400, pr: 'Bench 90 kg' },
  { label: 'W5', volume: 22800, pr: null },
  { label: 'W6', volume: 15900, pr: null },
  { label: 'W7', volume: 23600, pr: 'Squat 135 kg' },
  { label: 'W8', volume: 24900, pr: null },
  { label: 'W9', volume: 21700, pr: null },
  { label: 'W10', volume: 26300, pr: 'Deadlift 170 kg' },
]

const W = 760
const H = 280
const PAD = { top: 46, right: 16, bottom: 44, left: 52 }
const PLOT_W = W - PAD.left - PAD.right
const PLOT_H = H - PAD.top - PAD.bottom
const GAP = 12
const BAR_W = (PLOT_W - GAP * (WEEKS.length - 1)) / WEEKS.length
const MAX = 28000

const y = (v) => PAD.top + PLOT_H - (v / MAX) * PLOT_H

/** Weekly training volume with automatically detected personal records. */
export default function VolumeChart() {
  return (
    <div className="overflow-x-auto p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full min-w-[36rem]"
        role="img"
        aria-label="Bar chart of weekly training volume over ten weeks, with personal records flagged in weeks 4, 7 and 10."
      >
        {[0, 7000, 14000, 21000, 28000].map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left}
              y1={y(tick)}
              x2={W - PAD.right}
              y2={y(tick)}
              stroke="var(--color-line-soft)"
              strokeWidth="1"
            />
            <text
              x={PAD.left - 10}
              y={y(tick) + 3.5}
              textAnchor="end"
              fill="var(--color-dim)"
              fontSize="10"
              fontFamily="var(--font-mono)"
            >
              {tick / 1000}k
            </text>
          </g>
        ))}

        {WEEKS.map((week, i) => {
          const x = PAD.left + i * (BAR_W + GAP)
          const barY = y(week.volume)
          const barH = PAD.top + PLOT_H - barY
          return (
            <g key={week.label}>
              <rect
                x={x}
                y={barY}
                width={BAR_W}
                height={barH}
                rx="0"
                fill={week.pr ? 'var(--color-vermilion)' : 'var(--color-line)'}
              />
              <text
                x={x + BAR_W / 2}
                y={H - PAD.bottom + 18}
                textAnchor="middle"
                fill="var(--color-dim)"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {week.label}
              </text>

              {week.pr && (
                <g>
                  <line
                    x1={x + BAR_W / 2}
                    y1={barY - 6}
                    x2={x + BAR_W / 2}
                    y2={barY - 20}
                    stroke="var(--color-vermilion)"
                    strokeWidth="1"
                  />
                  <circle
                    cx={x + BAR_W / 2}
                    cy={barY - 24}
                    r="3.5"
                    fill="var(--color-vermilion)"
                  />
                  <text
                    x={x + BAR_W / 2}
                    y={barY - 34}
                    textAnchor="middle"
                    fill="var(--color-vermilion-deep)"
                    fontSize="9.5"
                    fontFamily="var(--font-mono)"
                  >
                    {week.pr}
                  </text>
                </g>
              )}
            </g>
          )
        })}

        <text
          x={PAD.left}
          y={22}
          fill="var(--color-muted)"
          fontSize="11"
          fontFamily="var(--font-mono)"
        >
          Weekly volume (kg) · PRs detected on write, not on read
        </text>
      </svg>
    </div>
  )
}
