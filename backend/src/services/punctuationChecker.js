// Дополнительная проверка пунктуации для русского языка
export function checkPunctuation(text) {
  const errors = [];

  // Правила для русского языка
  const rules = [
    // Запятая перед "но", "а", "однако", "зато"
    {
      pattern: /\s+(но|а|однако|зато)\s+/gi,
      check: (match, index) => {
        const before = text[index - 1];
        if (before && before !== ',' && before !== '.' && before !== '!' && before !== '?') {
          return {
            offset: index,
            length: 1,
            word: ' ',
            message: `Перед "${match.trim()}" обычно ставится запятая`,
            suggestions: [', '],
            type: 'punctuation',
            source: 'custom'
          };
        }
      }
    },

    // Пробел после запятой
    {
      pattern: /,(?=[а-яёА-ЯЁa-zA-Z])/g,
      check: (match, index) => {
        return {
          offset: index + 1,
          length: 0,
          word: '',
          message: 'После запятой должен быть пробел',
          suggestions: [' '],
          type: 'punctuation',
          source: 'custom'
        };
      }
    },

    // Двойные пробелы
    {
      pattern: /\s{2,}/g,
      check: (match, index) => {
        return {
          offset: index,
          length: match.length,
          word: match,
          message: 'Лишние пробелы',
          suggestions: [' '],
          type: 'whitespace',
          source: 'custom'
        };
      }
    },

    // Пробел перед знаками препинания
    {
      pattern: /\s+([,.!?;:])/g,
      check: (match, index) => {
        return {
          offset: index,
          length: match.length - 1,
          word: match.substring(0, match.length - 1),
          message: 'Лишний пробел перед знаком препинания',
          suggestions: [''],
          type: 'whitespace',
          source: 'custom'
        };
      }
    }
  ];

  // Применяем правила
  rules.forEach(rule => {
    let match;
    const regex = new RegExp(rule.pattern);

    while ((match = regex.exec(text)) !== null) {
      const error = rule.check(match[0], match.index);
      if (error) {
        errors.push(error);
      }
    }
  });

  return errors;
}
