import Link from "next/link";

const empresaSteps = [
  { title: "Busque e filtre", description: "Por nicho, orçamento, plataforma (Meta, Google) e localização." },
  { title: "Compare avaliações", description: "Veja cases reais, investimentos gerenciados e feedbacks verificados." },
  { title: "Feche no WhatsApp", description: "Clique no botão e contrate direto. 100% gratuito para você." },
];

const gestorSteps = [
  { title: "Crie seu perfil em 3 min", description: "Adicione nichos, plataformas, cases e seu WhatsApp." },
  { title: "Apareça no topo", description: "Perfil otimizado para Google + destaque no TrafegoHub." },
  { title: "Receba leads quentes", description: "Contato direto no seu WhatsApp, sem comissão." },
];

export default function HowItWorks() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Para empresas */}
          <div className="relative overflow-hidden rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                Para Empresas
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-outfit)] text-[28px] font-bold text-slate-900 dark:text-white">
                Contrate em 3 passos
              </h3>
              <div className="mt-8 space-y-6">
                {empresaSteps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 grid place-items-center text-sm font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{step.title}</p>
                      <p className="text-[15px] text-slate-700 dark:text-slate-400 mt-1 font-medium">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/gestores"
                className="mt-8 inline-flex h-11 px-5 items-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:opacity-90 transition"
              >
                Ver gestores agora
              </Link>
            </div>
          </div>

          {/* Para gestores */}
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-700 to-indigo-700 p-8 sm:p-10 text-white shadow-xl shadow-indigo-600/10">
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur">
                Para Gestores
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-outfit)] text-[28px] font-bold">
                Seja encontrado todos os dias
              </h3>
              <div className="mt-8 space-y-6">
                {gestorSteps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-xl bg-white text-blue-700 grid place-items-center text-sm font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="text-[15px] text-blue-100 mt-1 font-medium">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/login"
                className="mt-8 inline-flex h-11 px-5 items-center rounded-xl bg-white text-blue-800 font-bold text-sm hover:bg-blue-50 transition"
              >
                Quero ser encontrado
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
