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
import LiveLeaderboard from '../components/figures/LiveLeaderboard.jsx'
import SetPersistence from '../components/figures/SetPersistence.jsx'
import VolumeChart from '../components/figures/VolumeChart.jsx'
import { bySlug } from '../data/projects.js'

const project = bySlug('ironlog')

export default function Ironlog() {
  return (
    <ProjectLayout
      project={project}
      lede="A MERN gym progress tracker built around one non-negotiable: the app must never lose a set. Everything else — the social leaderboards, the analytics, the PWA install — grew out of using it four days a week and noticing what it got wrong."
    >
      <Chapter
        index={1}
        title="The failure mode that started it"
        summary="Every tracker I used lost work. Not often — just often enough that I stopped trusting any of them mid-session."
      >
        <P>
          A gym is a hostile environment for a web app. The session lasts an hour with
          long idle gaps. You put the phone down between sets, it locks, the browser
          evicts the tab, and the app comes back to a fresh mount. If the workout only
          existed in component state waiting for a final submit, the whole session is
          gone — and you find out at the worst possible moment, when you are trying to
          remember whether the top set was 75 or 80.
        </P>
        <P>
          That single failure mode set the architecture. Durability had to be per-set and
          immediate, not a save button at the end.
        </P>
        <Callout label="The constraint">
          Assume the tab dies after every single interaction. If the app is still correct
          under that assumption, it is correct in a gym.
        </Callout>
      </Chapter>

      <Chapter
        index={2}
        title="Every set commits on tap"
        summary="No drafts, no bulk submits, no reconciliation step. Logging a set is a write that has already landed before you pick the bar back up."
      >
        <P>
          Tapping to log a set fires its own request and the set is persisted before the
          rest period starts. There is no client-side buffer holding a workout hostage
          until the end, which means there is nothing to lose and nothing to recover.
          Reopening the app mid-workout shows exactly what the server has, because what
          the server has is everything.
        </P>
        <Figure
          bleed
          caption="Log a few sets, then interrupt the session. Per-set writes lose nothing; the buffered model loses the lot."
        >
          <SetPersistence />
        </Figure>
        <P>
          It costs more requests than a batched design, and that is a real trade — but
          the payload is a handful of numbers and the alternative is losing an hour of
          someone’s work. The optimistic UI updates on tap and reconciles against the
          response, so the extra round trip never shows up as latency you can feel.
        </P>
      </Chapter>

      <Chapter
        index={3}
        title="Addressing a single set inside a nested document"
        summary="A workout is one document containing exercises containing sets. Updating one set means reaching three levels down and touching only that leaf."
      >
        <P>
          Sets are never read on their own — you always want them in the context of their
          exercise, and exercises in the context of their workout. So a workout is a
          single MongoDB document with exercises embedded in it, and sets embedded in
          those. One read gets you an entire session, which is what almost every screen
          in the app actually wants.
        </P>
        <P>
          The cost lands on writes. Updating one set is a{' '}
          <Code>PUT /workouts/:workoutId/exercises/:exerciseId/sets/:setId</Code> that
          loads the workout, traverses down to the exercise, finds the set by its
          subdocument id, mutates that leaf, and saves. Only the addressed set changes;
          the surrounding structure is left exactly as it was.
        </P>
        <List
          items={[
            'The URL mirrors the document shape, so the route is self-documenting and the handler reads top-down.',
            'Ownership is checked once at the workout level — if the workout is not yours, traversal never begins.',
            'Corrections are the common case: fixing a mistyped weight is the same code path as logging, not a special one.',
          ]}
        />
        <P>
          Traversing in application code rather than pushing a positional operator into
          the query is the deliberate choice. It keeps the validation and the ownership
          check in one readable place, and at a set-per-few-minutes write rate the extra
          read costs nothing worth optimising.
        </P>
      </Chapter>

      <Chapter
        index={4}
        title="Competition, because motivation is social"
        summary="Invite a few friends with a code, and the leaderboard becomes the place you log from rather than a page you visit afterwards."
      >
        <P>
          The tracking was solid long before anyone but me used it. What made people keep
          using it was the group: you join with an invite code, and from then on you are
          ranked against friends who will notice if you stop showing up.
        </P>
        <P>
          The design decision that mattered was making the leaderboard an{' '}
          <Em>entry point</Em>, not a report. You log a lift directly from a row. That
          collapses the loop between seeing you are behind and doing something about it
          into a single screen, and scores settle for everyone in the group within
          seconds.
        </P>
        <Figure caption="Logging from the board itself. Ranks are derived from scores rather than stored, so there is no ordering to keep in sync.">
          <LiveLeaderboard />
        </Figure>
        <P>
          Ranks are computed from scores on read. Storing a rank would mean a second
          piece of state that can disagree with the first, and the only thing worse than
          a stale leaderboard is one that is confidently wrong.
        </P>
      </Chapter>

      <Chapter
        index={5}
        title="Getting onto the home screen"
        summary="An app you use in a gym has to open like an app. JWT and Google OAuth for entry; a PWA install for everything after."
      >
        <P>
          Email and password with JWT covers people who want an account and nothing else;
          Google OAuth covers everyone who does not want to invent another password while
          standing next to a squat rack. Both land on the same user record, so the
          leaderboards do not care how you got in.
        </P>
        <P>
          The app installs to the home screen on both iOS and Android and runs
          standalone, without browser chrome. Getting that right on iOS meant working
          within Safari’s narrower rules — the icon and display metadata have to be exact
          before the install prompt behaves — but the result is that the app opens in one
          tap between sets, which is the only interaction speed that matters here.
        </P>
      </Chapter>

      <Chapter
        index={6}
        title="Analytics that tell you something you did not already know"
        summary="Weekly volume, records detected automatically, and leaderboards filtered by body part."
      >
        <P>
          Charts are the easy part; deciding what deserves one is not. Weekly volume made
          the cut because it is the number that quietly explains a stalled month — you
          feel like you have been training hard, and the bar chart shows the volume fell
          off three weeks ago.
        </P>
        <Figure
          bleed
          caption="Weekly volume with records marked. A PR is detected when the set is written, not recomputed every time a chart is opened."
        >
          <VolumeChart />
        </Figure>
        <P>
          Personal records are detected on write. When a set is logged it is compared
          against the standing best for that lift, so the record exists as a fact rather
          than as a scan performed on every page load. It also means the app can
          congratulate you the moment it happens, which is the point.
        </P>
        <P>
          The PR leaderboards filter by body part, because a single combined ranking
          flattens exactly the comparison people want — the friend who deadlifts and the
          friend who benches are not really competing, and pretending otherwise makes the
          board less interesting, not more.
        </P>
      </Chapter>

      <Chapter
        index={7}
        title="Trade-offs I would defend"
        summary="Where the design deliberately paid something to get something better."
      >
        <Tradeoffs
          rows={[
            {
              decision: 'One write per set',
              because:
                'More requests than a batched submit, but the payload is tiny and it removes the entire category of lost-workout bugs rather than mitigating it.',
            },
            {
              decision: 'Embed exercises and sets in the workout',
              because:
                'Sets are never queried outside their session, so one read serves nearly every screen. Deep writes are the price and they are the rarer operation.',
            },
            {
              decision: 'Traverse in application code, not with positional operators',
              because:
                'Keeps ownership checks and validation in one readable handler. At this write volume the extra read is invisible.',
            },
            {
              decision: 'Derive ranks instead of storing them',
              because:
                'One source of truth. A stored rank is a cache that will eventually disagree with the scores it came from.',
            },
            {
              decision: 'Detect PRs on write',
              because:
                'Makes the record a fact rather than a recomputation, and lets the app react the moment it is set.',
            },
            {
              decision: 'PWA rather than native',
              because:
                'One codebase reaches both platforms and ships the same day it is written. Accepts Safari’s constraints as the cost of that.',
            },
          ]}
        />
      </Chapter>
    </ProjectLayout>
  )
}
