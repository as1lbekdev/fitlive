import HeroArt from './HeroArt.jsx'
import { useI18n } from '../i18n.jsx'

const WORD = 'FITLIVE'

export default function Hero({ onJoin }) {
  const { t } = useI18n()

  return (
    <section id="home" className="hero">
      <div className="hero__copy">
        <h1 className="hero__word" aria-label="FitLive">
          {WORD.split('').map((ch, i) => (
            <span key={i} aria-hidden="true" style={{ '--i': i }}>
              {ch}
            </span>
          ))}
        </h1>
        <p className="hero__sub">{t('hero.subtitle')}</p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#gyms">
            {t('hero.cta1')}
          </a>
          <button type="button" className="btn btn--ghost" onClick={onJoin}>
            {t('hero.cta2')}
          </button>
        </div>
      </div>
      <div className="hero__art">
        <HeroArt />
      </div>
    </section>
  )
}
