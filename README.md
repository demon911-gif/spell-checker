# SpellChecker Pro 🔍

Современный веб-сервис для проверки орфографии с поддержкой русского и английского языков.

## Особенности

- ⚡ Real-time проверка орфографии
- 🎨 Современный UI с темной темой
- 🌍 Поддержка русского и английского
- 📊 Статистика текста
- 💾 История проверок
- ⌨️ Горячие клавиши
- 🚀 Быстрая работа с кэшированием

## Технологии

**Frontend:**
- React 18
- Vite
- TailwindCSS
- Framer Motion (анимации)

**Backend:**
- Node.js + Express
- LanguageTool API
- Yandex Speller API
- Rate limiting & caching

## Установка

```bash
# Установить зависимости
npm install

# Запустить dev сервер
npm run dev

# Собрать для production
npm run build
```

## Структура проекта

```
spell-checker/
├── frontend/          # React приложение
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
├── backend/           # Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   └── package.json
└── README.md
```

## API Endpoints

- `POST /api/check` - Проверить текст
- `GET /api/stats` - Получить статистику

## Лицензия

MIT
