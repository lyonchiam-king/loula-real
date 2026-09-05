import React from 'react';
import heroImg from '../assets/images/hero_studio_bright_1788620881240.jpg';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[600px] flex items-center justify-center overflow-hidden bg-[#2C2C2C]">
      {/* Full bleed image background - loaded immediately without entrance animations */}
      <img
        src={heroImg}
        alt="Loula's Studio bright, sunlit skincare room"
        className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.88] contrast-[1.02]"
        referrerPolicy="no-referrer"
      />

      {/* Subtle warm overlay for readable editorial contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/85 via-[#2C2C2C]/40 to-transparent" />

      {/* Hero content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16 sm:py-24">
        
        {/* Subtle badge */}
        <div className="inline-block mb-4 px-3.5 py-1 rounded-full bg-[#F9F7F5]/20 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-sans tracking-wider uppercase text-white">
          Skin Care Clinic • Manchester & London UK
        </div>

        {/* Headline - Exact requested text */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-5">
          Loula's Studio: Natural Skin Results by Dalal
        </h1>

        {/* Subcopy - Exact requested text */}
        <p className="font-sans text-lg sm:text-xl text-white/95 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          Book your facial without the DM wait. Clear prices, calm environment, expert care.
        </p>

        {/* Primary CTA - Button answers tap directly with scale/fill */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto bg-[#D4A59A] hover:bg-[#C08E82] active:scale-95 active:bg-[#C08E82] text-white font-medium text-lg px-8 py-4 rounded-md transition-all shadow-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            Book Your Treatment
          </button>
          
          <a
            href="tel:+447446960730"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 active:scale-95 text-white font-medium text-base px-6 py-4 rounded-md border border-white/30 backdrop-blur-sm transition-all text-center focus-visible:ring-2 focus-visible:ring-white"
          >
            Call Dalal: +44 7446 960730
          </a>
        </div>
      </div>
    </section>
  );
};
