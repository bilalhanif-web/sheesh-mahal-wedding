import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Check, MessageCircle, X } from 'lucide-react';
import {
  MughalArchFrame,
  MughalJaliPattern,
  GoldCornerFiligree,
  RoyalDivider,
} from '../decorations/MughalPatterns';
import { WEDDING_CONFIG } from '../../config/invite';

interface Scene8FinaleProps {
  onReplay?: () => void;
}

export const Scene8Finale: React.FC<Scene8FinaleProps> = ({ onReplay: _onReplay }) => {
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const getShareUrl = () => {
    if (typeof window === 'undefined') return WEDDING_CONFIG.urls.originalReference;
    return `${window.location.origin}${window.location.pathname}`;
  };

  const handleShare = async () => {
    const url = getShareUrl();
    const shareData = {
      title: 'Royal Wedding Invitation — Faisal & Bint-e-Hanif',
      text: 'You are cordially invited to the wedding celebration of Faisal Bashir Khaira & Bint-e-Hanif.',
      url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setShowShareModal(true);
        }
      }
    } else {
      setShowShareModal(true);
    }
  };

  const handleCopyLink = () => {
    const url = getShareUrl();
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <footer className="relative w-full py-12 px-4 bg-gradient-to-b from-[#120206] via-[#1E040B] to-[#0A0104] select-none text-center">
      <MughalJaliPattern opacity={0.05} color="#D4AF37" />

      <div className="max-w-md mx-auto z-10 relative">
        <MughalArchFrame className="w-full">
          {/* Compact natural card that fits standard mobile viewports */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#330813] via-[#24050D] to-[#120206] p-5 sm:p-7 shadow-[0_15px_40px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            <GoldCornerFiligree position="top-left" size={32} />
            <GoldCornerFiligree position="top-right" size={32} />
            <GoldCornerFiligree position="bottom-left" size={32} />
            <GoldCornerFiligree position="bottom-right" size={32} />

            <div className="absolute inset-2 border border-[#D4AF37]/30 rounded-xl pointer-events-none" />

            {/* Dua Calligraphy in Arabic & English */}
            <div className="mb-4">
              <p className="urdu-text text-lg sm:text-xl text-[#FBE285] leading-relaxed">
                {WEDDING_CONFIG.blessingDua.arabic}
              </p>
              <p className="font-serif italic text-xs text-[#FAF6ED]/90 max-w-xs mx-auto mt-1 leading-normal">
                {WEDDING_CONFIG.blessingDua.translation}
              </p>
            </div>

            <RoyalDivider className="my-3" />

            {/* Couple Names */}
            <div className="my-3">
              <h2 className="font-calligraphy text-2xl sm:text-3xl text-gold-bright">
                {WEDDING_CONFIG.couple.groom.fullName}
              </h2>
              <span className="font-serif italic text-lg text-[#FAF6ED]/70 my-0.5 block">
                &amp;
              </span>
              <h2 className="font-calligraphy text-2xl sm:text-3xl text-gold-bright">
                {WEDDING_CONFIG.couple.bride.fullName}
              </h2>
            </div>

            {/* Family Sign-off */}
            <div className="space-y-0.5 my-3">
              <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#D4AF37]">
                {WEDDING_CONFIG.blessingDua.note}
              </p>
              <h3 className="font-serif text-base sm:text-lg text-[#FAF6ED] font-semibold">
                {WEDDING_CONFIG.couple.familySignature}
              </h3>
              <p className="font-serif italic text-xs text-[#FBE285]/90 pt-0.5">
                {WEDDING_CONFIG.blessingDua.closingNote}
              </p>
            </div>

            {/* Action: Share Invitation Button */}
            <div className="pt-4 mt-2 border-t border-[#D4AF37]/30">
              <button
                onClick={handleShare}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FBE285] to-[#D4AF37] text-[#2A0710] font-serif font-bold text-xs tracking-widest uppercase shadow-md hover:scale-102 active:scale-98 transition-transform min-h-[44px]"
              >
                <Share2 className="w-4 h-4 text-[#2A0710]" />
                <span>Share Invitation</span>
              </button>
            </div>
          </motion.div>
        </MughalArchFrame>

        {/* Small Footer Attribution */}
        <div className="mt-8 text-center text-[10px] font-sans text-[#FAF6ED]/40 tracking-wider">
          <p>Sheesh Mahal &bull; Faisal &amp; Bint-e-Hanif</p>
          <p className="mt-0.5">December 2026 &bull; Nawabpur &amp; Toba Tek Singh</p>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-xs rounded-2xl bg-[#2A0710] border border-[#D4AF37] p-5 text-center shadow-xl">
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-3 right-3 text-[#FAF6ED]/60 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <h4 className="font-serif text-lg text-gold-bright mb-1">
                Share Royal Invitation
              </h4>
              <p className="text-[11px] font-sans text-[#FAF6ED]/70 mb-4">
                Share with friends &amp; family.
              </p>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `You are cordially invited to the royal wedding celebration of Faisal Bashir Khaira & Bint-e-Hanif: ${getShareUrl()}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-[#25D366] text-black font-semibold text-xs mb-2.5 shadow min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share via WhatsApp</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-[#1A0308] border border-[#D4AF37]/50 text-xs font-serif text-[#FAF6ED] hover:text-[#FBE285] transition-colors min-h-[44px]"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied!' : 'Copy Invitation Link'}</span>
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
