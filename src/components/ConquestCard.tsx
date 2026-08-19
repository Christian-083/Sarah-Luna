import React, { useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, HeartCrack, HeartHandshake, CheckCircle2, MessageCircle, BookOpen, Sparkles } from 'lucide-react';

interface ConquestCardProps {
  question: string;
  onSimClick: () => void;
  onNaoClick: () => void;
  savedVote?: 'sim' | 'nao' | null;
  onReopenModal?: (vote: 'sim' | 'nao') => void;
  onGoToMessages?: () => void;
}

export const ConquestCard: React.FC<ConquestCardProps> = ({
  question,
  onSimClick,
  onNaoClick,
  savedVote = null,
  onReopenModal,
  onGoToMessages,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSim = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Trigger sweet confetti explosion
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#ec4899', '#ffffff', '#ffd1dc'],
    });

    // Extra burst of hearts confetti
    const end = Date.now() + 1500;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f472b6', '#fb7185'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f472b6', '#fb7185'],
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    onSimClick();
  };

  const handleNao = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onNaoClick();
  };

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 text-center"
    >
      {/* Decorative floating heart / status badge */}
      <div className="relative mb-6 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
        <div className="relative w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-pink-100">
          {savedVote === 'nao' ? (
            <HeartCrack className="w-10 h-10 text-slate-500" />
          ) : (
            <Heart className="w-10 h-10 text-[#ff4d6d] fill-[#ff4d6d] animate-bounce" />
          )}
        </div>
      </div>

      {/* Main card container */}
      <div className="w-full max-w-xl glass-panel p-8 sm:p-12 rounded-[40px] shadow-2xl text-center z-10 relative overflow-hidden">
        {/* Subtle pink gradient background accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff8fa3]/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#ff4d6d]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Central Question in Immersive Serif Italic style */}
        <h1 className="text-4xl sm:text-5xl font-serif italic font-extrabold text-[#ff4d6d] tracking-tight my-4 leading-tight">
          {question}
        </h1>

        {savedVote ? (
          /* Locked / Already Voted Screen */
          <div className="space-y-6 my-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4 text-rose-500" />
              <span>Voto registrado e confirmado</span>
            </div>

            {savedVote === 'sim' ? (
              <div className="p-5 bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 rounded-3xl border-2 border-rose-200 shadow-sm text-slate-800 space-y-3">
                <div className="flex items-center justify-center gap-2 text-xl font-serif font-extrabold text-[#ff4d6d]">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Sua resposta: SIM! 💕</span>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <p className="text-sm text-slate-700 font-medium">
                  Você já respondeu que sim! Seu coração foi conquistado ❤️
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onReopenModal?.('sim')}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#ff4d6d] hover:bg-rose-600 text-white font-bold text-sm rounded-full shadow-md shadow-rose-200 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ver Mensagem Especial</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 bg-slate-50 rounded-3xl border-2 border-slate-200 shadow-sm text-slate-800 space-y-3">
                <div className="flex items-center justify-center gap-2 text-xl font-serif font-extrabold text-slate-700">
                  <span>Sua resposta: Não 💔</span>
                </div>
                <p className="text-sm text-slate-600 font-medium">
                  Seu voto já foi registrado.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onReopenModal?.('nao')}
                    className="w-full sm:w-auto px-6 py-2.5 bg-slate-700 hover:bg-slate-800 text-white font-bold text-sm rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ver Mensagem</span>
                  </button>
                </div>
              </div>
            )}

            {onGoToMessages && (
              <button
                type="button"
                onClick={onGoToMessages}
                className="inline-flex items-center gap-2 text-sm font-semibold text-rose-500 hover:text-rose-700 hover:underline cursor-pointer pt-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Rever as mensagens e fotos da história 📖</span>
              </button>
            )}
          </div>
        ) : (
          /* Normal Interactive Voting Buttons (First Time) */
          <>
            <p className="text-sm sm:text-base text-slate-700 mb-6 font-light max-w-sm mx-auto">
              Chegamos ao momento mais especial... Escolha com o coração! ❤️
            </p>

            <div className="relative min-h-[80px] flex items-center justify-center gap-4 sm:gap-6 flex-wrap sm:flex-nowrap my-4">
              {/* SIM Button */}
              <button
                type="button"
                onClick={handleSim}
                className="z-20 px-8 sm:px-10 py-3.5 font-bold text-lg sm:text-xl rounded-full shadow-lg transition-all duration-200 flex items-center justify-center gap-2 bg-[#ff4d6d] hover:bg-rose-600 text-white shadow-rose-300/80 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <HeartHandshake className="w-5 h-5 fill-white/20" />
                <span>Sim! 💕</span>
              </button>

              {/* NÃO Button */}
              <button
                type="button"
                onClick={handleNao}
                className="px-8 sm:px-10 py-3.5 border-2 border-[#ff4d6d] text-[#ff4d6d] hover:bg-rose-50 select-none bg-white/80 rounded-full font-bold text-lg sm:text-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm"
              >
                <HeartCrack className="w-5 h-5" />
                <span>Não 💔</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
