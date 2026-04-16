"use client";

import { Eye, MessageCircle, Users, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

// Mock data for chart
const data = [
  { name: "Seg", views: 15, actions: 4 },
  { name: "Ter", views: 22, actions: 7 },
  { name: "Qua", views: 18, actions: 5 },
  { name: "Qui", views: 24, actions: 8 },
  { name: "Sex", views: 16, actions: 6 },
  { name: "Sáb", views: 19, actions: 4 },
  { name: "Dom", views: 10, actions: 3 },
];

export default function DashboardClient({ profile, initialLeads, stats }: any) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const gridColor = isDark ? "#1e293b" : "#e2e8f0";
  const axisColor = isDark ? "#475569" : "#94a3b8";
  const tooltipBg = isDark ? "#0f172a" : "#ffffff";
  const tooltipBorder = isDark ? "#1e293b" : "#e2e8f0";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Olá, {profile.displayName}!
          </h1>
          <p className="text-sm text-slate-500">Acompanhe o desempenho do seu perfil.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-[20px] p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide">
                Visualizações
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats.views}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 grid place-items-center shadow-lg shadow-blue-500/5">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <Activity className="w-3.5 h-3.5" />
            <span>+12% esta semana</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[20px] p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide">
                Cliques WhatsApp
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats.whatsappClicks}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 grid place-items-center shadow-lg shadow-emerald-500/5">
              <MessageCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-slate-500">
            Conversão: 29,8%
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[20px] p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide">
                Leads Reais (BD)
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats.leadsCount}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 dark:bg-violet-500/15 border border-violet-500/20 grid place-items-center shadow-lg shadow-violet-500/5">
              <Users className="w-6 h-6 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-slate-500">
            Total captado
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900 dark:text-white">Acessos à Vitrine</h3>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400">
              Últimos 7 dias
            </span>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  fontSize={12} 
                  stroke={axisColor}
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  fontSize={12} 
                  stroke={axisColor}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: `1px solid ${tooltipBorder}`, 
                    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.2)',
                    padding: '8px 12px',
                    background: tooltipBg,
                  }}
                  itemStyle={{ fontSize: '13px', fontWeight: 600, color: '#7c3aed' }}
                  labelStyle={{ color: axisColor, fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  name="Visualizações" 
                  dataKey="views" 
                  stroke="#7c3aed" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar: Últimos Leads Reais */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-900 dark:text-white">Últimos Leads</h3>
              <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-bold grid place-items-center">
                {initialLeads.length}
              </span>
            </div>

            <div className="space-y-3">
              {initialLeads.length > 0 ? (
                initialLeads.slice(0, 5).map((lead: any) => (
                  <div key={lead.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between group">
                    <div>
                      <p className="text-[13px] font-semibold text-slate-900 dark:text-white truncate max-w-[150px]">{lead.name}</p>
                      <p className="text-[11px] text-slate-500">{lead.revenue}</p>
                    </div>
                    <a 
                      href={`https://wa.me/${lead.phone}`}
                      target="_blank"
                      className="w-8 h-8 rounded-lg bg-emerald-500 grid place-items-center text-white"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 text-center py-4">Nenhum lead captado ainda.</p>
              )}
            </div>

            <a 
              href="/dashboard/leads"
              className="w-full mt-6 h-11 flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-lg shadow-violet-500/20 transition"
            >
              Ver todos os leads
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
