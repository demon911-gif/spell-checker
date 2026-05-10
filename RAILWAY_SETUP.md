# 🚂 Railway Deployment Guide

## Переменные окружения для Railway

Скопируй эти переменные в Railway:

```
PORT=5000
NODE_ENV=production
ANTHROPIC_AUTH_TOKEN=sk-3cbb1e8053f8600b-1edca4-83343081
ANTHROPIC_BASE_URL=https://tomorrow-strange-determined-expanded.trycloudflare.com/v1
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CACHE_TTL_SECONDS=3600
```

## Шаги деплоя:

1. Зайди на https://railway.app
2. Нажми "New Project" → "Deploy from GitHub repo"
3. Подключи GitHub и выбери репозиторий
4. В Settings → Root Directory укажи: `backend`
5. Добавь переменные окружения выше
6. Railway автоматически задеплоит проект
7. Скопируй URL (например: `https://spellchecker.up.railway.app`)

## ⚠️ Важно!

Cloudflare Tunnel должен работать постоянно! Если он остановится - backend не сможет использовать AI.

Команда для запуска туннеля:
```bash
cloudflared tunnel --url http://localhost:20128
```

Текущий туннель URL: `https://tomorrow-strange-determined-expanded.trycloudflare.com`
