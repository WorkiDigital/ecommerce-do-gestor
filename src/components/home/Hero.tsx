"use client";

import Link from "next/link";
import { Search, UserPlus, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero({ totalGestores = 0 }: { totalGestores?: number }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/gestores${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  };

  const quickFilters = ["E-commerce", "Infoprodutos", "Negócio Local", "SaaS"];

  return (
    <section className="relative pt-20 pb-20 sm:pt-28 sm:pb-28 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-violet-400/20 to-blue-500/20 rounded-full blur-3xl dark:from-violet-900/30 dark:to-blue-900/30" />
        <div className="absolute top-1/2 -left-40 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-blue-400/15 to-fuchsia-400/15 rounded-full blur-3xl dark:from-blue-900/20 dark:to-fuchsia-900/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 dark:bg-violet-500/15 border border-violet-500/20 text-[11px] sm:text-[12px] font-semibold text-violet-700 dark:text-violet-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {totalGestores > 0 ? `${totalGestores} gestores ativos` : "Gestores verificados"} • avaliações verificadas
          </div>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-outfit)] text-[36px] sm:text-5xl lg:text-[72px] leading-[1.08] tracking-[-0.02em] font-extrabold text-slate-900 dark:text-white">
            Encontre o gestor de tráfego certo
            <span className="gradient-text block mt-1">em 2 minutos</span>
          </h1>

          {/* Description */}
          <p className="mt-5 sm:mt-6 text-[15px] sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A plataforma que conecta empresas a gestores de tráfego pago com{" "}
            <strong className="text-slate-800 dark:text-white font-semibold">
              avaliações verificadas
            </strong>
            , portfólio real e contato direto no WhatsApp. Sem taxa, sem burocracia.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/gestores"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold shadow-lg shadow-violet-600/25 hover:shadow-xl hover:shadow-violet-600/30 hover:-translate-y-0.5 transition-all"
            >
              <Search className="w-5 h-5" />
              Preciso contratar
            </Link>
            <Link
              href="/cadastrar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <UserPlus className="w-5 h-5" />
              Quero ser encontrado
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Sem mensalidade para empresas
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Contato direto
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              LGPD
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-blue-600 rounded-[28px] blur-xl opacity-20 group-hover:opacity-30 transition" />
            <form
              onSubmit={handleSearch}
              className="relative bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-900/10 p-2"
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 h-12">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar por nicho, cidade ou plataforma..."
                    className="w-full bg-transparent outline-none text-[15px] placeholder-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-[15px] hover:opacity-90 transition"
                >
                  Buscar gestores
                </button>
              </div>
            </form>

            {/* Quick filters */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {quickFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => router.push(`/gestores?q=${encodeURIComponent(filter)}`)}
                  className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300 transition"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
