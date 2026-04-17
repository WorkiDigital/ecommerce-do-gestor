import Link from "next/link";
import { Zap, LogOut, AlertCircle } from "lucide-react";
import SidebarNav from "@/components/dashboard/SidebarNav";
import MobileNav from "@/components/dashboard/MobileNav";
import { signOut, auth } from "@/auth";
import prisma from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  // Buscar perfil para verificar completude
  const profile = session?.user?.id 
    ? await prisma.profile.findUnique({ where: { userId: session.user.id } })
    : null;

  const isIncomplete = !profile || !profile.bio || profile.niches.length === 0;
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.email === "workidigitaloficial@gmail.com";

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

        <SidebarNav isAdmin={isAdmin} />

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

      {/* Mobile Navigation (Top bar + Bottom bar + Drawer) */}
      <MobileNav
        isAdmin={isAdmin}
        userName={session?.user?.name || undefined}
        userEmail={session?.user?.email || undefined}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:pl-64 flex flex-col pb-20 md:pb-0">
        {isIncomplete && (
          <div className="bg-amber-50 dark:bg-amber-900/10 border-b border-amber-200 dark:border-amber-800/50 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>Seu perfil está incompleto e não aparecerá nos resultados de busca.</p>
            </div>
            <Link 
              href="/dashboard/perfil" 
              className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 hover:underline whitespace-nowrap"
            >
              Completar Agora
            </Link>
          </div>
        )}
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
