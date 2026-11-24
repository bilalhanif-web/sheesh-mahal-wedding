import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { RoyalAudioPlayer } from './components/audio/RoyalAudioPlayer';
import { Scene1Envelope } from './components/scenes/Scene1Envelope';

// Code-split below-the-fold scenes to drastically reduce initial JS payload and main-thread work
const Scene2Doors = lazy(() => import('./components/scenes/Scene2Doors').then(m => ({ default: m.Scene2Doors })));
const Scene3ScratchCard = lazy(() => import('./components/scenes/Scene3ScratchCard').then(m => ({ default: m.Scene3ScratchCard })));
const Scene4Countdown = lazy(() => import('./components/scenes/Scene4Countdown').then(m => ({ default: m.Scene4Countdown })));
const Scene5Journey = lazy(() => import('./components/scenes/Scene5Journey').then(m => ({ default: m.Scene5Journey })));
const Scene6Venues = lazy(() => import('./components/scenes/Scene6Venues').then(m => ({ default: m.Scene6Venues })));
const Scene7Rsvp = lazy(() => import('./components/scenes/Scene7Rsvp').then(m => ({ default: m.Scene7Rsvp })));
const Scene8Finale = lazy(() => import('./components/scenes/Scene8Finale').then(m => ({ default: m.Scene8Finale })));
const PreviewManager = lazy(() => import('./components/preview/PreviewManager').then(m => ({ default: m.PreviewManager })));

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
        <RoyalAudioPlayer autoPlayTriggered={true} />
        <Suspense fallback={null}>
          <PreviewManager />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#0D0104] text-[#FAF6ED] overflow-x-hidden">
      {/* PERSISTENT FLOATING AUDIO PLAYER & EQUALIZER */}
      <RoyalAudioPlayer autoPlayTriggered={audioTriggered} />

      {/* DESKTOP RESPONSIVE CONTAINER:
          Centred phone/tablet stage with subtle royal velvet backdrop on wide screens */}
      <div className="relative w-full min-h-[100dvh] flex justify-center">
        {/* Background ambient lighting on desktop margins */}
        <div className="fixed inset-0 pointer-events-none hidden lg:block bg-[radial-gradient(circle_at_center,#3D0A14_0%,#140206_70%,#080002_100%)] opacity-80" />

        {/* Main Phone-Width Stage */}
        <main className="relative w-full max-w-xl bg-gradient-to-b from-[#1C040A] via-[#2A0710] to-[#120206] shadow-[0_0_80px_rgba(0,0,0,0.95)] z-10 overflow-hidden">
          {/* SCENE 1: THE ROYAL ENVELOPE (Full-Screen Opening) */}
          {!hasOpenedEnvelope ? (
            <div className="w-full transition-opacity duration-500">
              <Scene1Envelope onOpen={handleEnvelopeOpen} onSkip={handleSkipIntro} />
            </div>
          ) : (
            /* SCENES 2 THROUGH 8: THE SHEESH MAHAL PALACE EXPERIENCE */
            <div
              ref={palaceRef}
              className="w-full flex flex-col transition-opacity duration-700 ease-in opacity-100"
            >
              <Suspense fallback={null}>
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
              </Suspense>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
