"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCircle,
  Users,
  Settings,
  ShieldCheck,
  X,
  LogOut,
  Menu,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

interface MobileNavProps {
  isAdmin: boolean;
  userName?: string;
  userEmail?: string;
}

export default function MobileNav({ isAdmin, userName, userEmail }: MobileNavProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const bottomNavItems = [
    {
      href: "/dashboard",
      label: "Início",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/perfil",
      label: "Perfil",
      icon: UserCircle,
      active: pathname === "/dashboard/perfil",
    },
    {
      href: "/dashboard/leads",
      label: "Leads",
      icon: Users,
      active: pathname === "/dashboard/leads",
    },
  ];

  const drawerNavItems = [
    {
      href: "/dashboard",
      label: "Visão Geral",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/perfil",
      label: "Meu Perfil",
      icon: UserCircle,
      active: pathname === "/dashboard/perfil",
    },
    {
      href: "/dashboard/leads",
      label: "Meus Leads",
      icon: Users,
      active: pathname === "/dashboard/leads",
    },
    {
      href: "/dashboard/configuracoes",
      label: "Configurações",
      icon: Settings,
      active: pathname === "/dashboard/configuracoes",
    },
  ];

  return (
    <>
      {/* Top Bar - Menu trigger */}
      <div className="md:hidden sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 h-14 flex items-center px-4 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-md shadow-violet-600/20">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span className="font-[family-name:var(--font-outfit)] text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Trafego<span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Hub</span>
          </span>
        </Link>

        <button
          onClick={() => setDrawerOpen(true)}
          className="w-9 h-9 grid place-items-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition active:scale-95"
          aria-label="Abrir menu"
        >
          <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-800/60 safe-area-bottom">
        <div className="flex items-stretch justify-around h-16 max-w-lg mx-auto">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 text-center transition-all active:scale-95 ${
                  item.active
                    ? "text-violet-600 dark:text-violet-400"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                <div className={`relative ${item.active ? "" : ""}`}>
                  {item.active && (
                    <div className="absolute -inset-2 bg-violet-500/10 dark:bg-violet-500/15 rounded-xl" />
                  )}
                  <Icon className={`relative w-5 h-5 ${item.active ? "stroke-[2.5]" : ""}`} />
                </div>
                <span className={`text-[10px] mt-0.5 ${item.active ? "font-bold" : "font-medium"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* More / Settings button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 text-center transition-all active:scale-95 ${
              pathname === "/dashboard/configuracoes" || pathname === "/dashboard/admin"
                ? "text-violet-600 dark:text-violet-400"
                : "text-slate-400 dark:text-slate-500"
            }`}
          >
            <div className="relative">
              {(pathname === "/dashboard/configuracoes" || pathname === "/dashboard/admin") && (
                <div className="absolute -inset-2 bg-violet-500/10 dark:bg-violet-500/15 rounded-xl" />
              )}
              <Settings className={`relative w-5 h-5 ${pathname === "/dashboard/configuracoes" || pathname === "/dashboard/admin" ? "stroke-[2.5]" : ""}`} />
            </div>
            <span className={`text-[10px] mt-0.5 ${pathname === "/dashboard/configuracoes" || pathname === "/dashboard/admin" ? "font-bold" : "font-medium"}`}>
              Mais
            </span>
          </button>
        </div>
      </nav>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 z-50 w-[300px] max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl shadow-black/20 transform transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 h-14 border-b border-slate-100 dark:border-slate-800">
            <span className="text-sm font-bold text-slate-900 dark:text-white">Menu</span>
            <button
              onClick={() => setDrawerOpen(false)}
              className="w-8 h-8 grid place-items-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* User Info */}
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-600/20">
                {userName?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {userName || "Usuário"}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {userEmail || ""}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <p className="px-3 mb-2 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
              Navegação
            </p>
            {drawerNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center justify-between gap-3 px-3 py-3 rounded-xl font-medium text-sm transition active:scale-[0.98] ${
                    item.active
                      ? "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </div>
                  <ChevronRight className={`w-4 h-4 ${item.active ? "text-violet-400" : "text-slate-300 dark:text-slate-700"}`} />
                </Link>
              );
            })}

            {isAdmin && (
              <>
                <div className="my-3 border-t border-slate-100 dark:border-slate-800" />
                <p className="px-3 mb-2 text-[10px] font-black text-emerald-500 dark:text-emerald-600 uppercase tracking-widest">
                  Administração
                </p>
                <Link
                  href="/dashboard/admin"
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center justify-between gap-3 px-3 py-3 rounded-xl font-medium text-sm transition active:scale-[0.98] ${
                    pathname === "/dashboard/admin"
                      ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5" />
                    Painel Admin
                  </div>
                  <ChevronRight className={`w-4 h-4 ${pathname === "/dashboard/admin" ? "text-emerald-400" : "text-emerald-300 dark:text-emerald-700"}`} />
                </Link>
              </>
            )}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 font-medium text-sm transition active:scale-[0.98]"
            >
              <LogOut className="w-5 h-5" />
              Sair da conta
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
