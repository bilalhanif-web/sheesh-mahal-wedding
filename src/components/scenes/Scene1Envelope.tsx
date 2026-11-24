import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { WaxSeal } from '../decorations/WaxSeal';
import { GoldCornerFiligree, MughalJaliPattern } from '../decorations/MughalPatterns';
import { WEDDING_CONFIG } from '../../config/invite';
import { getGuestFromUrl } from '../../utils/guest';

interface Scene1EnvelopeProps {
  onOpen: () => void;
  onSkip?: () => void;
}

export const Scene1Envelope: React.FC<Scene1EnvelopeProps> = ({ onOpen, onSkip }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isCracked, setIsCracked] = useState(false);
  const [cardElevating, setCardElevating] = useState(false);
  const [zoomingIn, setZoomingIn] = useState(false);
  const guest = getGuestFromUrl();

  const handleOpenEnvelope = () => {
    if (isOpened) return;
    setIsOpened(true);

    // 1. Subtle Haptic Feedback
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([40, 60, 40]);
      } catch {
        // Ignore if unsupported
      }
    }

    // 2. Crack wax seal into two halves
    setIsCracked(true);

    // 3. Release golden dust & rose petal burst
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FBE285', '#5A0F1E', '#FAF6ED'],
        ticks: 200,
        gravity: 0.8,
        shapes: ['circle'],
        scalar: 1.1,
      });
    } catch {
      // Ignore if unavailable
    }

    // 4. Slide luxurious invitation card upward after flap unfolds
    setTimeout(() => {
      setCardElevating(true);
    }, 700);

    // 5. Zoom card towards camera & transition into palace doors
    setTimeout(() => {
      setZoomingIn(true);
    }, 1800);

    setTimeout(() => {
      onOpen();
    }, 2500);
  };

  return (
    <div className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1E050B] via-[#2A0710] to-[#120206] px-4 select-none">
      {/* Background Mughal Jali Watermark */}
      <MughalJaliPattern opacity={0.08} color="#D4AF37" />

      {/* Ambient Radial Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Skip Button */}
      {onSkip && (
        <button
          onClick={onSkip}
          className="absolute top-5 left-5 z-40 text-xs font-serif tracking-widest text-[#FAF6ED]/70 hover:text-[#FBE285] border border-[#D4AF37]/30 hover:border-[#D4AF37] px-3.5 py-1.5 rounded-full backdrop-blur-md bg-[#2A0710]/60 transition-all uppercase"
        >
          Skip Intro
        </button>
      )}

      {/* Royal Crest / Monogram at Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="text-center mb-6 z-20 pointer-events-none"
      >
        <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-serif block mb-1">
          The Royal Wedding Invitation
        </span>
        <h2 className="text-xl sm:text-2xl font-serif text-[#FAF6ED] font-light tracking-widest">
          {WEDDING_CONFIG.couple.groom.shortName} &amp; {WEDDING_CONFIG.couple.bride.shortName}
        </h2>
      </motion.div>

      {/* The Floating Royal Envelope Container with Perspective */}
      <motion.div
        className="relative w-full max-w-[370px] sm:max-w-[420px] aspect-[4/3] perspective-[1000px] z-20"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={
          zoomingIn
            ? { scale: 3.2, opacity: 0, y: -50 }
            : { opacity: 1, scale: 1, y: [0, -8, 0] }
        }
        transition={
          zoomingIn
            ? { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
            : {
                opacity: { duration: 1 },
                scale: { duration: 1 },
                y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
              }
        }
      >
        {/* Shadow under floating envelope */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/60 rounded-full blur-xl pointer-events-none" />

        {/* Envelope Body */}
        <div className="relative w-full h-full rounded-lg bg-[#5A0F1E] border border-[#D4AF37]/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,55,0.25)] overflow-hidden">
          {/* Subtle Velvet Texture Pattern */}
          <MughalJaliPattern opacity={0.12} color="#FBE285" />
          <GoldCornerFiligree position="top-left" size={38} />
          <GoldCornerFiligree position="top-right" size={38} />
          <GoldCornerFiligree position="bottom-left" size={38} />
          <GoldCornerFiligree position="bottom-right" size={38} />

          {/* Golden Inset Border */}
          <div className="absolute inset-2 border border-[#D4AF37]/40 rounded pointer-events-none" />
          <div className="absolute inset-3 border border-dashed border-[#FBE285]/30 rounded pointer-events-none" />

          {/* Invitation Card Inside Envelope that Slides Out */}
          <motion.div
            className="absolute inset-x-4 bottom-4 h-[90%] rounded-md bg-gradient-to-b from-[#FAF6ED] via-[#F3E3C3] to-[#E8D4A8] p-5 shadow-2xl flex flex-col items-center justify-center text-center z-10 border border-[#D4AF37]"
            initial={{ y: 0 }}
            animate={cardElevating ? { y: -160, scale: 1.05 } : { y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <GoldCornerFiligree position="top-left" size={28} />
            <GoldCornerFiligree position="top-right" size={28} />
            <div className="border border-[#D4AF37]/60 p-4 w-full h-full rounded flex flex-col items-center justify-center">
              <span className="text-[10px] tracking-[0.25em] text-[#8C6F1E] font-serif uppercase">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
              <p className="text-xs text-[#5A0F1E] font-serif mt-2 tracking-wider">
                Together with their families
              </p>
              <h3 className="font-calligraphy text-2xl sm:text-3xl text-[#5A0F1E] my-1">
                Faisal &amp; Bint-e-Hanif
              </h3>
              <p className="text-[10px] font-sans tracking-widest uppercase text-[#8C6F1E]">
                Cordially Invite You
              </p>
            </div>
          </motion.div>

          {/* Envelope Pocket Triangles (Front Flaps) */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {/* Left Pocket Fold */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
              {/* Left triangle */}
              <polygon points="0,0 200,160 0,300" fill="#4B0B18" opacity="0.9" />
              {/* Right triangle */}
              <polygon points="400,0 200,160 400,300" fill="#430915" opacity="0.92" />
              {/* Bottom triangle */}
              <polygon points="0,300 200,150 400,300" fill="#520D1B" />
              {/* Gold border lines on envelope folds */}
              <line x1="0" y1="300" x2="200" y2="150" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
              <line x1="400" y1="300" x2="200" y2="150" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
            </svg>
          </div>

          {/* Personalised Guest Name Ribbon on Envelope */}
          <div className="absolute bottom-6 inset-x-0 z-30 flex flex-col items-center justify-center text-center px-4">
            <span className="text-xs tracking-widest uppercase text-[#FBE285] font-serif opacity-90">
              Honoured Guest
            </span>
            <p className="font-serif italic text-lg sm:text-xl text-[#FAF6ED] font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {guest.salutation}
            </p>
          </div>

          {/* Envelope Top Flap with 3D Flip */}
          <motion.div
            className="absolute top-0 inset-x-0 h-1/2 z-30 origin-top"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ rotateX: 0 }}
            animate={isOpened ? { rotateX: 180, zIndex: 5 } : { rotateX: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            <svg
              className="w-full h-full drop-shadow-[0_12px_15px_rgba(0,0,0,0.8)]"
              viewBox="0 0 400 150"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 400,0 200,150" fill="#5F1020" />
              <line x1="0" y1="0" x2="200" y2="150" stroke="#D4AF37" strokeWidth="1.5" />
              <line x1="400" y1="0" x2="200" y2="150" stroke="#D4AF37" strokeWidth="1.5" />
            </svg>

            {/* Antique Gold Wax Seal on Flap Peak */}
            <div
              className="absolute -bottom-11 left-1/2 -translate-x-1/2 z-40"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <WaxSeal
                initials={WEDDING_CONFIG.couple.initials}
                isCracked={isCracked}
                size={88}
                onClick={handleOpenEnvelope}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Pulsing Instruction Below Envelope */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-col items-center cursor-pointer group z-20"
            onClick={handleOpenEnvelope}
          >
            <div className="flex items-center space-x-2 px-5 py-2 rounded-full border border-[#D4AF37]/50 bg-[#2A0710]/80 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.25)] group-hover:border-[#FBE285] transition-all">
              <span className="w-2 h-2 rounded-full bg-[#FBE285] animate-ping" />
              <p className="text-sm font-serif tracking-widest text-[#FAF6ED] group-hover:text-[#FBE285] transition-colors uppercase">
                Tap the Seal to Open
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
