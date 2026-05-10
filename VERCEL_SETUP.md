# ▲ Vercel Deployment Guide

## Шаги деплоя Frontend:

1. Зайди на https://vercel.com
2. Нажми "Add New Project"
3. Import твой GitHub репозиторий
4. В настройках укажи:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. Добавь переменную окружения:

```
VITE_API_URL=https://твой-railway-url.up.railway.app/api
```

**Замени** `https://твой-railway-url.up.railway.app` на URL который даст Railway!

6. Нажми "Deploy"

## После деплоя:

Vercel даст тебе URL типа: `https://spellchecker.vercel.app`

Открой его и проверь работу сайта!

## Если что-то не работает:

1. Проверь что Omniroute запущен
2. Проверь что Cloudflare Tunnel активен
3. Проверь что Railway backend работает (открой `/api/health`)
4. Проверь что `VITE_API_URL` правильный в Vercel
