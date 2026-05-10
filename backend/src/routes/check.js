import express from 'express';
import { checkSpelling } from '../services/spellChecker.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { text, language = 'auto' } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        error: 'Текст не может быть пустым'
      });
    }

    if (text.length > 50000) {
      return res.status(400).json({
        error: 'Текст слишком длинный (максимум 50000 символов)'
      });
    }

    const result = await checkSpelling(text, language);

    res.json(result);
  } catch (error) {
    console.error('Error checking spelling:', error);
    res.status(500).json({
      error: 'Ошибка при проверке орфографии',
      details: error.message
    });
  }
});

export default router;
