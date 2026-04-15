"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { NICHOS, PLATAFORMAS } from "@/lib/constants";
import { Check, ArrowRight, ArrowLeft, Zap, Upload } from "lucide-react";

const steps = ["Dados pessoais", "Profissional", "Redes & Contato", "Revisão"];

export default function CadastrarPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState({
    displayName: "",
    city: "",
    state: "",
    bio: "",
    niches: [] as string[],
    platforms: [] as string[],
    minPrice: "",
    tagline: "",
    whatsapp: "",
    instagram: "",
    facebook: "",
    website: "",
  });

  const updateForm = (key: string, value: string | string[]) => {
    setForm({ ...form, [key]: value });
  };

  const toggleArray = (key: "niches" | "platforms", value: string) => {
    const arr = form[key];
    if (arr.includes(value)) {
      updateForm(key, arr.filter((v) => v !== value));
    } else {
      updateForm(key, [...arr, value]);
    }
  };

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 0));

  const handleSubmit = () => {
    // TODO: Save to Supabase
    alert("Perfil criado com sucesso! (Em breve com backend)");
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-slate-900 dark:text-white">
              Crie seu perfil
            </h1>
            <p className="mt-1 text-[14px] text-slate-500">
              Preencha as informações para aparecer no TrafegoHub
            </p>
          </div>

          {/* Steps */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <button
                  onClick={() => i < currentStep && setCurrentStep(i)}
                  className={`w-8 h-8 rounded-full text-sm font-bold grid place-items-center transition ${
                    i < currentStep
                      ? "bg-emerald-500 text-white"
                      : i === currentStep
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-600/25"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                  }`}
                >
                  {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                </button>
                {i < steps.length - 1 && (
                  <div
                    className={`hidden sm:block w-12 h-0.5 ${
                      i < currentStep ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
              {steps[currentStep]}
            </h2>

            {/* Step 1: Dados pessoais */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                    Nome completo ou empresa *
                  </label>
                  <input
                    value={form.displayName}
                    onChange={(e) => updateForm("displayName", e.target.value)}
                    placeholder="João Silva ou Agência XYZ"
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                      Cidade *
                    </label>
                    <input
                      value={form.city}
                      onChange={(e) => updateForm("city", e.target.value)}
                      placeholder="São Paulo"
                      className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                      Estado *
                    </label>
                    <input
                      value={form.state}
                      onChange={(e) => updateForm("state", e.target.value)}
                      placeholder="SP"
                      maxLength={2}
                      className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                    Bio *
                  </label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => updateForm("bio", e.target.value)}
                    rows={3}
                    placeholder="Conte sobre sua experiência e resultados..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Profissional */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-3">
                    Nichos de atuação *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {NICHOS.map((n) => (
                      <button
                        key={n.value}
                        type="button"
                        onClick={() => toggleArray("niches", n.value)}
                        className={`px-3 py-2 rounded-xl text-[13px] font-medium border transition ${
                          form.niches.includes(n.value)
                            ? "bg-violet-500/10 border-violet-500/30 text-violet-700 dark:text-violet-300"
                            : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        {form.niches.includes(n.value) && <Check className="w-3 h-3 inline mr-1" />}
                        {n.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-3">
                    Plataformas *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PLATAFORMAS.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => toggleArray("platforms", p.value)}
                        className={`px-3 py-2 rounded-xl text-[13px] font-medium border transition ${
                          form.platforms.includes(p.value)
                            ? "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300"
                            : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        {form.platforms.includes(p.value) && <Check className="w-3 h-3 inline mr-1" />}
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                      Preço mínimo (R$/mês)
                    </label>
                    <input
                      type="number"
                      value={form.minPrice}
                      onChange={(e) => updateForm("minPrice", e.target.value)}
                      placeholder="1500"
                      className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                      Frase destaque
                    </label>
                    <input
                      value={form.tagline}
                      onChange={(e) => updateForm("tagline", e.target.value)}
                      placeholder="ROAS 4.8x em e-commerce"
                      className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Redes & Contato */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                    WhatsApp * <span className="normal-case font-normal">(com DDD)</span>
                  </label>
                  <input
                    value={form.whatsapp}
                    onChange={(e) => updateForm("whatsapp", e.target.value)}
                    placeholder="5511999999999"
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                    Instagram <span className="normal-case font-normal">(sem @)</span>
                  </label>
                  <input
                    value={form.instagram}
                    onChange={(e) => updateForm("instagram", e.target.value)}
                    placeholder="joaosilva.ads"
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                    Facebook <span className="normal-case font-normal">(nome de usuário)</span>
                  </label>
                  <input
                    value={form.facebook}
                    onChange={(e) => updateForm("facebook", e.target.value)}
                    placeholder="joaosilvaads"
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                    Website
                  </label>
                  <input
                    value={form.website}
                    onChange={(e) => updateForm("website", e.target.value)}
                    placeholder="https://seusite.com.br"
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Revisão */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[13px] text-slate-500">Nome</span>
                    <span className="text-[13px] font-medium text-slate-900 dark:text-white">{form.displayName || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[13px] text-slate-500">Cidade</span>
                    <span className="text-[13px] font-medium text-slate-900 dark:text-white">{form.city}, {form.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[13px] text-slate-500">WhatsApp</span>
                    <span className="text-[13px] font-medium text-slate-900 dark:text-white">{form.whatsapp || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[13px] text-slate-500">Nichos</span>
                    <span className="text-[13px] font-medium text-slate-900 dark:text-white">
                      {form.niches.map((n) => NICHOS.find((nn) => nn.value === n)?.label).join(", ") || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[13px] text-slate-500">Plataformas</span>
                    <span className="text-[13px] font-medium text-slate-900 dark:text-white">
                      {form.platforms.map((p) => PLATAFORMAS.find((pp) => pp.value === p)?.label).join(", ") || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[13px] text-slate-500">Preço mínimo</span>
                    <span className="text-[13px] font-medium text-slate-900 dark:text-white">
                      {form.minPrice ? `R$${form.minPrice}/mês` : "—"}
                    </span>
                  </div>
                </div>
                <p className="text-[13px] text-slate-500 text-center">
                  Revise as informações acima. Você poderá editá-las depois no painel.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              {currentStep > 0 ? (
                <button
                  onClick={prevStep}
                  className="h-10 px-5 flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar
                </button>
              ) : (
                <div />
              )}

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="h-10 px-5 flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold shadow-lg shadow-violet-600/25 hover:shadow-xl transition"
                >
                  Próximo <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="h-10 px-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold shadow-lg shadow-violet-600/25 hover:shadow-xl transition"
                >
                  <Zap className="w-4 h-4" /> Publicar perfil
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
