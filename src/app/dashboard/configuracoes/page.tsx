import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Settings, Shield, Bell, Key } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ConfiguracoesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-outfit)] text-slate-900 dark:text-white">Configurações</h1>
        <p className="text-slate-500 mt-1">Gerencie a segurança e as preferências da sua conta.</p>
      </div>

      <div className="space-y-6">
        {/* Account Info */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <Shield className="w-5 h-5 text-violet-500" />
            <h2 className="text-lg font-semibold">Informações da Conta</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">Nome no Sistema</label>
              <p className="text-slate-900 dark:text-white font-medium">{session.user.name}</p>
            </div>
            <div>
              <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">E-mail Cadastrado</label>
              <p className="text-slate-900 dark:text-white font-medium flex items-center gap-2">
                {session.user.email}
                <span className="px-2 py-0.5 text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full font-bold uppercase">Verificado</span>
              </p>
            </div>
            <div>
               <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">Nível de Acesso</label>
               <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-lg font-semibold inline-block">
                 {/* @ts-ignore */}
                 {session.user.role || "GESTOR"}
               </span>
            </div>
          </div>
        </div>

        {/* Security Placeholder */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <Key className="w-5 h-5 text-violet-500" />
            <h2 className="text-lg font-semibold">Segurança</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Alterar Senha</p>
              <p className="text-sm text-slate-500">Mude a senha usada para acessar o painel.</p>
            </div>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">
              Atualizar
            </button>
          </div>
        </div>
        
        {/* Notifications Placeholder */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 opacity-60">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <Bell className="w-5 h-5 text-violet-500" />
            <div className="flex items-center gap-2">
               <h2 className="text-lg font-semibold">Notificações</h2>
               <span className="text-[10px] px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full font-bold uppercase">Em Breve</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pb-4">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Alertas de Novos Leads</p>
              <p className="text-sm text-slate-500">Receba um aviso quando um Lead entrar no Kanban.</p>
            </div>
            <div className="w-10 h-6 bg-violet-600 rounded-full relative cursor-not-allowed">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
