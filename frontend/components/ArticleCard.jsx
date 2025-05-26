import React from 'react';
import { motion } from 'framer-motion';

const sentimentColors = {
  positive: 'text-green-400 border-green-400',
  negative: 'text-red-400 border-red-400',
  neutral: 'text-yellow-400 border-yellow-400',
};

const ArticleCard = ({ article, index }) => {
  const sentimentClass = sentimentColors[article.sentiment] || 'text-gray-400 border-gray-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-900 p-5 rounded-lg shadow-lg flex flex-col md:flex-row gap-6"
    >
      <img src={article.top_image} alt="cover" className="w-full md:w-48 h-48 object-cover rounded-md" />
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white mb-2">{article.title}</h3>
        <p className="text-sm text-gray-400 mb-2">{article.summary}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {article.keywords.slice(0, 5).map((k, i) => (
            <span key={i} className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">
              #{k}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center text-sm mt-4">
          <span className={`border px-2 py-1 rounded ${sentimentClass}`}>
            {article.sentiment.toUpperCase()}
          </span>
          <a href={article.url} target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300">
            Read More
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
