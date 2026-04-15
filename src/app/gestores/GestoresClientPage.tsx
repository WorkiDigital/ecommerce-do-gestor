"use client";

import { useState, useMemo } from "react";
import GestorCard from "@/components/gestores/GestorCard";
import { NICHOS, PLATAFORMAS } from "@/lib/constants";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function GestoresClientPage({ initialGestores = [] }: { initialGestores: any[] }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedNicho, setSelectedNicho] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [sortBy, setSortBy] = useState<"rating" | "price-asc" | "price-desc" | "reviews">("rating");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let results = [...initialGestores];

    // Search query
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (g) =>
          g.displayName.toLowerCase().includes(q) ||
          g.city.toLowerCase().includes(q) ||
          (g.tagline && g.tagline.toLowerCase().includes(q)) ||
          g.niches.some((n: string) => n.toLowerCase().includes(q) || NICHOS.find(nn => nn.value === n)?.label.toLowerCase().includes(q)) ||
          g.platforms.some((p: string) => p.toLowerCase().includes(q) || PLATAFORMAS.find(pp => pp.value === p)?.label.toLowerCase().includes(q))
      );
    }

    // Nicho filter
    if (selectedNicho) {
      results = results.filter((g) => g.niches.includes(selectedNicho));
    }

    // Platform filter
    if (selectedPlatform) {
      results = results.filter((g) => g.platforms.includes(selectedPlatform));
    }

    // Sort
    switch (sortBy) {
      case "rating":
        results.sort((a, b) => b.avgRating - a.avgRating);
        break;
      case "price-asc":
        results.sort((a, b) => a.minPrice - b.minPrice);
        break;
      case "price-desc":
        results.sort((a, b) => b.minPrice - a.minPrice);
        break;
      case "reviews":
        results.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    // Pro/Featured first
    results.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });

    return results;
  }, [initialGestores, query, selectedNicho, selectedPlatform, sortBy]);

  const hasActiveFilters = selectedNicho || selectedPlatform || query;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Encontre seu gestor de tráfego
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {filtered.length} gestores encontrados no banco de dados
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mb-8 space-y-4">
        {/* Search bar */}
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 h-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome, nicho, cidade..."
              className="w-full bg-transparent outline-none text-[15px] placeholder-slate-400"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`h-12 px-4 rounded-2xl border font-medium text-sm flex items-center gap-2 transition ${
              showFilters
                ? "bg-violet-50 dark:bg-violet-900/20 border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>
        </div>

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
                  onChange={(e) => setSelectedNicho(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none"
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
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none"
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
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none"
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
                  setSelectedNicho("");
                  setSelectedPlatform("");
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
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((gestor: any) => (
            <GestorCard key={gestor.id} gestor={gestor} />
          ))}
        </div>
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
