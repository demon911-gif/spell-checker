# 🎯 Финальная инструкция по деплою

## ✅ Что уже сделано:

1. ✅ Cloudflare Tunnel установлен и запущен
2. ✅ Туннель работает: `https://tomorrow-strange-determined-expanded.trycloudflare.com`
3. ✅ Конфигурация подготовлена

## 📋 Что нужно сделать ТЕБЕ:

### Шаг 1: Создать GitHub репозиторий

```bash
cd spell-checker
git init
git add .
git commit -m "Initial commit: SpellChecker with AI"
git branch -M main
git remote add origin https://github.com/твой-username/spell-checker.git
git push -u origin main
```

Замени `твой-username` на свой GitHub username!

---

### Шаг 2: Деплой Backend на Railway

1. Открой https://railway.app
2. Войди через GitHub
3. Нажми **"New Project"**
4. Выбери **"Deploy from GitHub repo"**
5. Выбери репозиторий `spell-checker`
6. Railway начнет деплой

#### Настройка Railway:

1. Открой проект в Railway
2. Нажми на сервис → **Settings**
3. В **Root Directory** укажи: `backend`
4. В **Variables** добавь:

```
PORT=5000
NODE_ENV=production
ANTHROPIC_AUTH_TOKEN=sk-3cbb1e8053f8600b-1edca4-83343081
ANTHROPIC_BASE_URL=https://tomorrow-strange-determined-expanded.trycloudflare.com/v1
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CACHE_TTL_SECONDS=3600
```

5. Railway автоматически передеплоит
6. Скопируй URL (например: `https://spellchecker-production.up.railway.app`)

---

### Шаг 3: Деплой Frontend на Vercel

1. Открой https://vercel.com
2. Войди через GitHub
3. Нажми **"Add New Project"**
4. Import репозиторий `spell-checker`
5. В настройках укажи:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite (должно определиться автоматически)

6. В **Environment Variables** добавь:

```
VITE_API_URL=https://твой-railway-url.up.railway.app/api
```

**ВАЖНО:** Замени `https://твой-railway-url.up.railway.app` на URL из Шага 2!

7. Нажми **"Deploy"**

8. Vercel даст тебе URL типа: `https://spell-checker-username.vercel.app`

---

## 🎉 Готово!

Твой сайт теперь доступен всем по ссылке Vercel!

### Проверка работы:

1. Открой свой Vercel URL
2. Введи текст с ошибками: "превет мир я учюсь програмированию"
3. Нажми "Проверить"
4. Должны появиться исправления от AI

---

## ⚠️ ВАЖНО: Постоянная работа

Для работы сайта должны быть запущены:

1. **Omniroute** на твоем компьютере (порт 20128)
2. **Cloudflare Tunnel** (команда ниже)

### Команда для запуска туннеля:

```bash
cloudflared tunnel --url http://localhost:20128
```

**Если компьютер выключен или туннель остановлен → сайт не будет работать!**

---

## 🔄 Если туннель URL изменился

Cloudflare дает временный URL. Если он изменится, нужно:

1. Обновить `ANTHROPIC_BASE_URL` в Railway
2. Railway автоматически передеплоит backend

---

## 🚀 Альтернатива: VPS для 24/7 работы

Если хочешь чтобы сайт работал всегда:

1. Арендуй VPS (DigitalOcean, Hetzner, Contabo)
2. Установи туда Omniroute
3. Запусти Cloudflare Tunnel на VPS
4. Сайт будет работать 24/7 без твоего компьютера

---

## 📞 Помощь

Если что-то не работает:

1. Проверь что Omniroute запущен: `curl http://localhost:20128/v1/models`
2. Проверь что туннель работает: `curl https://tomorrow-strange-determined-expanded.trycloudflare.com/v1/models`
3. Проверь Railway backend: открой `https://твой-url.railway.app/api/health`
4. Проверь логи в Railway и Vercel

---

**Текущий туннель URL:** `https://tomorrow-strange-determined-expanded.trycloudflare.com`

**Дата создания:** 2026-05-10
