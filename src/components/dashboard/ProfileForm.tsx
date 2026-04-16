"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProfile } from "@/app/actions/profile";
import { NICHOS, PLATAFORMAS, ESTADOS_BR } from "@/lib/constants";
import { User, MapPin, Briefcase, Globe, MessageSquare, Save, Loader2, DollarSign, Upload } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import GestorCard from "@/components/gestores/GestorCard";

const InstagramIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.76 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface ProfileFormProps {
  initialData?: any;
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"basic" | "specialties" | "contact">("basic");

  const [formData, setFormData] = useState({
    displayName: initialData?.displayName || "",
    avatarUrl: initialData?.avatarUrl || "",
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
    avgRating: initialData?.avgRating || 5.0,
    reviewCount: initialData?.reviewCount || 0,
    badge: initialData?.badge || "NOVO",
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setMessage({ type: "error", text: result.error || "Erro ao atualizar perfil." });
    }

    setLoading(false);
  };

  const tabs = [
    { id: "basic", label: "Informações Básicas", icon: User },
    { id: "specialties", label: "Especialidades", icon: Briefcase },
    { id: "contact", label: "Contatos e Redes", icon: MessageSquare },
  ] as const;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Coluna do Formulário */}
      <form onSubmit={handleSubmit} className="flex-1 w-full space-y-6">
        {message && (
          <div
            className={`p-4 rounded-2xl border ${
              message.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400"
                : "bg-red-50 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-slate-900 text-violet-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 shadow-sm">
          {activeTab === "basic" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col md:flex-row gap-8 items-center p-6 bg-slate-50 dark:bg-slate-950/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                <div className="shrink-0 relative">
                  <div className="w-24 h-24 rounded-3xl bg-white dark:bg-slate-900 overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-inner flex items-center justify-center">
                    {formData.avatarUrl ? (
                      <img src={formData.avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-slate-300" />
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 p-2 bg-violet-600 rounded-xl text-white shadow-lg">
                    <Upload className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Foto de Perfil</h4>
                    <p className="text-sm text-slate-500">Imagens até 2MB. Recomendado: 400x400.</p>
                  </div>
                  <UploadButton
                    endpoint="profileImage"
                    onClientUploadComplete={(res) => {
                      setFormData({ ...formData, avatarUrl: res[0].url });
                      setMessage({ type: "success", text: "Foto atualizada!" });
                    }}
                    onUploadError={(error: Error) => {
                      setMessage({ type: "error", text: `Erro: ${error.message}` });
                    }}
                    appearance={{
                      button: "ut-ready:bg-violet-600 ut-uploading:cursor-not-allowed bg-violet-500 rounded-xl text-xs font-bold px-6 py-2.5 h-auto after:bg-violet-700 transition-all",
                      allowedContent: "hidden",
                    }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest px-1">Nome de Exibição / Agência</label>
                  <input
                    type="text"
                    required
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-2 focus:ring-violet-500 outline-none transition-all font-medium"
                    placeholder="Como você quer ser chamado"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest px-1">Tagline Profissional</label>
                  <input
                    type="text"
                    required
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-2 focus:ring-violet-500 outline-none transition-all font-medium"
                    placeholder="Ex: Especialista em ROI 5x"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest px-1">Minha Bio / Sobre</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none"
                    placeholder="Conte sua história e seus melhores resultados..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest px-1">Cidade</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest px-1">Estado</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                  >
                    {ESTADOS_BR.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "specialties" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-4">
                <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest px-1 block">Valor Mínimo para Gestão (Mensal)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    value={formData.minPrice}
                    onChange={(e) => setFormData({ ...formData, minPrice: Number(e.target.value) })}
                    className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold text-lg"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest px-1 mb-4 block">Nichos de Atuação</label>
                  <div className="flex flex-wrap gap-2">
                    {NICHOS.map((niche) => (
                      <button
                        key={niche.value}
                        type="button"
                        onClick={() => handleToggleArray("niches", niche.label)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
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
                  <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest px-1 mb-4 block">Plataformas Dominadas</label>
                  <div className="flex flex-wrap gap-2">
                    {PLATAFORMAS.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => handleToggleArray("platforms", p.label)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
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
          )}

          {activeTab === "contact" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest px-1">WhatsApp direto</label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest px-1">Username Instagram</label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                    placeholder="@seu.perfil"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest px-1">URL Facebook</label>
                  <input
                    type="text"
                    value={formData.facebook}
                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest px-1">Website / Link Externo</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                    placeholder="https://meusite.com"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 flex justify-between items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-8">
            <p className="text-sm text-slate-400 hidden sm:block">Fique tranquilo, você pode editar a qualquer momento.</p>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-10 py-4 bg-slate-900 dark:bg-violet-600 hover:bg-slate-800 dark:hover:bg-violet-700 disabled:opacity-50 text-white font-black rounded-2xl shadow-xl shadow-slate-900/10 dark:shadow-violet-600/20 transition-all scale-100 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto justify-center"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5 text-violet-400 dark:text-white" />
              )}
              SALVAR PERFIL
            </button>
          </div>
        </div>
      </form>

      {/* Coluna da Prévia */}
      <aside className="lg:w-80 w-full space-y-6 lg:sticky lg:top-24">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-xs uppercase font-black text-slate-400 tracking-widest">Prévia no Marketplace</h4>
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        
        <div className="pointer-events-none opacity-90 scale-95 lg:scale-100 origin-top">
          <GestorCard gestor={formData as any} />
        </div>

        <div className="p-6 bg-violet-600/5 dark:bg-violet-500/5 rounded-[28px] border border-violet-600/10 dark:border-violet-500/10">
          <h5 className="text-sm font-bold text-violet-600 dark:text-violet-400 mb-2">Dica de Especialista</h5>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Perfis com foto de alta qualidade e uma Tagline clara convertem até **47% mais** no TrafegoHub.
          </p>
        </div>
      </aside>
    </div>
  );
}
