import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev paytida /api va /uploads so'rovlari Spring Boot backend'ga (8081) yo'naltiriladi.
// Shunda brauzer uchun hammasi bitta manzil (localhost:5173) bo'lib ko'rinadi va CORS kerak bo'lmaydi.
const proxy = {
  target: 'http://localhost:8081',
  changeOrigin: true,
  configure: (p) => {
    p.on('proxyReq', (proxyReq) => proxyReq.removeHeader('origin'))
  },
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': proxy,
      '/uploads': proxy,
    },
  },
})
