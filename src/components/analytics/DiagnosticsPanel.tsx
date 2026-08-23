'use client';

import { 
  AlertTriangle, 
  AlertCircle, 
  TrendingUp, 
  ShieldAlert, 
  ChevronRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { DiagnosticAlert } from '@/lib/diagnostics';
import { useState } from 'react';

interface DiagnosticsPanelProps {
  diagnostics: DiagnosticAlert[];
}

export function DiagnosticsPanel({ diagnostics }: DiagnosticsPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!diagnostics || diagnostics.length === 0) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-sm">
        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
        <p className="font-semibold">
          Excelente! Nenhum gargalo operacional ou anomalia de sinal CAPI detectada no momento.
        </p>
      </div>
    );
  }

  const getBadge = (type: DiagnosticAlert['type']) => {
    switch (type) {
      case 'error':
        return {
          icon: AlertCircle,
          color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
          border: 'border-rose-200/80 dark:border-rose-900/40',
        };
      case 'opportunity':
        return {
          icon: TrendingUp,
          color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          border: 'border-emerald-200/80 dark:border-emerald-900/40',
        };
      case 'warning':
      default:
        return {
          icon: AlertTriangle,
          color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          border: 'border-amber-200/80 dark:border-amber-900/40',
        };
    }
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-violet-600 text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Diagnósticos & Alertas Proativos da Conta
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300">
                {diagnostics.length} {diagnostics.length === 1 ? 'Alerta' : 'Alertas'}
              </span>
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Análise em tempo real de fadiga de anúncios, gargalos de atendimento e integridade de conversão CAPI.
            </p>
          </div>
        </div>
        <ChevronRight
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>

      {/* Alert Cards Grid */}
      {isOpen && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-slate-100 dark:border-slate-800">
          {diagnostics.map((d, index) => {
            const style = getBadge(d.type);
            const Icon = style.icon;
            return (
              <div
                key={index}
                className={`p-4 rounded-xl border ${style.border} bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between gap-3 hover:bg-slate-100/60 dark:hover:bg-slate-800/80 transition`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold border ${style.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {d.code}
                    </span>
                    {d.affectedCount !== undefined && (
                      <span className="text-[11px] font-semibold text-slate-500">
                        {d.affectedCount} afetados
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {d.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                    {d.condition}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60">
                  <div className="text-[11px] font-semibold text-violet-700 dark:text-violet-400 flex items-start gap-1.5">
                    <span className="font-bold uppercase tracking-wider text-[9px] px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 shrink-0">
                      Ação
                    </span>
                    <span>{d.action}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
