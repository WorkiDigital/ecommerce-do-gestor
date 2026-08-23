'use client';

import { X, ExternalLink, Sparkles, Tag, Film, Image as ImageIcon, Layers } from 'lucide-react';

interface CreativePreviewModalProps {
  ad: {
    id: string;
    name: string;
    mediaType?: 'IMAGE' | 'VIDEO' | 'CAROUSEL' | null;
    creativeUrl?: string | null;
    thumbnailUrl?: string | null;
    hookCategory?: string | null;
    adSet?: {
      name: string;
      campaign?: {
        name: string;
      };
    };
  } | null;
  onClose: () => void;
}

export function CreativePreviewModal({ ad, onClose }: CreativePreviewModalProps) {
  if (!ad) return null;

  const getMediaIcon = () => {
    switch (ad.mediaType) {
      case 'VIDEO':
        return Film;
      case 'CAROUSEL':
        return Layers;
      case 'IMAGE':
      default:
        return ImageIcon;
    }
  };

  const MediaIcon = getMediaIcon();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
              <MediaIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs">
                {ad.name}
              </h3>
              <p className="text-[11px] text-slate-500">
                {ad.mediaType || 'CRIATIVO'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Creative Media Preview */}
          <div className="relative aspect-video sm:aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-200/50 dark:border-slate-800">
            {ad.creativeUrl ? (
              <img
                src={ad.creativeUrl}
                alt={ad.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-6 text-slate-500">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-xs">Pré-visualização de imagem não disponível</p>
              </div>
            )}

            {ad.hookCategory && (
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1.5 border border-white/10 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Ângulo: {ad.hookCategory}
              </div>
            )}
          </div>

          {/* Ad Metadata Hierarchy */}
          <div className="space-y-2.5 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Campanha
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {ad.adSet?.campaign?.name || 'Campanha Desconhecida'}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Conjunto de Anúncios (AdSet)
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {ad.adSet?.name || 'Público Padrão'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
