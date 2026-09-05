import React from 'react';
import { Filter, Check, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { TreatmentFinderState, Treatment } from '../types';

interface TreatmentFinderProps {
  filterState: TreatmentFinderState;
  onFilterChange: (newState: TreatmentFinderState) => void;
  bestMatch: Treatment | null;
  onBookMatchedTreatment: (treatmentName: string) => void;
}

export const TreatmentFinder: React.FC<TreatmentFinderProps> = ({
  filterState,
  onFilterChange,
  bestMatch,
  onBookMatchedTreatment,
}) => {
  const goalOptions = [
    { id: null, label: 'All Goals' },
    { id: 'hydration', label: 'Hydration & Glow' },
    { id: 'texture', label: 'Smooth Texture & Collagen' },
    { id: 'lashes_brows', label: 'Lashes & Brows' },
  ];

  const downtimeOptions = [
    { id: null, label: 'Any Downtime' },
    { id: 'none', label: 'Zero Downtime (Event Ready)' },
    { id: 'mild', label: 'Mild (1-2 Days)' },
  ];

  const budgetOptions = [
    { id: null, label: 'Any Budget' },
    { id: 'low', label: 'Under £50' },
    { id: 'mid', label: '£50 - £80' },
    { id: 'high', label: '£80+' },
  ];

  const handleGoalSelect = (goalId: string | null) => {
    onFilterChange({ ...filterState, goal: goalId });
  };

  const handleDowntimeSelect = (downtimeId: string | null) => {
    onFilterChange({ ...filterState, downtime: downtimeId });
  };

  const handleBudgetSelect = (budgetId: string | null) => {
    onFilterChange({ ...filterState, budget: budgetId });
  };

  const handleReset = () => {
    onFilterChange({ goal: null, downtime: null, budget: null });
  };

  const hasActiveFilters = filterState.goal || filterState.downtime || filterState.budget;

  return (
    <section id="treatment-finder" className="py-12 bg-[#FFFFFF] border-y border-[#2C2C2C]/10 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9F7F5] border border-[#D4A59A]/30 text-xs font-semibold text-[#2C2C2C] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A59A]" />
            <span>Interactive Tool</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2C2C2C]">
            Find Your Ideal Treatment
          </h2>
          <p className="font-sans text-base text-[#8C8C8C] mt-2">
            Select your goal, downtime tolerance, and budget to view instantaneous custom recommendations.
          </p>
        </div>

        {/* Toggles Container */}
        <div className="bg-[#F9F7F5] border border-[#2C2C2C]/10 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto space-y-6 shadow-sm">
          
          {/* Question 1: Goal */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8C8C] mb-3">
              1. What is your skin or beauty goal?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {goalOptions.map((opt) => {
                const isSelected = filterState.goal === opt.id;
                return (
                  <button
                    key={opt.label}
                    onClick={() => handleGoalSelect(opt.id)}
                    className={`py-3 px-3 text-xs sm:text-sm font-medium rounded-xl border text-center transition-all focus-visible:ring-2 focus-visible:ring-[#D4A59A] ${
                      isSelected
                        ? 'bg-[#2C2C2C] text-white border-[#2C2C2C] shadow-sm'
                        : 'bg-white text-[#2C2C2C] border-[#2C2C2C]/15 hover:border-[#D4A59A]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Downtime */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8C8C] mb-3">
              2. How much recovery time do you prefer?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {downtimeOptions.map((opt) => {
                const isSelected = filterState.downtime === opt.id;
                return (
                  <button
                    key={opt.label}
                    onClick={() => handleDowntimeSelect(opt.id)}
                    className={`py-3 px-3 text-xs sm:text-sm font-medium rounded-xl border text-center transition-all focus-visible:ring-2 focus-visible:ring-[#D4A59A] ${
                      isSelected
                        ? 'bg-[#2C2C2C] text-white border-[#2C2C2C] shadow-sm'
                        : 'bg-white text-[#2C2C2C] border-[#2C2C2C]/15 hover:border-[#D4A59A]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3: Budget */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8C8C] mb-3">
              3. What is your budget per session?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {budgetOptions.map((opt) => {
                const isSelected = filterState.budget === opt.id;
                return (
                  <button
                    key={opt.label}
                    onClick={() => handleBudgetSelect(opt.id)}
                    className={`py-3 px-3 text-xs sm:text-sm font-medium rounded-xl border text-center transition-all focus-visible:ring-2 focus-visible:ring-[#D4A59A] ${
                      isSelected
                        ? 'bg-[#2C2C2C] text-white border-[#2C2C2C] shadow-sm'
                        : 'bg-white text-[#2C2C2C] border-[#2C2C2C]/15 hover:border-[#D4A59A]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active selection summary & reset */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-[#2C2C2C]/10 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-[#2C2C2C] font-medium flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-[#D4A59A]" />
                <span>Filters Applied</span>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-[#8C8C8C] hover:text-[#2C2C2C] font-medium transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Reset Selections
              </button>
            </div>
          )}

          {/* Match Highlight Banner */}
          {bestMatch && (
            <div className="bg-[#FFFFFF] border-2 border-[#D4A59A] rounded-xl p-5 shadow-sm mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4A59A]/20 text-[#2C2C2C] font-bold text-xs">
                  <Check className="w-3 h-3 text-[#D4A59A]" />
                  <span>Your Best Match</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2C2C2C]">
                  {bestMatch.name} • £{bestMatch.price}
                </h3>
                <p className="text-xs text-[#8C8C8C]">{bestMatch.resultTag}</p>
              </div>

              <button
                onClick={() => onBookMatchedTreatment(bestMatch.name)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4A59A] hover:bg-[#C08E82] active:scale-95 text-white font-medium text-sm px-5 py-3 rounded-md transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#D4A59A]"
              >
                <span>Book Your Treatment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
