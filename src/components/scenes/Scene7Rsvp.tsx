import React from 'react';
import { PhoneCall } from 'lucide-react';
import {
  MughalArchFrame,
  MughalJaliPattern,
  GoldCornerFiligree,
  RoyalDivider,
} from '../decorations/MughalPatterns';
import { WEDDING_CONFIG } from '../../config/invite';

export const Scene7Rsvp: React.FC = () => {
  return (
    <section className="relative w-full py-14 px-4 bg-gradient-to-b from-[#160308] via-[#2A0710] to-[#120206] select-none">
      <MughalJaliPattern opacity={0.05} color="#D4AF37" />

      <div className="max-w-md mx-auto z-10 relative">
        <MughalArchFrame className="w-full">
          <div className="relative rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#3D0A14] via-[#26050D] to-[#140207] p-6 sm:p-8 shadow-lg text-center overflow-hidden">
            <GoldCornerFiligree position="top-left" size={32} />
            <GoldCornerFiligree position="top-right" size={32} />
            <GoldCornerFiligree position="bottom-left" size={32} />
            <GoldCornerFiligree position="bottom-right" size={32} />

            <div className="absolute inset-2.5 border border-[#D4AF37]/30 rounded-xl pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[10px] font-sans tracking-[0.25em] text-[#D4AF37] uppercase font-medium block mb-0.5">
                The Honour of Your Company
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-bright tracking-widest uppercase mb-0.5">
                RSVP
              </h2>

              <h3 className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#FAF6ED]/80 font-light mt-0.5">
                FOR CONTACT
              </h3>

              <RoyalDivider className="my-4" />

              {/* Clickable Direct Calling Numbers */}
              <div className="space-y-2.5 my-5 max-w-xs mx-auto">
                {WEDDING_CONFIG.contacts.map((contact, idx) => (
                  <a
                    key={idx}
                    href={`tel:${contact.raw}`}
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-[#4A0C18] via-[#330811] to-[#20040A] border border-[#D4AF37]/60 hover:border-[#FBE285] shadow-sm active:scale-98 transition-transform min-h-[44px]"
                  >
                    <div className="flex items-center space-x-2.5 text-left">
                      <div className="w-8 h-8 rounded-full bg-[#2A0710] border border-[#D4AF37] flex items-center justify-center text-[#FBE285]">
                        <PhoneCall className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-[#FAF6ED]">
                        {contact.display}
                      </span>
                    </div>

                    <span className="text-[10px] font-sans tracking-widest uppercase text-[#FBE285] bg-[#2A0710]/80 px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                      Call
                    </span>
                  </a>
                ))}
              </div>

              {/* Loving Invitation Note */}
              <p className="font-serif italic text-sm sm:text-base text-[#FBE285] max-w-xs mx-auto leading-relaxed mt-4">
                “We Look Forward to Celebrating This Special Occasion With You.”
              </p>
            </div>
          </div>
        </MughalArchFrame>
      </div>
    </section>
  );
};
