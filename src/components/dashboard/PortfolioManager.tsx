"use client";

import { useState } from "react";
import { Plus, Trash2, Loader2, Image as ImageIcon, TrendingUp, DollarSign, Target, Upload } from "lucide-react";
import { addPortfolioItem, deletePortfolioItem } from "@/app/actions/portfolio";
import { UploadButton } from "@/lib/uploadthing";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  metrics: any;
  createdAt: Date;
}

interface PortfolioManagerProps {
  items: PortfolioItem[];
}

export default function PortfolioManager({ items: initialItems }: PortfolioManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    roas: "",
    cpl: "",
    investment: ""
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const metrics = {
      roas: formData.roas,
      cpl: formData.cpl,
      investment: formData.investment
    };

    const result = await addPortfolioItem({
      title: formData.title,
      description: formData.description,
      imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      metrics
    });

    if (result.success) {
      // For simplicity, we refresh the page to get the updated list, 
      // but in a real app we'd update state or use optimistic updates.
      window.location.reload();
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este case de sucesso?")) return;
    
    const result = await deletePortfolioItem(id);
    if (result.success) {
      setItems(prev => prev.filter(item => item.id !== id));
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-violet-600" />
            Casos de Sucesso / Portfólio
          </h3>
          <p className="text-sm text-slate-500">Mostre seus melhores resultados para atrair clientes.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition"
          >
            <Plus className="w-4 h-4" />
            Adicionar Case
          </button>
        )}
      </div>

      <div className="p-6">
        {showForm && (
          <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-4">
            <h4 className="font-bold mb-4">Novo Caso de Sucesso</h4>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Título do Case</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Escala de E-commerce de Moda"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Upload className="w-4 h-4 text-violet-500" /> Print do Resultado
                  </label>
                  <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center">
                      {formData.imageUrl ? (
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <UploadButton
                        endpoint="portfolioImage"
                        onClientUploadComplete={(res) => {
                          setFormData({ ...formData, imageUrl: res[0].url });
                        }}
                        onUploadError={(error: Error) => {
                          alert(`Erro: ${error.message}`);
                        }}
                        appearance={{
                          button: "ut-ready:bg-slate-900 dark:ut-ready:bg-white ut-ready:text-white dark:ut-ready:text-slate-900 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold px-4 py-2 h-auto w-auto",
                          allowedContent: "hidden"
                        }}
                        content={{
                          button({ ready }) {
                            if (ready) return formData.imageUrl ? "Trocar Imagem" : "Subir Foto";
                            return "Aguarde...";
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição da Estratégia</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explique o que foi feito para atingir o resultado..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" /> ROAS
                  </label>
                  <input
                    type="text"
                    value={formData.roas}
                    onChange={e => setFormData({ ...formData, roas: e.target.value })}
                    placeholder="Ex: 8.5x"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <Target className="w-3 h-3 text-blue-500" /> CPL
                  </label>
                  <input
                    type="text"
                    value={formData.cpl}
                    onChange={e => setFormData({ ...formData, cpl: e.target.value })}
                    placeholder="Ex: R$ 2,50"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-amber-500" /> Investido
                  </label>
                  <input
                    type="text"
                    value={formData.investment}
                    onChange={e => setFormData({ ...formData, investment: e.target.value })}
                    placeholder="Ex: R$ 10k"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar Case"}
                </button>
              </div>
            </form>
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-slate-300" />
            </div>
            <p className="text-slate-500 text-sm">Você ainda não adicionou nenhum caso de sucesso.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group relative bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-4">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-slate-900/80 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl mb-4 overflow-hidden relative">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-8 h-8 opacity-20" />
                    </div>
                  )}
                  {item.metrics && (
                    <div className="absolute bottom-2 left-2 right-2 flex gap-1.5">
                      {item.metrics.roas && (
                        <span className="px-2 py-0.5 bg-emerald-500/90 text-white text-[10px] font-bold rounded-md">
                          ROAS {item.metrics.roas}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <h5 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1 mb-1">{item.title}</h5>
                <p className="text-[12px] text-slate-500 line-clamp-2">{item.description}</p>
                
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">Investido</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{item.metrics?.investment || "-"}</span>
                   </div>
                   <div className="flex flex-col text-right">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">CPL</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{item.metrics?.cpl || "-"}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
