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
import RoleDesigner from '../components/figures/RoleDesigner.jsx'
import TenantScope from '../components/figures/TenantScope.jsx'
import { bySlug } from '../data/projects.js'

const project = bySlug('curl-o')

export default function CurlO() {
  return (
    <ProjectLayout
      project={project}
      lede="A multi-tenant board for marketing agencies, built solo in two months. The hard part was not the board — it was refusing to hard-code the agency using it, so that a workspace owns its own columns, roles, branding and task form."
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
          So Curl-O is built around the plan rather than the task list. Each client has a
          monthly plan, each piece of work carries the weight it was promised at, and the
          board reports a single percentage that nobody has to interpret. Work moves along
          a route from planned to posted, and exactly one column is the one that finishes
          it.
        </P>
        <Callout label="The premise">
          A completion figure should be a percentage of what was promised, not a count of
          cards. Everything else in the product follows from taking that seriously.
        </Callout>
      </Chapter>

      <Chapter
        hue={project.hue}
        index={2}
        title="Refusing to hard-code the agency"
        summary="Every signup starts its own workspace, and a workspace owns almost everything the board is made of."
      >
        <P>
          The temptation in a product like this is to decide what an agency looks like and
          ship that. Five fixed columns, three fixed roles, one task form. It works for the
          first agency and it is wrong for the second.
        </P>
        <P>
          Curl-O is multi-tenant from the schema up. A workspace owns its board columns, its
          roles and permissions, its branding, and even the questions its task form asks. Two
          agencies using it can have boards that look nothing alike, and neither of them is
          the default.
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
        index={3}
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
        index={4}
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
        index={5}
        title="Validation that a different route cannot bypass"
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
        index={6}
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
        index={7}
        title="Trade-offs I would defend"
        summary="Where the design paid something specific to get something better."
      >
        <Tradeoffs
          hueDeep={project.hueDeep}
          rows={[
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
              decision: 'Column keys stable, labels editable',
              because:
                'An extra indirection on every read, so that renaming a lane never orphans the history filed under it.',
            },
            {
              decision: 'Validation in the schema, not the controller',
              because:
                'Harder to write and harder to give a friendly error message, but no future route can bypass it.',
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
