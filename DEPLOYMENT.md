# SpellChecker Pro - Deployment Guide

## Быстрый старт

### Локальная разработка

```bash
# Установить все зависимости
npm run install:all

# Запустить dev серверы (backend + frontend)
npm run dev
```

Frontend будет доступен на `http://localhost:3000`
Backend API на `http://localhost:5000`

### Отдельный запуск

```bash
# Только backend
npm run dev:backend

# Только frontend
npm run dev:frontend
```

## Production деплой

### Вариант 1: Vercel (рекомендуется для frontend)

1. Установить Vercel CLI:
```bash
npm i -g vercel
```

2. Деплой frontend:
```bash
cd frontend
vercel
```

3. Настроить переменные окружения в Vercel:
```
VITE_API_URL=https://your-backend-url.com/api
```

### Вариант 2: Railway (для fullstack)

1. Создать аккаунт на [Railway.app](https://railway.app)
2. Подключить GitHub репозиторий
3. Railway автоматически определит Node.js проект
4. Настроить переменные окружения

### Вариант 3: Docker

```bash
# Собрать образы
docker-compose build

# Запустить
docker-compose up -d
```

### Вариант 4: VPS (DigitalOcean, AWS, etc.)

```bash
# На сервере
git clone your-repo
cd spell-checker

# Установить зависимости
npm run install:all

# Собрать frontend
cd frontend && npm run build

# Запустить backend с PM2
cd ../backend
npm install -g pm2
pm2 start src/server.js --name spellchecker-api

# Настроить Nginx для раздачи статики
```

## Nginx конфигурация

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /path/to/spell-checker/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Переменные окружения

### Backend (.env)
```
PORT=5000
NODE_ENV=production
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CACHE_TTL_SECONDS=3600
```

### Frontend
```
VITE_API_URL=/api
```

## Оптимизация

- ✅ Gzip сжатие включено
- ✅ Кэширование API запросов
- ✅ Rate limiting
- ✅ Code splitting в React
- ✅ Lazy loading компонентов
- ✅ Оптимизированные изображения

## Мониторинг

Рекомендуется использовать:
- **Sentry** для отслеживания ошибок
- **Google Analytics** для аналитики
- **Uptime Robot** для мониторинга доступности

## Безопасность

- ✅ CORS настроен
- ✅ Rate limiting
- ✅ Input validation
- ✅ XSS защита
- ⚠️ Добавить HTTPS (Let's Encrypt)
- ⚠️ Добавить CSP headers
