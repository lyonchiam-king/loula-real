import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Clock, Sparkles, CheckCircle2, Calendar, Phone } from 'lucide-react';
import { Treatment } from '../types';

interface ServiceDetailModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onBookClick: (treatmentName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  treatment,
  onClose,
  onBookClick,
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (treatment) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [treatment]);

  if (!treatment) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2C2C2C]/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          layoutId={`card-${treatment.id}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-2xl shadow-2xl overflow-hidden z-10 my-8 border border-[#2C2C2C]/10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#2C2C2C] shadow-md transition-all focus-visible:ring-2 focus-visible:ring-[#D4A59A]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Image */}
          <div className="relative h-64 w-full bg-[#F9F7F5]">
            <img
              src={treatment.image}
              alt={treatment.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/70 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <div className="flex flex-wrap gap-2 mb-2">
                {treatment.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="font-serif text-3xl font-bold text-white">
                {treatment.name}
              </h2>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Quick Specs Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#F9F7F5] border border-[#2C2C2C]/10 text-center">
              <div>
                <span className="block text-xs uppercase text-[#8C8C8C] font-semibold">Price</span>
                <span className="font-serif text-xl font-bold text-[#2C2C2C]">£{treatment.price}</span>
              </div>
              <div>
                <span className="block text-xs uppercase text-[#8C8C8C] font-semibold">Duration</span>
                <span className="font-sans text-sm font-bold text-[#2C2C2C] flex items-center justify-center gap-1 mt-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4A59A]" />
                  {treatment.duration}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase text-[#8C8C8C] font-semibold">Downtime</span>
                <span className="font-sans text-xs font-semibold text-[#D4A59A] mt-1 block">
                  {treatment.downtime}
                </span>
              </div>
            </div>

            {/* Treatment Result Highlight */}
            <div className="bg-[#D4A59A]/15 border border-[#D4A59A] p-4 rounded-xl text-[#2C2C2C]">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-[#D4A59A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C08E82] mb-1">
                    Expected Result
                  </h4>
                  <p className="text-sm font-medium">
                    {treatment.resultTag}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-serif text-lg font-bold text-[#2C2C2C] mb-2">
                About the Treatment
              </h4>
              <p className="font-sans text-base text-[#2C2C2C]/90 leading-relaxed">
                {treatment.description}
              </p>
            </div>

            {/* Best For */}
            <div>
              <h4 className="font-serif text-lg font-bold text-[#2C2C2C] mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4A59A]" />
                Best For
              </h4>
              <p className="font-sans text-sm text-[#2C2C2C]/90">
                {treatment.bestFor}
              </p>
            </div>

            {/* Preparation Instructions */}
            <div className="p-4 rounded-xl bg-[#F9F7F5] border border-[#2C2C2C]/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C8C8C] mb-1">
                Preparation & Care
              </h4>
              <p className="text-sm text-[#2C2C2C]">
                {treatment.prepInstructions}
              </p>
            </div>

          </div>

          {/* Modal Footer CTA */}
          <div className="p-4 sm:p-6 bg-[#F9F7F5] border-t border-[#2C2C2C]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            <a
              href="tel:+447446960730"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C8C8C] hover:text-[#2C2C2C] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4A59A]" />
              <span>Questions? Call +44 7446 960730</span>
            </a>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-1/2 sm:w-auto px-4 py-3 rounded-md text-xs font-medium text-[#8C8C8C] hover:text-[#2C2C2C]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookClick(treatment.name);
                }}
                className="w-1/2 sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#D4A59A] hover:bg-[#C08E82] active:scale-95 text-white font-medium text-sm px-6 py-3 rounded-md shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-[#D4A59A]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Treatment</span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
