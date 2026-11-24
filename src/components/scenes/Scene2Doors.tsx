import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MughalArchFrame, MughalJaliPattern, SheeshMahalMirrorPattern, GoldCornerFiligree, RoyalDivider } from '../decorations/MughalPatterns';
import { WEDDING_CONFIG } from '../../config/invite';
import { ChevronDown } from 'lucide-react';

interface Scene2DoorsProps {
  onContinue?: () => void;
  autoOpen?: boolean;
}

export const Scene2Doors: React.FC<Scene2DoorsProps> = ({ onContinue, autoOpen = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      const openTimer = setTimeout(() => {
        setIsOpen(true);
      }, 500);

      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 1400);

      return () => {
        clearTimeout(openTimer);
        clearTimeout(contentTimer);
      };
    }
  }, [autoOpen]);

  const toggleDoors = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => setShowContent(true), 900);
    }
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1A0308] via-[#2A0710] to-[#120206] py-16 px-4 select-none perspective-[1200px]">
      <SheeshMahalMirrorPattern opacity={0.12} />
      <MughalJaliPattern opacity={0.07} color="#D4AF37" />

      {/* Volumetric Light Rays when Doors are Open */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={isOpen ? { opacity: 0.85 } : { opacity: 0 }}
        transition={{ duration: 2.0 }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-full bg-[radial-gradient(ellipse_at_top,rgba(251,226,133,0.25)_0%,rgba(212,175,55,0.08)_50%,transparent_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(90,15,30,0.4)_0%,transparent_75%)]" />
      </motion.div>

      {/* Main Arch Stage */}
      <div className="relative w-full max-w-lg z-10 flex flex-col items-center">
        <MughalArchFrame className="w-full">
          <div className="relative w-full rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#330813] via-[#24050D] to-[#150207] p-6 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.3)] overflow-hidden">
            <GoldCornerFiligree position="top-left" size={48} />
            <GoldCornerFiligree position="top-right" size={48} />
            <GoldCornerFiligree position="bottom-left" size={48} />
            <GoldCornerFiligree position="bottom-right" size={48} />

            <div className="absolute inset-3 border border-[#D4AF37]/40 rounded-xl pointer-events-none" />
            <div className="absolute inset-4 border border-dashed border-[#FBE285]/20 rounded-lg pointer-events-none" />

            {/* THE TWO 3D CARVED JALI DOORS OVERLAY */}
            <div
              className={`absolute inset-0 z-30 pointer-events-none flex ${
                isOpen ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
              }`}
              onClick={!isOpen ? toggleDoors : undefined}
            >
              {/* Left Door */}
              <motion.div
                className="w-1/2 h-full bg-gradient-to-r from-[#4A0C18] to-[#360811] border-r border-[#D4AF37] shadow-[5px_0_20px_rgba(0,0,0,0.8)] origin-left relative flex items-center justify-end pr-2 overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ rotateY: 0 }}
                animate={isOpen ? { rotateY: -105 } : { rotateY: 0 }}
                transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
              >
                <MughalJaliPattern opacity={0.35} color="#D4AF37" />
                <div className="absolute inset-2 border border-[#D4AF37]/50 pointer-events-none" />
                <div className="w-9 h-9 rounded-full border-2 border-[#FBE285] bg-[#2A0710] flex items-center justify-center shadow-lg mr-1 z-10">
                  <div className="w-5 h-5 rounded-full border border-[#D4AF37]" />
                </div>
              </motion.div>

              {/* Right Door */}
              <motion.div
                className="w-1/2 h-full bg-gradient-to-l from-[#4A0C18] to-[#360811] border-l border-[#D4AF37] shadow-[-5px_0_20px_rgba(0,0,0,0.8)] origin-right relative flex items-center justify-start pl-2 overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ rotateY: 0 }}
                animate={isOpen ? { rotateY: 105 } : { rotateY: 0 }}
                transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
              >
                <MughalJaliPattern opacity={0.35} color="#D4AF37" />
                <div className="absolute inset-2 border border-[#D4AF37]/50 pointer-events-none" />
                <div className="w-9 h-9 rounded-full border-2 border-[#FBE285] bg-[#2A0710] flex items-center justify-center shadow-lg ml-1 z-10">
                  <div className="w-5 h-5 rounded-full border border-[#D4AF37]" />
                </div>
              </motion.div>
            </div>

            {/* PALACE INTERIOR CONTENT */}
            <div className="relative z-10 flex flex-col items-center text-center py-4">
              {/* Bismillah Calligraphy */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 1.0, delay: 0.1 }}
                className="mb-4"
              >
                <p className="urdu-text text-xl sm:text-2xl text-[#FBE285] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {WEDDING_CONFIG.bismillah}
                </p>
              </motion.div>

              {/* Quranic Verse */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={showContent ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                transition={{ duration: 1.0, delay: 0.3 }}
                className="my-3 px-5 py-3 rounded-lg bg-[#2A0710]/70 border border-[#D4AF37]/40 shadow-inner max-w-sm"
              >
                <p className="urdu-text text-2xl sm:text-3xl text-[#FAF6ED] font-bold mb-1 leading-relaxed">
                  {WEDDING_CONFIG.quranicVerse.arabic}
                </p>
                <p className="text-sm font-serif italic text-[#FBE285] tracking-wider">
                  {WEDDING_CONFIG.quranicVerse.translation}
                </p>
                <span className="text-[11px] font-sans tracking-widest uppercase text-[#FAF6ED]/70 mt-1 block">
                  {WEDDING_CONFIG.quranicVerse.reference}
                </span>
              </motion.div>

              <RoyalDivider className="my-3" />

              {/* Hosts Announcement */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 1.0, delay: 0.6 }}
                className="space-y-1.5 my-2"
              >
                <h4 className="font-serif text-lg sm:text-xl text-[#FAF6ED] font-medium tracking-wide">
                  {WEDDING_CONFIG.couple.hosts}
                </h4>
                <p className="text-xs sm:text-sm font-sans uppercase tracking-[0.2em] text-[#D4AF37] max-w-xs mx-auto">
                  Request the honour of your presence at the wedding celebration of
                </p>
              </motion.div>

              {/* Couple Names */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={showContent ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="my-6 relative py-2"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.25)_0%,transparent_70%)] pointer-events-none" />

                <h1 className="font-calligraphy text-4xl sm:text-5xl md:text-6xl text-gold-bright tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  {WEDDING_CONFIG.couple.groom.fullName}
                </h1>

                <div className="flex items-center justify-center my-1.5">
                  <span className="text-2xl sm:text-3xl font-serif italic text-[#FAF6ED]/80 px-4">
                    &amp;
                  </span>
                </div>

                <h1 className="font-calligraphy text-4xl sm:text-5xl md:text-6xl text-gold-bright tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  {WEDDING_CONFIG.couple.bride.fullName}
                </h1>
              </motion.div>

              {/* Enter Palace Button */}
              {onContinue && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={showContent ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                  className="mt-4"
                >
                  <button
                    onClick={onContinue}
                    className="group inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FBE285] to-[#D4AF37] text-[#2A0710] font-serif font-semibold text-sm tracking-widest uppercase shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_25px_rgba(251,226,133,0.5)] hover:scale-105 transition-all"
                  >
                    <span>Enter Palace</span>
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </MughalArchFrame>
      </div>
    </section>
  );
};
