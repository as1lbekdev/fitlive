// Backend manzili. Dev paytida bo'sh qoldiriladi (Vite proxy ishlatiladi).
// Production'da .env faylida: VITE_API_URL=https://api.sizning-domen.uz
const BASE = import.meta.env.VITE_API_URL ?? ''

export const assetUrl = (path) => (path ? `${BASE}${path}` : null)

async function readError(res) {
  const text = await res.text()
  try {
    const data = JSON.parse(text)
    if (Array.isArray(data.errors) && data.errors.length) {
      const messages = data.errors.map((e) => e.defaultMessage).filter(Boolean)
      if (messages.length) return messages.join('. ')
    }
    if (data.message) return data.message
  } catch {

  }
  if (!text || text.length > 200) return `HTTP ${res.status}`
  return text
}

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, options)
  if (!res.ok) throw new Error(await readError(res))
  return res
}

const jsonPost = (path, body) =>
  request(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

export const getGyms = async () => (await request('/api/gyms')).json()
export const getPartners = async () => (await request('/api/partners')).json()
export const registerUser = async (data) => (await jsonPost('/api/auth/register', data)).text()
export const verifyEmail = async (data) => (await jsonPost('/api/auth/verify', data)).text()
export const login = async (data) => (await jsonPost('/api/auth/login', data)).text()