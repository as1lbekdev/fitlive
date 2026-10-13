import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import dict from './dict.js'

const LANGS = ['uz', 'ru', 'en']
const I18nContext = createContext(null)

function initialLang() {
  try {
    const saved = localStorage.getItem('fitlive-lang')
    if (LANGS.includes(saved)) return saved
  } catch {
    /* storage unavailable */
  }
  return 'uz'
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('fitlive-lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const t = useCallback(
    (key, vars) => {
      let text = dict[lang][key] ?? dict.uz[key] ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) text = text.replace(`{${k}}`, v)
      }
      return text
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t, langs: LANGS }), [lang, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)
