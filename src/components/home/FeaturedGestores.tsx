"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import GestorCard from "@/components/gestores/GestorCard";
import { useState } from "react";

const filters = [
  { value: "todos", label: "Todos" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "infoprodutos", label: "Infoprodutos" },
  { value: "local", label: "Local" },
];

export default function FeaturedGestores({ initialGestores = [] }: { initialGestores?: any[] }) {
  const [activeFilter, setActiveFilter] = useState("todos");

  const filtered =
    activeFilter === "todos"
      ? initialGestores.slice(0, 3)
      : initialGestores.filter((g) => g.niches.includes(activeFilter)).slice(0, 3);

  return (
    <section id="gestores" className="py-16 sm:py-24 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Gestores em destaque
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Perfis verificados com resultados comprovados
            </p>
          </div>
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 h-8 rounded-xl text-sm font-medium transition ${
                  activeFilter === filter.value
                    ? "bg-white dark:bg-slate-700 shadow-sm"
                    : "hover:bg-white/50 dark:hover:bg-slate-700/50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        {filtered.length > 0 ? (
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {filtered.map((gestor) => (
              <GestorCard key={gestor.id} gestor={gestor} />
            ))}
          </div>
        ) : (
          <div className="mt-10 py-10 text-center bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-500">Nenhum gestor encontrado nesta categoria.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/gestores"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-violet-700 dark:text-violet-300 hover:gap-3 transition-all"
          >
            Ver todos os gestores
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
