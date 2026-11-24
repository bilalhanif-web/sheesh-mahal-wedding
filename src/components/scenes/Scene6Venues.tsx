import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { MughalArchFrame, MughalJaliPattern, GoldCornerFiligree } from '../decorations/MughalPatterns';
import { WEDDING_CONFIG } from '../../config/invite';
import type { VenueLocation } from '../../config/invite';

export const Scene6Venues: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<VenueLocation>(WEDDING_CONFIG.venues[0]);

  return (
    <section className="relative w-full py-24 px-4 overflow-hidden bg-gradient-to-b from-[#120206] via-[#2A0710] to-[#160308] select-none">
      <MughalJaliPattern opacity={0.06} color="#D4AF37" />

      {/* Heading */}
      <div className="text-center max-w-lg mx-auto mb-10 z-10 relative">
        <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-serif block mb-1">
          Locations &amp; Map Guide
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF6ED] font-light">
          Wedding Venues
        </h2>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
      </div>

      <div className="max-w-xl mx-auto z-10 relative">
        {/* SELECTABLE VENUE TABS */}
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#1A0308]/90 border border-[#D4AF37]/40 backdrop-blur-md mb-8">
          {WEDDING_CONFIG.venues.map((venue) => {
            const isSelected = selectedVenue.id === venue.id;
            return (
              <button
                key={venue.id}
                onClick={() => setSelectedVenue(venue)}
                className={`relative py-3 px-2 rounded-xl text-center transition-all duration-300 flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-[#5A0F1E] text-[#FBE285] border border-[#D4AF37] shadow-[0_4px_15px_rgba(212,175,55,0.3)]'
                    : 'text-[#FAF6ED]/70 hover:text-[#FAF6ED] hover:bg-[#2A0710]/60'
                }`}
              >
                <span className="font-serif text-xs sm:text-sm font-medium leading-tight">
                  {venue.name}
                </span>
                <span className="text-[10px] font-sans text-[#FAF6ED]/60 mt-0.5 hidden sm:block">
                  {venue.id === 'tehzeeb-marquee' ? 'Toba Tek Singh' : 'Nawabpur'}
                </span>
              </button>
            );
          })}
        </div>

        {/* VENUE CARD IN MUGHAL ARCH FRAME */}
        <MughalArchFrame className="w-full">
          <div className="rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#330813] to-[#150207] p-4 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            <GoldCornerFiligree position="top-left" size={36} />
            <GoldCornerFiligree position="top-right" size={36} />

            {/* Venue Info Banner */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedVenue.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="mb-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl sm:text-2xl text-gold-bright font-medium">
                    {selectedVenue.name}
                  </h3>
                  <span className="urdu-text text-lg text-[#FBE285]">
                    {selectedVenue.urduName}
                  </span>
                </div>
                <p className="text-xs font-sans tracking-wider uppercase text-[#D4AF37] mt-0.5">
                  {selectedVenue.role}
                </p>
                <div className="flex items-center space-x-1.5 text-xs text-[#FAF6ED]/80 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FBE285] shrink-0" />
                  <span>{selectedVenue.address}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Google Maps View inside Arch */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#D4AF37]/50 shadow-inner bg-[#1A0308]">
              <iframe
                title={`Google Map - ${selectedVenue.name}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  selectedVenue.address
                )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 pointer-events-none border border-[#D4AF37]/30 rounded-xl" />
            </div>

            {/* Actions: Get Directions & Open Map */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={selectedVenue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FBE285] to-[#D4AF37] text-[#2A0710] font-serif font-semibold text-sm tracking-wider uppercase shadow-[0_4px_15px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_20px_rgba(251,226,133,0.5)] transition-all"
              >
                <Navigation className="w-4 h-4 text-[#2A0710]" />
                <span>Get Directions</span>
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  selectedVenue.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#2A0710]/80 hover:bg-[#5A0F1E] border border-[#D4AF37]/60 text-xs font-serif text-[#FAF6ED] hover:text-[#FBE285] tracking-widest uppercase transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>View Full Map</span>
              </a>
            </div>
          </div>
        </MughalArchFrame>
      </div>
    </section>
  );
};
