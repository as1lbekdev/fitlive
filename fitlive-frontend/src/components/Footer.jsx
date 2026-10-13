import Logo from './Logo.jsx'
import { useI18n } from '../i18n.jsx'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="footer">
      <Logo size={32} />
      <p>
        © {new Date().getFullYear()} FitLive. {t('footer.rights')}
      </p>
    </footer>
  )
}
