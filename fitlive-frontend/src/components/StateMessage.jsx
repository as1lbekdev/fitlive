import { useI18n } from '../i18n.jsx'

export default function StateMessage({ text, onRetry }) {
  const { t } = useI18n()
  return (
    <div className="state" role={onRetry ? 'alert' : 'status'}>
      <p>{text}</p>
      {onRetry && (
        <button type="button" className="btn btn--ghost btn--sm" onClick={onRetry}>
          {t('retry')}
        </button>
      )}
    </div>
  )
}
