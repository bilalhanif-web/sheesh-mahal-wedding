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
    <section className="relative w-full py-24 px-4 overflow-hidden bg-gradient-to-b from-[#140206] via-[#24050D] to-[#120206] select-none">
      <MughalJaliPattern opacity={0.06} color="#D4AF37" />

      {/* Heading */}
      <div className="text-center max-w-lg mx-auto mb-16 z-10 relative">
        <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-serif block mb-1">
          Sacred Ceremonies
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF6ED] font-light">
          The Wedding Journey
        </h2>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
      </div>

      {/* Timeline Wrapper with Central Golden Thread */}
      <div className="relative max-w-xl mx-auto">
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 z-0">
          <div className="w-full h-full bg-gradient-to-b from-[#D4AF37]/20 via-[#FBE285] to-[#D4AF37]/20 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
        </div>

        {/* 3 DISTINCT EVENT CARDS */}
        <div className="space-y-16 relative z-10 pl-12 sm:pl-0">
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
        return <Flower2 className="w-5 h-5 text-[#FBE285]" />;
      case 'crown':
        return <Crown className="w-5 h-5 text-[#FBE285]" />;
      case 'sparkle':
      default:
        return <Sparkles className="w-5 h-5 text-[#FBE285]" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
      className="relative w-full"
    >
      {/* Node Marker on Golden Thread */}
      <div className="absolute -left-12 sm:left-1/2 -translate-x-1/2 top-8 z-20">
        <div className="w-9 h-9 rounded-full bg-[#2A0710] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)]">
          {renderIcon()}
        </div>
      </div>

      {/* Event Card Container */}
      <div className={`sm:w-[92%] sm:mx-auto ${isEven ? 'sm:pr-4' : 'sm:pl-4'}`}>
        <MughalArchFrame className="w-full">
          <div
            className={`relative rounded-2xl p-6 sm:p-8 border border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden bg-gradient-to-br ${event.theme.bgGradient}`}
          >
            {/* Shimmer Light Sweep Effect */}
            <div className="absolute inset-0 shimmer-foil opacity-25 pointer-events-none" />

            {/* Corner Filigrees */}
            <GoldCornerFiligree position="top-left" size={36} />
            <GoldCornerFiligree position="top-right" size={36} />
            <GoldCornerFiligree position="bottom-left" size={36} />
            <GoldCornerFiligree position="bottom-right" size={36} />

            {/* Event Specific Ornamentation */}
            {event.id === 'mehndi' && (
              <div className="absolute -right-4 -bottom-4 opacity-25 pointer-events-none">
                <PaisleyMotif size={90} />
              </div>
            )}
            {event.id === 'barat' && (
              <div className="absolute right-4 top-4 opacity-20 pointer-events-none">
                <svg width="60" height="70" viewBox="0 0 60 70" fill="none">
                  <path d="M30 0 L30 15 M15 25 L45 25 M20 25 C20 45, 40 45, 40 25 M30 25 L30 55" stroke="#FBE285" strokeWidth="1.5" />
                  <circle cx="30" cy="60" r="3" fill="#FBE285" />
                  <circle cx="15" cy="30" r="2" fill="#D4AF37" />
                  <circle cx="45" cy="30" r="2" fill="#D4AF37" />
                </svg>
              </div>
            )}
            {event.id === 'walima' && (
              <div className="absolute right-4 top-4 opacity-25 pointer-events-none">
                <MughalJaliPattern opacity={0.3} color="#F3E3C3" />
              </div>
            )}

            {/* Badge & Urdu Title */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-sans tracking-widest uppercase text-[#FBE285] bg-[#2A0710]/70 px-3 py-1 rounded-full border border-[#D4AF37]/40 shadow-sm">
                {event.theme.badgeText}
              </span>
              <span className="urdu-text text-xl text-[#FBE285]">
                {event.urduTitle}
              </span>
            </div>

            {/* English Title */}
            <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF6ED] font-medium tracking-wide mb-3">
              {event.title}
            </h3>

            {/* Date String */}
            <div className="flex items-center space-x-2 text-[#FBE285] mb-4">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-serif text-lg font-normal tracking-wide">
                {event.dateString}
              </span>
            </div>

            {/* Time Breakdown */}
            <div className="bg-[#1A0308]/60 rounded-xl p-3.5 border border-[#D4AF37]/30 mb-4 space-y-2">
              {event.times.map((t, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-[#FAF6ED]/70 font-sans tracking-wider uppercase text-xs">
                    {t.label}
                  </span>
                  <div className="flex items-center space-x-1.5 text-[#FAF6ED] font-serif font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#FBE285]" />
                    <span>{t.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Venue & Address */}
            <div className="flex items-start space-x-2.5 text-sm text-[#FAF6ED]/90 mb-6">
              <MapPin className="w-4 h-4 text-[#FBE285] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-semibold text-base text-[#FAF6ED]">
                  {event.venue}
                </p>
                <p className="font-sans text-xs text-[#FAF6ED]/70 tracking-wider">
                  {event.address}
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS: Maps, Add to Calendar, Download .ics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-[#D4AF37]/30">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  event.mapQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-[#2A0710]/80 hover:bg-[#5A0F1E] border border-[#D4AF37]/50 hover:border-[#FBE285] text-xs font-serif text-[#FAF6ED] hover:text-[#FBE285] transition-all shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Open in Maps</span>
              </a>

              <a
                href={event.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-[#2A0710]/80 hover:bg-[#5A0F1E] border border-[#D4AF37]/50 hover:border-[#FBE285] text-xs font-serif text-[#FAF6ED] hover:text-[#FBE285] transition-all shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Add to Calendar</span>
              </a>

              <button
                onClick={() => downloadIcsFile(event)}
                className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-[#2A0710]/80 hover:bg-[#5A0F1E] border border-[#D4AF37]/50 hover:border-[#FBE285] text-xs font-serif text-[#FAF6ED] hover:text-[#FBE285] transition-all shadow-sm"
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
