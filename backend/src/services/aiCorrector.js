import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_AUTH_TOKEN || '',
  baseURL: process.env.ANTHROPIC_BASE_URL || 'http://localhost:20128/v1'
});

export async function correctTextWithAI(text) {
  if (!process.env.ANTHROPIC_AUTH_TOKEN) {
    console.warn('ANTHROPIC_AUTH_TOKEN not set, skipping AI correction');
    return null;
  }

  try {
    const message = await anthropic.messages.create({
      model: 'kr/claude-sonnet-4.5',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `Исправь все ошибки в этом тексте (орфография, грамматика, пунктуация, заглавные буквы). Верни ТОЛЬКО исправленный текст, без объяснений и комментариев.

Текст: ${text}`
      }]
    });

    const correctedText = message.content[0].text.trim();
    return correctedText;

  } catch (error) {
    console.error('AI correction error:', error);
    return null;
  }
}
