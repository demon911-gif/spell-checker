import { motion } from 'framer-motion';
import { FileText, Type, Clock, Hash } from 'lucide-react';

export default function Stats({ stats }) {
  const statItems = [
    {
      icon: <Type className="w-5 h-5" />,
      label: 'Слов',
      value: stats.words,
      color: 'text-blue-500'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: 'Предложений',
      value: stats.sentences,
      color: 'text-green-500'
    },
    {
      icon: <Hash className="w-5 h-5" />,
      label: 'Символов',
      value: stats.characters,
      color: 'text-purple-500'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Время чтения',
      value: `${stats.readingTime} мин`,
      color: 'text-orange-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Статистика текста
        </h3>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {statItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
          >
            <div className={item.color}>
              {item.icon}
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.label}
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
