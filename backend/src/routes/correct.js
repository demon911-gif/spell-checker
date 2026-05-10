import express from 'express';
import { correctTextWithAI } from '../services/aiCorrector.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (text.length > 5000) {
      return res.status(400).json({ error: 'Text too long (max 5000 characters)' });
    }

    const correctedText = await correctTextWithAI(text);

    if (!correctedText) {
      return res.status(503).json({ error: 'AI correction service unavailable' });
    }

    res.json({
      original: text,
      corrected: correctedText
    });

  } catch (error) {
    console.error('Correct endpoint error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
