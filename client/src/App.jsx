import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LangProvider } from './context/LangContext'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ViberButton from './components/ViberButton'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Process from './pages/Process'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <LangProvider>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/process" element={<Process />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <ViberButton />
    </LangProvider>
  )
}
