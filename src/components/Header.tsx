import React, { useState } from 'react';
import { Phone, Instagram, Calendar, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'services' | 'contact';
  onNavigate: (tab: 'home' | 'services' | 'contact') => void;
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onNavigate, onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'services' | 'contact') => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9F7F5]/95 backdrop-blur-md border-b border-[#2C2C2C]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group focus-visible:ring-2 focus-visible:ring-[#D4A59A] rounded-md p-1 -m-1"
          >
            <span className="font-serif text-2xl font-bold tracking-tight text-[#2C2C2C] block">
              Loula's Studio
            </span>
            <span className="text-xs uppercase tracking-widest text-[#8C8C8C] block font-sans">
              Skin Care • By Dalal
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors py-2 relative focus-visible:ring-2 focus-visible:ring-[#D4A59A] rounded ${
                activeTab === 'home'
                  ? 'text-[#2C2C2C] font-semibold'
                  : 'text-[#8C8C8C] hover:text-[#2C2C2C]'
              }`}
            >
              Home
              {activeTab === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4A59A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`transition-colors py-2 relative focus-visible:ring-2 focus-visible:ring-[#D4A59A] rounded ${
                activeTab === 'services'
                  ? 'text-[#2C2C2C] font-semibold'
                  : 'text-[#8C8C8C] hover:text-[#2C2C2C]'
              }`}
            >
              Services & Pricing
              {activeTab === 'services' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4A59A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`transition-colors py-2 relative focus-visible:ring-2 focus-visible:ring-[#D4A59A] rounded ${
                activeTab === 'contact'
                  ? 'text-[#2C2C2C] font-semibold'
                  : 'text-[#8C8C8C] hover:text-[#2C2C2C]'
              }`}
            >
              Contact & Location
              {activeTab === 'contact' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4A59A] rounded-full" />
              )}
            </button>
          </nav>

          {/* Contact Actions */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+447446960730"
              className="inline-flex items-center gap-2 text-sm text-[#2C2C2C] hover:text-[#C08E82] transition-colors focus-visible:ring-2 focus-visible:ring-[#D4A59A] rounded px-2 py-1"
            >
              <Phone className="w-4 h-4 text-[#D4A59A]" />
              <span>+44 7446 960730</span>
            </a>

            <a
              href="https://www.instagram.com/dgtheaesthetician"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#2C2C2C] hover:text-[#D4A59A] transition-colors focus-visible:ring-2 focus-visible:ring-[#D4A59A] rounded-full"
              aria-label="Instagram Profile @dgtheaesthetician"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <button
              onClick={onBookClick}
              className="inline-flex items-center justify-center gap-2 bg-[#D4A59A] hover:bg-[#C08E82] active:scale-95 text-white font-medium text-sm px-5 py-2.5 rounded-md transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#D4A59A]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Treatment</span>
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="tel:+447446960730"
              className="p-2 text-[#2C2C2C] hover:text-[#D4A59A] transition-colors"
              aria-label="Call Dalal"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2C2C2C] hover:text-[#D4A59A] focus-visible:ring-2 focus-visible:ring-[#D4A59A] rounded-md"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#2C2C2C]/10 px-4 pt-3 pb-6 space-y-3 font-sans">
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left px-3 py-2.5 text-base rounded-md font-medium ${
              activeTab === 'home' ? 'bg-[#F9F7F5] text-[#2C2C2C]' : 'text-[#8C8C8C]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className={`block w-full text-left px-3 py-2.5 text-base rounded-md font-medium ${
              activeTab === 'services' ? 'bg-[#F9F7F5] text-[#2C2C2C]' : 'text-[#8C8C8C]'
            }`}
          >
            Services & Pricing
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`block w-full text-left px-3 py-2.5 text-base rounded-md font-medium ${
              activeTab === 'contact' ? 'bg-[#F9F7F5] text-[#2C2C2C]' : 'text-[#8C8C8C]'
            }`}
          >
            Contact & Location
          </button>

          <div className="pt-3 border-t border-[#2C2C2C]/10 flex flex-col gap-3">
            <a
              href="tel:+447446960730"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#2C2C2C] hover:text-[#D4A59A]"
            >
              <Phone className="w-4 h-4 text-[#D4A59A]" />
              <span>Call Dalal: +44 7446 960730</span>
            </a>

            <a
              href="https://www.instagram.com/dgtheaesthetician"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#2C2C2C] hover:text-[#D4A59A]"
            >
              <Instagram className="w-4 h-4 text-[#D4A59A]" />
              <span>Instagram @dgtheaesthetician</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full bg-[#D4A59A] active:bg-[#C08E82] text-white font-medium py-3 rounded-md text-center shadow-sm"
            >
              Book Your Treatment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
