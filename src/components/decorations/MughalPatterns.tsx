import React from 'react';

// Antique Gold Mughal Arch Frame SVG
export const MughalArchFrame: React.FC<{
  className?: string;
  children?: React.ReactNode;
  variant?: 'maroon' | 'gold' | 'emerald' | 'champagne';
}> = ({ className = '', children }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Arch Peak Ornament */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <svg width="70" height="28" viewBox="0 0 70 28" fill="none">
          <path
            d="M35 0L42 12C48 10 58 14 62 20C55 18 48 24 35 28C22 24 15 18 8 20C12 14 22 10 28 12L35 0Z"
            fill="url(#goldGradientArch)"
          />
          <circle cx="35" cy="5" r="2.5" fill="#FAF6ED" />
          <defs>
            <linearGradient id="goldGradientArch" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBE285" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8C6F1E" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Intricate Mughal Jali Geometric Screen Pattern SVG
export const MughalJaliPattern: React.FC<{
  className?: string;
  opacity?: number;
  color?: string;
}> = ({ className = '', opacity = 0.15, color = '#D4AF37' }) => {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="mughal-jali-star"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M24 0 L28 10 L38 6 L34 16 L44 20 L36 28 L44 36 L34 40 L38 50 L28 46 L24 56 L20 46 L10 50 L14 40 L4 36 L12 28 L4 20 L14 16 L10 6 L20 10 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
          />
          <circle cx="24" cy="24" r="6" fill="none" stroke={color} strokeWidth="0.6" />
          <circle cx="0" cy="0" r="4" fill="none" stroke={color} strokeWidth="0.6" />
          <circle cx="48" cy="0" r="4" fill="none" stroke={color} strokeWidth="0.6" />
          <circle cx="0" cy="48" r="4" fill="none" stroke={color} strokeWidth="0.6" />
          <circle cx="48" cy="48" r="4" fill="none" stroke={color} strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mughal-jali-star)" />
    </svg>
  );
};

// Sheesh Mahal Mirror Glint / Ayina-Kari Facets SVG
export const SheeshMahalMirrorPattern: React.FC<{
  className?: string;
  opacity?: number;
}> = ({ className = '', opacity = 0.12 }) => {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="sheesh-mirrors"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="30,0 60,30 30,60 0,30"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.6"
          />
          <polygon
            points="30,10 50,30 30,50 10,30"
            fill="none"
            stroke="#FBE285"
            strokeWidth="0.4"
            strokeDasharray="2 2"
          />
          <circle cx="30" cy="30" r="2.5" fill="#FFF3BF" opacity="0.6" />
          <line x1="30" y1="0" x2="30" y2="60" stroke="#D4AF37" strokeWidth="0.3" />
          <line x1="0" y1="30" x2="60" y2="30" stroke="#D4AF37" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sheesh-mirrors)" />
    </svg>
  );
};

// Antique Gold Corner Filigree
export const GoldCornerFiligree: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position = 'top-left', className = '', size = 52 }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scaleX(-1)';
      case 'bottom-left':
        return 'scaleY(-1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
      default:
        return 'none';
    }
  };

  return (
    <div
      className={`absolute pointer-events-none z-10 ${className}`}
      style={{
        transform: getTransform(),
        width: size,
        height: size,
        top: position.includes('top') ? 4 : undefined,
        bottom: position.includes('bottom') ? 4 : undefined,
        left: position.includes('left') ? 4 : undefined,
        right: position.includes('right') ? 4 : undefined,
      }}
    >
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
      >
        <path
          d="M2 2 C18 2, 32 8, 42 20 C32 24, 24 32, 20 42 C8 32, 2 18, 2 2 Z"
          fill="url(#goldFiligreeGrad)"
          opacity="0.85"
        />
        <path
          d="M2 2 L58 2 C44 8, 20 22, 14 58 L2 58 L2 2 Z"
          stroke="url(#goldFiligreeGrad)"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="8" cy="8" r="3" fill="#FBE285" />
        <circle cx="16" cy="16" r="2" fill="#D4AF37" />
        <circle cx="26" cy="10" r="1.5" fill="#FBE285" />
        <circle cx="10" cy="26" r="1.5" fill="#FBE285" />
        <defs>
          <linearGradient id="goldFiligreeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF3BF" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8C6F1E" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Royal Mughal Divider / Crest
export const RoyalDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center space-x-3 my-4 ${className}`}>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#FBE285]" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 animate-pulse">
        <path
          d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
          fill="url(#dividerStarGrad)"
        />
        <circle cx="12" cy="12" r="2.5" fill="#FAF6ED" />
        <defs>
          <linearGradient id="dividerStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBE285" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
      </svg>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#FBE285]" />
    </div>
  );
};

// Royal Paisley (Kalka / Boteh) SVG for Mehndi
export const PaisleyMotif: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 48,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M50 95 C25 95 10 75 10 50 C10 25 35 15 50 5 C45 20 55 25 65 30 C75 35 85 45 85 60 C85 80 70 95 50 95 Z"
        fill="url(#paisleyGrad)"
        stroke="#D4AF37"
        strokeWidth="2"
      />
      <circle cx="50" cy="60" r="10" fill="#143828" stroke="#FBE285" strokeWidth="1.5" />
      <circle cx="50" cy="60" r="4" fill="#FBE285" />
      <defs>
        <linearGradient id="paisleyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E2A03F" />
          <stop offset="60%" stopColor="#C88616" />
          <stop offset="100%" stopColor="#8C6F1E" />
        </linearGradient>
      </defs>
    </svg>
  );
};
