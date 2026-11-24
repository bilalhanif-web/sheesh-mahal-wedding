import { useState, useEffect, useRef } from 'react';
import { AmbientCanvas } from './components/ambient/AmbientCanvas';
import { RoyalAudioPlayer } from './components/audio/RoyalAudioPlayer';
import { ScrollProgressThread } from './components/ui/ScrollProgressThread';
import { Scene1Envelope } from './components/scenes/Scene1Envelope';
import { Scene2Doors } from './components/scenes/Scene2Doors';
import { Scene3ScratchCard } from './components/scenes/Scene3ScratchCard';
import { Scene4Countdown } from './components/scenes/Scene4Countdown';
import { Scene5Journey } from './components/scenes/Scene5Journey';
import { Scene6Venues } from './components/scenes/Scene6Venues';
import { Scene7Rsvp } from './components/scenes/Scene7Rsvp';
import { Scene8Finale } from './components/scenes/Scene8Finale';
import { PreviewManager } from './components/preview/PreviewManager';
import { AnimatePresence, motion } from 'framer-motion';

export function App() {
  const [isPreview, setIsPreview] = useState(false);
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [audioTriggered, setAudioTriggered] = useState(false);
  const palaceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if on /preview route or query param
    const pathname = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    if (pathname.includes('/preview') || params.get('preview') === 'true') {
      setIsPreview(true);
    }
  }, []);

  const handleEnvelopeOpen = () => {
    setAudioTriggered(true);
    setHasOpenedEnvelope(true);
  };

  const handleSkipIntro = () => {
    setAudioTriggered(true);
    setHasOpenedEnvelope(true);
  };

  const handleReplay = () => {
    setHasOpenedEnvelope(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in preview mode, render the preview testing manager
  if (isPreview) {
    return (
      <div className="relative min-h-[100dvh] bg-[#120206] text-[#FAF6ED]">
        <AmbientCanvas active={true} />
        <RoyalAudioPlayer autoPlayTriggered={true} />
        <PreviewManager />
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#0D0104] text-[#FAF6ED] overflow-x-hidden">
      {/* PERSISTENT GLOBAL AMBIENT CANVAS (Rose petals, gold dust, mirror glints) */}
      <AmbientCanvas active={true} />

      {/* PERSISTENT FLOATING AUDIO PLAYER & EQUALIZER */}
      <RoyalAudioPlayer autoPlayTriggered={audioTriggered} />

      {/* PERSISTENT GOLDEN SCROLL PROGRESS THREAD */}
      <ScrollProgressThread />

      {/* DESKTOP RESPONSIVE CONTAINER:
          Centred phone/tablet stage with subtle blurred royal velvet ambient backdrop on wide screens */}
      <div className="relative w-full min-h-[100dvh] flex justify-center">
        {/* Background ambient lighting on desktop margins */}
        <div className="fixed inset-0 pointer-events-none hidden lg:block bg-[radial-gradient(circle_at_center,#3D0A14_0%,#140206_70%,#080002_100%)] opacity-80" />

        {/* Main Phone-Width Stage */}
        <main className="relative w-full max-w-xl bg-gradient-to-b from-[#1C040A] via-[#2A0710] to-[#120206] shadow-[0_0_80px_rgba(0,0,0,0.95)] z-10 overflow-hidden">
          {/* SCENE 1: THE ROYAL ENVELOPE (Full-Screen Opening) */}
          <AnimatePresence mode="wait">
            {!hasOpenedEnvelope ? (
              <motion.div
                key="scene-envelope"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full"
              >
                <Scene1Envelope onOpen={handleEnvelopeOpen} onSkip={handleSkipIntro} />
              </motion.div>
            ) : (
              /* SCENES 2 THROUGH 8: THE SHEESH MAHAL PALACE EXPERIENCE */
              <motion.div
                key="scene-palace"
                ref={palaceRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="w-full flex flex-col"
              >
                {/* SCENE 2: The Sheesh Mahal Doors & Sacred Announcement */}
                <Scene2Doors
                  autoOpen={true}
                  onContinue={() => {
                    const el = document.getElementById('save-the-date');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />

                {/* SCENE 3: Scratch to Reveal Special Day */}
                <div id="save-the-date">
                  <Scene3ScratchCard />
                </div>

                {/* SCENE 4: Wedding Flip-Clock Countdown */}
                <div id="countdown">
                  <Scene4Countdown />
                </div>

                {/* SCENE 5: The Wedding Journey (Mehndi, Barat, Walima) */}
                <div id="ceremonies">
                  <Scene5Journey />
                </div>

                {/* SCENE 6: Interactive Wedding Venues & Google Maps */}
                <div id="venues">
                  <Scene6Venues />
                </div>

                {/* SCENE 7: Royal RSVP Contact Card */}
                <div id="rsvp">
                  <Scene7Rsvp />
                </div>

                {/* SCENE 8: The Royal Finale & Closing Dua */}
                <div id="finale">
                  <Scene8Finale onReplay={handleReplay} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
