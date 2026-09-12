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
import FormEngine from '../components/figures/FormEngine.jsx'
import RoleDesigner from '../components/figures/RoleDesigner.jsx'
import SchemaGraph from '../components/figures/SchemaGraph.jsx'
import StampedWeights from '../components/figures/StampedWeights.jsx'
import TenantScope from '../components/figures/TenantScope.jsx'
import WeightedProgress from '../components/figures/WeightedProgress.jsx'
import { bySlug } from '../data/projects.js'

const project = bySlug('curl-o')

export default function CurlO() {
  return (
    <ProjectLayout
      project={project}
      lede="A multi-tenant board for running a marketing agency's month, built solo. It started as the internal task manager a six-person team used across ten client accounts, and the whole design follows from refusing two shortcuts: counting cards instead of measuring effort, and hard-coding the agency into the product."
    >
      <Chapter
        hue={project.hue}
        index={1}
        title="A month is not a backlog"
        summary="An agency's month is a set of deliverables agreed per client. The only number anyone asks for is how much of that agreement is covered."
      >
        <P>
          Six reels, four static posts, two blogs. That is the shape of a client month, and
          on the 22nd the question is always the same: how much of it is done? Generic
          project tools answer how many cards are open, which is a different question and a
          less useful one.
        </P>
        <P>
          The obvious first version &mdash; count the tasks, divide by the total &mdash;
          produces a number that is technically correct and practically useless. Naming a
          shoot date and running the shoot are one task each. Ticking the first does not
          mean the month is half done, but a task-count bar says exactly that.
        </P>
        <Callout label="The reframe">
          A progress bar should answer &ldquo;how much work is left&rdquo;, not &ldquo;how
          many rows are ticked&rdquo;. Once you accept that, the bar stops being a display
          concern and becomes a modelling one.
        </Callout>
      </Chapter>

      <Chapter
        hue={project.hue}
        index={2}
        title="Progress as effort, not count"
        summary="Each client's monthly plan is a set of steps carrying percentage weights that sum to 100. Completion adds up weights, not rows."
      >
        <P>
          The plan is defined per client, because a bespoke tailoring account and a
          social-first account do not spend their month the same way. Each step carries a
          weight, and the plan is only valid if those weights sum to exactly 100. That
          constraint is enforced when the plan is saved, not hoped for &mdash; a plan that
          sums to 97 is a plan that will quietly lie for a month.
        </P>
        <Figure
          tint={project.field}
          bleed
          caption="Toggle steps to watch the two models disagree. The heavy middle of the month — production and post — is where a count-based bar is most misleading."
        >
          <WeightedProgress />
        </Figure>
        <P>
          The payoff is that the number is finally comparable. Sixty percent means the same
          thing on every account, in every month. A manager scanning ten accounts can rank
          them without opening any of them.
        </P>
        <P>
          <Em>Unplanned work is tracked but scoped out.</Em> An emergency reel for a Friday
          launch is real work and the person who did it should get credit. But if it enters
          the percentage the denominator moves, and the number stops being comparable
          across accounts and months &mdash; the exact property that made the weighted model
          worth building. Ad-hoc tasks are first-class records that carry no plan weight,
          and the volume of them turns out to be the more useful signal: an account
          generating a lot of off-plan work is telling you its plan is wrong.
        </P>
      </Chapter>

      <Chapter
        hue={project.hue}
        index={3}
        title="Weights are stamped, not referenced"
        summary="A plan is a living template. History is not. The two must not share a pointer."
      >
        <P>
          The first instinct is to have each task reference its plan step and read the
          weight from there. That works exactly until someone edits the plan &mdash; and
          people edit plans, because that is the point of having them. The moment the shoot
          step goes from 25 to 30, every closed month in the archive silently re-scores
          itself. August&rsquo;s report changes after August ended.
        </P>
        <P>
          So the weight is copied onto the task at creation time. The task owns its weight
          as a value, not as a lookup. Editing a plan changes what <Em>future</Em> tasks
          will be worth and leaves every task already created untouched.
        </P>
        <Figure
          tint={project.field}
          caption="The same plan, edited between months. September picks up the new weights; August is frozen at whatever it was worth when the work was actually done."
        >
          <StampedWeights />
        </Figure>
        <P>
          This is the ordinary discipline behind any system that reports on the past &mdash;
          the same reason an invoice line stores the price it was sold at instead of joining
          to the current price list. It costs one denormalised column and it buys you the
          ability to trust your own archive.
        </P>
      </Chapter>

      <Chapter
        hue={project.hue}
        index={4}
        title="Refusing to hard-code the agency"
        summary="Every signup starts its own workspace, and a workspace owns almost everything the board is made of."
      >
        <P>
          The temptation in a product like this is to decide what an agency looks like and
          ship that. Five fixed columns, three fixed roles, one task form. It works for the
          first agency and it is wrong for the second.
        </P>
        <P>
          So it is multi-tenant from the schema up. A workspace owns its board columns, its
          roles and permissions, its branding, and even the questions its task form asks.
          Two agencies using it can have boards that look nothing alike, and neither of them
          is the default.
        </P>
        <List
          items={[
            'A column is a key that stays put while its label changes, so renaming a lane cannot orphan a year of history.',
            'A workspace defines the questions on its task form — types, options, which are required — and answers file under stable field keys, so a renamed question keeps its answers.',
            'Branding is an override on the workspace rather than a build-time theme.',
          ]}
        />
      </Chapter>

      <Chapter
        hue={project.hue}
        index={5}
        title="Roles are data, not enum strings"
        summary="An agency invents its own roles, ranks them, and sets seven capability flags plus two independent column lists for each one."
      >
        <P>
          The usual shape is a <Code>role</Code> string and a scattering of{' '}
          <Code>role === &apos;admin&apos;</Code> checks. That decides, permanently, which
          roles can exist. Here a role is a record: a key, a rank, seven capability flags,
          and two lists of columns. The code asks <Code>can(&apos;canManage&apos;)</Code> and
          nothing anywhere compares a role by name.
        </P>
        <P>
          The two column lists are the part I would defend hardest. One says which columns
          the role can see; the other says which columns it can move work into. They are
          independent on purpose.
        </P>
        <Figure
          tint={project.field}
          bleed
          caption="Sample workspace. Switch roles and watch the board change. A designer sees Review but cannot move work into it — that gap is a hand-off, expressed as data rather than as a special case in code."
        >
          <RoleDesigner />
        </Figure>
        <P>
          <Em>The gap between the two lists is what a hand-off is.</Em> A designer who can
          see Review but not move work into it is exactly a designer whose work gets checked
          by someone else. Collapse the two lists into one and you lose the ability to say
          that at all.
        </P>
      </Chapter>

      <Chapter
        hue={project.hue}
        index={6}
        title="Isolation in one place, not fourteen"
        summary="A global Mongoose plugin scopes every query to a workspace, so no route file has to remember."
      >
        <P>
          Multi-tenancy fails the same way every time: thirteen route files remember the
          workspace filter and the fourteenth does not. Reviewing for that forever is not a
          plan, and it is a category of bug where being right most of the time is worth
          nothing.
        </P>
        <P>
          So the filter is not the route&apos;s job. A global Mongoose plugin adds a
          workspace condition to every query on every model that has a workspace field;
          models without one are skipped automatically. A route asks for a task by id and
          gets back a task from its own workspace or nothing.
        </P>
        <Figure
          tint={project.field}
          bleed
          caption="Remove the plugin and the same route code leaks across tenants. The route never changed — only what sits underneath it."
        >
          <TenantScope />
        </Figure>
        <P>
          Two harnesses prove it rather than assert it. <Code>leak-check</Code> and{' '}
          <Code>role-check</Code> boot the real Express server against a scratch database and
          assert what an actually signed-in person receives over HTTP. A unit test on a
          controller cannot catch a leak that only exists on the wire, because the thing it
          would be testing is the thing it stubbed out.
        </P>
      </Chapter>

      <Chapter
        hue={project.hue}
        index={7}
        title="Forms as data, not as code"
        summary="A bespoke tailoring client needed order forms that change often. Shipping a deploy for every question change was never going to hold."
      >
        <P>
          The client takes custom orders, which means intake questions that vary by garment,
          by fabric, by season. The naive version is a form component per order type, and
          the naive version dies the first time someone wants a new question on a Tuesday
          afternoon.
        </P>
        <P>
          Instead the whole structure is modelled relationally. A form has questions; a
          question has options; rules express conditional logic by pointing at a trigger
          question, an expected option, and a target question to reveal or require. Nothing
          about a specific form exists in the application code.
        </P>
        <Figure
          tint={project.field}
          bleed
          caption="Solid arrows are ownership, dashed arrows are conditional logic. A rule is a row that references three other rows."
        >
          <SchemaGraph />
        </Figure>
        <P>
          The renderer walks this structure and knows nothing about tailoring. Adding a
          garment type is inserting rows. Below is that idea running: the rows on the left
          are the entire form definition, and the form on the right is what the renderer
          produces from them.
        </P>
        <Figure
          tint={project.field}
          bleed
          caption="Change the garment and watch the rules fire. Nothing in the renderer knows what a lapel is — it only knows that a rule pointed one question at another."
        >
          <FormEngine />
        </Figure>
        <P>
          <Em>Visibility is derived, never stored.</Em> A question does not carry a{' '}
          <Code>hidden</Code> column that something has to keep in sync. On every render the
          engine evaluates the rules against the current answers and computes which
          questions are showing &mdash; the same reasoning as deriving a leaderboard rank
          rather than storing it.
        </P>
        <P>
          <Em>Rows rather than a blob.</Em> The tempting shortcut is one document holding
          the whole form. It is faster to write and it costs you the two things that
          mattered. Options as real rows means an answer can reference the option that was
          chosen, so a typo in a label cannot orphan historical orders. And the obvious
          business question &mdash; how many customers picked linen this quarter &mdash;
          stays a query rather than a scan.
        </P>
        <Callout label="Where this connects">
          A submitted order has to render the same way in six months, even after the form
          has moved on. So forms are versioned and an answer references the question and the
          version it was captured under &mdash; the same discipline as stamping weights onto
          tasks. Both are the same rule: live configuration and settled history must not
          share a pointer.
        </Callout>
      </Chapter>

      <Chapter
        hue={project.hue}
        index={8}
        title="One link, one submission"
        summary="Clients get a single-use link. Making it genuinely single-use is a transaction problem, not a token problem."
      >
        <P>
          Order links go out to clients who are not platform users and should not have to
          become ones. Each link is single-use: it opens the form once, accepts one
          submission, and is dead afterwards.
        </P>
        <P>
          The tempting shape is check-then-write &mdash; read the link, confirm it is
          unused, insert the submission, mark it used. Under any real concurrency that is a
          bug. Two taps on a slow connection, or a client who reloads and resubmits, and two
          requests both pass the check before either writes.
        </P>
        <P>
          The invalidation is instead a conditional{' '}
          <Code>UPDATE ... WHERE used_at IS NULL</Code> in the same transaction as the
          insert. The database decides the winner. If the update touches zero rows, the link
          was already burned and the transaction rolls back before any submission exists.
        </P>
        <Figure
          tint={project.field}
          caption="Both writes commit together or neither does. There is no interleaving that produces a burned link with no order, or an order against a link that was already spent."
        >
          <BurnOnSubmit />
        </Figure>
        <Callout label="The rule of thumb">
          If correctness depends on &ldquo;nobody will click twice&rdquo;, it is not
          correctness. Push the guard into the write itself and let the database arbitrate.
        </Callout>
      </Chapter>

      <Chapter
        hue={project.hue}
        index={9}
        title="Validation a different route cannot bypass"
        summary="Anything a controller checks, some other controller can forget. So the checks live in the schema."
      >
        <P>
          Column keys, role keys and brand overrides all validate against the database from
          the model itself. Put that in a controller and it holds only for the paths that
          happen to call it &mdash; which is the same failure as the workspace filter, one
          layer up.
        </P>
        <P>
          The exceptions are honest ones. Some rules are about a <Em>set</Em> rather than a
          document: exactly one column finishes work, two roles cannot share a rank. A
          per-document validator cannot see the set it belongs to, so those live as pure
          functions beside the controller instead of pretending to be schema rules.
        </P>
        <Callout label="The rule of thumb">
          Push a check as far down as it can go and still be able to see what it needs. When
          it genuinely cannot go further, say so in the code rather than faking it.
        </Callout>
      </Chapter>

      <Chapter
        hue={project.hue}
        index={10}
        title="Three runtime dependencies"
        summary="React, React DOM, React Router. No component library, no state library, no drag-and-drop, no charts, no animation library."
      >
        <P>
          The board&apos;s drag-and-drop, the popovers, the progress rings and the motion
          system are all hand-written. That was a deliberate constraint rather than a
          discovery, and the whole client bundle comes to 399&nbsp;kB raw and 119&nbsp;kB
          gzipped.
        </P>
        <P>
          The design brief was its own constraint: no purple gradients, no glow, no Inter.
          System serif and mono stacks, an asymmetric layout, an oklch-derived colour ramp,
          and motion restricted to transform and opacity under 250&nbsp;ms. The landing page
          shows a real, draggable board rather than a screenshot of one.
        </P>
        <List
          items={[
            '~30,000 lines of application code across 173 source files.',
            '12 Mongoose models, 14 API route modules.',
            'React 19 and Vite on Vercel; Express, Mongoose 8 and MongoDB Atlas on Render.',
            'JWT sessions with bcrypt, Google OAuth, Resend for transactional mail, Cashfree for hosted checkout.',
          ]}
        />
      </Chapter>

      <Chapter
        hue={project.hue}
        index={11}
        title="Trade-offs I would defend"
        summary="Where the design paid something specific to get something better."
      >
        <Tradeoffs
          hueDeep={project.hueDeep}
          rows={[
            {
              decision: 'Denormalise weight onto the task',
              because:
                'Costs one column and a small write-time copy. Buys an archive that cannot be rewritten by a template edit — which is the whole reason anyone trusts a historical report.',
            },
            {
              decision: 'Enforce sum-to-100 at save time',
              because:
                'A plan that sums to 97 fails silently for a month. Rejecting it at the boundary is cheaper than explaining a wrong number later.',
            },
            {
              decision: 'Ad-hoc work outside the percentage',
              because:
                'Keeps the denominator fixed so accounts stay comparable, and turns unplanned work into a visible signal rather than an invisible cost.',
            },
            {
              decision: 'Scope queries in a global plugin',
              because:
                'Costs a layer of indirection that is invisible at the call site. Buys isolation that cannot be forgotten by the fourteenth route file, which is the only way this class of bug stops recurring.',
            },
            {
              decision: 'Roles as records, never strings',
              because:
                'More schema and a capability check at every gate, in exchange for agencies inventing roles the codebase never anticipated.',
            },
            {
              decision: 'Two column lists per role',
              because:
                'Twice the configuration surface, but the gap between seeing and moving is the only place a hand-off can be expressed as data.',
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
              decision: 'Three client dependencies',
              because:
                'Hand-writing drag-and-drop, popovers and motion cost real time. It bought a 119 kB gzipped bundle and no dependency I cannot fix myself.',
            },
          ]}
        />
      </Chapter>
    </ProjectLayout>
  )
}
