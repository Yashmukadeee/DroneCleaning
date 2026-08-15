import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, ShieldCheck, ArrowRight, Building, Layers } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [floors, setFloors] = useState<number>(40);
  const [surfaceArea, setSurfaceArea] = useState<number>(25000);
  const [cleaningsPerYear, setCleaningsPerYear] = useState<number>(3);

  // Calculations:
  // Scaffolding cost approx $8 per sqm including setup labor & insurance
  // Drone cleaning cost approx $3.2 per sqm
  const scaffoldingCostPerSqm = 8.5;
  const droneCostPerSqm = 3.2;

  const annualScaffoldingCost = Math.round(surfaceArea * cleaningsPerYear * scaffoldingCostPerSqm);
  const annualDroneCost = Math.round(surfaceArea * cleaningsPerYear * droneCostPerSqm);
  const annualSavings = Math.max(0, annualScaffoldingCost - annualDroneCost);
  const savingsPercent = Math.round((annualSavings / (annualScaffoldingCost || 1)) * 100);

  // Time calculations:
  // Scaffolding rate: 300 sqm/day
  // Drone rate: 3,000 sqm/day
  const daysScaffolding = Math.ceil((surfaceArea * cleaningsPerYear) / 300);
  const daysDrone = Math.ceil((surfaceArea * cleaningsPerYear) / 3000);
  const daysSaved = Math.max(0, daysScaffolding - daysDrone);

  return (
    <section id="roi-calculator" className="py-20 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-4">
            <Calculator className="w-4 h-4" />
            <span>Commercial Real-Estate Simulator</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Facade Cleaning ROI & Safety Calculator
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Estimate your annual financial savings, setup time reduction, and liability mitigation by adopting drone soft-washing.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-700 shadow-xl">
          
          {/* Controls Sliders */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
              Building Specifications
            </h3>

            {/* Building Height Sliders */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Building className="w-4 h-4 text-sky-600" />
                  <span>Building Height (Floors)</span>
                </label>
                <span className="text-base font-extrabold text-sky-600 dark:text-sky-400">{floors} Floors (~{floors * 3.5}m)</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={floors}
                onChange={(e) => setFloors(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>

            {/* Total Glass Surface Area */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-600" />
                  <span>Glass Facade Surface Area (sq.m)</span>
                </label>
                <span className="text-base font-extrabold text-sky-600 dark:text-sky-400">{surfaceArea.toLocaleString()} m²</span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={surfaceArea}
                onChange={(e) => setSurfaceArea(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>

            {/* Cleanings per year */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span>Cleaning Frequency (Per Year)</span>
                </label>
                <span className="text-base font-extrabold text-sky-600 dark:text-sky-400">{cleaningsPerYear} Cleanings / Year</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={cleaningsPerYear}
                onChange={(e) => setCleaningsPerYear(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>

            {/* Quick Preset Buttons */}
            <div className="pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Sample Building Presets</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setFloors(20); setSurfaceArea(10000); setCleaningsPerYear(2); }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-sky-100 hover:text-sky-700"
                >
                  Mid-Rise Tower (20 Fl)
                </button>
                <button
                  onClick={() => { setFloors(45); setSurfaceArea(30000); setCleaningsPerYear(3); }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-sky-100 hover:text-sky-700"
                >
                  Commercial High-Rise (45 Fl)
                </button>
                <button
                  onClick={() => { setFloors(80); setSurfaceArea(75000); setCleaningsPerYear(4); }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-sky-100 hover:text-sky-700"
                >
                  Mega Skyscraper (80 Fl)
                </button>
              </div>
            </div>

          </div>

          {/* Results Output */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-sky-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
            
            <div>
              <div className="flex items-center justify-between border-b border-sky-800/60 pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Estimated Annual Impact</span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full">
                  {savingsPercent}% Cost Reduction
                </span>
              </div>

              {/* Annual Savings Number */}
              <div className="mb-8">
                <span className="text-sm font-semibold text-slate-300 block mb-1">Estimated Annual Savings</span>
                <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
                  ${annualSavings.toLocaleString()}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Traditional Scaffolding: <span className="line-through">${annualScaffoldingCost.toLocaleString()}</span> → Drone Wash: <span className="text-emerald-400 font-bold">${annualDroneCost.toLocaleString()}</span>
                </p>
              </div>

              {/* Days Saved Metric */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Time Saved / Year</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{daysSaved} Days</div>
                  <span className="text-[11px] text-slate-400">10x faster execution</span>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Human Risk Score</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">100% Eliminated</div>
                  <span className="text-[11px] text-slate-400">Zero humans at height</span>
                </div>
              </div>
            </div>

            <a
              href="#author"
              className="w-full py-3.5 px-6 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm text-center flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/20"
            >
              <span>Consult on Custom Deployment</span>
              <ArrowRight className="w-4 h-4" />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
