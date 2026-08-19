import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Heart,
  HeartCrack,
  Clock,
  Calendar,
  Smartphone,
  X,
  RefreshCw,
  Users,
  CheckCircle2,
} from 'lucide-react';

export interface GlobalVoteItem {
  id: string;
  vote: 'sim' | 'nao';
  timestamp: string;
  device: string;
  ip?: string;
  userAgent?: string;
}

interface SecretVoteInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretVoteInfoModal: React.FC<SecretVoteInfoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [votes, setVotes] = useState<GlobalVoteItem[]>([]);
  const [total, setTotal] = useState(0);
  const [simCount, setSimCount] = useState(0);
  const [naoCount, setNaoCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchGlobalVotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/votes?_t=${Date.now()}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setVotes(data.votes || []);
          setTotal(data.total || 0);
          setSimCount(data.simCount || 0);
          setNaoCount(data.naoCount || 0);
          setLastRefreshed(new Date());
        }
      }
    } catch (err) {
      console.error('Failed to fetch global votes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchGlobalVotes();
      // Auto-poll every 4 seconds while open
      const interval = setInterval(fetchGlobalVotes, 4000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="glass-panel rounded-[32px] p-6 sm:p-8 max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border-2 border-pink-200 text-left relative overflow-hidden bg-white/98">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-pink-50 transition-colors cursor-pointer"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-pink-100 pb-4 mb-4 pr-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 font-serif">
                Painel Geral de Votos
              </h3>
              <p className="text-xs text-rose-500 font-medium">
                Visualização global de todos os que votaram
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchGlobalVotes}
            disabled={loading}
            className="p-2 text-rose-500 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
            title="Atualizar agora"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-center">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Total Votos
            </span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <Users className="w-4 h-4 text-slate-600" />
              <span className="text-xl font-extrabold text-slate-800">{total}</span>
            </div>
          </div>

          <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-center">
            <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider block">
              Votos SIM
            </span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <Heart className="w-4 h-4 text-[#ff4d6d] fill-[#ff4d6d]" />
              <span className="text-xl font-extrabold text-[#ff4d6d]">{simCount}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-100 border border-slate-200 rounded-2xl text-center">
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block">
              Votos NÃO
            </span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <HeartCrack className="w-4 h-4 text-slate-600" />
              <span className="text-xl font-extrabold text-slate-700">{naoCount}</span>
            </div>
          </div>
        </div>

        {/* Votes List Container */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 min-h-[220px] max-h-[380px] custom-scrollbar">
          {votes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center text-slate-400 p-4 border border-dashed border-slate-200 rounded-2xl">
              <Clock className="w-8 h-8 text-slate-300 mb-2 animate-pulse" />
              <p className="text-sm font-medium text-slate-600">Nenhum voto registrado ainda</p>
              <p className="text-xs text-slate-400 mt-1">
                Assim que alguém votar em SIM ou NÃO, aparecerá aqui instantaneamente com a data e horário!
              </p>
            </div>
          ) : (
            votes.map((item, index) => {
              const voteDate = new Date(item.timestamp);
              const formattedDate = voteDate.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              });
              const formattedTime = voteDate.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });

              return (
                <div
                  key={item.id || index}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    item.vote === 'sim'
                      ? 'bg-gradient-to-r from-rose-50/80 via-pink-50/60 to-rose-50/80 border-rose-200 shadow-sm'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      {item.vote === 'sim' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ff4d6d] text-white text-xs font-bold shadow-xs">
                          <Heart className="w-3 h-3 fill-white" />
                          VOTOU SIM 💕
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-700 text-white text-xs font-bold shadow-xs">
                          <HeartCrack className="w-3 h-3" />
                          VOTOU NÃO 💔
                        </span>
                      )}

                      {index === 0 && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-500 bg-rose-100/80 px-2 py-0.5 rounded-full">
                          Mais recente
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-slate-700 text-xs font-mono font-bold bg-white/80 px-2 py-0.5 rounded-md border border-slate-200/60">
                      <Clock className="w-3 h-3 text-rose-400" />
                      <span>{formattedTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2 pt-1.5 border-t border-slate-200/40">
                    <div className="flex items-center gap-1.5 font-medium text-slate-600">
                      <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.device || 'Dispositivo'}</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs text-slate-400">
          <span>
            Última checagem: {lastRefreshed.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-full shadow transition-all cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
