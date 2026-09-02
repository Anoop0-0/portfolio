import { Link } from 'react-router-dom'

/**
 * A full-bleed plate rather than a card: hard corners, no shadow, flooded with
 * the project's own hue. Heights are deliberately unequal.
 */
export default function CaseStudyCard({ project }) {
  return (
    <Link
      to={project.path}
      className={`group block ${project.plateClass} px-6 py-10 transition-[filter] duration-200 hover:brightness-110 sm:px-10 sm:py-14`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 opacity-80">
        <p className="label">{project.kicker}</p>
        <p className="label">{project.period}</p>
      </div>

      <h3 className="plate-type mt-6 text-[12vw] leading-[0.84] sm:text-[7rem]">
        {project.name}
      </h3>

      <p className="head-type mt-5 max-w-[24ch] text-xl leading-[1.15] opacity-90 sm:text-2xl">
        {project.title}
      </p>

      <p className="mt-6 max-w-[46ch] leading-relaxed opacity-80">{project.tagline}</p>

      <ul className="mt-9 grid gap-x-8 gap-y-5 border-t-2 border-current pt-7 sm:grid-cols-3">
        {project.plateFacts.map((fact) => (
          <li key={fact.k}>
            <span className="label block opacity-70">{fact.k}</span>
            <span className="head-type mt-2 block text-xl">{fact.v}</span>
          </li>
        ))}
      </ul>

      <p className="label mt-9 inline-flex items-center gap-3 border-b-2 border-current pb-1">
        Read the case study
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1.5"
        >
          &rarr;
        </span>
      </p>
    </Link>
  )
}
