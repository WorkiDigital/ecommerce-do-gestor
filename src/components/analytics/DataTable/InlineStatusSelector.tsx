'use client';

import { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  FileText, 
  DollarSign, 
  XCircle, 
  Sparkles,
  Loader2,
  ChevronDown
} from 'lucide-react';

interface InlineStatusSelectorProps {
  leadId: string;
  currentStatus: string;
  currentSaleValue?: number | null;
  capiSynced?: boolean;
  onStatusUpdated?: (newStatus: string, newSaleValue?: number, capiSynced?: boolean) => void;
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  NOVO_LEAD: {
    label: 'Novo Lead',
    color: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    icon: Clock,
  },
  EM_ATENDIMENTO: {
    label: 'Em Atendimento',
    color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    icon: Clock,
  },
  QUALIFICADO: {
    label: 'Qualificado',
    color: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    icon: UserCheck,
  },
  PROPOSTA_ENVIADA: {
    label: 'Proposta Enviada',
    color: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    icon: FileText,
  },
  VENDA_CONCLUIDA: {
    label: 'Venda Concluída',
    color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    icon: DollarSign,
  },
  PERDIDO_DESQUALIFICADO: {
    label: 'Perdido',
    color: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    icon: XCircle,
  },
};

export function InlineStatusSelector({
  leadId,
  currentStatus,
  currentSaleValue,
  capiSynced,
  onStatusUpdated,
}: InlineStatusSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [saleInput, setSaleInput] = useState(currentSaleValue ? String(currentSaleValue) : '497.00');

  const config = statusConfig[status] || statusConfig.NOVO_LEAD;
  const Icon = config.icon;

  const handleSelectStatus = async (newStatus: string) => {
    setIsOpen(false);
    if (newStatus === 'VENDA_CONCLUIDA') {
      setShowSaleModal(true);
      return;
    }

    await updateStatus(newStatus);
  };

  const updateStatus = async (newStatus: string, saleVal?: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          saleValue: saleVal,
          syncCapi: newStatus === 'VENDA_CONCLUIDA',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus(newStatus);
        onStatusUpdated?.(newStatus, saleVal, data.lead.capiSynced);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setLoading(false);
      setShowSaleModal(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={loading}
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition ${config.color} hover:opacity-80 active:scale-95`}
        >
          {loading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Icon className="w-3.5 h-3.5" />
          )}
          <span>{config.label}</span>
          <ChevronDown className="w-3 h-3 opacity-60" />
        </button>

        {capiSynced && (
          <span
            title="Sinal de conversão enviado para Meta CAPI com sucesso"
            className="inline-flex items-center justify-center p-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
          >
            <Sparkles className="w-3 h-3" />
          </span>
        )}
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-1 w-48 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 z-30 py-1.5 overflow-hidden">
            {Object.entries(statusConfig).map(([key, item]) => {
              const ItemIcon = item.icon;
              return (
                <button
                  key={key}
                  onClick={() => handleSelectStatus(key)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/80 transition text-left ${
                    key === status ? 'text-violet-600 font-bold bg-violet-50/50 dark:bg-violet-950/20' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <ItemIcon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Modal de confirmação de venda e disparo CAPI */}
      {showSaleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Registrar Venda Concluída
                </h3>
                <p className="text-xs text-slate-500">
                  O evento de Purchase será enviado automaticamente via Meta CAPI.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Valor da Venda (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={saleInput}
                onChange={(e) => setSaleInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Ex: 497.00"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSaleModal(false)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => updateStatus('VENDA_CONCLUIDA', parseFloat(saleInput) || 0)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Salvar & Disparar CAPI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
