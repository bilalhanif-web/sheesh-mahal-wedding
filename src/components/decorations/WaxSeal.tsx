import React from 'react';

interface WaxSealProps {
  initials?: string;
  className?: string;
  size?: number;
  onClick?: () => void;
  interactive?: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  initials = 'F & B',
  className = '',
  size = 72,
  onClick,
  interactive = true,
}) => {
  return (
    <div
      onClick={interactive ? onClick : undefined}
      className={`relative select-none ${interactive ? 'cursor-pointer active:scale-95 transition-transform' : ''} ${className}`}
      style={{ width: size, height: size }}
      role={interactive ? 'button' : undefined}
      aria-label={interactive ? 'Open Envelope' : undefined}
    >
      <WaxSealSvg initials={initials} />
    </div>
  );
};

const WaxSealSvg: React.FC<{ initials: string }> = ({ initials }) => {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="waxGoldBody" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="25%" stopColor="#E5C158" />
          <stop offset="65%" stopColor="#C69223" />
          <stop offset="100%" stopColor="#5E3E07" />
        </radialGradient>

        <radialGradient id="waxInnerBevel" cx="42%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#FFE082" />
          <stop offset="50%" stopColor="#C49A24" />
          <stop offset="100%" stopColor="#5E3E07" />
        </radialGradient>
      </defs>

      {/* Wax Seal Outer Rim */}
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
      />

      {/* Recessed Inner Circle */}
      <circle
        cx="60"
        cy="60"
        r="38"
        fill="url(#waxInnerBevel)"
        stroke="#472E06"
        strokeWidth="1.2"
      />

      {/* Beaded Ornamental Ring */}
      <circle
        cx="60"
        cy="60"
        r="34"
        fill="none"
        stroke="#FFEAA0"
        strokeWidth="1"
        strokeDasharray="2.5 3.5"
        opacity="0.8"
      />

      {/* Crest Accent */}
      <path
        d="M55 41 L60 36 L65 41 L63 44 L57 44 Z"
        fill="#FFEAA0"
        opacity="0.9"
      />

      {/* Embossed Royal Monogram */}
      <text
        x="60"
        y="67"
        fontFamily="'Great Vibes', cursive, 'Cormorant Garamond', serif"
        fontSize="24"
        fontWeight="bold"
        textAnchor="middle"
        fill="#FFEAA0"
      >
        {initials}
      </text>

      {/* Bottom Flourish */}
      <path
        d="M48 75 C54 78, 66 78, 72 75"
        fill="none"
        stroke="#FFEAA0"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
};
