import CaseStudyCard from '../components/CaseStudyCard.jsx'
import Container from '../components/Container.jsx'
import Reveal from '../components/Reveal.jsx'
import { SectionHeading } from '../components/Prose.jsx'
import { projects } from '../data/projects.js'
import { site, stack } from '../data/site.js'

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Stack />
      <Contact />
    </>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-veil pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full opacity-[0.10] blur-[100px]"
        style={{ background: 'var(--color-accent)' }}
      />

      <Container className="relative pt-20 pb-24 sm:pt-32 sm:pb-32">
        <Reveal>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 label">
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              {site.current.title} at {site.current.org}
            </span>
            <span aria-hidden="true" className="text-line">
              /
            </span>
            <span>{site.location}</span>
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-8 font-display text-6xl leading-[0.95] tracking-tight sm:text-8xl">
            Anoop Baghel
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-2xl text-xl leading-[1.55] text-fg/90 sm:text-2xl">
            Full-stack web developer. I build the internal systems teams actually run
            on — and I spend most of my thinking on the data model underneath, because
            that is where the hard problems turn out to live.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">
            {site.education.degree} at {site.education.school}, {site.education.span}.
            Right now I&rsquo;m building the platform a six-person team at BrandKob uses
            to run ten client accounts, and I maintain IRONLOG, a gym progress tracker
            with real users who notice the moment something breaks mid-set.
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              Read the case studies
            </a>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-line px-5 py-2.5 text-sm text-muted transition-colors hover:border-dim hover:text-fg"
            >
              Get in touch
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

function Work() {
  return (
    <Container as="section" id="work" className="scroll-mt-24">
      <Reveal>
        <SectionHeading
          eyebrow="Selected work"
          title="Two systems, described honestly"
        />
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          Both of these are real software with real users. The write-ups go into the
          modelling decisions and the trade-offs, because that is the part of the work
          worth reading about.
        </p>
      </Reveal>

      <div className="mt-12 flex flex-col gap-6">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 80}>
            <CaseStudyCard project={project} index={i + 1} />
          </Reveal>
        ))}
      </div>
    </Container>
  )
}

function About() {
  return (
    <Container as="section" id="about" className="mt-32 scroll-mt-24">
      <Reveal>
        <SectionHeading eyebrow="About" title="Electrical engineering, then everything else" />
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="flex max-w-2xl flex-col gap-5">
          <p className="text-lg leading-relaxed text-fg/90">
            I came to software from an electrical engineering degree, which mostly means
            I got used to asking what happens at the edges before asking what happens in
            the happy path.
          </p>
          <p className="leading-relaxed text-muted">
            That habit shows up in the work. When a progress bar needs to survive a
            template edit six weeks later, or a client link has to be usable exactly
            once even if someone double-taps on bad hotel wifi, the answer is almost
            never in the UI layer. It is in how the data was shaped in the first place.
          </p>
          <p className="leading-relaxed text-muted">
            I like building for people I can actually talk to — a team down the hall, or
            friends who text me when a set does not save. Short feedback loops make you
            honest about what is really working.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <dl className="flex flex-col divide-y divide-line border-y border-line">
            <Fact
              term="Education"
              value={site.education.degree}
              detail={`${site.education.school} · ${site.education.span}`}
            />
            <Fact
              term="Now"
              value={`${site.current.title}, ${site.current.org}`}
              detail={`${site.current.since} – present`}
            />
            <Fact
              term="Building"
              value="IRONLOG"
              detail="Gym progress tracker, live on iOS and Android as a PWA"
            />
            <Fact term="Based in" value={site.location} detail="Open to remote work" />
          </dl>
        </Reveal>
      </div>
    </Container>
  )
}

function Fact({ term, value, detail }) {
  return (
    <div className="py-5">
      <dt className="label">{term}</dt>
      <dd className="mt-2.5">
        <span className="block text-sm text-fg">{value}</span>
        <span className="mt-1 block text-sm text-dim">{detail}</span>
      </dd>
    </div>
  )
}

function Stack() {
  return (
    <Container as="section" className="mt-32">
      <Reveal>
        <SectionHeading eyebrow="Toolkit" title="What I reach for" />
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        {stack.map((group, i) => (
          <Reveal key={group.group} delay={i * 60} className="bg-ink-2 p-6">
            <p className="label">{group.group}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line px-3 py-1.5 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Container>
  )
}

function Contact() {
  return (
    <Container as="section" id="contact" className="mt-32 scroll-mt-24">
      <Reveal className="relative overflow-hidden rounded-2xl border border-line bg-ink-2 p-8 sm:p-14">
        <div
          aria-hidden="true"
          className="grid-veil pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_80%_at_100%_0%,black,transparent)]"
        />
        <div className="relative">
          <p className="label">Contact</p>
          <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            If you are building something with a stubborn data model, I&rsquo;d like to
            hear about it.
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-muted">
            Internships, freelance builds, or just a good argument about schema design —
            email is the fastest way to reach me.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              {site.email}
            </a>
            {site.links
              .filter((l) => l.href.startsWith('http'))
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line px-5 py-2.5 text-sm text-muted transition-colors hover:border-dim hover:text-fg"
                >
                  {link.label}
                </a>
              ))}
          </div>
        </div>
      </Reveal>
    </Container>
  )
}
