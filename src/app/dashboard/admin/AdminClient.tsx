"use client";

import { useState, useMemo } from "react";
import { 
  CheckCircle, 
  XCircle, 
  User, 
  ShieldCheck, 
  ShieldAlert, 
  Zap, 
  Search, 
  AlertTriangle,
  Mail,
  Phone,
  Eye,
  ArrowUpRight,
  Users,
  Star,
  Activity,
  Filter,
  Users2
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { toggleUserVerification, toggleUserPro, toggleUserStatus, toggleUserFeatured } from "@/app/actions/admin";

interface AdminClientProps {
  initialUsers: any[];
  globalStats: {
    totalUsers: number;
    totalLeads: number;
    totalViews: number;
    activeProfiles: number;
  };
  isAdminMaster: boolean;
}

// Mock data para o gráfico de crescimento (idealmente viria do banco)
const growthData = [
  { name: "Seg", users: 4 },
  { name: "Ter", users: 7 },
  { name: "Qua", users: 5 },
  { name: "Qui", users: 9 },
  { name: "Sex", users: 12 },
  { name: "Sáb", users: 8 },
  { name: "Dom", users: 15 },
];

export default function AdminClient({ initialUsers, globalStats, isAdminMaster }: AdminClientProps) {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  
  // Filtros
  const [filterPlan, setFilterPlan] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.profile?.displayName?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPlan = filterPlan === "all" || user.profile?.plan === filterPlan;
      const matchesStatus = filterStatus === "all" || user.status === filterStatus;

      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [users, searchTerm, filterPlan, filterStatus]);

  const handleAction = async (userId: string, profileId: string | undefined, action: "verify" | "pro" | "status" | "featured") => {
    setLoadingId(`${userId}-${action}`);
    
    let result;
    if (action === "verify" && profileId) result = await toggleUserVerification(profileId);
    if (action === "pro" && profileId) result = await toggleUserPro(profileId);
    if (action === "featured" && profileId) result = await toggleUserFeatured(profileId);
    if (action === "status") result = await toggleUserStatus(userId);

    if (result?.success) {
      setUsers(prev => prev.map(u => {
        if (u.id === userId) {
          if (action === "status") return { ...u, status: u.status === "BANNED" ? "ACTIVE" : "BANNED" };
          if (action === "verify" && u.profile) return { ...u, profile: { ...u.profile, isVerified: !u.profile.isVerified } };
          if (action === "pro" && u.profile) return { ...u, profile: { ...u.profile, plan: u.profile.plan === "pro" ? "free" : "pro" } };
          if (action === "featured" && u.profile) return { ...u, profile: { ...u.profile, isFeatured: !u.profile.isFeatured } };
        }
        return u;
      }));
    } else {
      alert(result?.error || "Erro ao realizar ação");
    }

    setLoadingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            Central de Comando
            {isAdminMaster && <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">Master Access</span>}
          </h1>
          <p className="text-slate-500 mt-1">Gestão global de usuários, métricas e moderação da plataforma.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Usuários */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Usuários</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{globalStats.totalUsers}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 grid place-items-center">
              <Users2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-500">
            <Activity className="w-3 h-3" />
            <span>+8% este mês</span>
          </div>
        </div>

        {/* Gestores Ativos */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Gestores Ativos</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{globalStats.activeProfiles}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 grid place-items-center">
              <ShieldCheck className="w-6 h-6 text-violet-600" />
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500 font-medium">Contas com perfil público</p>
        </div>

        {/* Leads Totais */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Leads Gerados</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{globalStats.totalLeads}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 grid place-items-center">
              <Zap className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500 font-medium">Volume total da plataforma</p>
        </div>

        {/* Visualizações */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Visualizações</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{globalStats.totalViews}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 grid place-items-center">
              <Eye className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500 font-medium">Tráfego total na vitrine</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Gráfico de Crescimento */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Crescimento de Gestores</h3>
              <p className="text-xs text-slate-500">Novos cadastros nos últimos 7 dias</p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-full">
                <Users className="w-3.5 h-3.5" />
                Novos hoje: 15
              </span>
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} stroke="#94a3b8" dy={10} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '12px',
                    background: '#1e293b',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-slate-900 dark:bg-slate-900 rounded-[32px] p-8 text-white flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-bold flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros Rápidos
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Nome ou e-mail..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-800 border-none rounded-xl h-11 pl-10 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Plano</label>
                <select 
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                  className="w-full bg-slate-800 border-none rounded-xl h-11 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                  <option value="all">Todos os Planos</option>
                  <option value="free">Free</option>
                  <option value="pro">Pro</option>
                  <option value="agency">Agency</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Status</label>
                <select 
                   value={filterStatus}
                   onChange={(e) => setFilterStatus(e.target.value)}
                   className="w-full bg-slate-800 border-none rounded-xl h-11 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                  <option value="all">Todos os Status</option>
                  <option value="ACTIVE">Ativo</option>
                  <option value="BANNED">Banido</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500 italic">Total filtrado: {filteredUsers.length} registros</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/20 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Usuário/Gestor</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">Status</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">Selo/Plano</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Métricas</th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden shrink-0">
                        {user.profile?.avatarUrl ? (
                          <img src={user.profile.avatarUrl} className="w-full h-full object-cover" />
                        ) : <User className="w-5 h-5" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 truncate">
                          {user.profile?.displayName || user.name}
                          {user.role === "ADMIN" && <span className="text-[10px] bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full uppercase font-bold border border-red-500/10 shrink-0">Admin</span>}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-0.5 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1 truncate"><Mail className="w-3 h-3" /> {user.email}</span>
                          {user.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {user.phone}</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                      user.status === "ACTIVE" 
                        ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/10"
                        : "bg-red-500/5 text-red-600 border-red-500/10"
                    }`}>
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        user.profile?.plan === "pro"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                      }`}>
                        {user.profile?.plan || "free"}
                      </span>
                      {user.profile?.isVerified && (
                        <span className="p-1 bg-blue-500/10 text-blue-600 rounded-lg" title="Perfil Verificado">
                          <ShieldCheck className="w-4 h-4 fill-current" />
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-[12px] font-medium text-slate-600 dark:text-slate-300">
                      <span className="flex items-center gap-1.5" title="Visualizações">
                        <Eye className="w-3.5 h-3.5 text-blue-500" /> 
                        {user.profile?.views || 0}
                      </span>
                      <span className="flex items-center gap-1.5" title="Leads">
                        <Users className="w-3.5 h-3.5 text-violet-500" /> 
                        {user.profile?._count?.leads || 0}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {user.profile && (
                        <>
                          <button
                            onClick={() => handleAction(user.id, user.profile.id, "verify")}
                            disabled={loadingId === `${user.id}-verify`}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                              user.profile.isVerified 
                                ? "text-blue-600 bg-blue-500/10" 
                                : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                            title={user.profile.isVerified ? "Remover Verificação" : "Marcar como Verificado"}
                          >
                            <ShieldCheck className={`w-4 h-4 ${user.profile.isVerified ? "fill-current" : ""}`} />
                          </button>
                          
                          <button
                            onClick={() => handleAction(user.id, user.profile.id, "pro")}
                            disabled={loadingId === `${user.id}-pro`}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                              user.profile.plan === "pro" 
                                ? "text-amber-600 bg-amber-500/10" 
                                : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                            title={user.profile.plan === "pro" ? "Remover PRO" : "Tornar PRO"}
                          >
                            <Zap className={`w-4 h-4 ${user.profile.plan === "pro" ? "fill-current" : ""}`} />
                          </button>

                          <button
                            onClick={() => handleAction(user.id, user.profile.id, "featured")}
                            disabled={loadingId === `${user.id}-featured`}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                              user.profile.isFeatured 
                                ? "text-violet-600 bg-violet-500/10" 
                                : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                            title={user.profile.isFeatured ? "Remover do Destaque" : "Colocar em Destaque (Home)"}
                          >
                            <Star className={`w-4 h-4 ${user.profile.isFeatured ? "fill-current" : ""}`} />
                          </button>

                          <a 
                            href={`/gestores/${user.profile.slug}`}
                            target="_blank"
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                            title="Ver Perfil Público"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </>
                      )}
                      
                      {user.role !== "ADMIN" && (
                        <button
                          onClick={() => handleAction(user.id, user.profile?.id, "status")}
                          disabled={loadingId === `${user.id}-status`}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                            user.status === "BANNED" 
                              ? "text-emerald-600 bg-emerald-500/10 hover:bg-emerald-500/20" 
                              : "text-red-600 bg-red-500/10 hover:bg-red-500/20"
                          }`}
                          title={user.status === "BANNED" ? "Ativar Usuário" : "Banir Usuário"}
                        >
                          {user.status === "BANNED" ? <CheckCircle className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl grid place-items-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">Nenhum resultado para os filtros aplicados.</p>
              <button 
                onClick={() => {setSearchTerm(""); setFilterPlan("all"); setFilterStatus("all");}}
                className="mt-4 text-indigo-600 text-sm font-bold hover:underline"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
