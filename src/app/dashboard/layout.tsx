import Link from "next/link";
import { Zap, LayoutDashboard, UserCircle, Settings, LogOut } from "lucide-react";
import { signOut } from "@/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 fixed inset-y-0 z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-[family-name:var(--font-outfit)] text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Trafego<span className="gradient-text">Hub</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 font-medium text-sm"
          >
            <LayoutDashboard className="w-5 h-5" />
            Visão Geral
          </Link>
          <Link
            href="/dashboard/perfil"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition"
          >
            <UserCircle className="w-5 h-5" />
            Meu Perfil
          </Link>
          <Link
            href="/dashboard/configuracoes"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition"
          >
            <Settings className="w-5 h-5" />
            Configurações
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}>
            <button type="submit" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition">
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center px-4 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-[family-name:var(--font-outfit)] text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            TrafegoHub
          </span>
        </Link>
        <button className="w-8 h-8 grid place-items-center rounded-lg bg-slate-100 dark:bg-slate-800">
          <UserCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 md:pl-64">
        {children}
      </main>
    </div>
  );
}
