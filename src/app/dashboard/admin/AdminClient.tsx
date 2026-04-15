"use client";

import { useState } from "react";
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
  Users
} from "lucide-react";
import { toggleUserVerification, toggleUserPro, toggleUserStatus } from "@/app/actions/admin";

export default function AdminClient({ initialUsers }: { initialUsers: any[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.profile?.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = async (userId: string, profileId: string | undefined, action: "verify" | "pro" | "status") => {
    setLoadingId(`${userId}-${action}`);
    
    let result;
    if (action === "verify" && profileId) result = await toggleUserVerification(profileId);
    if (action === "pro" && profileId) result = await toggleUserPro(profileId);
    if (action === "status") result = await toggleUserStatus(userId);

    if (result?.success) {
      // Update local state for immediate feedback
      setUsers(prev => prev.map(u => {
        if (u.id === userId) {
          if (action === "status") return { ...u, status: u.status === "BANNED" ? "ACTIVE" : "BANNED" };
          if (action === "verify" && u.profile) return { ...u, profile: { ...u.profile, isVerified: !u.profile.isVerified } };
          if (action === "pro" && u.profile) return { ...u, profile: { ...u.profile, plan: u.profile.plan === "pro" ? "free" : "pro" } };
        }
        return u;
      }));
    } else {
      alert(result?.error || "Erro ao realizar ação");
    }

    setLoadingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pl-0">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-slate-900 dark:text-white">Gerenciamento de Usuários</h1>
          <p className="text-slate-500">Controle total sobre gestores e contas da plataforma.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500 transition"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Usuário/Gestor</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status Conta</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Plano/Verificação</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Analytics</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden">
                        {user.profile?.avatarUrl ? (
                          <img src={user.profile.avatarUrl} className="w-full h-full object-cover" />
                        ) : <User className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {user.profile?.displayName || user.name}
                          {user.role === "ADMIN" && <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded uppercase font-bold">Admin</span>}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</span>
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {user.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                      user.status === "ACTIVE" 
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                    }`}>
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        user.profile?.plan === "pro"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                      }`}>
                        {user.profile?.plan || "free"}
                      </span>
                      {user.profile?.isVerified && (
                        <span className="p-0.5 bg-blue-50 text-blue-600 rounded">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1" title="Visualizações"><Eye className="w-3 h-3" /> {user.profile?.views || 0}</span>
                      <span className="flex items-center gap-1" title="Leads"><Users className="w-3 h-3" /> {user.profile?._count?.leads || 0}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {user.profile && (
                        <>
                          <button
                            onClick={() => handleAction(user.id, user.profile.id, "verify")}
                            disabled={loadingId === `${user.id}-verify`}
                            className={`p-2 rounded-lg transition ${
                              user.profile.isVerified ? "text-blue-600 bg-blue-50" : "text-slate-400 hover:bg-slate-100"
                            }`}
                            title={user.profile.isVerified ? "Remover Verificação" : "Marcar como Verificado"}
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => handleAction(user.id, user.profile.id, "pro")}
                            disabled={loadingId === `${user.id}-pro`}
                            className={`p-2 rounded-lg transition ${
                              user.profile.plan === "pro" ? "text-amber-600 bg-amber-50" : "text-slate-400 hover:bg-slate-100"
                            }`}
                            title={user.profile.plan === "pro" ? "Remover PRO" : "Tornar PRO"}
                          >
                            <Zap className="w-4 h-4" />
                          </button>

                          <a 
                            href={`/gestores/${user.profile.slug}`}
                            target="_blank"
                            className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition"
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
                          className={`p-2 rounded-lg transition ${
                            user.status === "BANNED" ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50 hover:bg-red-100"
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
            <div className="py-20 text-center">
              <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Nenhum usuário encontrado para "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
