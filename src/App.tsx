import React, { useState, useEffect } from 'react';
import { ARTICLES_DATA } from './data/articlesData';
import { Article, Category } from './types/blog';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VisionSection } from './components/VisionSection';
import { DroneTechExplorer } from './components/DroneTechExplorer';
import { RoiCalculator } from './components/RoiCalculator';
import { ArticleCard } from './components/ArticleCard';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { NewsletterModal } from './components/NewsletterModal';
import { Footer } from './components/Footer';
import { Search, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function App() {
  const [articles] = useState<Article[]>(ARTICLES_DATA);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  // Force light mode for clean crisp aesthetic
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Filter Articles based on category and search query
  const filteredArticles = articles.filter(art => {
    const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      art.title.toLowerCase().includes(query) ||
      art.summary.toLowerCase().includes(query) ||
      art.tags.some(t => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const categories: Category[] = ['All', 'Technology', 'Process', 'Business', 'Safety & Regulations', 'Case Studies'];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-sky-500 selection:text-white">
      
      {/* Top Sticky Header */}
      <Header onOpenNewsletter={() => setIsNewsletterOpen(true)} />

      {/* Hero Section */}
      <Hero
        onScrollToArticles={() => {
          document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Vision & Motivation Section */}
      <VisionSection />

      {/* Interactive Blueprint & Anatomy Explorer */}
      <DroneTechExplorer />

      {/* ROI & Safety Simulator */}
      <RoiCalculator />

      {/* Main Articles & Whitepapers Hub */}
      <section id="articles" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-slate-200 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-extrabold uppercase tracking-widest mb-3">
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              <span>Peer-Reviewed & Concept Whitepapers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Technical Journal & Case Studies
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Deep dives into 77GHz radar physics, 0 PPM fluid chemistry, aerodynamics, and robotics economics by Yash Mukade.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search papers, sensors, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-xs text-slate-400 ml-auto hidden sm:inline">
            Showing <strong className="text-slate-700">{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'article' : 'articles'}
          </span>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <ArticleCard
                key={art.id}
                article={art}
                onRead={(article) => setSelectedArticle(article)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-lg mx-auto">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No whitepapers found</h3>
            <p className="text-sm text-slate-500 mb-6">No articles matched "{searchQuery}" in the selected category.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="px-5 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

      {/* Footer */}
      <Footer />

      {/* Article Reader Modal */}
      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      {/* Newsletter Dispatch Modal */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />

    </div>
  );
}
