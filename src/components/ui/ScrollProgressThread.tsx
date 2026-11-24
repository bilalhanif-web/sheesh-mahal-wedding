import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressThread: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed right-2 top-0 bottom-0 w-[3px] z-40 pointer-events-none hidden sm:block">
      <div className="w-full h-full bg-[#D4AF37]/20 rounded-full" />
      <motion.div
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#FBE285] via-[#D4AF37] to-[#8C6F1E] rounded-full origin-top shadow-[0_0_8px_rgba(212,175,55,0.7)]"
        style={{ scaleY, height: '100%' }}
      />
    </div>
  );
};
