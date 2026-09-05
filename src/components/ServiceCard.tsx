import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Clock, Info, Sparkles, Check } from 'lucide-react';
import { Treatment } from '../types';

interface ServiceCardProps {
  treatment: Treatment;
  isBestMatch?: boolean;
  onOpenModal: (treatment: Treatment) => void;
  onBookClick: (treatmentName: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  treatment,
  isBestMatch = false,
  onOpenModal,
  onBookClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      layoutId={shouldReduceMotion ? undefined : `card-${treatment.id}`}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
      viewport={{ once: true }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      className={`relative bg-[#FFFFFF] rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md ${
        isBestMatch
          ? 'border-2 border-[#D4A59A] ring-1 ring-[#D4A59A]/30'
          : 'border-[#2C2C2C]/10 hover:border-[#D4A59A]/60'
      }`}
    >
      {/* Top Image Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-[#F9F7F5]">
        <img
          src={treatment.image}
          alt={treatment.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Price & Duration Badge Overlay */}
        <div className="absolute top-3 right-3 bg-[#FFFFFF]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#2C2C2C] shadow-sm flex items-center gap-2">
          <span className="text-[#D4A59A] font-serif font-bold text-sm">£{treatment.price}</span>
          <span className="text-[#8C8C8C]">•</span>
          <span className="flex items-center gap-1 font-normal text-[#8C8C8C]">
            <Clock className="w-3 h-3 text-[#8C8C8C]" />
            {treatment.duration}
          </span>
        </div>

        {isBestMatch && (
          <div className="absolute top-3 left-3 bg-[#D4A59A] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Top Match</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Title */}
          <h3 className="font-serif text-2xl font-bold text-[#2C2C2C] mb-2">
            {treatment.name}
          </h3>

          {/* Tags as small badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {treatment.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-[#F9F7F5] border border-[#2C2C2C]/10 text-xs font-medium text-[#2C2C2C]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* SIGNATURE MOMENT: Hover / touch reveals Result tag in accent color */}
          <div
            className={`transition-all duration-300 rounded-lg p-3 text-xs sm:text-sm font-medium border ${
              isHovered
                ? 'bg-[#D4A59A]/15 border-[#D4A59A] text-[#2C2C2C]'
                : 'bg-[#F9F7F5] border-transparent text-[#8C8C8C]'
            }`}
          >
            <div className="flex items-start gap-2">
              <Check className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${isHovered ? 'text-[#D4A59A]' : 'text-[#8C8C8C]'}`} />
              <p className="line-clamp-2">
                {treatment.resultTag}
              </p>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-[#2C2C2C]/10 flex items-center justify-between gap-3">
          
          <button
            onClick={() => onOpenModal(treatment)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#8C8C8C] hover:text-[#2C2C2C] focus-visible:ring-2 focus-visible:ring-[#D4A59A] rounded py-1 px-1.5 transition-colors"
          >
            <Info className="w-4 h-4 text-[#D4A59A]" />
            <span>Details & Prep</span>
          </button>

          <button
            onClick={() => onBookClick(treatment.name)}
            className="bg-[#2C2C2C] hover:bg-[#D4A59A] active:scale-95 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-[#D4A59A]"
          >
            Book • £{treatment.price}
          </button>

        </div>

      </div>
    </motion.div>
  );
};
