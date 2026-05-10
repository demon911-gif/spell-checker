import Anthropic from '@anthropic-ai/sdk';
import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: parseInt(process.env.CACHE_TTL_SECONDS) || 3600
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_AUTH_TOKEN || '',
  baseURL: process.env.ANTHROPIC_BASE_URL || 'http://localhost:20128/v1'
});

// Определение языка текста
function detectLanguage(text) {
  const cyrillicPattern = /[а-яА-ЯёЁ]/;
  const latinPattern = /[a-zA-Z]/;

  const cyrillicCount = (text.match(cyrillicPattern) || []).length;
  const latinCount = (text.match(latinPattern) || []).length;

  if (cyrillicCount > latinCount) return 'ru';
  if (latinCount > cyrillicCount) return 'en';
  return 'ru';
}

// Проверка через Claude AI
async function checkWithAI(text, lang) {
  try {
    const message = await anthropic.messages.create({
      model: 'kr/claude-sonnet-4.5',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `Проанализируй текст и найди ВСЕ ошибки: орфографические, грамматические, пунктуационные.

Верни результат ТОЛЬКО в виде JSON массива, без дополнительного текста:

[
  {
    "word": "ошибочное_слово",
    "offset": число_позиция_начала,
    "length": число_длина,
    "suggestions": ["исправление1", "исправление2"],
    "message": "описание ошибки",
    "type": "spelling"
  }
]

Если ошибок нет, верни пустой массив: []

Текст для проверки:
${text}`
      }]
    });

    const response = message.content[0].text.trim();

    // Пытаемся извлечь JSON
    let jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.log('AI response:', response);
      return [];
    }

    const errors = JSON.parse(jsonMatch[0]);

    // Валидация и нормализация ошибок
    return errors.map(error => ({
      word: error.word || '',
      offset: parseInt(error.offset) || 0,
      length: parseInt(error.length) || 0,
      suggestions: Array.isArray(error.suggestions) ? error.suggestions : [],
      message: error.message || 'Ошибка',
      type: error.type || 'spelling',
      source: 'ai'
    }));

  } catch (error) {
    console.error('AI check error:', error.message);
    return [];
  }
}

// Статистика текста
function getTextStats(text) {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;

  return {
    words: words.length,
    sentences: sentences.length,
    characters: chars,
    charactersNoSpaces: charsNoSpaces,
    readingTime: Math.ceil(words.length / 200)
  };
}

export async function checkSpelling(text, language = 'auto') {
  const cacheKey = `${text.substring(0, 100)}-${language}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return { ...cached, cached: true };
  }

  const detectedLang = language === 'auto' ? detectLanguage(text) : language;

  const errors = await checkWithAI(text, detectedLang);
  const stats = getTextStats(text);

  const result = {
    errors,
    stats,
    language: detectedLang,
    cached: false
  };

  cache.set(cacheKey, result);

  return result;
}
