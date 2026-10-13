import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { useI18n } from '../i18n.jsx'

const LINKS = [
  ['home', '#home'],
  ['about', '#about'],
  ['gyms', '#gyms'],
  ['partners', '#partners'],
]

export default function Navbar({ onJoin }) {
  const { t, lang, setLang, langs } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled || open ? 'nav--solid' : ''}`}>
      <a className="nav__brand" href="#home" aria-label="FitLive">
        <Logo />
      </a>

      <button
        type="button"
        className="nav__burger"
        aria-expanded={open}
        aria-controls="nav-menu"
        aria-label={t('menu')}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav id="nav-menu" className={`nav__menu ${open ? 'is-open' : ''}`} aria-label="FitLive">
        <ul className="nav__links">
          {LINKS.map(([key, href]) => (
            <li key={key}>
              <a href={href} onClick={() => setOpen(false)}>
                {t(`nav.${key}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav__tools">
          <div className="lang" role="group" aria-label="Language">
            {langs.map((l) => (
              <button
                key={l}
                type="button"
                className={l === lang ? 'is-active' : ''}
                aria-pressed={l === lang}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={() => {
              setOpen(false)
              onJoin()
            }}
          >
            {t('nav.join')}
          </button>
        </div>
      </nav>
    </header>
  )
}
