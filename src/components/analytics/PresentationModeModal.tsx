'use client';

import { X, TrendingUp, DollarSign, Target, Award, Users, ShoppingCart, Sparkles, CheckCircle2 } from 'lucide-react';

interface PresentationModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountName?: string;
  clientName?: string;
  metrics: {
    investment: number;
    leads: number;
    salesCount: number;
    revenue: number;
    cac: number;
    roas: number;
    conversionRate: number;
  };
}

export function PresentationModeModal({
  isOpen,
  onClose,
  accountName = 'Conta de Performance',
  clientName = 'Cliente',
  metrics,
}: PresentationModeModalProps) {
  if (!isOpen) return null;

  const formatCurrency = (val: number) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const netProfit = Math.max(metrics.revenue - metrics.investment, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full shadow-2xl p-6 sm:p-10 space-y-8 text-white relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-2xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Visão Executiva de Resultados
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {clientName} — <span className="text-slate-400 font-normal">{accountName}</span>
            </h1>
          </div>
          <div className="text-right sm:text-right">
            <span className="text-xs text-slate-400 block font-medium">Lucro Bruto Gerado</span>
            <span className="text-2xl font-black text-emerald-400">
              +{formatCurrency(netProfit)}
            </span>
          </div>
        </div>

        {/* Big Impact Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Faturamento */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-800/40 border border-slate-700/60 flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Faturamento Gerado
            </span>
            <div className="my-4">
              <span className="text-4xl font-black text-white tracking-tight">
                {formatCurrency(metrics.revenue)}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {metrics.salesCount} vendas fechadas no período
            </p>
          </div>

          {/* ROAS Real */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex flex-col justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Retorno sobre Anúncios (ROAS)
            </span>
            <div className="my-4">
              <span className="text-5xl font-black text-emerald-400 tracking-tight">
                {metrics.roas.toFixed(2)}x
              </span>
            </div>
            <p className="text-xs text-emerald-300">
              Para cada R$ 1,00 investido, retornaram R$ {metrics.roas.toFixed(2)}
            </p>
          </div>

          {/* CAC */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-800/40 border border-slate-700/60 flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Custo de Aquisição (CAC)
            </span>
            <div className="my-4">
              <span className="text-4xl font-black text-white tracking-tight">
                {formatCurrency(metrics.cac)}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Investimento total de {formatCurrency(metrics.investment)}
            </p>
          </div>
        </div>

        {/* Funnel Metrics Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-slate-950/50 border border-slate-800/80">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Total de Leads</span>
            <span className="text-xl font-bold text-white mt-1 block">
              {metrics.leads.toLocaleString('pt-BR')}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Taxa de Conversão</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">
              {metrics.conversionRate.toFixed(1)}%
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Ticket Médio</span>
            <span className="text-xl font-bold text-white mt-1 block">
              {formatCurrency(metrics.salesCount > 0 ? metrics.revenue / metrics.salesCount : 0)}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Status da Operação</span>
            <span className="text-sm font-bold text-emerald-400 mt-1 block flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Altamente Lucrativa
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-white text-slate-950 text-xs font-bold hover:bg-slate-200 transition"
          >
            Sair do Modo Apresentação
          </button>
        </div>
      </div>
    </div>
  );
}
