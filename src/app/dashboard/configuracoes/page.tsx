import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Shield, Bell, KeyRound, UserCircle, Mail, ShieldCheck } from "lucide-react";
import ChangePasswordForm from "@/components/dashboard/ChangePasswordForm";

export const dynamic = "force-dynamic";

export default async function ConfiguracoesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = (session.user as any).role || "GESTOR";

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-outfit)] text-slate-900 dark:text-white">
          Configurações
        </h1>
        <p className="text-slate-500 mt-1">Gerencie a segurança e as preferências da sua conta.</p>
      </div>

      <div className="space-y-6">

        {/* Informações da Conta */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2.5 bg-violet-50 dark:bg-violet-500/10 rounded-2xl">
              <Shield className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Informações da Conta</h2>
              <p className="text-xs text-slate-500">Dados vinculados ao seu login.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest flex items-center gap-1.5">
                <UserCircle className="w-3.5 h-3.5" /> Nome no Sistema
              </label>
              <p className="text-slate-900 dark:text-white font-semibold px-1">{session.user.name}</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> E-mail Cadastrado
              </label>
              <p className="text-slate-900 dark:text-white font-semibold px-1 flex items-center gap-2 flex-wrap">
                {session.user.email}
                <span className="px-2 py-0.5 text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full font-bold uppercase tracking-wide">
                  Verificado
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Nível de Acesso
              </label>
              <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold ml-1 ${
                role === "ADMIN"
                  ? "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
                  : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}>
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Segurança */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-2xl">
              <KeyRound className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Segurança</h2>
              <p className="text-xs text-slate-500">Mantenha sua conta protegida.</p>
            </div>
          </div>

          <ChangePasswordForm />
        </div>

        {/* Notificações — Em Breve */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 shadow-sm opacity-60 pointer-events-none select-none">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2.5 bg-amber-50 dark:bg-amber-500/10 rounded-2xl">
              <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Notificações</h2>
                <p className="text-xs text-slate-500">Alertas e avisos do sistema.</p>
              </div>
              <span className="text-[10px] px-2.5 py-1 bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 rounded-full font-bold uppercase tracking-wide">
                Em Breve
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Alertas de Novos Leads</p>
              <p className="text-sm text-slate-500 mt-0.5">Receba um aviso quando um novo lead entrar.</p>
            </div>
            <div className="w-11 h-6 bg-violet-600 rounded-full relative shrink-0">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
