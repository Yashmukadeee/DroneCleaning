import React, { useState } from 'react';
import { DRONE_HOTSPOTS } from '../data/articlesData';
import { DroneHotspot } from '../types/blog';
import { Radar, Droplets, Zap, Cpu, CheckCircle2, ChevronRight, Info } from 'lucide-react';

export const DroneTechExplorer: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<DroneHotspot>(DRONE_HOTSPOTS[0]);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radar': return <Radar className="w-5 h-5 text-sky-500" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-cyan-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-500" />;
      default: return <Info className="w-5 h-5 text-sky-500" />;
    }
  };

  return (
    <section id="drone-tech" className="py-20 bg-slate-900 text-white overflow-hidden relative border-b border-slate-800">
      
      {/* Background Neon Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-extrabold uppercase tracking-widest mb-4">
            <Cpu className="w-4 h-4" />
            <span>Interactive Engineering Blueprint</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Anatomy of a Tethered Cleaning Drone
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Click on any interactive hotspot below to inspect the sub-systems powering contact-free high-rise maintenance.
          </p>
        </div>

        {/* Explorer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Canvas Diagram */}
          <div className="lg:col-span-7 bg-slate-950/80 rounded-3xl p-6 sm:p-10 border border-slate-800 relative shadow-2xl min-h-[420px] flex items-center justify-center">
            
            {/* Background Drone Graphic Illustration */}
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              
              {/* Drone Body Outline SVG */}
              <svg viewBox="0 0 400 400" className="w-full h-full text-sky-500/20 stroke-current fill-none stroke-[2]">
                {/* Center Core */}
                <circle cx="200" cy="200" r="45" className="fill-slate-900 stroke-sky-500/40" />
                {/* Rotor Arms */}
                <line x1="200" y1="200" x2="100" y2="100" className="stroke-sky-400/60 stroke-[4]" />
                <line x1="200" y1="200" x2="300" y2="100" className="stroke-sky-400/60 stroke-[4]" />
                <line x1="200" y1="200" x2="100" y2="300" className="stroke-sky-400/60 stroke-[4]" />
                <line x1="200" y1="200" x2="300" y2="300" className="stroke-sky-400/60 stroke-[4]" />
                {/* Rotor Guards */}
                <circle cx="100" cy="100" r="35" className="stroke-sky-400/40 fill-sky-500/5" />
                <circle cx="300" cy="100" r="35" className="stroke-sky-400/40 fill-sky-500/5" />
                <circle cx="100" cy="300" r="35" className="stroke-sky-400/40 fill-sky-500/5" />
                <circle cx="300" cy="300" r="35" className="stroke-sky-400/40 fill-sky-500/5" />
                {/* Tether cable extending down */}
                <line x1="200" y1="200" x2="200" y2="380" className="stroke-amber-400 stroke-[4] stroke-dasharray-[4_4] animate-pulse" />
              </svg>

              {/* Interactive Hotspot Buttons */}
              {DRONE_HOTSPOTS.map((hotspot) => {
                const isSelected = selectedHotspot.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    onClick={() => setSelectedHotspot(hotspot)}
                    style={{ left: `${hotspot.xPercent}%`, top: `${hotspot.yPercent}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all ${
                      isSelected ? 'z-30 scale-125' : 'z-20 hover:scale-110'
                    }`}
                  >
                    <span className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                      isSelected 
                        ? 'bg-sky-500 border-white text-white shadow-lg shadow-sky-500/50' 
                        : 'bg-slate-900 border-sky-400 text-sky-400 hover:bg-sky-500 hover:text-white'
                    }`}>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-40" />
                      {renderIcon(hotspot.icon)}
                    </span>
                    <span className="absolute left-1/2 -translate-x-1/2 top-10 whitespace-nowrap text-[11px] font-bold bg-slate-900/90 text-white px-2.5 py-1 rounded-md border border-slate-700 pointer-events-none opacity-90">
                      {hotspot.title.split(' ')[0]}
                    </span>
                  </button>
                );
              })}

            </div>

          </div>

          {/* Detailed Hotspot Breakdown Card */}
          <div className="lg:col-span-5 bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl">
            
            <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700">
                {renderIcon(selectedHotspot.icon)}
              </div>
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Selected Sub-System</span>
                <h3 className="text-2xl font-bold text-white">{selectedHotspot.title}</h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedHotspot.description}
            </p>

            {/* Technical Specifications */}
            <div className="space-y-3 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">System Benchmarks</span>
              {selectedHotspot.specs.map((spec, index) => (
                <div key={index} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold">{spec}</span>
                </div>
              ))}
            </div>

            {/* Sub-system selection pills */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700">
              {DRONE_HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHotspot(h)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                    selectedHotspot.id === h.id
                      ? 'bg-sky-500 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {h.title}
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
