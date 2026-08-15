import React from 'react';
import { AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';

export const VisionSection: React.FC = () => {
  return (
    <section id="vision" className="py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* High Res Facade Image */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-sky-600 to-cyan-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition duration-500" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="Modern Skyscraper Facade"
                className="w-full h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="bg-sky-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Conceptual Proposal
                  </span>
                  <h3 className="text-xl font-bold mt-2">Curtain-Wall Towers & Complex Glass Surfaces</h3>
                  <p className="text-sm text-slate-300">Modern architecture requires automated, contact-free maintenance concepts.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Content */}
          <div>
            <div className="inline-flex items-center gap-2 text-sky-600 font-bold text-sm uppercase tracking-wider mb-3">
              <Lightbulb className="w-4 h-4" />
              <span>Project Vision & Motivation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              Why Facade Cleaning Must Evolve to Autonomous Robotics
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Traditional high-rise window washing relies on suspended swing stages (gondolas) hanging hundreds of feet in the air. This exposes workers to severe hazards, suffers from high setup friction, and incurs massive insurance overheads.
            </p>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              This concept explores a future where tethered multirotor drones operate from ground control stations—offering up to <strong className="text-slate-900 font-bold">10x faster coverage</strong>, removing human fall risks entirely, and reaching architectural zones that gondolas cannot access.
            </p>

            {/* Comparison Highlights */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-red-50 border border-red-200/60">
                <div className="p-2 rounded-lg bg-red-100 text-red-600 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-red-950">The Industry Problem</h4>
                  <p className="text-sm text-red-900/80">Extreme occupational safety hazards, high insurance surcharges, lengthy 24-hour setup delays, and limited coverage speeds.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200/60">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950">The Proposed Drone Solution</h4>
                  <p className="text-sm text-emerald-900/80">15-minute ground setup, FMCW radar glass locking, 800V continuous power tethering, and zero-TDS soft-wash chemistry.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
