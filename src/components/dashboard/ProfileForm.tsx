"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProfile } from "@/app/actions/profile";
import { NICHOS, PLATAFORMAS, ESTADOS_BR } from "@/lib/constants";
import { User, MapPin, Briefcase, Globe, Instagram, Facebook, MessageSquare, Save, Loader2, DollarSign, ListChecks } from "lucide-react";

interface ProfileFormProps {
  initialData?: any;
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    displayName: initialData?.displayName || "",
    tagline: initialData?.tagline || "",
    bio: initialData?.bio || "",
    city: initialData?.city || "",
    state: initialData?.state || "SP",
    minPrice: initialData?.minPrice || 500,
    whatsapp: initialData?.whatsapp || "",
    instagram: initialData?.instagram || "",
    facebook: initialData?.facebook || "",
    website: initialData?.website || "",
    niches: initialData?.niches || [],
    platforms: initialData?.platforms || [],
  });

  const handleToggleArray = (field: "niches" | "platforms", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const result = await createProfile(formData);

    if (result.success) {
      setMessage({ type: "success", text: "Perfil atualizado com sucesso!" });
      router.refresh();
      // Scroll to top to see message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setMessage({ type: "error", text: result.error || "Erro ao atualizar perfil." });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <div
          className={`p-4 rounded-xl border ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400"
              : "bg-red-50 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Seção Básica */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-violet-600" />
          Informações Básicas
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nome de Exibição</label>
            <input
              type="text"
              required
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-violet-500 outline-none transition"
              placeholder="Ex: João da Silva"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Frase de Efeito (Tagline)</label>
            <input
              type="text"
              required
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-violet-500 outline-none transition"
              placeholder="Ex: Especialista em Google Ads para Imobiliárias"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Bio / Descrição Profissional</label>
            <textarea
              required
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-violet-500 outline-none transition resize-none"
              placeholder="Conte sua experiência, resultados e como você trabalha..."
            />
          </div>
        </div>
      </div>

      {/* Localização e Preço */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Localização
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium">Cidade</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">UF</label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ESTADOS_BR.map(uf => <option key={uf} value={uf}>{uf}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            Investimento Mínimo
          </h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">A partir de (R$)</label>
            <input
              type="number"
              value={formData.minPrice}
              onChange={(e) => setFormData({ ...formData, minPrice: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-[11px] text-slate-500">Valor mensal aproximado que você cobra para gerenciar uma conta.</p>
          </div>
        </div>
      </div>

      {/* Nichos e Plataformas */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-amber-600" />
          Especialidades
        </h3>
        
        <div className="space-y-8">
          <div>
            <label className="text-sm font-bold mb-4 block text-slate-900 dark:text-white">Seus Nichos de Atuação</label>
            <div className="flex flex-wrap gap-2">
              {NICHOS.map((niche) => (
                <button
                  key={niche.value}
                  type="button"
                  onClick={() => handleToggleArray("niches", niche.label)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    formData.niches.includes(niche.label)
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  {niche.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-bold mb-4 block text-slate-900 dark:text-white">Plataformas que Domina</label>
            <div className="flex flex-wrap gap-2">
              {PLATAFORMAS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => handleToggleArray("platforms", p.label)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    formData.platforms.includes(p.label)
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links de Contato */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          Contatos e Redes Sociais
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-500" /> WhatsApp
            </label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="(00) 00000-0000"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Instagram className="w-4 h-4 text-pink-500" /> Instagram
            </label>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="@seu.perfil"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Facebook className="w-4 h-4 text-blue-600" /> Facebook
            </label>
            <input
              type="text"
              value={formData.facebook}
              onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="facebook.com/seu-perfil"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-500" /> Website / Portfólio
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="https://meusite.com"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-violet-600/20 transition-all scale-100 hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {initialData ? "Salvar Alterações" : "Criar Perfil Profissional"}
        </button>
      </div>
    </form>
  );
}
