import React, { useState } from 'react';
import { Article } from '../types/blog';
import { X, Share2, Check, Sparkles, UserCheck, ArrowLeft, Globe, Linkedin, Instagram, Github } from 'lucide-react';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const totalHeight = target.scrollHeight - target.clientHeight;
    if (totalHeight > 0) {
      const progress = (target.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-300">
      
      {/* Container */}
      <div 
        onScroll={handleScroll}
        className="relative w-full max-w-4xl h-full max-h-full sm:max-h-[92vh] bg-white sm:rounded-3xl shadow-2xl overflow-y-auto flex flex-col border border-slate-200"
      >
        
        {/* Top Header Controls Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-sky-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </button>

          {/* Controls */}
          <div className="flex items-center gap-3">
            
            {/* Share Link */}
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors relative"
              title="Share Article Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Reading Progress Indicator */}
          <div 
            className="absolute bottom-0 left-0 h-1 bg-sky-500 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-10 max-w-3xl mx-auto w-full">
          
          {/* Header Info */}
          <div className="mb-8">
            <span className="inline-block bg-sky-100 text-sky-700 text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 border-b border-slate-200 pb-6">
              <div className="flex items-center gap-2">
                <img
                  src={article.author.avatarUrl}
                  alt={article.author.name}
                  className="w-8 h-8 rounded-full object-cover border border-sky-500"
                />
                <div>
                  <span className="text-slate-900 font-bold block">{article.author.name}</span>
                  <span className="text-[11px] font-normal text-slate-400">{article.author.role}</span>
                </div>
              </div>
              <span>•</span>
              <span>{article.publishDate}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="relative rounded-2xl overflow-hidden mb-10 shadow-lg border border-slate-200">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-[360px] object-cover"
            />
          </div>

          {/* Key Takeaways Box */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 mb-10 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-sky-900 mb-3 text-base">
              <Sparkles className="w-5 h-5 text-sky-600" />
              <span>Key Executive Takeaways</span>
            </div>
            <ul className="space-y-2.5">
              {article.keyTakeaways.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-sky max-w-none text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Author Card */}
          <div className="mt-16 pt-8 border-t border-slate-200 bg-slate-50 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6">
            <img
              src={article.author.avatarUrl}
              alt={article.author.name}
              className="w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-sky-500"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-lg text-slate-900">{article.author.name}</h4>
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <UserCheck className="w-3 h-3" /> Verified Author
                </span>
              </div>
              <p className="text-xs text-sky-600 font-semibold mb-2">Project Visionary & Robotics Concept Lead</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Exploring the conceptual engineering, FMCW radar positioning physics, high-voltage tether dynamics, and commercial feasibility of autonomous high-rise building cleaning.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 mt-3 pt-2 border-t border-slate-200">
                <a 
                  href="https://yashmukade.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline flex items-center gap-1 font-bold"
                >
                  <Globe className="w-3.5 h-3.5" /> Website
                </a>
                <span>•</span>
                <a 
                  href="https://linkedin.com/in/yashmukade/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline flex items-center gap-1 font-bold"
                >
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <span>•</span>
                <a 
                  href="https://www.instagram.com/yash.mukadeeee_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline flex items-center gap-1 font-bold"
                >
                  <Instagram className="w-3.5 h-3.5" /> Instagram
                </a>
                <span>•</span>
                <a 
                  href="https://github.com/Yashmukadeee" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline flex items-center gap-1 font-bold"
                >
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
