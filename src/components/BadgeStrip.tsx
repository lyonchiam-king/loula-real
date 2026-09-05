import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, Smile } from 'lucide-react';

export const BadgeStrip: React.FC = () => {
  const highlights = [
    { label: 'Natural Results', icon: Sparkles },
    { label: 'Calming Environment', icon: Smile },
    { label: 'Thorough Explanations', icon: HeartHandshake },
    { label: 'Expert Care', icon: ShieldCheck },
  ];

  return (
    <section className="bg-[#FFFFFF] border-b border-[#2C2C2C]/10 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-center gap-2.5 p-3 rounded-lg bg-[#F9F7F5] border border-[#2C2C2C]/5 text-[#2C2C2C]"
              >
                <Icon className="w-4 h-4 text-[#D4A59A] shrink-0" />
                <span className="font-sans font-medium text-sm sm:text-base tracking-tight text-[#2C2C2C]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
