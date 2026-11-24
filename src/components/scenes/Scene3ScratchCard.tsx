import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MughalArchFrame, MughalJaliPattern, GoldCornerFiligree } from '../decorations/MughalPatterns';
import { Sparkles, Touchpad } from 'lucide-react';
import { WEDDING_CONFIG } from '../../config/invite';

export const Scene3ScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const isDrawing = useRef(false);
  const scratchCount = useRef(0);

  // Initialize and paint gold foil scratch layer
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Rich antique gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#FFE898');
    grad.addColorStop(0.25, '#D4AF37');
    grad.addColorStop(0.5, '#FBE285');
    grad.addColorStop(0.75, '#C69223');
    grad.addColorStop(1, '#8C5C0D');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle jali texture dots
    ctx.fillStyle = 'rgba(74, 47, 4, 0.12)';
    for (let x = 15; x < canvas.width; x += 30) {
      for (let y = 15; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Add Gold Foil Border
    ctx.strokeStyle = 'rgba(74, 47, 4, 0.4)';
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

    // Center instruction on foil
    ctx.fillStyle = '#2A0710';
    ctx.font = 'bold 15px "Cormorant Garamond", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✧ SCRATCH TO REVEAL ✧', canvas.width / 2, canvas.height / 2 - 12);

    ctx.font = '13px "Jost", sans-serif';
    ctx.fillStyle = '#4A2F04';
    ctx.fillText('Our Special Day', canvas.width / 2, canvas.height / 2 + 14);
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [initCanvas]);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      const totalPixels = pixels.length / 4;
      let clearPixels = 0;

      for (let i = 3; i < pixels.length; i += 64) {
        if (pixels[i] === 0) {
          clearPixels++;
        }
      }

      const percent = Math.round((clearPixels / (totalPixels / 16)) * 100);
      setScratchProgress(percent);

      if (percent >= 55) {
        revealCard();
      }
    } catch {
      // Fallback
    }
  };

  const revealCard = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    setScratchProgress(100);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#FBE285', '#5A0F1E', '#FAF6ED'],
        ticks: 250,
      });
    } catch {
      // Ignore
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    scratchCount.current++;
    if (scratchCount.current % 10 === 0) {
      checkScratchPercentage();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDrawing.current = true;
    if (e.touches.length > 0) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing.current) return;
    if (e.touches.length > 0) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
  };

  return (
    <section className="relative w-full py-20 px-4 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#120206] via-[#2A0710] to-[#160308] select-none">
      <MughalJaliPattern opacity={0.06} color="#D4AF37" />

      {/* Header */}
      <div className="text-center mb-8 z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-serif block mb-1">
          Mark The Auspicious Date
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF6ED] font-light">
          Scratch to Reveal Our Special Day
        </h2>
      </div>

      {/* Scratch Card in Mughal Arch Frame */}
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] z-10">
        <MughalArchFrame className="w-full">
          <div
            ref={containerRef}
            className="relative w-full aspect-[4/5] rounded-2xl bg-gradient-to-b from-[#5A0F1E] via-[#3B0713] to-[#20040A] border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.2)] overflow-hidden flex flex-col items-center justify-center p-6 text-center"
          >
            <GoldCornerFiligree position="top-left" size={38} />
            <GoldCornerFiligree position="top-right" size={38} />
            <GoldCornerFiligree position="bottom-left" size={38} />
            <GoldCornerFiligree position="bottom-right" size={38} />

            <div className="absolute inset-3 border border-[#D4AF37]/50 rounded-xl pointer-events-none" />
            <div className="absolute inset-4 border border-dashed border-[#FBE285]/30 rounded-lg pointer-events-none" />

            {/* REVEALED CONTENT */}
            <div className="relative z-0 flex flex-col items-center justify-center w-full h-full py-4 space-y-2">
              <span className="text-xs tracking-[0.35em] text-[#FBE285] font-serif uppercase font-semibold">
                SAVE THE DATE
              </span>

              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-1" />

              <span className="text-sm font-sans tracking-[0.25em] text-[#FAF6ED] uppercase font-light">
                SUNDAY
              </span>

              <div className="relative my-1">
                <span className="text-7xl sm:text-8xl font-serif font-bold text-gold-bright drop-shadow-[0_4px_16px_rgba(212,175,55,0.5)] block">
                  13
                </span>
              </div>

              <span className="text-base font-serif tracking-[0.3em] text-[#FBE285] uppercase font-medium">
                DECEMBER 2026
              </span>

              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-1" />

              <h4 className="font-calligraphy text-2xl sm:text-3xl text-gold-bright pt-1">
                {WEDDING_CONFIG.couple.groom.shortName} &amp; {WEDDING_CONFIG.couple.bride.shortName}
              </h4>
            </div>

            {/* Canvas Scratch Foil Layer */}
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`absolute inset-0 z-20 w-full h-full cursor-pointer touch-none transition-opacity duration-700 ${
                isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            />
          </div>
        </MughalArchFrame>
      </div>

      {/* Accessible Tap to Reveal Alternative & Progress */}
      <div className="mt-6 flex flex-col items-center space-y-3 z-10">
        {!isRevealed ? (
          <>
            <button
              onClick={revealCard}
              className="flex items-center space-x-2 text-xs font-serif tracking-widest text-[#FBE285] hover:text-white border border-[#D4AF37]/50 hover:border-[#FBE285] px-4 py-2 rounded-full bg-[#2A0710]/80 backdrop-blur-md transition-all shadow-md group"
            >
              <Touchpad className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span>Tap Here to Reveal Date</span>
            </button>
            <p className="text-[11px] font-sans text-[#FAF6ED]/60 tracking-wider">
              {scratchProgress > 0 ? `Scratched ${scratchProgress}% (Reveals at 55%)` : 'Rub with finger or cursor'}
            </p>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-1.5 text-xs font-serif text-[#FBE285] tracking-widest uppercase bg-[#5A0F1E]/80 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FBE285] animate-spin" />
            <span>Date Revealed — We Look Forward to Seeing You</span>
          </motion.div>
        )}
      </div>
    </section>
  );
};
