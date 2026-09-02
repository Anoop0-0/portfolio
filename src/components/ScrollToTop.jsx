import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const RETRY_MS = 60
const MAX_ATTEMPTS = 12

/**
 * Route changes start at the top. In-page anchors scroll to their target —
 * the browser only does that on a full page load, not on client-side
 * navigation, so React Router needs it done by hand.
 */
export default function ScrollToTop() {
  // `key` changes on every navigation, so clicking the same anchor twice works.
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const jump = () => {
      const el = document.getElementById(id)
      if (!el) return false
      el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
      return true
    }

    // The usual case: the target is already mounted, so land on it now.
    // Timers rather than rAF for the retries — rAF is suspended while the
    // document is hidden, which would strand a link opened in a background tab.
    if (jump()) return

    let attempts = 0
    const timer = setInterval(() => {
      if (jump() || ++attempts >= MAX_ATTEMPTS) clearInterval(timer)
    }, RETRY_MS)

    return () => clearInterval(timer)
  }, [pathname, hash, key])

  return null
}
