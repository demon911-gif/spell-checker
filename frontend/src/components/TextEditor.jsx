import { motion } from 'framer-motion';
import { Loader2, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function TextEditor({ text, setText, errors, loading, onErrorClick, selectedError, onClear }) {
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    if (highlightRef.current && textareaRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, [text]);

  const handleScroll = (e) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.target.scrollTop;
      highlightRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      onClear();
    }
    if (e.key === 'Escape' && selectedError) {
      e.preventDefault();
    }
  };

  const renderHighlightedText = () => {
    if (errors.length === 0) {
      return text;
    }

    let result = [];
    let lastIndex = 0;

    const sortedErrors = [...errors].sort((a, b) => a.offset - b.offset);

    sortedErrors.forEach((error, idx) => {
      // Текст до ошибки
      if (error.offset > lastIndex) {
        result.push(
          <span key={`text-${idx}`}>
            {text.substring(lastIndex, error.offset)}
          </span>
        );
      }

      // Ошибка
      const errorText = text.substring(error.offset, error.offset + error.length);
      const highlightClass =
        error.type === 'spelling' ? 'error-highlight' :
        error.type === 'grammar' ? 'grammar-highlight' :
        error.type === 'punctuation' ? 'punctuation-highlight' :
        error.type === 'whitespace' ? 'whitespace-highlight' :
        'style-highlight';

      result.push(
        <span
          key={`error-${idx}`}
          className={`${highlightClass} ${selectedError === error ? 'ring-2 ring-primary-500' : ''}`}
          onClick={() => onErrorClick(error)}
        >
          {errorText}
        </span>
      );

      lastIndex = error.offset + error.length;
    });

    // Оставшийся текст
    if (lastIndex < text.length) {
      result.push(
        <span key="text-end">
          {text.substring(lastIndex)}
        </span>
      );
    }

    return result;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Текст для проверки
          </h2>
          {loading && (
            <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
          )}
        </div>
        {text && (
          <button
            onClick={onClear}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Очистить (Ctrl+K)"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>

      <div className="relative">
        {/* Highlighted background */}
        <div
          ref={highlightRef}
          className="absolute inset-0 p-4 overflow-auto whitespace-pre-wrap break-words pointer-events-none font-mono text-base leading-relaxed"
          style={{
            color: 'transparent',
            caretColor: 'transparent'
          }}
        >
          {renderHighlightedText()}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          placeholder="Введите или вставьте текст для проверки орфографии..."
          className="relative w-full h-96 p-4 bg-transparent resize-none outline-none font-mono text-base leading-relaxed text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          style={{
            caretColor: 'currentColor'
          }}
        />
      </div>

      {/* Error count */}
      {errors.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Найдено ошибок: <span className="font-semibold text-red-500">{errors.length}</span>
          </p>
        </div>
      )}
    </motion.div>
  );
}
