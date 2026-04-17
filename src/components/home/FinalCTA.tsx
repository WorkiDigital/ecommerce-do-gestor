"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Outer wrapper with gradient border on both themes */}
        <div className="relative rounded-[32px] p-[1.5px] bg-gradient-to-r from-blue-700/60 via-indigo-600/60 to-blue-500/40">
          {/* Inner card — dark in dark mode, near-dark in light mode */}
          <div className="relative overflow-hidden rounded-[30px] bg-slate-950 px-8 py-14 sm:px-14 text-center">
            {/* Subtle glow blobs inside */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Icon badge */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-700 shadow-xl shadow-indigo-600/30 mb-6">
              <Zap className="w-7 h-7 text-white" />
            </div>

            <h3 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-bold text-white">
              Pronto para crescer com tráfego pago?
            </h3>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto">
              Empresas encontram o gestor ideal em minutos. Gestores recebem clientes todos os dias.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/gestores"
                className="w-full sm:w-auto h-14 px-8 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-lg font-bold shadow-xl shadow-indigo-600/25 hover:shadow-2xl hover:shadow-indigo-600/30 hover:-translate-y-1 transition-all"
              >
                Preciso contratar
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto h-14 px-8 inline-flex items-center justify-center rounded-2xl bg-white/10 border-2 border-white/15 text-white text-lg font-bold hover:bg-white/15 backdrop-blur transition"
              >
                Quero ser encontrado
              </Link>
            </div>

            {/* Social proof bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[13px] text-slate-300 font-medium tracking-wide">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                100% gratuito para empresas
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Sem taxa por fechamento
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                LGPD compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
