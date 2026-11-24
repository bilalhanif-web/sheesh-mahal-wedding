import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MughalJaliPattern, RoyalDivider } from '../decorations/MughalPatterns';
import { WEDDING_CONFIG } from '../../config/invite';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const Scene4Countdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(WEDDING_CONFIG.countdownTargetISO).getTime();
    const now = Date.now();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds, isExpired: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full py-20 px-4 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#160308] via-[#2A0710] to-[#140206] select-none">
      <MughalJaliPattern opacity={0.07} color="#D4AF37" />

      {/* Decorative Aura */}
      <div className="absolute w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg text-center flex flex-col items-center">
        {/* Subtitle & Heading */}
        <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-serif block mb-1">
          Awaiting The Auspicious Moment
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF6ED] font-light mb-2">
          {WEDDING_CONFIG.countdownHeading}
        </h2>

        <p className="text-xs font-sans text-[#FBE285]/80 uppercase tracking-widest mb-6">
          Barat Ceremony &bull; Sunday, 13 December 2026 (PKT)
        </p>

        <RoyalDivider className="mb-8" />

        {/* FLIP CLOCK CONTAINER */}
        {!timeLeft.isExpired ? (
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-md px-2">
            <FlipUnit value={timeLeft.days} label="Days" />
            <FlipUnit value={timeLeft.hours} label="Hours" />
            <FlipUnit value={timeLeft.minutes} label="Minutes" />
            <FlipUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-[#5A0F1E]/90 border border-[#D4AF37] shadow-[0_10px_30px_rgba(212,175,55,0.3)] max-w-md mx-auto"
          >
            <p className="font-serif text-xl sm:text-2xl text-gold-bright font-medium">
              {WEDDING_CONFIG.countdownExpiredMessage}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Royal Split-Flap Clock Card
const FlipUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const formatted = value.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      {/* 3D Flip Card Container */}
      <div className="relative w-full aspect-[4/5] sm:aspect-square rounded-xl bg-gradient-to-b from-[#4A0B18] via-[#2F060F] to-[#1A0308] border border-[#D4AF37] shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center overflow-hidden perspective-[400px]">
        {/* Subtle Horizontal Divider Line through Center */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/80 z-20 shadow-[0_1px_1px_rgba(212,175,55,0.3)]" />

        {/* Side Notch tabs */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-[#1A0308] border-r border-[#D4AF37]/60 rounded-r z-30" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-[#1A0308] border-l border-[#D4AF37]/60 rounded-l z-30" />

        {/* Animated Digit */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formatted}
            initial={{ rotateX: -70, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 70, opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-gold-bright drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] tracking-tight"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Label under Flip Card */}
      <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#D4AF37] mt-2 font-medium">
        {label}
      </span>
    </div>
  );
};
