import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BadgeStrip } from './components/BadgeStrip';
import { TreatmentFinder } from './components/TreatmentFinder';
import { ServiceCard } from './components/ServiceCard';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { AboutDalal } from './components/AboutDalal';
import { InstagramFeed } from './components/InstagramFeed';
import { MapAndContact } from './components/MapAndContact';
import { StickyMobileBar } from './components/StickyMobileBar';
import { Footer } from './components/Footer';

import { TREATMENTS } from './data/treatments';
import { Treatment, TreatmentFinderState } from './types';
import { Sparkles, Calendar } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'contact'>('home');
  const [modalTreatment, setModalTreatment] = useState<Treatment | null>(null);

  // Treatment Finder Interactive Filter State
  const [finderState, setFinderState] = useState<TreatmentFinderState>({
    goal: null,
    downtime: null,
    budget: null,
  });

  // Preselected booking choices
  const [selectedBookingTreatment, setSelectedBookingTreatment] = useState<string>('');

  // Calculate filtered treatments and top match
  const filteredTreatments = useMemo(() => {
    return TREATMENTS.filter((item) => {
      if (finderState.goal && item.goalCategory !== finderState.goal) {
        return false;
      }
      if (finderState.downtime && item.downtimeCategory !== finderState.downtime) {
        return false;
      }
      if (finderState.budget && item.budgetCategory !== finderState.budget) {
        return false;
      }
      return true;
    });
  }, [finderState]);

  // Determine single best match when filters are active
  const bestMatch = useMemo(() => {
    if (!finderState.goal && !finderState.downtime && !finderState.budget) {
      return null;
    }
    return filteredTreatments.length > 0 ? filteredTreatments[0] : null;
  }, [finderState, filteredTreatments]);

  // Navigation Handler
  const handleNavigate = (tab: 'home' | 'services' | 'contact') => {
    setActiveTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'services') {
      const el = document.getElementById('services-grid-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'contact') {
      const el = document.getElementById('contact-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to booking form with pre-filled treatment name
  const handleBookClick = (treatmentName?: string) => {
    if (treatmentName) {
      setSelectedBookingTreatment(treatmentName);
    }
    const bookingEl = document.getElementById('booking-section');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      const contactEl = document.getElementById('contact-section');
      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F5] text-[#2C2C2C] flex flex-col font-sans pb-16 md:pb-0">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onBookClick={() => handleBookClick()}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* 1. Hero Section (renders at final position, full opacity, zero animation gate for max LCP speed) */}
        <Hero onBookClick={() => handleBookClick()} />

        {/* 2. Badge Strip (Trust highlights directly under hero) */}
        <BadgeStrip />

        {/* 3. Interactive Piece: Treatment Finder */}
        <TreatmentFinder
          filterState={finderState}
          onFilterChange={setFinderState}
          bestMatch={bestMatch}
          onBookMatchedTreatment={(name) => handleBookClick(name)}
        />

        {/* 4. Services Grid */}
        <section id="services-grid-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#2C2C2C]/10 text-xs font-semibold text-[#2C2C2C] uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5 text-[#D4A59A]" />
              <span>Transparent Menu & Pricing</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2C2C]">
              Services & Treatments
            </h2>
            <p className="font-sans text-base text-[#8C8C8C] mt-2">
              Clear prices, zero DM wait times, and expert care by Dalal. Tap any treatment for details or hover to preview the outcome.
            </p>
          </div>

          {filteredTreatments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#2C2C2C]/10 max-w-md mx-auto p-6">
              <Sparkles className="w-8 h-8 text-[#D4A59A] mx-auto mb-3" />
              <h3 className="font-serif font-bold text-lg text-[#2C2C2C]">No exact match found</h3>
              <p className="text-sm text-[#8C8C8C] mt-1 mb-4">
                Try widening your search filters in the Treatment Finder above or view all treatments below.
              </p>
              <button
                onClick={() => setFinderState({ goal: null, downtime: null, budget: null })}
                className="bg-[#D4A59A] text-white text-xs font-medium px-4 py-2 rounded-md"
              >
                View All 6 Treatments
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTreatments.map((treatment) => (
                <ServiceCard
                  key={treatment.id}
                  treatment={treatment}
                  isBestMatch={bestMatch?.id === treatment.id}
                  onOpenModal={(item) => setModalTreatment(item)}
                  onBookClick={(name) => handleBookClick(name)}
                />
              ))}
            </div>
          )}

        </section>

        {/* 5. About Dalal */}
        <AboutDalal />

        {/* 6. Instagram Feed */}
        <InstagramFeed />

        {/* 7. Map & Contact Section (Includes Google Maps + Booking Form) */}
        <MapAndContact
          preselectedTreatment={selectedBookingTreatment}
          preselectedGoal={finderState.goal || undefined}
          preselectedBudget={finderState.budget || undefined}
        />

      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Bar (Appears on scroll past hero) */}
      <StickyMobileBar onBookClick={() => handleBookClick()} />

      {/* Showcase Card Expanded Modal */}
      <ServiceDetailModal
        treatment={modalTreatment}
        onClose={() => setModalTreatment(null)}
        onBookClick={(name) => handleBookClick(name)}
      />

    </div>
  );
}
