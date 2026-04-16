"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, UserCircle, Settings, Users, ShieldCheck, LogOut } from "lucide-react";

interface MobileNavProps {
  isAdmin: boolean;
}

export default function MobileNav({ isAdmin }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Visão Geral", icon: LayoutDashboard },
    { href: "/dashboard/perfil", label: "Meu Perfil", icon: UserCircle },
    { href: "/dashboard/leads", label: "Meus Leads", icon: Users },
    { href: "/dashboard/configuracoes", label: "Configurações", icon: Settings },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-8 h-8 grid place-items-center rounded-lg bg-slate-100 dark:bg-slate-800"
        aria-label="Abrir menu"
      >
        <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 shadow-xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 grid place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition ${
                      active
                        ? "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}

              {isAdmin && (
                <Link
                  href="/dashboard/admin"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition mt-4 ${
                    pathname === "/dashboard/admin"
                      ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                  }`}
                >
                  <ShieldCheck className="w-5 h-5" />
                  Painel Admin
                </Link>
              )}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition"
              >
                <LogOut className="w-5 h-5" />
                Sair
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
