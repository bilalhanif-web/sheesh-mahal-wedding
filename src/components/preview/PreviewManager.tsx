import React, { useState, useEffect } from 'react';
import { Scene1Envelope } from '../scenes/Scene1Envelope';
import { Scene2Doors } from '../scenes/Scene2Doors';
import { Scene3ScratchCard } from '../scenes/Scene3ScratchCard';
import { Scene4Countdown } from '../scenes/Scene4Countdown';
import { Scene5Journey } from '../scenes/Scene5Journey';
import { Scene6Venues } from '../scenes/Scene6Venues';
import { Scene7Rsvp } from '../scenes/Scene7Rsvp';
import { Scene8Finale } from '../scenes/Scene8Finale';
import { RefreshCw, ArrowLeft } from 'lucide-react';

export const PreviewManager: React.FC = () => {
  const [sceneId, setSceneId] = useState<number>(1);
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sceneParam = params.get('scene');
    if (sceneParam) {
      const parsed = parseInt(sceneParam, 10);
      if (parsed >= 1 && parsed <= 8) {
        setSceneId(parsed);
      }
    }
  }, []);

  const switchScene = (id: number) => {
    setSceneId(id);
    setKey((prev) => prev + 1);
    const url = new URL(window.location.href);
    url.searchParams.set('scene', id.toString());
    window.history.pushState({}, '', url.toString());
  };

  const reloadScene = () => {
    setKey((prev) => prev + 1);
  };

  const renderScene = () => {
    switch (sceneId) {
      case 1:
        return <Scene1Envelope key={key} onOpen={() => switchScene(2)} />;
      case 2:
        return <Scene2Doors key={key} onContinue={() => switchScene(3)} autoOpen={true} />;
      case 3:
        return <Scene3ScratchCard key={key} />;
      case 4:
        return <Scene4Countdown key={key} />;
      case 5:
        return <Scene5Journey key={key} />;
      case 6:
        return <Scene6Venues key={key} />;
      case 7:
        return <Scene7Rsvp key={key} />;
      case 8:
        return <Scene8Finale key={key} onReplay={() => switchScene(1)} />;
      default:
        return <Scene1Envelope key={key} onOpen={() => switchScene(2)} />;
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#120206] text-[#FAF6ED]">
      {/* Top Floating Scene Navigation Bar */}
      <div className="fixed top-3 inset-x-0 z-50 flex justify-center px-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center space-x-1.5 p-1.5 rounded-full bg-[#2A0710]/95 border border-[#D4AF37] backdrop-blur-md shadow-2xl overflow-x-auto max-w-[95vw]">
          <a
            href="/"
            className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-serif text-[#D4AF37] hover:text-[#FBE285] hover:bg-[#5A0F1E]/50 transition-all"
            title="Return to Full Flow"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Main</span>
          </a>

          <div className="h-4 w-[1px] bg-[#D4AF37]/40 mx-0.5" />

          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <button
              key={s}
              onClick={() => switchScene(s)}
              className={`w-7 h-7 rounded-full text-xs font-serif font-bold transition-all flex items-center justify-center ${
                sceneId === s
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#FBE285] text-[#2A0710] shadow-[0_0_10px_rgba(212,175,55,0.6)]'
                  : 'text-[#FAF6ED]/70 hover:text-white hover:bg-[#5A0F1E]'
              }`}
            >
              {s}
            </button>
          ))}

          <div className="h-4 w-[1px] bg-[#D4AF37]/40 mx-0.5" />

          <button
            onClick={reloadScene}
            className="p-1.5 rounded-full text-[#D4AF37] hover:text-[#FBE285] hover:bg-[#5A0F1E]/50 transition-all"
            title="Replay this scene"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Render Current Scene */}
      <div className="pt-12 sm:pt-14 pb-8 min-h-[100dvh] flex flex-col justify-center">
        {renderScene()}
      </div>
    </div>
  );
};
