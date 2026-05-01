import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

export default function Nav() {
  const { t, lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const navLinks = [
    { label: t.nav_gallery,  to: '/gallery' },
    { label: t.nav_services, to: '/#services' },
    { label: t.nav_about,    to: '/#about' },
    { label: t.nav_process,  to: '/process' },
    { label: t.nav_contact,  to: '/contact' },
  ]

  const handleLink = (e, to) => {
    if (!to.startsWith('/#')) return
    e.preventDefault()
    const id = to.slice(2)
    setOpen(false)
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120)
    }
  }

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-logo">Wood<span>&</span>Craft</Link>

        <ul className="nav-links">
          {navLinks.map(({ label, to }) => (
            <li key={to}>
              {to.startsWith('/#')
                ? <a href={to} onClick={(e) => handleLink(e, to)}>{label}</a>
                : <Link to={to} className={pathname === to ? 'active' : ''}>{label}</Link>
              }
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <div className="lang-toggle">
            <button className={`lang-btn${lang === 'bg' ? ' active' : ''}`} onClick={() => setLang('bg')}>БГ</button>
            <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>EN</button>
          </div>
          <Link to="/contact" className="btn-primary nav-cta">{t.nav_cta}</Link>
          <button className={`hamburger${open ? ' open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {navLinks.map(({ label, to }) => (
          to.startsWith('/#')
            ? <a key={to} href={to} onClick={(e) => handleLink(e, to)}>{label}</a>
            : <Link key={to} to={to} onClick={() => setOpen(false)}>{label}</Link>
        ))}
        <Link to="/contact" className="btn-primary" onClick={() => setOpen(false)}>{t.nav_cta}</Link>
      </div>
    </>
  )
}
