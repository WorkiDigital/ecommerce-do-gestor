"use client";

import Link from "next/link";
import { Zap, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/70 glass" />
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-600/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-[family-name:var(--font-outfit)] text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Trafego<span className="gradient-text">Hub</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-600 dark:text-slate-300">
          <Link href="/#features" className="hover:text-violet-600 dark:hover:text-violet-400 transition">
            Recursos
          </Link>
          <Link href="/gestores" className="hover:text-violet-600 dark:hover:text-violet-400 transition">
            Gestores
          </Link>
          <Link href="/#precos" className="hover:text-violet-600 dark:hover:text-violet-400 transition">
            Preços
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 grid place-items-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-4 h-9 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition"
          >
            Entrar
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 grid place-items-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden relative bg-white/95 dark:bg-slate-950/95 glass border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            <Link href="/#features" onClick={() => setMobileOpen(false)} className="py-2 text-[15px] font-medium hover:text-violet-600 transition">
              Recursos
            </Link>
            <Link href="/gestores" onClick={() => setMobileOpen(false)} className="py-2 text-[15px] font-medium hover:text-violet-600 transition">
              Gestores
            </Link>
            <Link href="/#precos" onClick={() => setMobileOpen(false)} className="py-2 text-[15px] font-medium hover:text-violet-600 transition">
              Preços
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center h-10 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-semibold"
            >
              Entrar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
