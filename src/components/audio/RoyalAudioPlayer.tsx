import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WEDDING_CONFIG } from '../../config/invite';

interface RoyalAudioPlayerProps {
  autoPlayTriggered?: boolean;
}

// Persistent Audio Controller for the Original Wedding Music
class OriginalWeddingAudio {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private fadeTimer: number | null = null;
  private targetVolume = WEDDING_CONFIG.music.defaultVolume;
  private listeners: Set<(playing: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    if (this.audio) return;
    this.audio = new Audio();
    this.audio.src = WEDDING_CONFIG.music.src;
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = 0.001;

    // Fallback if local file fails
    this.audio.addEventListener('error', () => {
      if (this.audio && this.audio.src !== WEDDING_CONFIG.music.originalUrl) {
        console.warn('Local music failed, falling back to original CDN URL');
        this.audio.src = WEDDING_CONFIG.music.originalUrl;
        if (this.isPlaying) {
          this.audio.play().catch(() => {});
        }
      }
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audio.addEventListener('ended', () => {
      // Loop backup
      if (this.audio) {
        this.audio.currentTime = 0;
        this.audio.play().catch(() => {});
      }
    });
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.add(cb);
    cb(this.isPlaying);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  public async playWithFadeIn(durationSeconds: number = WEDDING_CONFIG.music.fadeInDurationSeconds): Promise<boolean> {
    this.init();
    if (!this.audio) return false;

    if (this.fadeTimer) {
      clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }

    try {
      this.audio.volume = 0.001;
      await this.audio.play();
      this.isPlaying = true;
      this.notify();

      // Smooth 2-second fade in
      const steps = 40;
      const stepDuration = (durationSeconds * 1000) / steps;
      const volumeIncrement = this.targetVolume / steps;

      this.fadeTimer = window.setInterval(() => {
        if (!this.audio) return;
        const nextVolume = this.audio.volume + volumeIncrement;
        if (nextVolume >= this.targetVolume) {
          this.audio.volume = this.targetVolume;
          if (this.fadeTimer) {
            clearInterval(this.fadeTimer);
            this.fadeTimer = null;
          }
        } else {
          this.audio.volume = nextVolume;
        }
      }, stepDuration);

      return true;
    } catch (e) {
      console.warn('Audio play prevented by browser policy until user interacts:', e);
      return false;
    }
  }

  public pauseWithFadeOut(durationSeconds: number = 0.8) {
    if (!this.audio || !this.isPlaying) return;

    if (this.fadeTimer) {
      clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }

    const steps = 20;
    const stepDuration = (durationSeconds * 1000) / steps;
    const volumeDecrement = this.audio.volume / steps;

    this.fadeTimer = window.setInterval(() => {
      if (!this.audio) return;
      const nextVolume = this.audio.volume - volumeDecrement;
      if (nextVolume <= 0.01) {
        this.audio.volume = 0;
        this.audio.pause();
        this.isPlaying = false;
        this.notify();
        if (this.fadeTimer) {
          clearInterval(this.fadeTimer);
          this.fadeTimer = null;
        }
      } else {
        this.audio.volume = nextVolume;
      }
    }, stepDuration);
  }

  public toggle() {
    if (this.isPlaying) {
      this.pauseWithFadeOut();
    } else {
      this.playWithFadeIn(1.0);
    }
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const originalWeddingAudio = new OriginalWeddingAudio();

export const RoyalAudioPlayer: React.FC<RoyalAudioPlayerProps> = ({ autoPlayTriggered = false }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const unsubscribe = originalWeddingAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (autoPlayTriggered && !hasTriggered.current) {
      hasTriggered.current = true;
      originalWeddingAudio.playWithFadeIn();
    }
  }, [autoPlayTriggered]);

  const togglePlay = useCallback(() => {
    originalWeddingAudio.toggle();
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 select-none">
      {/* Equalizer animation when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="hidden sm:flex items-center gap-[3px] px-2.5 py-1.5 rounded-full bg-[#2A0710]/90 border border-[#D4AF37]/50 backdrop-blur-md shadow-lg"
          >
            {[0.4, 0.9, 0.6, 1, 0.5].map((scale, i) => (
              <motion.span
                key={i}
                className="w-[2px] bg-[#FBE285] rounded-full"
                animate={{
                  height: ['4px', `${13 * scale}px`, '4px'],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.75 + i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
            <span className="text-[11px] font-serif text-[#FAF6ED] ml-1 tracking-wider uppercase">
              Wedding Music
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Audio Button */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause Wedding Music' : 'Play Wedding Music'}
        className={`relative group w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border ${
          isPlaying
            ? 'bg-[#5A0F1E] border-[#FBE285] text-[#FBE285] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
            : 'bg-[#2A0710]/90 border-[#D4AF37]/60 text-[#FAF6ED]/70 hover:text-[#FBE285]'
        }`}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}

        {/* Pulse ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full border border-[#D4AF37]/40 animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
};
