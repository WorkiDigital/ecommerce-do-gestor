'use client';

import { 
  Building2, 
  Calendar, 
  Sparkles, 
  SlidersHorizontal, 
  Columns3, 
  Bookmark, 
  Presentation, 
  FileText,
  Flame,
  AlertTriangle,
  DollarSign,
  Clock
} from 'lucide-react';
import { useUrlFilters } from '@/hooks/useUrlFilters';

interface AnalyticsHeaderProps {
  accounts: Array<{ id: string; name: string; clientName: string; platform: string }>;
  selectedAccountId?: string;
  onOpenAdvancedFilters: () => void;
  onOpenColumnSelector: () => void;
  onOpenPresentationMode: () => void;
  onOpenReportGenerator: () => void;
}

export function AnalyticsHeader({
  accounts,
  selectedAccountId,
  onOpenAdvancedFilters,
  onOpenColumnSelector,
  onOpenPresentationMode,
  onOpenReportGenerator,
}: AnalyticsHeaderProps) {
  const { searchParams, setFilter } = useUrlFilters();
  const currentRange = searchParams.get('rangePreset') || '7d';

  const applyDatePreset = (preset: string) => {
    const to = new Date().toISOString();
    let fromDate = new Date();

    if (preset === 'today') {
      fromDate.setHours(0, 0, 0, 0);
    } else if (preset === 'yesterday') {
      fromDate.setDate(fromDate.getDate() - 1);
      fromDate.setHours(0, 0, 0, 0);
    } else if (preset === '7d') {
      fromDate.setDate(fromDate.getDate() - 7);
    } else if (preset === '30d') {
      fromDate.setDate(fromDate.getDate() - 30);
    } else if (preset === 'month') {
      fromDate.setDate(1);
      fromDate.setHours(0, 0, 0, 0);
    }

    setFilter('rangePreset', preset);
    setFilter('from', fromDate.toISOString());
    setFilter('to', to);
  };

  const applyFactoryPreset = (presetType: string) => {
    if (presetType === 'high_roas') {
      setFilter('preset', 'high_roas');
      setFilter('status', 'VENDA_CONCLUIDA');
    } else if (presetType === 'capi_unsynced') {
      setFilter('preset', 'capi_unsynced');
      setFilter('status', 'VENDA_CONCLUIDA');
      setFilter('capiSynced', 'false');
    } else if (presetType === 'unresponsive') {
      setFilter('preset', 'unresponsive');
      setFilter('status', 'NOVO_LEAD');
    } else if (presetType === 'creative_fatigue') {
      setFilter('preset', 'creative_fatigue');
      setFilter('sortField', 'createdAt');
      setFilter('sortDir', 'asc');
    }
  };

  return (
    <div className="space-y-4">
      {/* Top action bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {/* Account Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <Building2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <select
              value={selectedAccountId || ''}
              onChange={(e) => setFilter('accountId', e.target.value || null)}
              className="bg-transparent text-sm font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
            >
              <option value="">Todas as Contas de Anúncio</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.clientName} — {acc.name} ({acc.platform})
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <div className="px-2 py-1 flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            {[
              { id: 'today', label: 'Hoje' },
              { id: '7d', label: '7D' },
              { id: '30d', label: '30D' },
              { id: 'month', label: 'Este Mês' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => applyDatePreset(p.id)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  currentRange === p.id
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-400'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenPresentationMode}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm shadow-emerald-600/20 hover:opacity-95 transition active:scale-95"
          >
            <Presentation className="w-4 h-4" />
            Modo Cliente
          </button>

          <button
            onClick={onOpenReportGenerator}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-500/20 hover:bg-violet-100 transition active:scale-95"
          >
            <FileText className="w-4 h-4" />
            Relatório WhatsApp
          </button>

          <button
            onClick={onOpenAdvancedFilters}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>

          <button
            onClick={onOpenColumnSelector}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <Columns3 className="w-4 h-4" />
            Colunas
          </button>
        </div>
      </div>

      {/* Recommended Factory Quick Presets Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="flex items-center gap-1 font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap mr-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Presets Rápidos:
        </span>

        <button
          onClick={() => applyFactoryPreset('high_roas')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200/60 dark:border-orange-800/40 hover:bg-orange-100 transition whitespace-nowrap font-medium"
        >
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          🔥 Alta Performance (Vendas)
        </button>

        <button
          onClick={() => applyFactoryPreset('creative_fatigue')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40 hover:bg-amber-100 transition whitespace-nowrap font-medium"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          ⚠️ Alerta de Fadiga
        </button>

        <button
          onClick={() => applyFactoryPreset('capi_unsynced')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40 hover:bg-blue-100 transition whitespace-nowrap font-medium"
        >
          <DollarSign className="w-3.5 h-3.5 text-blue-500" />
          💰 Vendas Não Sincronizadas (CAPI)
        </button>

        <button
          onClick={() => applyFactoryPreset('unresponsive')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/40 hover:bg-rose-100 transition whitespace-nowrap font-medium"
        >
          <Clock className="w-3.5 h-3.5 text-rose-500" />
          ⏳ Leads Sem Resposta
        </button>
      </div>
    </div>
  );
}
