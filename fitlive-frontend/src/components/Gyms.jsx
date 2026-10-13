import { useState } from 'react'
import { assetUrl, getGyms } from '../api.js'
import { useAsync } from '../useAsync.js'
import { useI18n } from '../i18n.jsx'
import StateMessage from './StateMessage.jsx'

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function Placeholder() {
  return (
    <div className="gym__placeholder" aria-hidden="true">
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <g transform="rotate(-28 24 24)">
          <path d="M14 24h20" />
          <rect x="7" y="14" width="6" height="20" rx="2" />
          <rect x="35" y="14" width="6" height="20" rx="2" />
        </g>
      </svg>
    </div>
  )
}

function GymCard({ gym }) {
  const src = assetUrl(gym.imageUrl)
  const [broken, setBroken] = useState(false)

  return (
    <li className="gym">
      <div className="gym__media">
        {src && !broken ? (
          <img src={src} alt={gym.name} loading="lazy" onError={() => setBroken(true)} />
        ) : (
          <Placeholder />
        )}
      </div>
      <div className="gym__body">
        <h3>{gym.name}</h3>
        <p>
          <PinIcon />
          <span>{gym.location}</span>
        </p>
      </div>
    </li>
  )
}

export default function Gyms() {
  const { t } = useI18n()
  const [{ status, data }, reload] = useAsync(getGyms)

  return (
    <section id="gyms" className="section">
      <h2 className="section__title">{t('gyms.title')}</h2>
      <p className="section__lead">{t('gyms.lead')}</p>

      {status === 'loading' && (
        <ul className="gyms" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <li key={i} className="gym gym--skeleton" />
          ))}
        </ul>
      )}
      {status === 'error' && <StateMessage text={t('gyms.error')} onRetry={reload} />}
      {status === 'done' && data.length === 0 && <StateMessage text={t('gyms.empty')} />}
      {status === 'done' && data.length > 0 && (
        <ul className="gyms">
          {data.map((g) => (
            <GymCard key={g.id} gym={g} />
          ))}
        </ul>
      )}
    </section>
  )
}
