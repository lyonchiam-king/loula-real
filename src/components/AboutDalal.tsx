import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, Heart, Award } from 'lucide-react';
import dalalImg from '../assets/images/dalal_aesthetician_1788620898030.jpg';

export const AboutDalal: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const verifiedProofs = [
    'Praised for natural-looking results',
    'Calming environment',
    'Thorough explanations before treatment',
  ];

  return (
    <section id="about-dalal" className="py-16 bg-[#FFFFFF] border-y border-[#2C2C2C]/10 my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Photo of Dalal */}
          <motion.div
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#2C2C2C]/10 aspect-[3/4] bg-[#F9F7F5]">
                <img
                  src={dalalImg}
                  alt="Dalal, Lead Aesthetician at Loula's Studio"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              {/* Decorative Accent Badge */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-[#F9F7F5] border border-[#2C2C2C]/10 p-4 rounded-xl shadow-md max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-[#D4A59A]/20 text-[#D4A59A]">
                    <Heart className="w-5 h-5 fill-[#D4A59A]" />
                  </div>
                  <div>
                    <span className="block font-serif font-bold text-sm text-[#2C2C2C]">Dalal</span>
                    <span className="block text-xs text-[#8C8C8C]">Founder & Aesthetic Specialist</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Story & Verified Proof */}
          <motion.div
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9F7F5] border border-[#D4A59A]/30 text-xs font-semibold text-[#2C2C2C] uppercase tracking-wider mb-3">
                <Award className="w-3.5 h-3.5 text-[#D4A59A]" />
                <span>Meet Your Practitioner</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2C2C] leading-tight">
                Skin Care Built Around Trust & Natural Aesthetics
              </h2>
            </div>

            <p className="font-sans text-lg text-[#2C2C2C]/90 leading-relaxed">
              At Loula’s Studio, Dalal provides a serene, unhurried sanctuary focused entirely on healthy, glowing skin barrier restoration and refined lash and brow architecture.
            </p>

            <p className="font-sans text-base text-[#8C8C8C] leading-relaxed">
              Every client receives bespoke attention without pressure or confusing jargon. Pricing is transparent, expectations are discussed upfront, and treatments are tailored to enhance your innate features effortlessly.
            </p>

            {/* Verified Proofs Checklist */}
            <div className="pt-4 border-t border-[#2C2C2C]/10 space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#2C2C2C]">
                Verified Client Experience
              </h3>

              <div className="space-y-2.5">
                {verifiedProofs.map((proof, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-[#F9F7F5] border border-[#2C2C2C]/5">
                    <CheckCircle2 className="w-5 h-5 text-[#D4A59A] shrink-0" />
                    <span className="font-sans text-sm font-semibold text-[#2C2C2C]">
                      {proof}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
