# FitLive frontend

React + Vite. Backend (Spring Boot) `http://localhost:8081` da ishlab turishi kerak.

## Ishga tushirish

```
npm install
npm run dev
```

Brauzerda oching: http://localhost:5173

Dev paytida `/api` va `/uploads` so'rovlari `vite.config.js` dagi proxy orqali backend'ga yo'naltiriladi,
shuning uchun CORS sozlash shart emas.

## Sahifalar va API

| Bo'lim | API |
|---|---|
| Zallar | `GET /api/gyms` |
| Hamkorlar | `GET /api/partners` |
| Ro'yxatdan o'tish oynasi | `POST /api/auth/register`, `POST /api/auth/verify` |
| Zal rasmlari | `GET /uploads/...` (`imageUrl` maydoni) |

Tillar: UZ, RU, EN (matnlar `src/dict.js` da).

## Production

Frontend va backend alohida domenda bo'lsa:

1. `.env` fayliga yozing: `VITE_API_URL=https://api.sizning-domen.uz`
2. Backend'da shu frontend manzili uchun CORS ruxsatini qo'shing (`SecurityConfig` da `.cors(...)`).
3. `npm run build`, tayyor fayllar `dist/` papkasida bo'ladi.
