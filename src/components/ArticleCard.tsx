import React from 'react';
import { Article } from '../types/blog';
import { Clock, Calendar } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <article className="article-card bg-white rounded-2xl overflow-hidden border border-slate-200/80 flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Image Container */}
      <div className="relative overflow-hidden h-52 bg-slate-900">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        
        {/* Category Pill */}
        <div className="absolute top-4 left-4 bg-sky-600 text-white text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
          {article.category}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Meta Header */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {article.publishDate}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
          {article.title}
        </h3>

        {/* Full Plain-Language Explanation */}
        <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-grow">
          {article.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-slate-100">
          {article.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>

      </div>

    </article>
  );
};
