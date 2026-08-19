import React, { useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { toggleBackgroundMusic, playBackgroundMusic } from '../utils/sounds';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Listen for custom event triggered by other components (like Envelope opening)
    const handleAutoPlay = async () => {
      const playing = await playBackgroundMusic();
      setIsPlaying(playing);
    };

    window.addEventListener('user-interacted-play-audio', handleAutoPlay);
    
    // Register the function globally so other components can call it directly if they want
    (window as any).playBackgroundMusic = handleAutoPlay;

    return () => {
      window.removeEventListener('user-interacted-play-audio', handleAutoPlay);
    };
  }, []);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const nowPlaying = await toggleBackgroundMusic();
    setIsPlaying(nowPlaying);
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] pointer-events-auto animate-fade-in">
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white backdrop-blur-md border border-pink-200 rounded-full shadow-sm text-rose-500 transition-all duration-300 cursor-pointer"
        title={isPlaying ? "Pausar música" : "Tocar música"}
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4 fill-current" />
            <span className="text-sm font-serif italic text-slate-600 hidden sm:inline">Pausar</span>
            <div className="flex items-end gap-0.5 h-3 px-1 ml-1">
              <span className="w-0.5 bg-rose-400 rounded-full animate-bounce h-2" style={{ animationDuration: '0.6s' }}></span>
              <span className="w-0.5 bg-rose-500 rounded-full animate-bounce h-3" style={{ animationDuration: '0.8s', animationDelay: '0.2s' }}></span>
              <span className="w-0.5 bg-rose-400 rounded-full animate-bounce h-1.5" style={{ animationDuration: '0.5s', animationDelay: '0.1s' }}></span>
            </div>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current ml-0.5" />
            <span className="text-sm font-serif italic text-slate-600">Ouvir Música</span>
          </>
        )}
      </button>
    </div>
  );
};

