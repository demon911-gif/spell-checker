# 🚀 Пошаговая инструкция по деплою SpellChecker с Omniroute

## Что нужно сделать:

1. ✅ Установить Cloudflare Tunnel (в процессе...)
2. 🔄 Запустить туннель для Omniroute
3. 🌐 Задеплоить backend на Railway
4. 🎨 Задеплоить frontend на Vercel

---

## Шаг 1: Запуск Cloudflare Tunnel для Omniroute

После установки cloudflared, нужно запустить туннель:

```bash
cloudflared tunnel --url http://localhost:20128
```

**Важно:** 
- Эта команда должна работать постоянно (не закрывай окно)
- Omniroute тоже должен быть запущен на порту 20128
- Скопируй URL который выдаст команда (например: `https://abc-def-123.trycloudflare.com`)

---

## Шаг 2: Деплой Backend на Railway

### 2.1 Регистрация на Railway
1. Зайди на https://railway.app
2. Зарегистрируйся через GitHub

### 2.2 Создание проекта
1. Нажми "New Project"
2. Выбери "Deploy from GitHub repo"
3. Подключи свой GitHub аккаунт
4. Выбери репозиторий с spell-checker (или создай новый)

### 2.3 Настройка переменных окружения
В Railway добавь эти переменные:

```
PORT=5000
NODE_ENV=production
ANTHROPIC_AUTH_TOKEN=sk-3cbb1e8053f8600b-1edca4-83343081
ANTHROPIC_BASE_URL=https://твой-cloudflare-url.trycloudflare.com/v1
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CACHE_TTL_SECONDS=3600
```

**Замени** `https://твой-cloudflare-url.trycloudflare.com/v1` на URL из Шага 1!

### 2.4 Настройка Root Directory
В Railway Settings → Root Directory укажи: `backend`

Railway автоматически задеплоит backend. Скопируй URL (например: `https://spellchecker-production.up.railway.app`)

---

## Шаг 3: Деплой Frontend на Vercel

### 3.1 Регистрация на Vercel
1. Зайди на https://vercel.com
2. Зарегистрируйся через GitHub

### 3.2 Создание проекта
1. Нажми "Add New Project"
2. Import твой GitHub репозиторий
3. В настройках укажи:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite

### 3.3 Настройка переменных окружения
Добавь переменную:

```
VITE_API_URL=https://твой-railway-url.up.railway.app/api
```

**Замени** на URL из Шага 2!

### 3.4 Deploy
Нажми "Deploy" и жди завершения.

Vercel даст тебе публичный URL (например: `https://spellchecker.vercel.app`)

---

## ✅ Проверка работы

1. Убедись что запущены:
   - ✅ Omniroute (localhost:20128)
   - ✅ Cloudflare Tunnel (должен показывать активный туннель)

2. Открой свой сайт на Vercel URL

3. Попробуй проверить текст с ошибками

---

## ⚠️ Важные моменты

### Постоянная работа
- **Omniroute** должен работать 24/7 на твоем компьютере
- **Cloudflare Tunnel** тоже должен работать постоянно
- Если компьютер выключен → сайт не работает

### Альтернатива: VPS сервер
Если хочешь чтобы сайт работал всегда:
1. Арендуй VPS (например: DigitalOcean, Hetzner, Contabo)
2. Установи туда Omniroute
3. Запусти Cloudflare Tunnel на VPS
4. Сайт будет работать 24/7

---

## 🆘 Проблемы и решения

### Backend не может подключиться к Omniroute
- Проверь что Omniroute запущен
- Проверь что Cloudflare Tunnel активен
- Проверь что ANTHROPIC_BASE_URL правильный в Railway

### Frontend не видит Backend
- Проверь что VITE_API_URL правильный в Vercel
- Проверь что backend задеплоен и работает (открой /api/health)

### Cloudflare Tunnel отключается
- Используй `cloudflared tunnel --url http://localhost:20128 --no-autoupdate`
- Или настрой как Windows Service для автозапуска

---

## 📝 Полезные команды

```bash
# Проверить что Omniroute работает
curl http://localhost:20128/v1/models

# Проверить что backend работает
curl https://твой-railway-url.up.railway.app/api/health

# Запустить Cloudflare Tunnel
cloudflared tunnel --url http://localhost:20128
```

---

## 🎉 Готово!

Теперь твой сайт доступен всем по ссылке Vercel!
Делись ссылкой с друзьями 🚀
