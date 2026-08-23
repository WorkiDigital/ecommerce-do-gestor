'use client';

import { useState } from 'react';
import { X, Copy, Check, Share2, Sparkles, MessageCircle, FileText } from 'lucide-react';

interface ReportGeneratorModalProps {
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

export function ReportGeneratorModal({
  isOpen,
  onClose,
  accountName = 'Conta de Performance',
  clientName = 'Cliente',
  metrics,
}: ReportGeneratorModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const formatCurrency = (val: number) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const whatsappMessage = `*📊 Relatório de Performance de Tráfego Pago*
*Cliente:* ${clientName}
*Conta:* ${accountName}
*Data:* ${new Date().toLocaleDateString('pt-BR')}

━━━━━━━━━━━━━━━━━━━━
💰 *Faturamento Gerado:* ${formatCurrency(metrics.revenue)}
🚀 *ROAS Real:* ${metrics.roas.toFixed(2)}x
🎯 *Vendas Concluídas:* ${metrics.salesCount}
👥 *Leads Capturados:* ${metrics.leads}
📈 *Taxa de Conversão:* ${metrics.conversionRate.toFixed(1)}%
💳 *Investimento Total:* ${formatCurrency(metrics.investment)}
🏷️ *Custo por Aquisição (CAC):* ${formatCurrency(metrics.cac)}
━━━━━━━━━━━━━━━━━━━━

✨ *Diagnóstico do Gestor:*
A operação está rodando com alta eficiência e retroalimentação de conversões Meta CAPI ativa. Seguimos com as otimizações diárias de criativos e escala controlada.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Gerador de Relatório em 1 Clique
              </h3>
              <p className="text-[11px] text-slate-500">
                Texto formatado pronto para envio direto no WhatsApp
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
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap max-h-72 overflow-y-auto select-all">
            {whatsappMessage}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copiado!' : 'Copiar Texto'}
          </button>

          <button
            onClick={handleOpenWhatsApp}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Enviar no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
