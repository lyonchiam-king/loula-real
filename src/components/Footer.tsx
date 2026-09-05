import React from 'react';
import { Phone, Instagram, MapPin, FileSpreadsheet, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2C2C2C] text-white pt-16 pb-24 md:pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-white">
              Loula's Studio
            </h2>
            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              Natural Skin Results by Dalal. Transparent pricing, peaceful consultations, and dedicated skincare in London & Manchester.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <a
                href="https://www.instagram.com/dgtheaesthetician"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-[#D4A59A] text-white transition-colors"
                aria-label="Instagram Profile @dgtheaesthetician"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="tel:+447446960730"
                className="p-2 rounded-full bg-white/10 hover:bg-[#D4A59A] text-white transition-colors"
                aria-label="Call +44 7446 960730"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Studio Location & Contact */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-serif text-base font-bold text-[#D4A59A] uppercase tracking-wider">
              Studio Location
            </h3>
            
            <div className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#D4A59A] shrink-0 mt-0.5" />
              <span>
                T15, Hurlingham Studios,<br />
                Ranelagh Gardens, London SW6 3PA, UK
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-white/80 pt-1">
              <Phone className="w-4 h-4 text-[#D4A59A] shrink-0" />
              <a href="tel:+447446960730" className="hover:text-[#D4A59A] transition-colors">
                +44 7446 960730
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-white/80">
              <Instagram className="w-4 h-4 text-[#D4A59A] shrink-0" />
              <a
                href="https://www.instagram.com/dgtheaesthetician"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4A59A] transition-colors"
              >
                @dgtheaesthetician
              </a>
            </div>
          </div>

          {/* Col 3: Owner Admin / Spreadsheet Tool */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-serif text-base font-bold text-[#D4A59A] uppercase tracking-wider">
              Owner Spreadsheet Sync
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Every website enquiry automatically syncs to Dalal’s master spreadsheet.
            </p>
            <a
              href="/api/bookings/export.csv"
              download
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-2.5 rounded-md border border-white/20 transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#D4A59A]" />
              <span>Export Bookings CSV</span>
            </a>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} Loula's Studio. Natural Skin Results by Dalal. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted for calm skincare experiences</span>
            <Heart className="w-3 h-3 text-[#D4A59A] fill-[#D4A59A]" />
          </div>
        </div>

      </div>
    </footer>
  );
};
