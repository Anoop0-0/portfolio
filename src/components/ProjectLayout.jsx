import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { otherProject } from '../data/projects.js'
import Container from './Container.jsx'

export default function ProjectLayout({ project, lede, children }) {
  const next = otherProject(project.slug)

  useEffect(() => {
    document.title = `${project.name} — Anoop Baghel`
    return () => {
      document.title = 'Anoop Baghel — Full-stack developer'
    }
  }, [project.name])

  return (
    <article>
      {/* The page adopts the project's hue before a word is read. */}
      <header className={project.plateClass}>
        <Container className="py-12 sm:py-16">
          <Link
            to="/"
            className="label inline-flex items-center gap-2 border-b-2 border-current pb-1 opacity-80 transition-opacity hover:opacity-100"
          >
            <span aria-hidden="true">&larr;</span> All work
          </Link>

          <p className="label mt-10 opacity-80">{project.kicker}</p>

          <h1 className="plate-type mt-5 text-[12vw] leading-[0.82] sm:text-[8.5rem]">
            {project.name}
          </h1>

          <p className="head-type mt-6 max-w-[22ch] text-2xl leading-[1.1] sm:text-4xl">
            {project.title}
          </p>

          <p className="mt-7 max-w-[54ch] text-lg leading-relaxed opacity-85">{lede}</p>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t-2 border-current pt-7 sm:grid-cols-4">
            <Meta term="Role" value={project.role} />
            <Meta term="Timeline" value={project.period} />
            <Meta term="Scope" value={project.scope} />
            <Meta term="Stack" value={project.stack.join(' · ')} />
          </dl>
        </Container>
      </header>

      <Container className="pt-4">{children}</Container>

      <Container className="mt-6 mb-4">
        <Link to={next.path} className={`group block ${next.plateClass} px-6 py-10 sm:px-10`}>
          <p className="label opacity-75">Next case study</p>
          <p className="plate-type mt-4 text-[12vw] leading-[0.86] sm:text-[5.5rem]">
            {next.name}
            <span
              aria-hidden="true"
              className="ml-4 inline-block transition-transform duration-200 group-hover:translate-x-2"
            >
              &rarr;
            </span>
          </p>
          <p className="head-type mt-4 max-w-[26ch] text-lg opacity-85 sm:text-xl">
            {next.title}
          </p>
        </Link>
      </Container>
    </article>
  )
}

function Meta({ term, value }) {
  return (
    <div>
      <dt className="label opacity-70">{term}</dt>
      <dd className="mt-2.5 text-sm leading-relaxed">{value}</dd>
    </div>
  )
}
