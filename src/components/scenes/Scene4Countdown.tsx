import React, { useState, useEffect } from 'react';
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
    <section className="relative w-full py-14 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#160308] via-[#2A0710] to-[#140206] select-none">
      <MughalJaliPattern opacity={0.05} color="#D4AF37" />

      <div className="relative z-10 w-full max-w-md text-center flex flex-col items-center">
        {/* Subtitle & Heading */}
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-serif block mb-0.5">
          Awaiting The Auspicious Moment
        </span>
        <h2 className="text-xl sm:text-2xl font-serif text-[#FAF6ED] font-light mb-1">
          {WEDDING_CONFIG.countdownHeading}
        </h2>

        <p className="text-[11px] font-sans text-[#FBE285]/80 uppercase tracking-wider mb-4">
          Barat Ceremony &bull; Sunday, 13 December 2026 (PKT)
        </p>

        <RoyalDivider className="mb-6" />

        {/* FLIP CLOCK CONTAINER */}
        {!timeLeft.isExpired ? (
          <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-sm px-1">
            <ClockUnit value={timeLeft.days} label="Days" />
            <ClockUnit value={timeLeft.hours} label="Hours" />
            <ClockUnit value={timeLeft.minutes} label="Mins" />
            <ClockUnit value={timeLeft.seconds} label="Secs" />
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-[#5A0F1E]/90 border border-[#D4AF37] shadow-lg max-w-sm mx-auto">
            <p className="font-serif text-lg sm:text-xl text-gold-bright font-medium">
              {WEDDING_CONFIG.countdownExpiredMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// Lightweight, performant clock card (pure CSS, no 3D transform loop)
const ClockUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const formatted = value.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-square rounded-xl bg-gradient-to-b from-[#4A0B18] via-[#2F060F] to-[#1A0308] border border-[#D4AF37] shadow-md flex items-center justify-center overflow-hidden">
        {/* Center fold line */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/70 z-10" />

        <span className="text-2xl sm:text-3xl font-serif font-bold text-gold-bright tracking-tight z-0">
          {formatted}
        </span>
      </div>

      <span className="text-[10px] font-sans tracking-widest uppercase text-[#D4AF37] mt-1.5 font-medium">
        {label}
      </span>
    </div>
  );
};
