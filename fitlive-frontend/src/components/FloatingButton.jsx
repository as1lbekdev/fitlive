import { useI18n } from '../i18n.jsx'

export default function FloatingButton({ onClick, hidden }) {
  const { t } = useI18n()
  return (
    <button
      type="button"
      className={`fab ${hidden ? 'is-hidden' : ''}`}
      onClick={onClick}
      aria-label={t('nav.join')}
      tabIndex={hidden ? -1 : 0}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20c.5-3.6 3.1-5.5 6.5-5.5s6 1.9 6.5 5.5" />
        <path d="M19 8v6M16 11h6" />
      </svg>
    </button>
  )
}
