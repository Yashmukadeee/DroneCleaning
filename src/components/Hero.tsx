import React from 'react';
import { ArrowDown, Lightbulb, Zap, ShieldCheck, Activity } from 'lucide-react';

interface HeroProps {
  onScrollToArticles: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToArticles }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 pt-16 pb-24 border-b border-slate-200/60">
      
      {/* Background Decorative Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c710_1px,transparent_1px),linear-gradient(to_bottom,#0284c710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Visionary Concept Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs sm:text-sm font-semibold mb-8 shadow-sm">
          <Lightbulb className="w-4 h-4 text-sky-600" />
          <span>A Conceptual Engineering Project & Proposal by Yash Mukade</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]">
          Redefining the <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">Skyline</span>
        </h1>

        {/* Hero Description */}
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
          Exploring the engineering design, economic potential, FMCW radar positioning, and purified soft-wash chemistry behind tethered facade cleaning drones.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={onScrollToArticles}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full text-white bg-sky-600 hover:bg-sky-700 transition-all shadow-lg shadow-sky-600/30 hover:shadow-sky-600/50 hover:scale-[1.02]"
          >
            <span>Explore Concept Papers & Research</span>
            <ArrowDown className="w-5 h-5" />
          </button>

          <a
            href="#author"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-all shadow-sm hover:shadow-md hover:scale-[1.02]"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>Connect with Yash Mukade</span>
          </a>
        </div>

        {/* Concept Impact Highlights */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          
          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-3">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-3xl font-extrabold text-slate-900">10x Speed</span>
            <span className="text-sm font-medium text-slate-500 mt-1">
              Theoretical Coverage Velocity
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-3xl font-extrabold text-slate-900">Zero Height Risk</span>
            <span className="text-sm font-medium text-slate-500 mt-1">
              Eliminating Human Fall Hazards
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-3">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-3xl font-extrabold text-slate-900">0 PPM Chemistry</span>
            <span className="text-sm font-medium text-slate-500 mt-1">
              Pure Water Spotless Solvency
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
