import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import { projects } from '../data/projects.js'

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="num-type text-[28vw] leading-[0.8] text-vermilion sm:text-[14rem]">404</p>
      <h1 className="head-type mt-6 text-4xl sm:text-5xl">Nothing here</h1>
      <p className="mt-5 max-w-[42ch] leading-relaxed text-muted">
        That page does not exist. The two case studies are probably what you were looking
        for.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link to="/" className="label bg-ink px-5 py-3 text-paper transition-colors hover:bg-cobalt">
          Home
        </Link>
        {projects.map((p) => (
          <Link
            key={p.slug}
            to={p.path}
            className="label border-2 border-ink px-5 py-3 transition-colors hover:bg-acid"
          >
            {p.name}
          </Link>
        ))}
      </div>
    </Container>
  )
}
