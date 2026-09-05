import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Phone, Calendar } from 'lucide-react';

interface StickyMobileBarProps {
  onBookClick: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onBookClick }) => {
  const [showBar, setShowBar] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Show bar once scrolled past 350px (past hero section)
      if (window.scrollY > 350) {
        setShowBar(true);
      } else {
        setShowBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showBar && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#2C2C2C]/15 p-3 shadow-2xl"
        >
          <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
            
            {/* Call Dalal button */}
            <a
              href="tel:+447446960730"
              className="inline-flex items-center justify-center gap-2 bg-[#F9F7F5] hover:bg-[#2C2C2C] hover:text-white active:scale-95 text-[#2C2C2C] font-semibold text-sm py-3 px-4 rounded-xl border border-[#2C2C2C]/15 transition-all text-center"
            >
              <Phone className="w-4 h-4 text-[#D4A59A]" />
              <span>Call Dalal</span>
            </a>

            {/* Book Now button */}
            <button
              onClick={onBookClick}
              className="inline-flex items-center justify-center gap-2 bg-[#D4A59A] hover:bg-[#C08E82] active:scale-95 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-md transition-all text-center"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
