import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Download,
  Clock,
  Sparkles,
  Flower2,
  Crown,
} from 'lucide-react';
import { WEDDING_CONFIG } from '../../config/invite';
import type { EventDetail } from '../../config/invite';
import { downloadIcsFile } from '../../lib/calendar';
import {
  MughalArchFrame,
  GoldCornerFiligree,
  MughalJaliPattern,
  PaisleyMotif,
} from '../decorations/MughalPatterns';

export const Scene5Journey: React.FC = () => {
  return (
    <section className="relative w-full py-16 px-4 bg-gradient-to-b from-[#140206] via-[#24050D] to-[#120206] select-none">
      <MughalJaliPattern opacity={0.05} color="#D4AF37" />

      {/* Heading */}
      <div className="text-center max-w-md mx-auto mb-10 z-10 relative">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-serif block mb-0.5">
          Sacred Ceremonies
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF6ED] font-light">
          The Wedding Journey
        </h2>
        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-3" />
      </div>

      {/* Timeline Wrapper with Static Golden Thread */}
      <div className="relative max-w-md mx-auto">
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 z-0 bg-[#D4AF37]/30" />

        {/* 3 Confirmed Event Cards */}
        <div className="space-y-10 relative z-10 pl-9 sm:pl-0">
          {WEDDING_CONFIG.events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const EventCard: React.FC<{ event: EventDetail; index: number }> = ({ event, index }) => {
  const isEven = index % 2 === 0;

  const renderIcon = () => {
    switch (event.theme.icon) {
      case 'flower':
        return <Flower2 className="w-4 h-4 text-[#FBE285]" />;
      case 'crown':
        return <Crown className="w-4 h-4 text-[#FBE285]" />;
      case 'sparkle':
      default:
        return <Sparkles className="w-4 h-4 text-[#FBE285]" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative w-full"
    >
      {/* Node Marker on Golden Thread */}
      <div className="absolute -left-9 sm:left-1/2 -translate-x-1/2 top-6 z-20">
        <div className="w-7 h-7 rounded-full bg-[#2A0710] border border-[#D4AF37] flex items-center justify-center shadow">
          {renderIcon()}
        </div>
      </div>

      {/* Event Card Container */}
      <div className={`sm:w-[94%] sm:mx-auto ${isEven ? 'sm:pr-2' : 'sm:pl-2'}`}>
        <MughalArchFrame className="w-full">
          <div
            className={`relative rounded-2xl p-5 sm:p-6 border border-[#D4AF37] shadow-lg overflow-hidden bg-gradient-to-br ${event.theme.bgGradient}`}
          >
            {/* Corner Filigrees */}
            <GoldCornerFiligree position="top-left" size={30} />
            <GoldCornerFiligree position="top-right" size={30} />
            <GoldCornerFiligree position="bottom-left" size={30} />
            <GoldCornerFiligree position="bottom-right" size={30} />

            {/* Static paisley watermark for mehndi */}
            {event.id === 'mehndi' && (
              <div className="absolute -right-3 -bottom-3 opacity-15 pointer-events-none">
                <PaisleyMotif size={70} />
              </div>
            )}

            {/* Badge & Urdu Title */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-sans tracking-widest uppercase text-[#FBE285] bg-[#2A0710]/80 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40">
                {event.theme.badgeText}
              </span>
              <span className="urdu-text text-base sm:text-lg text-[#FBE285]">
                {event.urduTitle}
              </span>
            </div>

            {/* English Title */}
            <h3 className="text-xl sm:text-2xl font-serif text-[#FAF6ED] font-medium tracking-wide mb-2">
              {event.title}
            </h3>

            {/* Date String */}
            <div className="flex items-center space-x-1.5 text-[#FBE285] mb-3">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-serif text-base font-normal">
                {event.dateString}
              </span>
            </div>

            {/* Times */}
            <div className="bg-[#1A0308]/60 rounded-lg p-2.5 border border-[#D4AF37]/30 mb-3 space-y-1.5">
              {event.times.map((t, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-[#FAF6ED]/70 font-sans tracking-wider uppercase text-[10px]">
                    {t.label}
                  </span>
                  <div className="flex items-center space-x-1 text-[#FAF6ED] font-serif font-medium">
                    <Clock className="w-3 h-3 text-[#FBE285]" />
                    <span>{t.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Venue & Address */}
            <div className="flex items-start space-x-2 text-xs text-[#FAF6ED]/90 mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#FBE285] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-semibold text-sm text-[#FAF6ED]">
                  {event.venue}
                </p>
                <p className="font-sans text-[11px] text-[#FAF6ED]/70 tracking-wider">
                  {event.address}
                </p>
              </div>
            </div>

            {/* Action Buttons with >= 44px Touch Target Height */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#D4AF37]/30">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  event.mapQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-lg bg-[#2A0710]/90 border border-[#D4AF37]/50 text-xs font-serif text-[#FAF6ED] hover:text-[#FBE285] transition-colors min-h-[44px]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Open in Maps</span>
              </a>

              <a
                href={event.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-lg bg-[#2A0710]/90 border border-[#D4AF37]/50 text-xs font-serif text-[#FAF6ED] hover:text-[#FBE285] transition-colors min-h-[44px]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Add to Calendar</span>
              </a>

              <button
                onClick={() => downloadIcsFile(event)}
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-lg bg-[#2A0710]/90 border border-[#D4AF37]/50 text-xs font-serif text-[#FAF6ED] hover:text-[#FBE285] transition-colors min-h-[44px]"
              >
                <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Download .ics</span>
              </button>
            </div>
          </div>
        </MughalArchFrame>
      </div>
    </motion.div>
  );
};
