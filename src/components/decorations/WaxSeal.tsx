import React from 'react';
import { motion } from 'framer-motion';

interface WaxSealProps {
  initials?: string;
  isCracked?: boolean;
  className?: string;
  size?: number;
  onClick?: () => void;
  interactive?: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  initials = 'F & B',
  isCracked = false,
  className = '',
  size = 110,
  onClick,
  interactive = true,
}) => {
  return (
    <div
      onClick={interactive ? onClick : undefined}
      className={`relative select-none ${interactive ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Intact or Left/Right Halves */}
      {!isCracked ? (
        <motion.div
          className="w-full h-full relative"
          whileHover={interactive ? { scale: 1.05 } : {}}
          whileTap={interactive ? { scale: 0.95 } : {}}
        >
          <WaxSealSvg initials={initials} />
        </motion.div>
      ) : (
        <div className="w-full h-full relative">
          {/* Left Half Falling and Rotating Away */}
          <motion.div
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{ x: -70, y: 120, rotate: -45, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="absolute top-0 left-0 w-full h-full overflow-hidden"
            style={{ clipPath: 'polygon(0% 0%, 55% 0%, 45% 35%, 55% 65%, 45% 100%, 0% 100%)' }}
          >
            <WaxSealSvg initials={initials} />
          </motion.div>

          {/* Right Half Falling and Rotating Away */}
          <motion.div
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{ x: 70, y: 120, rotate: 45, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="absolute top-0 left-0 w-full h-full overflow-hidden"
            style={{ clipPath: 'polygon(55% 0%, 100% 0%, 100% 100%, 45% 100%, 55% 65%, 45% 35%)' }}
          >
            <WaxSealSvg initials={initials} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

const WaxSealSvg: React.FC<{ initials: string }> = ({ initials }) => {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)] filter"
    >
      <defs>
        {/* Antique Gold Metallic Radial Gradient */}
        <radialGradient id="waxGoldBody" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="25%" stopColor="#E5C158" />
          <stop offset="65%" stopColor="#C69223" />
          <stop offset="85%" stopColor="#8C5C0D" />
          <stop offset="100%" stopColor="#4A2F04" />
        </radialGradient>

        <radialGradient id="waxInnerBevel" cx="42%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#FFE082" />
          <stop offset="50%" stopColor="#C49A24" />
          <stop offset="100%" stopColor="#5E3E07" />
        </radialGradient>

        {/* 3D Wax Light Filter */}
        <filter id="wax3dFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Irregular Organic Wax Seal Outer Rim */}
      <path
        d="M60 6 
           C72 4, 85 9, 95 18
           C105 27, 114 38, 115 52
           C116 66, 110 80, 101 91
           C92 102, 79 112, 65 114
           C50 116, 35 112, 23 103
           C11 94, 5 81, 4 67
           C3 53, 9 39, 18 28
           C27 17, 42 8, 60 6 Z"
        fill="url(#waxGoldBody)"
        filter="url(#wax3dFilter)"
      />

      {/* Rim Detail Highlights */}
      <path
        d="M60 10 
           C70 8, 82 12, 91 20
           C100 28, 108 38, 109 50
           C110 62, 105 74, 97 84
           C89 94, 77 103, 64 105
           C51 107, 38 103, 27 95
           C16 87, 11 75, 10 63
           C9 51, 14 39, 22 30
           C30 20, 44 12, 60 10 Z"
        fill="none"
        stroke="#FFE898"
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* Recessed Inner Circle */}
      <circle
        cx="60"
        cy="60"
        r="38"
        fill="url(#waxInnerBevel)"
        stroke="#472E06"
        strokeWidth="1.5"
      />

      {/* Beaded Ornamental Ring */}
      <circle
        cx="60"
        cy="60"
        r="34"
        fill="none"
        stroke="#FFEAA0"
        strokeWidth="1.2"
        strokeDasharray="2.5 3.5"
        opacity="0.8"
      />

      {/* Secondary Decorative Ring */}
      <circle
        cx="60"
        cy="60"
        r="31"
        fill="none"
        stroke="#7A4D05"
        strokeWidth="0.8"
      />

      {/* Royal Crown or Crest at Top of Monogram */}
      <path
        d="M54 40 L60 35 L66 40 L64 43 L56 43 Z"
        fill="#FFEAA0"
        opacity="0.9"
      />
      <circle cx="60" cy="34" r="1.5" fill="#FFFFFF" />

      {/* Embossed Royal Monogram: F & B */}
      <text
        x="60"
        y="68"
        fontFamily="'Great Vibes', cursive, 'Cormorant Garamond', serif"
        fontSize="25"
        fontWeight="bold"
        letterSpacing="1"
        textAnchor="middle"
        fill="#FFEAA0"
        style={{
          filter: 'drop-shadow(0px -1px 1px rgba(255,255,255,0.7)) drop-shadow(0px 2px 2px rgba(45,25,2,0.9))',
        }}
      >
        {initials}
      </text>

      {/* Bottom Flourish */}
      <path
        d="M48 76 C54 79, 66 79, 72 76"
        fill="none"
        stroke="#FFEAA0"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="60" cy="78" r="1" fill="#FFEAA0" />
    </svg>
  );
};
