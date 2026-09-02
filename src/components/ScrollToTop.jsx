import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Route changes should start at the top; in-page anchors should not. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
