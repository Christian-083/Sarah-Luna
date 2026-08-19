import React, { useState } from 'react';
import { FallingHearts } from './components/FallingHearts';
import { ConquestCard } from './components/ConquestCard';
import { RomanticMessages } from './components/RomanticMessages';
import { RomanticEnvelope } from './components/RomanticEnvelope';
import { AudioPlayer } from './components/AudioPlayer';
import { SecretVoteInfoModal } from './components/SecretVoteInfoModal';
import { DEFAULT_CONFIG } from './data/defaultData';
import { CustomConfig } from './types';
import { Sparkles, Heart, MessageCircle, HeartCrack, X } from 'lucide-react';

const VOTE_STORAGE_KEY = 'conquistei_voce_user_saved_vote';
const VOTE_TIME_STORAGE_KEY = 'conquistei_voce_user_vote_time';

export default function App() {
  const [savedVote, setSavedVote] = useState<'sim' | 'nao' | null>(() => {
    try {
      const stored = localStorage.getItem(VOTE_STORAGE_KEY);
      if (stored === 'sim' || stored === 'nao') return stored;
    } catch {
      // ignore
    }
    return null;
  });

  const [voteTime, setVoteTime] = useState<string | null>(() => {
    try {
      return localStorage.getItem(VOTE_TIME_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const [showSecretModal, setShowSecretModal] = useState(false);
  const [currentView, setCurrentView] = useState<'envelope' | 'messages' | 'conquest'>('envelope');

  const [activeModal, setActiveModal] = useState<'sim' | 'nao' | null>(null);
  const [config] = useState<CustomConfig>(DEFAULT_CONFIG);

  const whatsappPhone = '5583986326643';
  const whatsappSimUrl = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent('Conquistou ❤️')}`;
  const whatsappNaoUrl = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent('Não conquistou 💔')}`;

  const sendGlobalVote = async (vote: 'sim' | 'nao', clientTime: string) => {
    try {
      await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote, clientTime }),
      });
    } catch (err) {
      console.error('Error recording global vote:', err);
    }
  };

  const handleVoteSim = () => {
    const timeNow = new Date().toISOString();
    try {
      localStorage.setItem(VOTE_STORAGE_KEY, 'sim');
      localStorage.setItem(VOTE_TIME_STORAGE_KEY, timeNow);
    } catch {
      // ignore
    }
    setSavedVote('sim');
    setVoteTime(timeNow);
    setActiveModal('sim');
    sendGlobalVote('sim', timeNow);
  };

  const handleVoteNao = () => {
    const timeNow = new Date().toISOString();
    try {
      localStorage.setItem(VOTE_STORAGE_KEY, 'nao');
      localStorage.setItem(VOTE_TIME_STORAGE_KEY, timeNow);
    } catch {
      // ignore
    }
    setSavedVote('nao');
    setVoteTime(timeNow);
    setActiveModal('nao');
    sendGlobalVote('nao', timeNow);
  };

  return (
    <div className="min-h-screen bg-[#fff0f3] text-slate-800 font-sans relative overflow-x-hidden select-none flex flex-col justify-between">
      {/* Background Floating Heart Accents */}
      <div className="heart-float animate-float top-12 left-8" />
      <div className="heart-float animate-float top-1/4 right-10" style={{ animationDelay: '2s' }} />
      <div className="heart-float animate-float bottom-20 left-16" style={{ animationDelay: '4s' }} />

      {/* Minimalist Top Floating Audio Player */}
      <AudioPlayer playVictorySound={activeModal === 'sim' || savedVote === 'sim'} />

      {/* Falling Hearts Particle Canvas */}
      <FallingHearts density={40} />

      {/* Main Screen Content */}
      <main className="relative z-10 container mx-auto pt-6 sm:pt-10 pb-6 flex-1 flex flex-col justify-center">
        {currentView === 'envelope' ? (
          <RomanticEnvelope
            recipientName={config.recipientName}
            senderName={config.senderName}
            onOpen={() => setCurrentView('messages')}
          />
        ) : currentView === 'messages' ? (
          <RomanticMessages
            messages={config.messages}
            recipientName={config.recipientName}
            senderName={config.senderName}
            onGoToConquest={() => setCurrentView('conquest')}
            onGoToEnvelope={() => setCurrentView('envelope')}
          />
        ) : (
          <ConquestCard
            question={config.mainQuestion}
            onSimClick={handleVoteSim}
            onNaoClick={handleVoteNao}
            savedVote={savedVote}
            onReopenModal={(vote) => setActiveModal(vote)}
            onGoToMessages={() => setCurrentView('messages')}
          />
        )}
      </main>

      {/* Victory Celebration Modal (SIM) */}
      {activeModal === 'sim' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="glass-panel rounded-[36px] p-8 max-w-md w-full shadow-2xl border-2 border-white text-center relative overflow-hidden">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white/60 transition-colors cursor-pointer"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 bg-[#ffe5ec] rounded-full flex items-center justify-center mx-auto mb-4 text-[#ff4d6d] shadow-md shadow-pink-200">
              <Heart className="w-10 h-10 animate-bounce fill-[#ff4d6d] text-[#ff4d6d]" />
            </div>

            <h3 className="text-3xl font-serif italic font-extrabold text-[#ff4d6d]">
              Você disse SIM! 💕
            </h3>
            <p className="text-xl font-extrabold text-rose-500 mt-1 font-serif tracking-wide">
              EbaAaAaa 🎉
            </p>

            <div className="my-4 p-5 bg-gradient-to-r from-[#ffe5ec] via-pink-50 to-[#ffe5ec] border-2 border-dashed border-[#ffb3c1] rounded-2xl text-slate-800 shadow-inner">
              <p className="text-lg font-bold text-[#ff4d6d] font-serif mb-2">
                Você conquistou meu coração! ❤️
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                Que seja da vontade de Deus a gente ficar junto, você é uma menina incrível!
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={whatsappSimUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2 text-base active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Enviar Mensagem no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Rejection / Sad Modal (NÃO) */}
      {activeModal === 'nao' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="glass-panel rounded-[36px] p-8 max-w-md w-full shadow-2xl border-2 border-white text-center relative overflow-hidden">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white/60 transition-colors cursor-pointer"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500 shadow-inner">
              <HeartCrack className="w-10 h-10 text-slate-600" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif italic font-extrabold text-slate-800">
              Não conquistou 💔
            </h3>

            <div className="my-5 p-5 bg-gradient-to-r from-slate-50 via-rose-50/40 to-slate-50 border-2 border-dashed border-slate-300 rounded-2xl text-slate-800 shadow-inner">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                É uma pena, mas foi bom nossa caminhada até aqui, agradeço por tudo!
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={whatsappNaoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2 text-base active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Enviar Mensagem no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Painel Geral de Votos (Disparado pelo clique na estrelinha) */}
      <SecretVoteInfoModal
        isOpen={showSecretModal}
        onClose={() => setShowSecretModal(false)}
      />

      {/* Subtle Footer with clickable Star */}
      <footer className="relative z-10 py-4 text-center text-xs text-rose-400 font-light flex items-center justify-center gap-1.5">
        <span>Feito com muito carinho</span>
        <button
          type="button"
          onClick={() => setShowSecretModal(true)}
          className="p-1 -m-1 text-rose-400 hover:text-rose-600 hover:scale-125 active:scale-95 transition-transform cursor-pointer focus:outline-none"
          title="Ver Painel Geral de Votos"
        >
          <Sparkles className="w-4 h-4 text-rose-400 hover:text-rose-600 animate-pulse" />
        </button>
      </footer>
    </div>
  );
}
