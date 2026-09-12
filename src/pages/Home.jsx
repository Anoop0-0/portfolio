import CaseStudyCard from '../components/CaseStudyCard.jsx'
import Container from '../components/Container.jsx'
import Reveal from '../components/Reveal.jsx'
import { SectionHeading } from '../components/Prose.jsx'
import { projects } from '../data/projects.js'
import { fundamentals, site, stack } from '../data/site.js'

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Fundamentals />
      <About />
      <Stack />
      <Contact />
    </>
  )
}

function Hero() {
  return (
    <section className="bg-ink text-paper">
      <Container className="pt-14 pb-16 sm:pt-20 sm:pb-24">
        <p className="label flex flex-wrap items-center gap-x-3 gap-y-2 text-paper/60">
          <span className="bg-acid px-2 py-1 text-ink">
            {site.current.title} &middot; {site.current.org}
          </span>
          <span>{site.location}</span>
        </p>

        <h1 className="plate-type mt-8 text-[min(15vw,10.5rem)] leading-[0.8]">
          Anoop
          <br />
          Baghel
        </h1>

        <p className="head-type mt-9 max-w-[18ch] text-2xl leading-[1.08] sm:text-5xl">
          I build the model underneath
        </p>

        <p className="mt-7 max-w-[54ch] text-lg leading-relaxed text-paper/75">
          Full-stack web developer. The visible part of a system is rarely where the hard
          problem is &mdash; it is in how the data was shaped, and whether the number on
          screen still means something six months later.
        </p>

        <p className="mt-5 max-w-[54ch] leading-relaxed text-paper/55">
          {site.education.degree} at {site.education.school}, {site.education.span}.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#work"
            className="label bg-acid px-5 py-3 text-ink transition-colors hover:bg-paper"
          >
            Read the case studies
          </a>
          <a
            href={`mailto:${site.email}`}
            className="label border-2 border-paper/40 px-5 py-3 text-paper transition-colors hover:border-acid hover:text-acid"
          >
            Get in touch
          </a>
        </div>
      </Container>
    </section>
  )
}

function Work() {
  return (
    <section id="work" className="scroll-mt-14 pt-16">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Selected work" title="Three systems, described honestly" />
          <p className="mt-5 max-w-[58ch] leading-relaxed text-muted">
            All three are real software that people use. The write-ups go into the
            modelling decisions and the trade-offs, because that is the part worth
            reading about.
          </p>
        </Reveal>
      </Container>

      {/* Plates run full-bleed and at unequal heights. */}
      <div className="mt-10 flex flex-col gap-4">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 70}>
            <CaseStudyCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Fundamentals() {
  return (
    <section className="mt-20">
      <Reveal className="bg-ink text-paper">
        <Container className="py-12">
          <p className="label text-paper/55">Fundamentals</p>
          <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {fundamentals.map((f) => (
              <div key={f.label} className="border-t-2 border-paper/25 pt-5">
                <p className="num-type text-6xl text-acid sm:text-7xl">{f.figure}</p>
                <p className="label mt-5 text-paper">{f.label}</p>
                <p className="label mt-2 text-paper/55">{f.sub}</p>
              </div>
            ))}
          </div>
        </Container>
      </Reveal>
    </section>
  )
}

function About() {
  return (
    <Container as="section" id="about" className="mt-24 scroll-mt-20">
      <Reveal>
        <SectionHeading eyebrow="About" title="Electrical engineering, then everything else" />
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <Reveal className="flex max-w-[62ch] min-w-0 flex-col gap-5">
          <p className="text-xl leading-[1.45] font-medium">
            I came to software from an electrical engineering degree, which mostly means I
            got used to asking what happens at the edges before what happens in the happy
            path.
          </p>
          <p className="leading-[1.68] text-muted">
            That habit shows up in the work. When a progress bar needs to survive a template
            edit six weeks later, or a client link has to be usable exactly once even if
            someone double-taps on bad hotel wifi, the answer is almost never in the UI
            layer. It is in how the data was shaped in the first place.
          </p>
          <p className="leading-[1.68] text-muted">
            I like building for people I can actually talk to &mdash; a team down the hall,
            or friends who text me when a set does not save. Short feedback loops make you
            honest about what is really working.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <dl className="border-t-[3px] border-ink">
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
    <div className="border-b border-line py-5">
      <dt className="label text-dim">{term}</dt>
      <dd className="mt-2.5">
        <span className="head-type block text-base">{value}</span>
        <span className="mt-1.5 block text-sm text-muted">{detail}</span>
      </dd>
    </div>
  )
}

function Stack() {
  return (
    <Container as="section" className="mt-24">
      <Reveal>
        <SectionHeading eyebrow="Toolkit" title="What I reach for" />
      </Reveal>

      <div className="mt-10 grid border-[3px] border-ink sm:grid-cols-2">
        {stack.map((group, i) => (
          <Reveal
            key={group.group}
            delay={i * 50}
            className={`border-ink p-6 ${i % 2 === 0 ? 'sm:border-r-[3px]' : ''} ${
              i < stack.length - (stack.length % 2 === 0 ? 2 : 1) ? 'border-b-[3px]' : ''
            }`}
          >
            <p className="label text-dim">{group.group}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="border-2 border-ink px-2.5 py-1 text-sm">
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
    <section id="contact" className="mt-24 scroll-mt-20">
      <Reveal className="bg-cobalt text-white">
        <Container className="py-14 sm:py-20">
          <p className="label text-cobalt-tint">Contact</p>
          <h2 className="plate-type mt-6 max-w-[16ch] text-[min(11vw,5rem)] leading-[0.88]">
            Got a stubborn data model?
          </h2>
          <p className="mt-7 max-w-[48ch] text-lg leading-relaxed text-cobalt-tint">
            Internships, freelance builds, or a good argument about schema design. Email is
            the fastest way to reach me.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="label bg-acid px-5 py-3 text-ink transition-colors hover:bg-white"
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
                  className="label border-2 border-white/50 px-5 py-3 text-white transition-colors hover:border-acid hover:text-acid"
                >
                  {link.label}
                </a>
              ))}
          </div>
        </Container>
      </Reveal>
    </section>
  )
}
