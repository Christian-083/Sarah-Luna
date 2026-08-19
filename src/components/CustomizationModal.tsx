import React, { useState } from 'react';
import { X, Save, Heart, Sparkles, RefreshCw } from 'lucide-react';
import { CustomConfig } from '../types';
import { DEFAULT_CONFIG } from '../data/defaultData';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CustomConfig;
  onSave: (newConfig: CustomConfig) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<CustomConfig>(config);
  const [activeTab, setActiveTab] = useState<'general' | 'messages'>('general');

  if (!isOpen) return null;

  const handleMessageChange = (index: number, field: string, value: string) => {
    const updatedMessages = [...formData.messages];
    updatedMessages[index] = {
      ...updatedMessages[index],
      [field]: value,
    };
    setFormData({ ...formData, messages: updatedMessages });
  };

  const handleReset = () => {
    setFormData(DEFAULT_CONFIG);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl border border-pink-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border-b border-pink-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-500 text-white rounded-xl shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                Personalizar Declaração
              </h3>
              <p className="text-xs text-slate-500">
                Ajuste os nomes, pergunta e frases românticas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/80 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-pink-100 bg-slate-50/50">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-3 text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
              activeTab === 'general'
                ? 'bg-white text-rose-600 border-b-2 border-rose-500'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Nomes e Pergunta
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('messages')}
            className={`flex-1 py-3 text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
              activeTab === 'messages'
                ? 'bg-white text-rose-600 border-b-2 border-rose-500'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Mensagens de Amor ({formData.messages.length})
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'general' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pergunta do Botão Central:
                </label>
                <input
                  type="text"
                  value={formData.mainQuestion}
                  onChange={(e) =>
                    setFormData({ ...formData, mainQuestion: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm"
                  placeholder="Ex: Conquistei você? ❤️"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome da Pessoa Amada (Para):
                  </label>
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) =>
                      setFormData({ ...formData, recipientName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm"
                    placeholder="Ex: Meu Amor / Maria"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Seu Nome (De):
                  </label>
                  <input
                    type="text"
                    value={formData.senderName}
                    onChange={(e) =>
                      setFormData({ ...formData, senderName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm"
                    placeholder="Ex: Seu Amor / João"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Data de Início do Relacionamento (Para contador de dias):
                </label>
                <input
                  type="date"
                  value={formData.relationshipDate}
                  onChange={(e) =>
                    setFormData({ ...formData, relationshipDate: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {formData.messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-600 bg-white px-2.5 py-1 rounded-full border border-pink-200">
                      Mensagem {idx + 1}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Título:
                    </label>
                    <input
                      type="text"
                      value={msg.title}
                      onChange={(e) =>
                        handleMessageChange(idx, 'title', e.target.value)
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-pink-200 focus:outline-none focus:ring-1 focus:ring-rose-400 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Texto da Mensagem:
                    </label>
                    <textarea
                      rows={3}
                      value={msg.text}
                      onChange={(e) =>
                        handleMessageChange(idx, 'text', e.target.value)
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-pink-200 focus:outline-none focus:ring-1 focus:ring-rose-400 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Citação ou Frase Curta:
                    </label>
                    <input
                      type="text"
                      value={msg.quote || ''}
                      onChange={(e) =>
                        handleMessageChange(idx, 'quote', e.target.value)
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-pink-200 focus:outline-none focus:ring-1 focus:ring-rose-400 text-xs italic"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons inside Form */}
          <div className="pt-4 border-t border-pink-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 text-xs text-slate-500 hover:text-slate-700 font-medium flex items-center gap-1 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Restaurar Padrão
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" /> Salvar Alterações
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
