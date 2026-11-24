import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2,
  PhoneCall,
  RotateCcw,
  Copy,
  Check,
  MessageCircle,
  X,
} from 'lucide-react';
import {
  MughalArchFrame,
  MughalJaliPattern,
  SheeshMahalMirrorPattern,
  GoldCornerFiligree,
  RoyalDivider,
} from '../decorations/MughalPatterns';
import { WEDDING_CONFIG } from '../../config/invite';

interface Scene8FinaleProps {
  onReplay?: () => void;
}

export const Scene8Finale: React.FC<Scene8FinaleProps> = ({ onReplay }) => {
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const getShareUrl = () => {
    if (typeof window === 'undefined') return WEDDING_CONFIG.urls.originalReference;
    return `${window.location.origin}${window.location.pathname}`;
  };

  const handleShare = async () => {
    const url = getShareUrl();
    const shareData = {
      title: 'Royal Wedding Invitation — Faisal & Bint-e-Hanif',
      text: 'You are cordially invited to the royal wedding celebration of Faisal Bashir Khaira & Bint-e-Hanif.',
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
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <footer className="relative w-full py-28 px-4 overflow-hidden bg-gradient-to-b from-[#120206] via-[#20040B] to-[#0A0104] select-none text-center">
      <SheeshMahalMirrorPattern opacity={0.15} />
      <MughalJaliPattern opacity={0.06} color="#D4AF37" />

      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.18)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-xl mx-auto z-10 relative">
        <MughalArchFrame className="w-full">
          <div className="rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#330813] via-[#24050D] to-[#120206] p-8 sm:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.95)] overflow-hidden">
            <GoldCornerFiligree position="top-left" size={44} />
            <GoldCornerFiligree position="top-right" size={44} />
            <GoldCornerFiligree position="bottom-left" size={44} />
            <GoldCornerFiligree position="bottom-right" size={44} />

            <div className="absolute inset-3.5 border border-[#D4AF37]/40 rounded-2xl pointer-events-none" />

            {/* Bismillah / Dua Calligraphy in Arabic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-6"
            >
              <p className="urdu-text text-xl sm:text-2xl text-[#FBE285] leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {WEDDING_CONFIG.blessingDua.arabic}
              </p>
              <p className="font-serif italic text-sm text-[#FAF6ED]/90 max-w-sm mx-auto mt-2 tracking-wide">
                {WEDDING_CONFIG.blessingDua.translation}
              </p>
            </motion.div>

            <RoyalDivider className="my-6" />

            {/* Couple Names */}
            <div className="my-6">
              <h2 className="font-calligraphy text-4xl sm:text-5xl text-gold-bright drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                {WEDDING_CONFIG.couple.groom.fullName}
              </h2>
              <span className="font-serif italic text-2xl text-[#FAF6ED]/70 my-1 block">
                &amp;
              </span>
              <h2 className="font-calligraphy text-4xl sm:text-5xl text-gold-bright drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                {WEDDING_CONFIG.couple.bride.fullName}
              </h2>
            </div>

            {/* Family Sign-off */}
            <div className="space-y-1.5 my-6">
              <p className="text-xs font-sans tracking-[0.25em] uppercase text-[#D4AF37]">
                {WEDDING_CONFIG.blessingDua.note}
              </p>
              <h3 className="font-serif text-xl sm:text-2xl text-[#FAF6ED] font-semibold">
                {WEDDING_CONFIG.couple.familySignature}
              </h3>
              <p className="font-serif italic text-sm text-[#FBE285]/90 pt-1">
                {WEDDING_CONFIG.blessingDua.closingNote}
              </p>
            </div>

            {/* ACTION BUTTONS: Share, Contact, Replay */}
            <div className="pt-8 border-t border-[#D4AF37]/40 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleShare}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FBE285] to-[#D4AF37] text-[#2A0710] font-serif font-bold text-xs tracking-widest uppercase shadow-[0_4px_15px_rgba(212,175,55,0.4)] hover:scale-105 transition-all"
              >
                <Share2 className="w-4 h-4 text-[#2A0710]" />
                <span>Share Invitation</span>
              </button>

              <button
                onClick={() => setShowContactModal(true)}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#2A0710]/90 hover:bg-[#5A0F1E] border border-[#D4AF37]/60 text-[#FAF6ED] hover:text-[#FBE285] font-serif text-xs tracking-widest uppercase transition-all"
              >
                <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                <span>Contact Hosts</span>
              </button>

              <button
                onClick={onReplay}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#2A0710]/90 hover:bg-[#5A0F1E] border border-[#D4AF37]/60 text-[#FAF6ED] hover:text-[#FBE285] font-serif text-xs tracking-widest uppercase transition-all"
              >
                <RotateCcw className="w-4 h-4 text-[#D4AF37]" />
                <span>Replay</span>
              </button>
            </div>
          </div>
        </MughalArchFrame>

        <div className="mt-12 text-center text-[11px] font-sans text-[#FAF6ED]/40 tracking-wider">
          <p>Sheesh Mahal &bull; Royal Wedding of Faisal &amp; Bint-e-Hanif</p>
          <p className="mt-1">December 2026 &bull; Nawabpur &amp; Toba Tek Singh</p>
        </div>
      </div>

      {/* SHARE MODAL */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm rounded-2xl bg-[#2A0710] border-2 border-[#D4AF37] p-6 text-center shadow-2xl"
            >
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 text-[#FAF6ED]/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h4 className="font-serif text-xl text-gold-bright mb-2">
                Share Royal Invitation
              </h4>
              <p className="text-xs font-sans text-[#FAF6ED]/70 mb-5">
                Send this magnificent invitation to your family &amp; friends.
              </p>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `You are cordially invited to the royal wedding celebration of Faisal Bashir Khaira & Bint-e-Hanif: ${getShareUrl()}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-[#25D366] text-black font-semibold text-sm mb-3 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share via WhatsApp</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-[#1A0308] border border-[#D4AF37]/60 text-xs font-serif text-[#FAF6ED] hover:text-[#FBE285] transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Invitation Link'}</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT HOSTS MODAL */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm rounded-2xl bg-[#2A0710] border-2 border-[#D4AF37] p-6 text-center shadow-2xl"
            >
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 text-[#FAF6ED]/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h4 className="font-serif text-xl text-gold-bright mb-2">
                Contact Khaira Family
              </h4>
              <p className="text-xs font-sans text-[#FAF6ED]/70 mb-5">
                For queries or directions, reach out to the hosts:
              </p>

              <div className="space-y-3">
                {WEDDING_CONFIG.contacts.map((contact, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#1A0308] border border-[#D4AF37]/40"
                  >
                    <div className="text-left">
                      <span className="text-[10px] uppercase font-sans text-[#D4AF37] block">
                        {contact.label}
                      </span>
                      <span className="font-serif text-base text-[#FAF6ED] font-medium">
                        {contact.display}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a
                        href={`tel:${contact.display.replace(/\s+/g, '')}`}
                        className="w-8 h-8 rounded-full bg-[#5A0F1E] border border-[#D4AF37] flex items-center justify-center text-[#FBE285]"
                        aria-label={`Call ${contact.display}`}
                      >
                        <PhoneCall className="w-4 h-4" />
                      </a>
                      <a
                        href={`https://wa.me/${contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-[#25D366]/20 border border-[#25D366] flex items-center justify-center text-[#25D366]"
                        aria-label={`WhatsApp ${contact.display}`}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
