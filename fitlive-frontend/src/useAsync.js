import { useEffect, useState } from 'react'

export function useAsync(fn) {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState({ status: 'loading', data: null })

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading', data: null })
    fn()
      .then((data) => {
        if (!cancelled) setState({ status: 'done', data })
      })
      .catch((err) => {
        console.error(err)
        if (!cancelled) setState({ status: 'error', data: null })
      })
    return () => {
      cancelled = true
    }
  }, [fn, attempt])

  return [state, () => setAttempt((n) => n + 1)]
}
