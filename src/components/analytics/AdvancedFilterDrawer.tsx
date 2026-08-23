'use client';

import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { useState, useEffect } from 'react';

interface AdvancedFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdvancedFilterDrawer({ isOpen, onClose }: AdvancedFilterDrawerProps) {
  const { searchParams, setFilter, clearAllFilters } = useUrlFilters();

  const [utmCampaign, setUtmCampaign] = useState(searchParams.get('utmCampaign') || '');
  const [minSale, setMinSale] = useState(searchParams.get('minSale') || '');
  const [maxSale, setMaxSale] = useState(searchParams.get('maxSale') || '');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    searchParams.get('status') ? searchParams.get('status')!.split(',') : []
  );

  useEffect(() => {
    setUtmCampaign(searchParams.get('utmCampaign') || '');
    setMinSale(searchParams.get('minSale') || '');
    setMaxSale(searchParams.get('maxSale') || '');
    setSelectedStatuses(
      searchParams.get('status') ? searchParams.get('status')!.split(',') : []
    );
  }, [searchParams]);

  if (!isOpen) return null;

  const handleApply = () => {
    setFilter('utmCampaign', utmCampaign || null);
    setFilter('minSale', minSale || null);
    setFilter('maxSale', maxSale || null);
    setFilter('status', selectedStatuses.length > 0 ? selectedStatuses.join(',') : null);
    onClose();
  };

  const toggleStatus = (st: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]
    );
  };

  const allStatuses = [
    { id: 'NOVO_LEAD', label: 'Novo Lead' },
    { id: 'EM_ATENDIMENTO', label: 'Em Atendimento' },
    { id: 'QUALIFICADO', label: 'Qualificado' },
    { id: 'PROPOSTA_ENVIADA', label: 'Proposta Enviada' },
    { id: 'VENDA_CONCLUIDA', label: 'Venda Concluída' },
    { id: 'PERDIDO_DESQUALIFICADO', label: 'Perdido / Desqualificado' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Filtros Avançados
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            {/* Status do Funil */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Status do Funil Comercial
              </label>
              <div className="grid grid-cols-2 gap-2">
                {allStatuses.map((st) => {
                  const isChecked = selectedStatuses.includes(st.id);
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => toggleStatus(st.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition ${
                        isChecked
                          ? 'border-violet-600 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="truncate">{st.label}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-violet-600 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* UTM Campaign */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Filtrar por UTM Campaign
              </label>
              <input
                type="text"
                value={utmCampaign}
                onChange={(e) => setUtmCampaign(e.target.value)}
                placeholder="Ex: black_week, lancamento_marco"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Range Financeiro */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Faixa de Valor da Venda (R$)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={minSale}
                  onChange={(e) => setMinSale(e.target.value)}
                  placeholder="Min (R$)"
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500"
                />
                <input
                  type="number"
                  value={maxSale}
                  onChange={(e) => setMaxSale(e.target.value)}
                  placeholder="Max (R$)"
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center justify-between">
            <button
              onClick={() => {
                clearAllFilters();
                setSelectedStatuses([]);
                setUtmCampaign('');
                setMinSale('');
                setMaxSale('');
                onClose();
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Resetar
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-700 shadow-md shadow-violet-600/20 transition active:scale-95"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
