import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  Mail,
} from 'lucide-react';
import { RomanticMessage } from '../types';

interface RomanticMessagesProps {
  messages: RomanticMessage[];
  onGoToConquest: () => void;
  onGoToEnvelope?: () => void;
  recipientName?: string;
  senderName?: string;
}

export const RomanticMessages: React.FC<RomanticMessagesProps> = ({
  messages,
  onGoToConquest,
  onGoToEnvelope,
  recipientName = 'Sarah Luna',
  senderName = 'Christian',
}) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMsg = messages[currentIndex] || messages[0];
  const activeImage = currentMsg.imageUrl;

  const handleNext = () => {
    if (currentIndex < messages.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Transition to the "Conquistei você?" screen
      onGoToConquest();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setShowIntro(true);
    }
  };

  if (showIntro) {
    return (
      <div className="relative z-10 max-w-lg mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full glass-panel rounded-[32px] sm:rounded-[40px] p-8 sm:p-10 shadow-2xl border border-white/80 text-center flex flex-col items-center gap-6 animate-fade-in">
          {/* Animated Heart Banner */}
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center shadow-inner relative mx-auto">
            <Heart className="w-10 h-10 fill-rose-500 text-rose-500 animate-pulse" />
            <Sparkles className="w-5 h-5 text-amber-400 absolute -top-1 -right-1 animate-bounce" />
          </div>

          <div className="space-y-2 w-full flex flex-col items-center justify-center text-center my-2">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-rose-400 font-semibold">
              Especialmente para
            </span>

            <h1 className="text-4xl sm:text-5xl font-serif italic font-extrabold text-[#ff4d6d] tracking-tight leading-tight">
              {recipientName}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-sm mx-auto pt-1">
              Feito com muito carinho, espero que goste ❤️
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center mt-2">
            {onGoToEnvelope && (
              <button
                type="button"
                onClick={onGoToEnvelope}
                className="px-5 py-3 rounded-full text-slate-600 hover:text-rose-500 bg-white/80 hover:bg-white border border-pink-200 text-sm font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
              >
                <Mail className="w-4 h-4 text-rose-400" />
                <span>Ver Envelope</span>
              </button>
            )}

            <button
              onClick={() => {
                const bgMusic = document.getElementById('bg-music-player') as HTMLAudioElement | null;
                if (bgMusic) {
                  bgMusic.play().catch(e => console.log('Autoplay blocked:', e));
                }
                setShowIntro(false);
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-[#ff4d6d] to-rose-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-base sm:text-lg rounded-full shadow-lg shadow-rose-300 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              <span>Continuar ❤️</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderFormattedText = (content: string) => {
    if (!content) return null;
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return (
    <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Progress Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mb-6 w-full">
        {messages.map((msg, index) => (
          <button
            key={msg.id}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? 'w-8 bg-rose-500 shadow-sm shadow-rose-300'
                : index < currentIndex
                ? 'w-2.5 bg-rose-300'
                : 'w-2.5 bg-pink-100 hover:bg-pink-200'
            }`}
            title={`Ir para mensagem ${index + 1}`}
          />
        ))}
      </div>

      {/* Main Message Card */}
      <div className="w-full glass-panel rounded-[32px] sm:rounded-[40px] shadow-2xl border border-white/80 overflow-hidden transition-all duration-300">
        {/* Card Header */}
        <div className="p-6 sm:p-8 border-b border-pink-100/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#ff4d6d] tracking-wider uppercase bg-[#ffe5ec] px-3 py-1 rounded-full border border-[#ffb3c1]">
              {currentMsg.subtitle || `Capítulo ${currentIndex + 1}`}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif italic font-extrabold text-[#ff4d6d] tracking-tight mt-1">
            {currentMsg.title}
          </h2>

          <p className="mt-4 text-slate-800 leading-relaxed text-base sm:text-lg font-normal">
            {renderFormattedText(currentMsg.text)}
          </p>
        </div>

        {/* Photo Container Underneath */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-[#ffe5ec]/30 to-white/60">
          <div className="relative group rounded-2xl overflow-hidden shadow-md border-2 border-white bg-slate-100 aspect-video sm:aspect-[16/9] flex items-center justify-center">
            <img
              src={activeImage}
              alt={currentMsg.imageAlt || 'Foto da história'}
              style={{ objectPosition: currentMsg.imagePosition || 'center' }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Card Footer & Navigation */}
        <div className="p-6 bg-white/70 border-t border-pink-100 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            className="px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-1.5 transition-all cursor-pointer bg-white hover:bg-slate-100 text-slate-700 shadow-2xs border border-slate-200"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{currentIndex === 0 ? 'Início' : 'Anterior'}</span>
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-[#ff4d6d] to-rose-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg shadow-rose-200 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <span>
              {currentIndex < messages.length - 1 ? 'Próxima Mensagem' : 'Responder Pergunta Especial ❤️'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
