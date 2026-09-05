import React from 'react';
import { MapPin, Phone, Instagram, Navigation, ExternalLink, Clock, ShieldCheck } from 'lucide-react';
import { BookingForm } from './BookingForm';

interface MapAndContactProps {
  preselectedTreatment?: string;
  preselectedGoal?: string;
  preselectedBudget?: string;
}

export const MapAndContact: React.FC<MapAndContactProps> = ({
  preselectedTreatment,
  preselectedGoal,
  preselectedBudget,
}) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('T15, Hurlingham Studios, Ranelagh Gardens, London SW6 3PA, UK')}`;

  return (
    <section id="contact-section" className="py-16 bg-[#F9F7F5] border-t border-[#2C2C2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Map & Studio Details */}
          <div className="lg:col-span-5 space-y-8">
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#2C2C2C]/10 text-xs font-semibold text-[#2C2C2C] uppercase tracking-wider mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#D4A59A]" />
                <span>Location & Access</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#2C2C2C]">
                Visit Loula's Studio
              </h2>
              <p className="font-sans text-sm text-[#8C8C8C] mt-1">
                A quiet, peaceful consultation studio located in Hurlingham Studios.
              </p>
            </div>

            {/* Address Card */}
            <div className="bg-[#FFFFFF] border border-[#2C2C2C]/10 rounded-2xl p-6 shadow-sm space-y-4">
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4A59A] shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif font-bold text-[#2C2C2C] text-lg">Studio Address</h3>
                  <p className="font-sans text-sm text-[#2C2C2C] mt-1 leading-relaxed">
                    T15, Hurlingham Studios<br />
                    Ranelagh Gardens, London SW6 3PA, UK
                  </p>
                  
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4A59A] hover:text-[#C08E82] mt-2 group"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open Directions in Google Maps</span>
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2C2C2C]/10 space-y-3">
                
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D4A59A] shrink-0" />
                  <a
                    href="tel:+447446960730"
                    className="font-sans text-sm font-semibold text-[#2C2C2C] hover:text-[#D4A59A] transition-colors"
                  >
                    +44 7446 960730
                  </a>
                </div>

                {/* Instagram */}
                <div className="flex items-center gap-3">
                  <Instagram className="w-4 h-4 text-[#D4A59A] shrink-0" />
                  <a
                    href="https://www.instagram.com/dgtheaesthetician"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm font-semibold text-[#2C2C2C] hover:text-[#D4A59A] transition-colors"
                  >
                    @dgtheaesthetician
                  </a>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3 pt-2">
                  <Clock className="w-4 h-4 text-[#D4A59A] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#2C2C2C]">
                    <span className="font-bold block">Opening Hours</span>
                    <span>Monday – Saturday: 10:00 – 19:00</span>
                    <span className="block text-[#8C8C8C]">By advance appointment only</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Interactive Map Frame / Visual Preview */}
            <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-[#2C2C2C]/10 shadow-sm bg-[#FFFFFF]">
              <iframe
                title="Loula's Studio Location Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?q=Ranelagh%20Gardens,%20London%20SW6%203PA,%20UK&t=&z=15&ie=UTF8&iwloc=&output=embed"
              />
            </div>

            {/* Studio Environment Guarantee */}
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#2C2C2C]/10 flex items-center gap-3 text-xs text-[#8C8C8C]">
              <ShieldCheck className="w-5 h-5 text-[#D4A59A] shrink-0" />
              <span>Quiet consultation room setup. Private one-on-one sessions guaranteed.</span>
            </div>

          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7">
            <BookingForm
              preselectedTreatment={preselectedTreatment}
              preselectedGoal={preselectedGoal}
              preselectedBudget={preselectedBudget}
            />
          </div>

        </div>

      </div>
    </section>
  );
};
