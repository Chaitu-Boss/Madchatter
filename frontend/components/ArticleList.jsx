import React from 'react';
import ArticleCard from './ArticleCard';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-6 mt-8">
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} index={index} />
      ))}
    </div>
  );
};

export default ArticleList;
