import React from 'react';
import { motion } from 'framer-motion';
import { MughalArchFrame, MughalJaliPattern, GoldCornerFiligree, RoyalDivider } from '../decorations/MughalPatterns';
import { WEDDING_CONFIG } from '../../config/invite';
import { ChevronDown } from 'lucide-react';

interface Scene2DoorsProps {
  onContinue?: () => void;
  autoOpen?: boolean;
}

export const Scene2Doors: React.FC<Scene2DoorsProps> = ({ onContinue }) => {
  return (
    <section className="relative min-h-[90svh] w-full flex items-center justify-center bg-gradient-to-b from-[#1A0308] via-[#2A0710] to-[#140206] py-10 px-4 select-none">
      <MughalJaliPattern opacity={0.05} color="#D4AF37" />

      {/* Main Arch Stage */}
      <div className="relative w-full max-w-md z-10 flex flex-col items-center">
        <MughalArchFrame className="w-full">
          {/* Lightweight fade-in card with verified wedding content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#330813] via-[#24050D] to-[#150207] p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.85)] text-center overflow-hidden"
          >
            <GoldCornerFiligree position="top-left" size={36} />
            <GoldCornerFiligree position="top-right" size={36} />
            <GoldCornerFiligree position="bottom-left" size={36} />
            <GoldCornerFiligree position="bottom-right" size={36} />

            <div className="absolute inset-2.5 border border-[#D4AF37]/40 rounded-xl pointer-events-none" />

            {/* Bismillah */}
            <div className="mb-3">
              <p className="urdu-text text-xl sm:text-2xl text-[#FBE285] leading-relaxed">
                {WEDDING_CONFIG.bismillah}
              </p>
            </div>

            {/* Quranic Verse */}
            <div className="my-2.5 px-4 py-2.5 rounded-lg bg-[#1A0308]/70 border border-[#D4AF37]/30 max-w-xs mx-auto">
              <p className="urdu-text text-xl sm:text-2xl text-[#FAF6ED] font-bold mb-0.5">
                {WEDDING_CONFIG.quranicVerse.arabic}
              </p>
              <p className="text-xs font-serif italic text-[#FBE285]">
                {WEDDING_CONFIG.quranicVerse.translation}
              </p>
              <span className="text-[10px] font-sans tracking-widest uppercase text-[#FAF6ED]/60 mt-0.5 block">
                {WEDDING_CONFIG.quranicVerse.reference}
              </span>
            </div>

            <RoyalDivider className="my-3" />

            {/* Hosts Announcement */}
            <div className="space-y-1 my-2">
              <h4 className="font-serif text-base sm:text-lg text-[#FAF6ED] font-medium tracking-wide">
                {WEDDING_CONFIG.couple.hosts}
              </h4>
              <p className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#D4AF37] max-w-xs mx-auto leading-relaxed">
                Request the honour of your presence at the wedding celebration of
              </p>
            </div>

            {/* Couple Names */}
            <div className="my-4 py-1">
              <h1 className="font-calligraphy text-3xl sm:text-4xl text-gold-bright tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {WEDDING_CONFIG.couple.groom.fullName}
              </h1>

              <div className="flex items-center justify-center my-0.5">
                <span className="text-xl font-serif italic text-[#FAF6ED]/70 px-3">
                  &amp;
                </span>
              </div>

              <h1 className="font-calligraphy text-3xl sm:text-4xl text-gold-bright tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {WEDDING_CONFIG.couple.bride.fullName}
              </h1>
            </div>

            {/* Enter Palace Button */}
            {onContinue && (
              <div className="mt-4 pt-2">
                <button
                  onClick={onContinue}
                  className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FBE285] to-[#D4AF37] text-[#2A0710] font-serif font-bold text-xs tracking-widest uppercase shadow-md hover:scale-105 active:scale-95 transition-transform min-h-[44px]"
                >
                  <span>Enter Palace</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        </MughalArchFrame>
      </div>
    </section>
  );
};
