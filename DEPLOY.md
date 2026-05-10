# 🚀 Инструкция по деплою SpellChecker

## Шаг 1: Настройка Cloudflare Tunnel для OmniRoute

1. Установите Cloudflare Tunnel (cloudflared):
   ```bash
   # Windows
   winget install --id Cloudflare.cloudflared
   ```

2. Авторизуйтесь:
   ```bash
   cloudflared tunnel login
   ```

3. Создайте туннель:
   ```bash
   cloudflared tunnel create omniroute-tunnel
   ```

4. Запустите туннель для OmniRoute (порт 20128):
   ```bash
   cloudflared tunnel --url http://localhost:20128
   ```

5. Скопируйте публичный URL (например: `https://abc123.trycloudflare.com`)

## Шаг 2: Деплой Backend на Railway

1. Зарегистрируйтесь на https://railway.app
2. Создайте новый проект
3. Подключите GitHub репозиторий или загрузите папку `backend`
4. Добавьте переменные окружения:
   - `PORT` = `5000`
   - `ANTHROPIC_AUTH_TOKEN` = `sk-3cbb1e8053f8600b-1edca4-83343081`
   - `ANTHROPIC_BASE_URL` = `https://abc123.trycloudflare.com/v1` (ваш Cloudflare URL)
   - `RATE_LIMIT_WINDOW_MS` = `900000`
   - `RATE_LIMIT_MAX_REQUESTS` = `100`
   - `CACHE_TTL_SECONDS` = `3600`

5. Railway автоматически задеплоит backend
6. Скопируйте URL backend (например: `https://your-app.railway.app`)

## Шаг 3: Деплой Frontend на Vercel

1. Зарегистрируйтесь на https://vercel.com
2. Установите Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Перейдите в папку frontend:
   ```bash
   cd spell-checker/frontend
   ```

4. Запустите деплой:
   ```bash
   vercel
   ```

5. Добавьте переменную окружения:
   - `VITE_API_URL` = `https://your-app.railway.app/api`

6. Vercel даст вам публичный URL (например: `https://spellchecker.vercel.app`)

## Шаг 4: Финальная настройка

1. **Запустите OmniRoute** на вашем компьютере
2. **Запустите Cloudflare Tunnel** (должен работать постоянно)
3. Откройте ваш сайт на Vercel URL

## ⚠️ Важно

- **OmniRoute и Cloudflare Tunnel должны работать постоянно** на вашем компьютере
- Если компьютер выключен - сайт не будет работать
- Для 24/7 работы нужен VPS сервер

## 🎉 Готово!

Теперь ваш сайт доступен всем по ссылке Vercel!
