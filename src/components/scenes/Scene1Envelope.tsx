import React, { useState } from 'react';
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
  const guest = getGuestFromUrl();

  const handleOpenEnvelope = () => {
    if (isOpened) return;
    setIsOpened(true);

    // Subtle single-pulse haptic feedback if supported
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(30);
      } catch {
        // Ignore
      }
    }

    // Single simple envelope opening transition <= 1 second
    setTimeout(() => {
      onOpen();
    }, 850);
  };

  return (
    <div className="relative w-full h-[100svh] max-h-[100svh] flex flex-col justify-between items-center bg-gradient-to-b from-[#1A0308] via-[#2A0710] to-[#140206] px-4 py-3 sm:py-5 overflow-y-auto sm:overflow-hidden select-none">
      {/* Static subtle background jali */}
      <MughalJaliPattern opacity={0.06} color="#D4AF37" />

      {/* Top Header - Compact & centered */}
      <header className="w-full flex items-center justify-between z-20 pt-1 shrink-0">
        {onSkip ? (
          <button
            onClick={onSkip}
            className="text-[11px] font-serif tracking-widest text-[#FAF6ED]/70 hover:text-[#FBE285] border border-[#D4AF37]/30 hover:border-[#D4AF37] px-3 py-1 rounded-full bg-[#2A0710]/80 transition-colors uppercase min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            Skip
          </button>
        ) : (
          <div className="w-10" />
        )}

        <div className="text-center px-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-serif block">
            Royal Wedding Invitation
          </span>
          <h2 className="text-sm sm:text-base font-serif text-[#FAF6ED] tracking-wider font-light">
            {WEDDING_CONFIG.couple.groom.shortName} &amp; {WEDDING_CONFIG.couple.bride.shortName}
          </h2>
        </div>

        <div className="w-10" />
      </header>

      {/* Main Centered Compact Envelope Container (Reduced ~25% to fit all phone viewports) */}
      <main className="relative w-[280px] sm:w-[320px] aspect-[4/3] my-auto z-20 shrink-0">
        {/* Soft shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/50 rounded-full blur-md pointer-events-none" />

        {/* Envelope Body */}
        <div className="relative w-full h-full rounded-lg bg-[#5A0F1E] border border-[#D4AF37]/80 shadow-[0_15px_35px_rgba(0,0,0,0.85)] overflow-hidden">
          <MughalJaliPattern opacity={0.1} color="#FBE285" />
          <GoldCornerFiligree position="top-left" size={28} />
          <GoldCornerFiligree position="top-right" size={28} />
          <GoldCornerFiligree position="bottom-left" size={28} />
          <GoldCornerFiligree position="bottom-right" size={28} />

          {/* Inset Borders */}
          <div className="absolute inset-1.5 border border-[#D4AF37]/40 rounded pointer-events-none" />

          {/* Rising Card Preview Inside (reveals upon open) */}
          <div
            className={`absolute inset-x-3 bottom-3 h-[85%] rounded bg-[#FAF6ED] p-3 shadow-lg flex flex-col items-center justify-center text-center z-10 border border-[#D4AF37] transition-transform duration-700 ease-out ${
              isOpened ? '-translate-y-16 sm:-translate-y-20' : 'translate-y-0'
            }`}
          >
            <span className="text-[9px] tracking-widest text-[#8C6F1E] font-serif uppercase">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
            <h3 className="font-calligraphy text-xl text-[#5A0F1E] my-0.5">
              Faisal &amp; Bint-e-Hanif
            </h3>
            <p className="text-[9px] font-sans tracking-widest uppercase text-[#8C6F1E]">
              Cordially Invite You
            </p>
          </div>

          {/* Envelope Pocket Folds */}
          <div className="absolute inset-0 pointer-events-none z-20">
            <svg className="w-full h-full" viewBox="0 0 320 240" preserveAspectRatio="none">
              <polygon points="0,0 160,130 0,240" fill="#4B0B18" opacity="0.95" />
              <polygon points="320,0 160,130 320,240" fill="#430915" opacity="0.95" />
              <polygon points="0,240 160,120 320,240" fill="#520D1B" />
              <line x1="0" y1="240" x2="160" y2="120" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
              <line x1="320" y1="240" x2="160" y2="120" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
            </svg>
          </div>

          {/* Personalised Guest Salutation Ribbon */}
          <div className="absolute bottom-3 inset-x-0 z-30 flex flex-col items-center justify-center text-center px-2">
            <span className="text-[10px] tracking-widest uppercase text-[#FBE285] font-serif opacity-90">
              Honoured Guest
            </span>
            <p className="font-serif italic text-base sm:text-lg text-[#FAF6ED] font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] truncate max-w-[240px]">
              {guest.salutation}
            </p>
          </div>

          {/* Top Flap with Simple 3D Unfold (0.6s) */}
          <div
            className={`absolute top-0 inset-x-0 h-1/2 origin-top transition-transform duration-600 ease-in-out ${
              isOpened ? '[transform:rotateX(180deg)] z-10' : '[transform:rotateX(0deg)] z-30'
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <svg className="w-full h-full" viewBox="0 0 320 120" preserveAspectRatio="none">
              <polygon points="0,0 320,0 160,120" fill="#5F1020" />
              <line x1="0" y1="0" x2="160" y2="120" stroke="#D4AF37" strokeWidth="1.2" />
              <line x1="320" y1="0" x2="160" y2="120" stroke="#D4AF37" strokeWidth="1.2" />
            </svg>

            {/* Antique Gold Wax Seal */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-40">
              <WaxSeal
                initials={WEDDING_CONFIG.couple.initials}
                size={70}
                onClick={handleOpenEnvelope}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Footer - Instruction Visible & Accessible */}
      <footer className="w-full flex justify-center pb-2 z-20 shrink-0">
        <button
          onClick={handleOpenEnvelope}
          disabled={isOpened}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#D4AF37]/60 bg-[#2A0710]/90 text-xs font-serif tracking-widest text-[#FAF6ED] hover:text-[#FBE285] uppercase transition-all shadow-md min-h-[44px]"
        >
          <span className="w-2 h-2 rounded-full bg-[#FBE285] opacity-90" />
          <span>Tap the Seal to Open</span>
        </button>
      </footer>
    </div>
  );
};
