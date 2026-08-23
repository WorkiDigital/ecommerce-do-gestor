'use client';

import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Target, 
  PieChart, 
  ArrowUpRight, 
  Sparkles 
} from 'lucide-react';

interface MetricCardsSummaryProps {
  metrics: {
    investment: number;
    leads: number;
    cpl: number;
    salesCount: number;
    revenue: number;
    cac: number;
    roas: number;
    conversionRate: number;
  };
}

export function MetricCardsSummary({ metrics }: MetricCardsSummaryProps) {
  const formatCurrency = (val: number) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const cards = [
    {
      title: 'Investimento em Anúncios',
      value: formatCurrency(metrics.investment),
      subtitle: 'Meta & Google Ads',
      icon: DollarSign,
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      textColor: 'text-blue-700 dark:text-blue-400',
    },
    {
      title: 'Leads Capturados',
      value: metrics.leads.toLocaleString('pt-BR'),
      subtitle: `CPL Médio: ${formatCurrency(metrics.cpl)}`,
      icon: Users,
      color: 'from-violet-600 to-purple-600',
      bgColor: 'bg-violet-50 dark:bg-violet-950/30',
      textColor: 'text-violet-700 dark:text-violet-400',
      badge: 'WhatsApp / LP',
    },
    {
      title: 'Vendas Concluídas',
      value: metrics.salesCount.toLocaleString('pt-BR'),
      subtitle: `Taxa Conv.: ${metrics.conversionRate.toFixed(1)}%`,
      icon: ShoppingCart,
      color: 'from-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
      textColor: 'text-emerald-700 dark:text-emerald-400',
      badge: 'Atribuição Direta',
    },
    {
      title: 'Faturamento Total',
      value: formatCurrency(metrics.revenue),
      subtitle: `CAC: ${formatCurrency(metrics.cac)}`,
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/30',
      textColor: 'text-amber-700 dark:text-amber-400',
    },
    {
      title: 'ROAS Real',
      value: `${metrics.roas.toFixed(2)}x`,
      subtitle: metrics.roas >= 3.0 ? 'Alta Rentabilidade 🔥' : 'Em Otimização',
      icon: Target,
      color: metrics.roas >= 3.0 ? 'from-emerald-600 to-green-600' : 'from-slate-600 to-slate-700',
      bgColor: metrics.roas >= 3.0 ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-slate-50 dark:bg-slate-800/40',
      textColor: metrics.roas >= 3.0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300',
      highlight: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={i}
            className={`relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition group overflow-hidden ${
              c.highlight ? 'ring-2 ring-emerald-500/20' : ''
            }`}
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -mt-3 -mr-3 w-20 h-20 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-xl group-hover:scale-125 transition" />

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {c.title}
              </span>
              <div className={`p-2 rounded-xl ${c.bgColor} ${c.textColor}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {c.value}
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>{c.subtitle}</span>
                {c.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                    {c.badge}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
