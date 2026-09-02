import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Nav from './components/Nav.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import BrandKob from './pages/BrandKob.jsx'
import Home from './pages/Home.jsx'
import Ironlog from './pages/Ironlog.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/brandkob" element={<BrandKob />} />
          <Route path="/work/ironlog" element={<Ironlog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
