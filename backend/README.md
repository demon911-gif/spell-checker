# SpellChecker Backend

Backend для проверки орфографии через Claude AI (OmniRoute).

## Переменные окружения

```
PORT=5000
ANTHROPIC_AUTH_TOKEN=your_kira_ai_token
ANTHROPIC_BASE_URL=your_cloudflare_tunnel_url
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CACHE_TTL_SECONDS=3600
```

## Запуск

```bash
npm install
node src/server.js
```
