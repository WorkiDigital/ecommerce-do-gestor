"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  UserCircle, 
  Settings, 
  Users, 
  ShieldCheck 
} from "lucide-react";

interface SidebarNavProps {
  isAdmin: boolean;
}

export default function SidebarNav({ isAdmin }: SidebarNavProps) {
  const pathname = usePathname();

  const navItems = [
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
    <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition ${
              item.active
                ? "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 shadow-sm"
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
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition mt-4 ${
            pathname === "/dashboard/admin"
              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-sm"
              : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          Painel Admin
        </Link>
      )}
    </nav>
  );
}
