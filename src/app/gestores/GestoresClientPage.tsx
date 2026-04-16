"use client";

import { useState, useCallback } from "react";
import GestorCard from "@/components/gestores/GestorCard";
import { NICHOS, PLATAFORMAS } from "@/lib/constants";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "@/components/ui/Pagination";

export default function GestoresClientPage({ 
  initialGestores = [],
  totalItems,
  currentPage,
  itemsPerPage
}: { 
  initialGestores: any[],
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [showFilters, setShowFilters] = useState(false);

  // Função auxiliar para atualizar a URL
  const updateFilters = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Ao filtrar, voltamos para a página 1
    if (!updates.page) params.set("page", "1");
    
    router.push(`/gestores?${params.toString()}`);
  }, [searchParams, router]);

  const handleSearchCommit = (e?: React.FormEvent) => {
    e?.preventDefault();
    updateFilters({ q: query });
  };


  const selectedNicho = searchParams.get("nicho") || "";
  const selectedPlatform = searchParams.get("plataforma") || "";
  const sortBy = searchParams.get("sort") || "rating";

  const hasActiveFilters = selectedNicho || selectedPlatform || searchParams.get("q");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Encontre seu gestor de tráfego
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {totalItems} gestores encontrados
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mb-8 space-y-4">
        {/* Search bar */}
        <form onSubmit={handleSearchCommit} className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 h-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 focus-within:border-violet-500 transition-colors">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchCommit()}
              placeholder="Buscar por nome, cidade..."
              className="w-full bg-transparent outline-none text-[15px] placeholder-slate-400 dark:text-white"
            />
            {query && (
              <button 
                type="button"
                onClick={() => {
                  setQuery("");
                  updateFilters({ q: null });
                }} 
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`h-12 px-4 rounded-2xl border font-medium text-sm flex items-center gap-2 transition ${
              showFilters
                ? "bg-violet-50 dark:bg-violet-900/20 border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-white"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>
        </form>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 animate-in fade-in duration-200">
            <div className="grid sm:grid-cols-3 gap-4">
              {/* Nicho */}
              <div>
                <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                  Nicho
                </label>
                <select
                  value={selectedNicho}
                  onChange={(e) => updateFilters({ nicho: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none dark:text-white"
                >
                  <option value="">Todos os nichos</option>
                  {NICHOS.map((n) => (
                    <option key={n.value} value={n.value}>
                      {n.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Plataforma */}
              <div>
                <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                  Plataforma
                </label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => updateFilters({ plataforma: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none dark:text-white"
                >
                  <option value="">Todas as plataformas</option>
                  {PLATAFORMAS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ordenar por */}
              <div>
                <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                  Ordenar por
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => updateFilters({ sort: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none dark:text-white"
                >
                  <option value="rating">Melhor avaliação</option>
                  <option value="reviews">Mais avaliações</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={() => {
                  setQuery("");
                  router.push("/gestores");
                }}
                className="mt-4 text-[13px] font-medium text-violet-600 dark:text-violet-400 hover:underline"
              >
                Limpar todos os filtros
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {initialGestores.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialGestores.map((gestor: any) => (
              <GestorCard key={gestor.id} gestor={gestor} />
            ))}
          </div>
          
          <Pagination 
            totalItems={totalItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        </>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 grid place-items-center">
            <Search className="w-7 h-7 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Nenhum gestor encontrado</h3>
          <p className="mt-2 text-slate-500">Tente buscar com outros termos ou ajustar os filtros.</p>
        </div>
      )}
    </div>
  );
}
