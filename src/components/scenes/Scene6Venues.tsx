import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { MughalArchFrame, MughalJaliPattern, GoldCornerFiligree } from '../decorations/MughalPatterns';
import { WEDDING_CONFIG } from '../../config/invite';
import type { VenueLocation } from '../../config/invite';

export const Scene6Venues: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<VenueLocation>(WEDDING_CONFIG.venues[0]);
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section className="relative w-full py-16 px-4 bg-gradient-to-b from-[#120206] via-[#2A0710] to-[#160308] select-none">
      <MughalJaliPattern opacity={0.05} color="#D4AF37" />

      {/* Heading */}
      <div className="text-center max-w-md mx-auto mb-8 z-10 relative">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-serif block mb-0.5">
          Locations &amp; Map Guide
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF6ED] font-light">
          Wedding Venues
        </h2>
        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-3" />
      </div>

      <div className="max-w-md mx-auto z-10 relative">
        {/* SELECTABLE VENUE TABS */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#1A0308]/90 border border-[#D4AF37]/40 mb-6">
          {WEDDING_CONFIG.venues.map((venue) => {
            const isSelected = selectedVenue.id === venue.id;
            return (
              <button
                key={venue.id}
                onClick={() => {
                  setSelectedVenue(venue);
                  setMapLoaded(true);
                }}
                className={`py-2 px-1.5 rounded-xl text-center transition-colors flex flex-col items-center justify-center min-h-[44px] ${
                  isSelected
                    ? 'bg-[#5A0F1E] text-[#FBE285] border border-[#D4AF37]'
                    : 'text-[#FAF6ED]/70 hover:text-[#FAF6ED]'
                }`}
              >
                <span className="font-serif text-xs sm:text-sm font-medium leading-tight">
                  {venue.name}
                </span>
                <span className="text-[9px] font-sans text-[#FAF6ED]/50 mt-0.5 hidden sm:block">
                  {venue.id === 'tehzeeb-marquee' ? 'Toba Tek Singh' : 'Nawabpur'}
                </span>
              </button>
            );
          })}
        </div>

        {/* VENUE CARD IN MUGHAL ARCH FRAME */}
        <MughalArchFrame className="w-full">
          <div className="rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#330813] to-[#150207] p-4 sm:p-5 shadow-lg overflow-hidden">
            <GoldCornerFiligree position="top-left" size={30} />
            <GoldCornerFiligree position="top-right" size={30} />

            {/* Venue Info Banner */}
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg sm:text-xl text-gold-bright font-medium">
                  {selectedVenue.name}
                </h3>
                <span className="urdu-text text-base text-[#FBE285]">
                  {selectedVenue.urduName}
                </span>
              </div>
              <p className="text-[10px] font-sans tracking-wider uppercase text-[#D4AF37] mt-0.5">
                {selectedVenue.role}
              </p>
              <div className="flex items-center space-x-1.5 text-xs text-[#FAF6ED]/80 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#FBE285] shrink-0" />
                <span>{selectedVenue.address}</span>
              </div>
            </div>

            {/* Google Maps View - Lazy Loaded */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#D4AF37]/50 bg-[#1A0308] flex items-center justify-center">
              {!mapLoaded ? (
                <div className="text-center p-4">
                  <MapPin className="w-8 h-8 text-[#D4AF37] mx-auto mb-2 opacity-80" />
                  <p className="font-serif text-xs text-[#FAF6ED]/80 mb-3">
                    {selectedVenue.address}
                  </p>
                  <button
                    onClick={() => setMapLoaded(true)}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full border border-[#D4AF37] bg-[#5A0F1E] text-xs font-serif text-[#FBE285] min-h-[44px]"
                  >
                    <span>Load Interactive Map</span>
                  </button>
                </div>
              ) : (
                <iframe
                  title={`Google Map - ${selectedVenue.name}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    selectedVenue.address
                  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>

            {/* Actions: Get Directions & Open Map */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={selectedVenue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FBE285] to-[#D4AF37] text-[#2A0710] font-serif font-bold text-xs tracking-wider uppercase shadow transition-transform active:scale-98 min-h-[44px]"
              >
                <Navigation className="w-3.5 h-3.5 text-[#2A0710]" />
                <span>Get Directions</span>
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  selectedVenue.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-[#2A0710]/90 border border-[#D4AF37]/60 text-xs font-serif text-[#FAF6ED] hover:text-[#FBE285] tracking-wider uppercase transition-colors min-h-[44px]"
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
