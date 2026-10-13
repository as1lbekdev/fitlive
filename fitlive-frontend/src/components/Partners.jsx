import { getPartners } from '../api.js'
import { useAsync } from '../useAsync.js'
import { useI18n } from '../i18n.jsx'
import StateMessage from './StateMessage.jsx'

export default function Partners() {
  const { t } = useI18n()
  const [{ status, data }, reload] = useAsync(getPartners)

  return (
    <section id="partners" className="section section--alt">
      <h2 className="section__title">{t('partners.title')}</h2>
      <p className="section__lead">{t('partners.lead')}</p>

      {status === 'loading' && (
        <ul className="partners" aria-busy="true">
          {[0, 1, 2, 3].map((i) => (
            <li key={i} className="partner partner--skeleton" />
          ))}
        </ul>
      )}
      {status === 'error' && <StateMessage text={t('partners.error')} onRetry={reload} />}
      {status === 'done' && data.length === 0 && <StateMessage text={t('partners.empty')} />}
      {status === 'done' && data.length > 0 && (
        <ul className="partners">
          {data.map((p) => (
            <li key={p.id} className="partner">
              <span className="partner__badge" aria-hidden="true">
                {p.name.trim().charAt(0).toUpperCase()}
              </span>
              <span className="partner__name">{p.name}</span>
              <span className="partner__loc">{p.location}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
