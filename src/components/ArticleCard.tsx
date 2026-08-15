import React from 'react';
import { Article } from '../types/blog';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onRead: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onRead }) => {
  return (
    <article className="article-card group bg-white rounded-2xl overflow-hidden border border-slate-200/80 flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Image Container */}
      <div className="relative overflow-hidden h-52 bg-slate-900 cursor-pointer" onClick={() => onRead(article)}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
        <h3 
          onClick={() => onRead(article)}
          className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 cursor-pointer group-hover:text-sky-600 transition-colors"
        >
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-slate-600 mb-6 line-clamp-3 leading-relaxed flex-grow">
          {article.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end mt-auto">
          <button
            onClick={() => onRead(article)}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors group/btn"
          >
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

    </article>
  );
};
