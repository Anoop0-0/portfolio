import ProjectLayout from '../components/ProjectLayout.jsx'
import {
  Callout,
  Chapter,
  Code,
  Em,
  Figure,
  List,
  P,
  Tradeoffs,
} from '../components/Prose.jsx'
import BurnOnSubmit from '../components/figures/BurnOnSubmit.jsx'
import RoleMatrix from '../components/figures/RoleMatrix.jsx'
import SchemaGraph from '../components/figures/SchemaGraph.jsx'
import StampedWeights from '../components/figures/StampedWeights.jsx'
import WeightedProgress from '../components/figures/WeightedProgress.jsx'
import { bySlug } from '../data/projects.js'

const project = bySlug('brandkob')

export default function BrandKob() {
  return (
    <ProjectLayout
      project={project}
      lede="An internal task manager for a six-person agency team running ten client accounts. The interesting part is not the task list — it is the progress model underneath it, and the decision to make a percentage mean something."
    >
      <Chapter
        index={1}
        title="The question nobody could answer"
        summary="Ten client accounts, one small team, and a recurring monthly shape of work. The status question came up constantly and had no trustworthy answer."
      >
        <P>
          Every client runs on a monthly route: a repeating sequence of steps from
          strategy through to the month-end report. The team knew the shape of that work
          intuitively. What they could not do was answer{' '}
          <Em>“how far into this month is this account?”</Em> in a way anyone believed.
        </P>
        <P>
          The obvious first version — count the tasks, divide by the total — produces a
          number that is technically correct and practically useless. Naming a shoot date
          and running the shoot are one task each. Ticking the first does not mean the
          month is half done, but a task-count bar says exactly that. And because the
          steps are not the same size for every client, the same 60% meant something
          different on every account.
        </P>
        <Callout label="The reframe">
          A progress bar should answer “how much work is left”, not “how many rows are
          ticked”. Once you accept that, the bar stops being a display concern and
          becomes a modelling one.
        </Callout>
      </Chapter>

      <Chapter
        index={2}
        title="Progress as effort, not count"
        summary="Each client’s monthly route is a set of steps carrying percentage weights that sum to 100. Completion adds up weights, not rows."
      >
        <P>
          The route is defined per client, because a bespoke tailoring account and a
          social-first account do not spend their month the same way. Each step in the
          route carries a weight, and the route is only valid if those weights sum to
          exactly 100. That constraint is enforced when the route is saved, not hoped for
          — a route that sums to 97 is a route that will quietly lie for a month.
        </P>
        <Figure
          bleed
          caption="Toggle steps to watch the two models disagree. The heavy middle of the month — production and post — is where a count-based bar is most misleading."
        >
          <WeightedProgress />
        </Figure>
        <P>
          The payoff is that the number is finally comparable. Sixty percent means the
          same thing on every account, in every month: sixty percent of the month’s
          budgeted effort is behind us. A manager scanning ten accounts can rank them
          without opening any of them.
        </P>
      </Chapter>

      <Chapter
        index={3}
        title="Ad-hoc work, tracked but scoped out"
        summary="Real months contain work nobody planned. It has to be visible without silently redefining what 100% meant."
      >
        <P>
          An emergency reel for a Friday launch is real work and the person who did it
          should get credit for it. But if unplanned work enters the percentage, the
          denominator moves, and the number stops being comparable across accounts and
          across months — the exact property that made the weighted model worth building.
        </P>
        <List
          items={[
            'Ad-hoc tasks are first-class records: assigned, tracked, timestamped, visible on the account.',
            'They carry no route weight, so they never move the plan percentage.',
            'They surface separately, which turns out to be the more useful signal — an account generating a lot of unplanned work is telling you its route is wrong.',
          ]}
        />
        <Callout label="What it revealed">
          Keeping ad-hoc work outside the percentage made it measurable for the first
          time. The volume of off-route work became an argument for re-cutting a client’s
          route, rather than something absorbed invisibly.
        </Callout>
      </Chapter>

      <Chapter
        index={4}
        title="Weights are stamped, not referenced"
        summary="A route is a living template. History is not. The two must not share a pointer."
      >
        <P>
          The first instinct is to have each task reference its route step and read the
          weight from there. That works exactly until someone edits the route — and
          people edit routes, because that is the point of having them. The moment the
          shoot step goes from 25 to 30, every closed month in the archive silently
          re-scores itself. August’s report changes after August ended.
        </P>
        <P>
          So the weight is copied onto the task at creation time. The task owns its
          weight as a value, not as a lookup. Editing a route changes what{' '}
          <Em>future</Em> tasks will be worth and leaves every task already created
          untouched.
        </P>
        <Figure caption="The same route, edited between months. September picks up the new weights; August is frozen at whatever it was worth when the work was actually done.">
          <StampedWeights />
        </Figure>
        <P>
          This is the ordinary discipline behind any system that reports on the past —
          the same reason an invoice line stores the price it was sold at instead of
          joining to the current price list. It costs one denormalised column and it buys
          you the ability to trust your own archive.
        </P>
      </Chapter>

      <Chapter
        index={5}
        title="Three roles, three views of the same month"
        summary="Access control here is not about hiding secrets. It is about giving each role a screen that is actually usable."
      >
        <P>
          The platform has three tiers — employee, manager, admin — and they gate which
          stages of an account are visible. An employee needs their own queue and nothing
          else; showing them ten accounts’ worth of pipeline is noise, not transparency.
          A manager needs workload across the team and the ability to shape a client’s
          route. Only an admin touches the weights and templates that define what a
          percentage means.
        </P>
        <Figure>
          <RoleMatrix />
        </Figure>
        <P>
          Checks live on the server, on the route handler, with the client-side
          conditionals treated as a convenience rather than a control. Deciding early
          that weight editing was admin-only also settled a lot of arguments about
          history integrity — the number of people who can retroactively change what
          progress means stays small on purpose.
        </P>
      </Chapter>

      <Chapter
        index={6}
        title="Forms as data, not as code"
        summary="A bespoke tailoring client needed order forms that change often. Shipping a deploy for every question change was never going to hold."
      >
        <P>
          The client takes custom orders, which means intake questions that vary by
          garment, by fabric, by season. The naive version is a React form per order
          type, and the naive version dies the first time someone wants a new question on
          a Tuesday afternoon.
        </P>
        <P>
          Instead the whole structure is modelled relationally in PostgreSQL through
          Prisma. A form has questions; a question has options; rules express conditional
          logic by pointing at a trigger question, an expected option, and a target
          question to reveal or require. Nothing about a specific form exists in the
          application code.
        </P>
        <Figure
          bleed
          caption="Solid arrows are ownership, dashed arrows are conditional logic. A rule is a row that references three other rows."
        >
          <SchemaGraph />
        </Figure>
        <P>
          The renderer walks this structure and knows nothing about tailoring. Adding a
          garment type is inserting rows. The trade is real — you give up compile-time
          safety on form shape and you take on a validation layer of your own — but for a
          system whose entire job is to change frequently, configuring data beats
          shipping code.
        </P>
      </Chapter>

      <Chapter
        index={7}
        title="One link, one submission"
        summary="Clients get a single-use link. Making it genuinely single-use is a transaction problem, not a token problem."
      >
        <P>
          Order links go out to clients who are not platform users and should not have to
          become ones. Each link is single-use: it opens the form once, accepts one
          submission, and is dead afterwards.
        </P>
        <P>
          The tempting shape is check-then-write — read the link, confirm it is unused,
          insert the submission, mark it used. Under any real concurrency that is a
          bug. Two taps on a slow connection, or a client who reloads and resubmits, and
          two requests both pass the check before either writes.
        </P>
        <P>
          The invalidation is instead a conditional{' '}
          <Code>UPDATE ... WHERE used_at IS NULL</Code> in the same transaction as the
          insert. The database decides the winner. If the update touches zero rows, the
          link was already burned and the transaction rolls back before any submission
          exists.
        </P>
        <Figure caption="Both writes commit together or neither does. There is no interleaving that produces a burned link with no order, or an order against a link that was already spent.">
          <BurnOnSubmit />
        </Figure>
        <Callout label="The rule of thumb">
          If correctness depends on “nobody will click twice”, it is not correctness. Push
          the guard into the write itself and let the database arbitrate.
        </Callout>
      </Chapter>

      <Chapter
        index={8}
        title="Trade-offs I would defend"
        summary="The decisions that were genuinely contested, and the reasoning that settled them."
      >
        <Tradeoffs
          rows={[
            {
              decision: 'Denormalise weight onto the task',
              because:
                'Costs one column and a small write-time copy. Buys an archive that cannot be rewritten by a template edit — which is the whole reason anyone trusts a historical report.',
            },
            {
              decision: 'Enforce sum-to-100 at save time',
              because:
                'A route that sums to 97 fails silently for a month. Rejecting it at the boundary is cheaper than explaining a wrong number later.',
            },
            {
              decision: 'Ad-hoc work outside the percentage',
              because:
                'Keeps the denominator fixed so accounts stay comparable, and turns unplanned work into a visible signal rather than an invisible cost.',
            },
            {
              decision: 'Forms modelled as rows, not components',
              because:
                'Trades compile-time safety for the ability to change intake questions without a deploy. Right trade for a domain whose only constant is churn.',
            },
            {
              decision: 'Burn the link inside the insert transaction',
              because:
                'Removes an entire class of double-submit bug by construction instead of by luck, at the cost of nothing but writing the guard as a WHERE clause.',
            },
            {
              decision: 'Weight editing is admin-only',
              because:
                'The set of people who can retroactively redefine what progress means should be as small as the org can tolerate.',
            },
          ]}
        />
      </Chapter>
    </ProjectLayout>
  )
}
