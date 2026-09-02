const STAGES = ['Own tasks', 'Team workload', 'Client route config', 'Weights & templates', 'Account provisioning']

const ROLES = [
  { name: 'Employee', grants: [true, false, false, false, false] },
  { name: 'Manager', grants: [true, true, true, false, false] },
  { name: 'Admin', grants: [true, true, true, true, true] },
]

/** Three tiers, and what each one is allowed to see. */
export default function RoleMatrix() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="sr-only">
          Stage visibility by role across the three access tiers
        </caption>
        <thead>
          <tr>
            <th scope="col" className="label px-5 py-4 font-normal">
              Role
            </th>
            {STAGES.map((stage) => (
              <th key={stage} scope="col" className="px-3 py-4 align-bottom font-normal">
                <span className="label">{stage}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROLES.map((role) => (
            <tr key={role.name} className="border-t border-line">
              <th scope="row" className="px-5 py-4 text-sm font-medium text-ink">
                {role.name}
              </th>
              {role.grants.map((granted, i) => (
                <td key={STAGES[i]} className="px-3 py-4">
                  {granted ? (
                    <span className="flex h-5 w-5 items-center justify-center bg-cobalt/15">
                      <svg width="10" height="10" viewBox="0 0 10 10" aria-label="Visible">
                        <path
                          d="M2 5 L4 7 L8 3"
                          stroke="var(--color-cobalt)"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span
                      className="block h-px w-4 bg-line"
                      role="img"
                      aria-label="Hidden"
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
