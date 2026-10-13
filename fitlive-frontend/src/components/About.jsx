import { useI18n } from '../i18n.jsx'

const ITEMS = ['i1', 'i2', 'i3']

export default function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="section about">
      <div className="about__intro">
        <h2 className="section__title">{t('about.title')}</h2>
        <p className="section__lead">{t('about.lead')}</p>
      </div>
      <ul className="about__list">
        {ITEMS.map((k) => (
          <li key={k}>
            <h3>{t(`about.${k}.t`)}</h3>
            <p>{t(`about.${k}.d`)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
