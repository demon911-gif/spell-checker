import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export async function checkText(text, language = 'auto') {
  try {
    const response = await axios.post(`${API_URL}/check`, {
      text,
      language
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function correctText(text) {
  try {
    const response = await axios.post(`${API_URL}/correct`, {
      text
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
