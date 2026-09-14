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
import SchemaGraph from '../components/figures/SchemaGraph.jsx'
import { bySlug } from '../data/projects.js'

const project = bySlug('be-spoken')

export default function BeSpoken() {
  return (
    <ProjectLayout
      project={project}
      lede="An order system for a bespoke tailoring client, where the intake questions change by garment, by fabric and by season. The whole design follows from one decision: the form is data in the database, not a component in the codebase."
    >
      <Chapter
        hue={project.hue}
        index={1}
        title="A form that will not hold still"
        summary="Custom orders mean intake questions that change constantly. Any design that treats a form as code loses that race immediately."
      >
        <P>
          The client takes bespoke orders, which means the questions depend on what is being
          made. A shirt needs a collar; a suit needs a lapel; a sherwani needs neither and
          needs its own fabric rules. Seasons change the options. A new garment arrives and
          brings a new question with it.
        </P>
        <P>
          The naive version is a form component per order type, and the naive version dies
          the first time someone wants a new question on a Tuesday afternoon. Every change
          becomes a code change, a review, and a deploy &mdash; for what is, to the person
          asking, a two-minute edit.
        </P>
        <Callout label="The decision">
          If the only constant is churn, the form has to be something you can edit rather
          than something you have to ship. That makes it data, and it makes the shape of
          that data the entire problem.
        </Callout>
      </Chapter>

      <Chapter
        hue={project.hue}
        index={2}
        title="Forms as data, not as code"
        summary="A form has questions, a question has options, and a rule is a row that points at three other rows."
      >
        <P>
          The whole structure is modelled relationally in PostgreSQL through Prisma. Nothing
          about any specific form exists in the application code. Conditional logic is
          expressed the same way as everything else &mdash; as rows: a rule names a trigger
          question, the option it is waiting for, and a target question to reveal or
          require.
        </P>
        <Figure
          tint={project.field}
          bleed
          caption="Solid arrows are ownership, dashed arrows are conditional logic. A rule is a row that references three other rows."
        >
          <SchemaGraph />
        </Figure>
        <P>
          <Em>Rows rather than a blob.</Em> The tempting shortcut is one{' '}
          <Code>jsonb</Code> column holding the whole form. It is faster to write and it
          costs you the two things that turned out to matter. Options as real rows means an
          answer can carry a foreign key to the option that was chosen, so a typo in a label
          cannot orphan historical orders. And the obvious business question &mdash; how
          many customers picked linen this quarter &mdash; is a join rather than a scan
          through nested documents.
        </P>
      </Chapter>

      <Chapter
        hue={project.hue}
        index={3}
        title="A renderer that has never heard of tailoring"
        summary="The engine walks the rows. Adding a garment type is an INSERT, not a pull request."
      >
        <P>
          The renderer takes the questions, options and rules and produces a form. It
          contains no tailoring vocabulary at all &mdash; the same code would render an
          intake form for anything else whose rows follow this shape.
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
          questions are showing. A second copy of that state would just be a second thing
          that can be wrong.
        </P>
        <P>
          <Em>The validation you take on.</Em> Giving up a hand-written form means giving up
          the compile-time guarantees that came with it, so the checks have to become data
          too. Requiredness is a column and a rule action rather than an <Code>if</Code> in a
          component &mdash; which is why the panel above can say a submission is blocked
          without anything in the renderer knowing that a monogram exists. The same
          evaluation runs server-side on submit; the client copy is a convenience.
        </P>
        <Callout label="The part that is easy to miss">
          A submitted order has to render the same way in six months, even after the form
          has moved on. So forms are versioned and an answer references the question and the
          version it was captured under. Live configuration and settled history must not
          share a pointer.
        </Callout>
      </Chapter>

      <Chapter
        hue={project.hue}
        index={4}
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
        index={5}
        title="Trade-offs I would defend"
        summary="Where the design paid something specific to get something better."
      >
        <List
          items={[
            'Configuring a form is inserting rows, so a question change needs no deploy.',
            'The renderer is generic, so it is the only thing that ever needs testing for correctness.',
            'The cost is a validation layer of your own, written twice — once for the client and once on submit.',
          ]}
        />
        <Tradeoffs
          hueDeep={project.hueDeep}
          rows={[
            {
              decision: 'Forms modelled as rows, not components',
              because:
                'Trades compile-time safety for the ability to change intake questions without a deploy. Right trade for a domain whose only constant is churn.',
            },
            {
              decision: 'Relational rows rather than a jsonb blob',
              because:
                'A blob ships sooner and loses both referential integrity on chosen options and the ability to answer "how many picked linen" with a join instead of a scan.',
            },
            {
              decision: 'Derive visibility instead of storing it',
              because:
                'Recomputed on every render, which costs nothing at this size, and removes a cached flag that would eventually disagree with the rules it came from.',
            },
            {
              decision: 'Version the form, reference the version',
              because:
                'More rows and an extra join on read, so that an order from six months ago still renders as the thing the customer actually filled in.',
            },
            {
              decision: 'Burn the link inside the insert transaction',
              because:
                'Removes an entire class of double-submit bug by construction instead of by luck, at the cost of nothing but writing the guard as a WHERE clause.',
            },
          ]}
        />
      </Chapter>
    </ProjectLayout>
  )
}
