import Link from "next/link";
import Image from "next/image";
import { Star, Check } from "lucide-react";
import type { GestorProfile } from "@/lib/data";
import { NICHOS, PLATAFORMAS } from "@/lib/constants";

function getNicheLabel(value: string) {
  return NICHOS.find((n) => n.value === value)?.label || value;
}

function getPlatformLabel(value: string) {
  return PLATAFORMAS.find((p) => p.value === value)?.label || value;
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex text-amber-500">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={star <= Math.round(rating) ? "fill-current" : "text-slate-300 dark:text-slate-600"}
          width={size}
          height={size}
        />
      ))}
    </div>
  );
}

export default function GestorCard({ gestor }: { gestor: any }) {
  const badgeColors: Record<string, string> = {
    "TOP 5%": "bg-violet-500/10 text-violet-700 dark:text-violet-300",
    VERIFICADA: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300",
    PRO: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    AGÊNCIA: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  };

  const displayName = gestor.displayName || "Seu Nome Aqui";
  const avatarUrl = gestor.avatarUrl || "/placeholder-avatar.png";
  const niches = gestor.niches || [];
  const platforms = gestor.platforms || [];
  const tagline = gestor.tagline || "Sua frase de impacto aparecerá aqui...";
  const avgRating = gestor.avgRating || 5.0;
  const reviewCount = gestor.reviewCount || 0;
  const minPrice = gestor.minPrice || 0;
  const city = gestor.city || "Sua Cidade";
  const state = gestor.state || "UF";

  return (
    <div className="gestor-card group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-b from-violet-600/0 to-violet-600/0 group-hover:from-violet-600/20 group-hover:to-blue-600/20 rounded-[28px] blur-xl transition" />
      <div
        className="relative block h-full bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 hover:-translate-y-1 transition-all"
      >
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
              <Image
                src={avatarUrl}
                alt={displayName}
                width={64}
                height={64}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="64px"
              />
            </div>
            {gestor.isVerified && (
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 grid place-items-center">
                <Check className="w-2.5 h-2.5 text-white" />
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                {displayName}
              </h3>
              {gestor.badge && (
                <span
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-medium whitespace-nowrap ${
                    badgeColors[gestor.badge] || "bg-slate-100 dark:bg-slate-800"
                  }`}
                >
                  {gestor.badge}
                </span>
              )}
            </div>
            <p className="text-[13px] text-slate-500">
              {niches.map(getNicheLabel).join(", ")} • {city}, {state}
            </p>
            <div className="mt-1.5 flex items-center gap-1">
              <StarRating rating={avgRating} />
              <span className="text-[12px] font-medium text-slate-700 dark:text-slate-300">
                {avgRating.toFixed(1)}
              </span>
              <span className="text-[12px] text-slate-500">({reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Platforms */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {platforms.slice(0, 3).map((p: string) => (
            <span
              key={p}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[12px] font-medium text-slate-700 dark:text-slate-300"
            >
              {getPlatformLabel(p)}
            </span>
          ))}
          {platforms.length > 3 && (
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[12px] font-medium text-slate-500 dark:text-slate-400">
              +{platforms.length - 3}
            </span>
          )}
        </div>

        {/* Tagline */}
        <p className="mt-4 text-[13px] text-slate-600 dark:text-slate-400 line-clamp-2">
          {tagline}
        </p>

        {/* Footer */}
        <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-slate-500 uppercase tracking-wide font-medium">A partir de</p>
            <p className="text-[18px] font-bold text-slate-900 dark:text-white">
              R${minPrice.toLocaleString("pt-BR")}
              <span className="text-[12px] font-normal text-slate-500 space-x-1"> /mês</span>
            </p>
          </div>
          <span
            onClick={(e) => {
              e.preventDefault();
              window.open(`https://wa.me/${gestor.whatsapp || ""}`, "_blank");
            }}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-[13px] font-semibold shadow-lg shadow-green-600/20 transition"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            WhatsApp
          </span>
        </div>
      </div>
    </div>
  );
}
