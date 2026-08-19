import React, { useState } from 'react';
import { Heart, Sparkles, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPaperSound } from '../utils/sounds';

interface RomanticEnvelopeProps {
  onOpen: () => void;
  recipientName?: string;
  senderName?: string;
}

export const RomanticEnvelope: React.FC<RomanticEnvelopeProps> = ({
  onOpen,
  recipientName = 'Sarah Luna',
  senderName = 'Christian',
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleEnvelopeClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    playPaperSound();

    // Trigger audio playback event for browser autoplay policies (synchronous for direct gesture)
    if (typeof (window as any).playBackgroundMusic === 'function') {
      (window as any).playBackgroundMusic();
    } else {
      window.dispatchEvent(new Event('user-interacted-play-audio'));
    }

    // Heart and sparkle confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#ff85a1', '#ffd1dc', '#fbcfe8', '#ffffff'],
    });

    const end = Date.now() + 1000;
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0.2, y: 0.6 },
        colors: ['#ff4d6d', '#ff85a1', '#ffffff'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 0.8, y: 0.6 },
        colors: ['#ff4d6d', '#ff85a1', '#ffffff'],
      });
    }, 150);

    // Give time for the flip and slide animation before transitioning
    setTimeout(() => {
      onOpen();
    }, 1400);
  };

  return (
    <div className="relative z-20 min-h-[75vh] flex flex-col items-center justify-center px-4 py-8 select-none">
      {/* Top Intro text */}
      <div
        className={`text-center mb-8 transition-all duration-700 ${
          isOpening ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-pink-200 text-rose-500 text-xs font-bold uppercase tracking-widest shadow-xs mb-3">
          <Mail className="w-3.5 h-3.5" />
          Uma carta enviada por {senderName}
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif italic font-extrabold text-[#ff4d6d] tracking-tight">
          Você recebeu uma mensagem! 💌
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
          Toque no envelope para abrir e ler com carinho
        </p>
      </div>

      {/* 3D Envelope Container */}
      <div
        onClick={handleEnvelopeClick}
        className="relative group cursor-pointer w-[300px] sm:w-[360px] h-[210px] sm:h-[240px] perspective-1000 transition-transform duration-300 hover:scale-[1.03] active:scale-95"
        title="Clique para abrir sua carta"
      >
        {/* Letter paper sliding up when opening */}
        <div
          className={`absolute left-4 right-4 h-[190px] sm:h-[220px] bg-white rounded-2xl p-5 shadow-lg border border-pink-200 flex flex-col items-center justify-center text-center transition-all duration-1000 z-10 ${
            isOpening
              ? '-translate-y-28 sm:-translate-y-36 opacity-100 shadow-2xl scale-105'
              : 'translate-y-2 opacity-80'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 mb-2">
            <Heart className="w-5 h-5 fill-rose-500 animate-pulse" />
          </div>
          <span className="text-[11px] uppercase tracking-widest text-rose-400 font-bold">
            Especialmente para
          </span>
          <h3 className="text-2xl font-serif italic font-extrabold text-[#ff4d6d] mt-0.5">
            {recipientName}
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium italic">
            Feito com todo carinho... ❤️
          </p>
        </div>

        {/* Envelope Back Base */}
        <div className="absolute inset-0 bg-[#fde2e4] rounded-2xl shadow-2xl border-2 border-pink-200 overflow-hidden" />

        {/* Envelope Left & Right folds */}
        <div
          className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #ffccd5 0%, #ffb3c1 50%, #ffccd5 100%)',
            clipPath: 'polygon(0% 0%, 50% 55%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        />

        {/* Envelope Bottom fold triangle */}
        <div
          className="absolute inset-0 z-20 pointer-events-none rounded-2xl"
          style={{
            background:
              'linear-gradient(180deg, rgba(255, 179, 193, 0.4) 0%, #ffccd5 100%)',
            clipPath: 'polygon(0% 100%, 50% 45%, 100% 100%)',
          }}
        />

        {/* Envelope Top Flap */}
        <div
          className={`absolute top-0 left-0 right-0 h-[120px] sm:h-[135px] rounded-t-2xl z-30 origin-top transition-all duration-700 pointer-events-none ${
            isOpening
              ? '[transform:rotateX(180deg)] opacity-0'
              : '[transform:rotateX(0deg)] opacity-100 shadow-md'
          }`}
          style={{
            background:
              'linear-gradient(180deg, #ffb3c1 0%, #ff8fa3 100%)',
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
          }}
        />

        {/* Front Addressing & Wax Seal */}
        <div
          className={`absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none transition-all duration-500 ${
            isOpening ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
          }`}
        >
          {/* Heart Wax Seal Button */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#e63946] via-[#ff4d6d] to-[#ff758f] border-4 border-amber-200/90 shadow-xl flex flex-col items-center justify-center text-white mt-4 group-hover:scale-110 transition-transform">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white drop-shadow animate-pulse" />
          </div>

          <div className="mt-4 bg-white/90 backdrop-blur-xs px-4 py-1.5 rounded-full border border-pink-200 shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs sm:text-sm font-serif font-bold text-slate-800 tracking-wide">
              Para: {recipientName}
            </span>
          </div>
        </div>
      </div>

      {/* Pulsating Call to action button under envelope */}
      <div
        className={`mt-10 transition-all duration-500 ${
          isOpening ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <button
          type="button"
          onClick={handleEnvelopeClick}
          className="px-8 py-3.5 bg-gradient-to-r from-[#ff4d6d] via-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-base sm:text-lg rounded-full shadow-lg shadow-rose-300 flex items-center justify-center gap-2.5 transition-all cursor-pointer hover:scale-105 active:scale-95 animate-bounce"
        >
          <Mail className="w-5 h-5" />
          <span>Toque para abrir a carta ❤️</span>
        </button>
      </div>
    </div>
  );
};
