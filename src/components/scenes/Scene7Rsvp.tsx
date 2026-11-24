import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall } from 'lucide-react';
import {
  MughalArchFrame,
  MughalJaliPattern,
  SheeshMahalMirrorPattern,
  GoldCornerFiligree,
  RoyalDivider,
} from '../decorations/MughalPatterns';
import { WEDDING_CONFIG } from '../../config/invite';

export const Scene7Rsvp: React.FC = () => {
  return (
    <section className="relative w-full py-20 px-4 overflow-hidden bg-gradient-to-b from-[#160308] via-[#2A0710] to-[#120206] select-none">
      <MughalJaliPattern opacity={0.06} color="#D4AF37" />
      <SheeshMahalMirrorPattern opacity={0.1} />

      {/* Ambient Radial Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-md mx-auto z-10 relative">
        <MughalArchFrame className="w-full">
          <div className="relative rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#3D0A14] via-[#26050D] to-[#140207] p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,55,0.2)] overflow-hidden text-center">
            {/* Animated Corner Filigrees */}
            <GoldCornerFiligree position="top-left" size={40} />
            <GoldCornerFiligree position="top-right" size={40} />
            <GoldCornerFiligree position="bottom-left" size={40} />
            <GoldCornerFiligree position="bottom-right" size={40} />

            {/* Inset Borders */}
            <div className="absolute inset-3 border border-[#D4AF37]/40 rounded-2xl pointer-events-none" />
            <div className="absolute inset-4 border border-dashed border-[#FBE285]/20 rounded-xl pointer-events-none" />

            {/* Royal Crest / Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <span className="text-[11px] font-sans tracking-[0.35em] text-[#D4AF37] uppercase font-medium block mb-1">
                The Honour of Your Company
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gold-bright tracking-widest uppercase mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                RSVP
              </h2>

              <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-[#FAF6ED]/80 font-light mt-1">
                FOR CONTACT
              </h3>

              <RoyalDivider className="my-5" />

              {/* Clickable Direct Calling Numbers */}
              <div className="space-y-3.5 my-6 max-w-xs mx-auto">
                {WEDDING_CONFIG.contacts.map((contact, idx) => (
                  <motion.a
                    key={idx}
                    href={`tel:${contact.raw}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group flex items-center justify-between px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#4A0C18] via-[#330811] to-[#20040A] border border-[#D4AF37]/60 hover:border-[#FBE285] shadow-[0_4px_15px_rgba(0,0,0,0.6)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.3)] transition-all"
                  >
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-9 h-9 rounded-full bg-[#2A0710] border border-[#D4AF37] flex items-center justify-center text-[#FBE285] group-hover:bg-[#5A0F1E] transition-colors shadow-inner">
                        <PhoneCall className="w-4 h-4 text-[#FBE285]" />
                      </div>
                      <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#FAF6ED] group-hover:text-gold-bright transition-colors">
                        {contact.display}
                      </span>
                    </div>

                    <span className="text-[10px] font-sans tracking-widest uppercase text-[#FBE285] bg-[#2A0710]/80 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                      Call
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Loving Invitation Note */}
              <p className="font-serif italic text-base sm:text-lg text-[#FBE285] max-w-xs mx-auto leading-relaxed mt-6">
                “We Look Forward to Celebrating This Special Occasion With You.”
              </p>
            </motion.div>
          </div>
        </MughalArchFrame>
      </div>
    </section>
  );
};
