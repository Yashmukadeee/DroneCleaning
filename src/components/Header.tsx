import React, { useState, useEffect } from 'react';
import { Bot, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenChat }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 shadow-md backdrop-blur-md py-3 border-b border-slate-200/80' 
        : 'bg-white py-4 border-b border-slate-200/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-600/20 group-hover:scale-105 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 flex items-center gap-1">
                DroneCleaning<span className="text-sky-600">.Tech</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                Facade Automation Journal
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200">
            <a href="#vision" className="px-5 py-2 text-xs font-bold text-slate-700 hover:text-sky-600 hover:bg-white rounded-full transition-all">
              The Vision & Problem
            </a>
            <a href="#articles" className="px-5 py-2 text-xs font-bold text-slate-700 hover:text-sky-600 hover:bg-white rounded-full transition-all">
              Concept Papers & Research
            </a>
            <a href="#author" className="px-5 py-2 text-xs font-bold text-slate-700 hover:text-sky-600 hover:bg-white rounded-full transition-all">
              Author & Contact
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="px-4 py-2 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 hover:border-sky-300 transition-all flex items-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Ask AI</span>
              </button>
            )}
            <a
              href="#author"
              className="px-5 py-2 rounded-full text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 transition-all shadow-md shadow-sky-600/20 hover:scale-[1.02]"
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-200 flex flex-col space-y-2 pb-3">
            {onOpenChat && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="px-3 py-2 rounded-lg text-sm font-bold text-sky-700 bg-sky-50 flex items-center gap-2 text-left"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Ask AI Technical Assistant</span>
              </button>
            )}
            <a 
              href="#vision" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              The Vision & Problem
            </a>
            <a 
              href="#articles" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Concept Papers & Research
            </a>
            <a 
              href="#author" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Author & Contact
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
