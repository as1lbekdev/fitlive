import { useEffect, useRef, useState } from 'react'
import { registerUser, verifyEmail } from '../api.js'
import { useI18n } from '../i18n.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMPTY_FORM = { username: '', email: '', password: '' }

export default function JoinModal({ open, onClose }) {
  const { t } = useI18n()
  const [step, setStep] = useState('form') // form | code | done
  const [form, setForm] = useState(EMPTY_FORM)
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const dialogRef = useRef(null)

  // Har safar ochilganda holatni tozalash
  useEffect(() => {
    if (open) {
      setStep('form')
      setForm(EMPTY_FORM)
      setCode('')
      setError('')
      setBusy(false)
    }
  }, [open])

  // Esc bilan yopish, Tab fokusni oyna ichida ushlab turish, sahifa aylanishini to'xtatish
  useEffect(() => {
    if (!open) return undefined
    const previous = document.activeElement
    const dialog = dialogRef.current

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialog) return
      const els = [...dialog.querySelectorAll('input, button:not([disabled])')]
      if (!els.length) return
      const first = els[0]
      const last = els[els.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus?.()
    }
  }, [open, onClose])

  // Har bir qadamda birinchi maydonga fokus
  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const target = dialog?.querySelector('input') ?? dialog?.querySelector('button.btn')
    target?.focus()
  }, [open, step])

  if (!open) return null

  const setField = (name) => (e) => setForm((f) => ({ ...f, [name]: e.target.value }))
  const messageFor = (err) => (err instanceof TypeError ? t('join.errNetwork') : err.message)

  async function submitForm(e) {
    e.preventDefault()
    const username = form.username.trim()
    const email = form.email.trim()
    if (!username) return setError(t('join.errUsername'))
    if (!EMAIL_RE.test(email)) return setError(t('join.errEmail'))
    if (form.password.length < 6) return setError(t('join.errPassword'))

    setBusy(true)
    setError('')
    try {
      await registerUser({ username, email, password: form.password })
      setForm((f) => ({ ...f, username, email }))
      setStep('code')
    } catch (err) {
      setError(messageFor(err))
    } finally {
      setBusy(false)
    }
  }

  async function submitCode(e) {
    e.preventDefault()
    const value = code.trim()
    if (!value) return setError(t('join.errCode'))

    setBusy(true)
    setError('')
    try {
      await verifyEmail({ email: form.email, code: value })
      setStep('done')
    } catch (err) {
      setError(messageFor(err))
    } finally {
      setBusy(false)
    }
  }

  const title =
    step === 'form' ? t('join.title') : step === 'code' ? t('join.codeTitle') : t('join.doneTitle')

  return (
    <div
      className="overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="join-title" ref={dialogRef}>
        <button type="button" className="dialog__close" onClick={onClose} aria-label={t('join.close')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        <h2 id="join-title" className="dialog__title">
          {title}
        </h2>

        {step === 'form' && (
          <form onSubmit={submitForm} noValidate>
            <label className="field">
              <span>{t('join.username')}</span>
              <input type="text" value={form.username} onChange={setField('username')} autoComplete="username" />
            </label>
            <label className="field">
              <span>{t('join.email')}</span>
              <input type="email" value={form.email} onChange={setField('email')} autoComplete="email" />
            </label>
            <label className="field">
              <span>{t('join.password')}</span>
              <input type="password" value={form.password} onChange={setField('password')} autoComplete="new-password" />
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
              {busy ? t('join.sending') : t('join.submit')}
            </button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={submitCode} noValidate>
            <p className="dialog__text">{t('join.codeText', { email: form.email })}</p>
            <label className="field">
              <span>{t('join.code')}</span>
              <input
                className="field__code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={8}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
              {busy ? t('join.verifying') : t('join.verify')}
            </button>
          </form>
        )}

        {step === 'done' && (
          <div className="done">
            <svg className="done__check" width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
              <circle cx="36" cy="36" r="33" stroke="#3aa0ff" strokeWidth="4" />
              <path d="M22 37l10 10 18-21" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="dialog__text">{t('join.doneText')}</p>
            <button type="button" className="btn btn--primary btn--block" onClick={onClose}>
              {t('join.close')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
