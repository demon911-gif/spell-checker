import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

export default function ErrorList({ errors, selectedError, onErrorClick, onSuggestionClick }) {
  if (errors.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Ошибок не найдено!
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ваш текст выглядит отлично
          </p>
        </div>
      </motion.div>
    );
  }

  const getErrorIcon = (type) => {
    switch (type) {
      case 'spelling':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'grammar':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'punctuation':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'whitespace':
        return <Info className="w-4 h-4 text-purple-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getErrorColor = (type) => {
    switch (type) {
      case 'spelling':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'grammar':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'punctuation':
        return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'whitespace':
        return 'border-purple-500 bg-purple-50 dark:bg-purple-900/20';
      default:
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Найденные ошибки ({errors.length})
        </h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence>
          {errors.map((error, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 border-l-4 cursor-pointer transition-all ${
                getErrorColor(error.type)
              } ${
                selectedError === error
                  ? 'ring-2 ring-primary-500'
                  : 'hover:bg-opacity-80'
              }`}
              onClick={() => onErrorClick(error)}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">{getErrorIcon(error.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {error.word}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                      {error.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {error.message}
                  </p>

                  {error.suggestions && error.suggestions.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Предложения:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {error.suggestions.slice(0, 3).map((suggestion, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSuggestionClick(suggestion);
                            }}
                            className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-500 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
