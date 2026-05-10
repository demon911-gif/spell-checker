import { useState, useEffect } from 'react';
import { Moon, Sun, Sparkles, FileText, Clock, Type, RefreshCw, Trash2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TextEditor from './components/TextEditor';
import ErrorList from './components/ErrorList';
import Stats from './components/Stats';
import { checkText, correctText } from './utils/api';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  const [text, setText] = useState(() => {
    return localStorage.getItem('lastText') || '';
  });

  const [errors, setErrors] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('auto');
  const [selectedError, setSelectedError] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('lastText', text);
  }, [text]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.trim().length > 0) {
        // Автоматическая проверка
        setLoading(true);
        checkText(text, language)
          .then(result => {
            setErrors(result.errors || []);
            setStats(result.stats || null);
          })
          .catch(error => {
            console.error('Error checking text:', error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setErrors([]);
        setStats(null);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [text, language]);

  const handleCheck = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const result = await checkText(text, language);
      setErrors(result.errors || []);
      setStats(result.stats || null);
    } catch (error) {
      console.error('Error checking text:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleErrorClick = (error) => {
    setSelectedError(error);
  };

  const handleSuggestionClick = (suggestion) => {
    if (!selectedError) return;

    const before = text.substring(0, selectedError.offset);
    const after = text.substring(selectedError.offset + selectedError.length);
    setText(before + suggestion + after);
    setSelectedError(null);
  };

  const fixAllErrors = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      // Используем AI для исправления текста
      const result = await correctText(text);

      if (result && result.corrected) {
        setText(result.corrected);
        setSelectedError(null);

        // Проверяем исправленный текст
        const checkResult = await checkText(result.corrected, language);
        setErrors(checkResult.errors || []);
        setStats(checkResult.stats || null);
      } else {
        // Если AI недоступен, используем старый метод
        let currentText = text;
        let hasErrors = true;
        let iteration = 0;
        const maxIterations = 5;

        while (hasErrors && iteration < maxIterations) {
          const checkResult = await checkText(currentText, language);

          if (!checkResult.errors || checkResult.errors.length === 0) {
            hasErrors = false;
            break;
          }

          let fixedText = currentText;
          const sortedErrors = [...checkResult.errors].sort((a, b) => b.offset - a.offset);

          sortedErrors.forEach(error => {
            if (error.suggestions && error.suggestions.length > 0) {
              const suggestion = error.suggestions[0];
              const before = fixedText.substring(0, error.offset);
              const after = fixedText.substring(error.offset + error.length);
              fixedText = before + suggestion + after;
            }
          });

          if (fixedText === currentText) {
            hasErrors = false;
            break;
          }

          currentText = fixedText;
          iteration++;
        }

        setText(currentText);
        setSelectedError(null);

        const finalResult = await checkText(currentText, language);
        setErrors(finalResult.errors || []);
        setStats(finalResult.stats || null);
      }

    } catch (error) {
      console.error('Error fixing text:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearText = () => {
    setText('');
    setErrors([]);
    setStats(null);
    setSelectedError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-primary-500" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  SpellChecker Pro
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Проверка орфографии в реальном времени
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="auto">Авто</option>
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Text Editor */}
          <div className="lg:col-span-2 space-y-4">
            <TextEditor
              text={text}
              setText={setText}
              errors={errors}
              loading={loading}
              onErrorClick={handleErrorClick}
              selectedError={selectedError}
              onClear={clearText}
            />

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handleCheck}
                disabled={!text.trim() || loading}
                className="flex-1 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
              >
                <Check className="w-5 h-5" />
                <span>{loading ? 'Проверяем...' : 'Проверить текст'}</span>
              </button>

              <button
                onClick={fixAllErrors}
                disabled={errors.length === 0}
                className="flex-1 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Исправить всё</span>
              </button>

              <button
                onClick={clearText}
                disabled={!text}
                className="px-6 py-3 rounded-lg bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg"
              >
                <Trash2 className="w-5 h-5" />
                <span>Очистить</span>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            {stats && <Stats stats={stats} />}

            {/* Errors */}
            <ErrorList
              errors={errors}
              selectedError={selectedError}
              onErrorClick={handleErrorClick}
              onSuggestionClick={handleSuggestionClick}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Made with ❤️ using React, Vite, and TailwindCSS</p>
      </footer>
    </div>
  );
}

export default App;
