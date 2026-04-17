import Link from "next/link";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Free",
    subtitle: "Para começar",
    price: "R$0",
    features: ["Perfil básico nas buscas", "Até 3 contatos/mês", "Link direto WhatsApp"],
    cta: "Criar perfil grátis",
    ctaStyle: "border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800",
    highlight: false,
  },
  {
    name: "Pro",
    subtitle: "Para quem leva a sério",
    price: "R$49",
    features: [
      "Tudo do Free +",
      "Destaque nas buscas",
      "Contatos ilimitados",
      "SEO: rankeia no Google",
      "Selo verificado + portfólio",
    ],
    cta: "Assinar Pro",
    ctaStyle:
      "bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-violet-600 dark:to-blue-600 text-white shadow-lg shadow-indigo-600/25 dark:shadow-violet-600/25 hover:shadow-xl",
    highlight: true,
    badge: "Mais popular",
  },
  {
    name: "Agência",
    subtitle: "Para times",
    price: "R$149",
    features: ["Tudo do Pro +", "Até 5 gestores", "Página da agência", "Leads prioritários"],
    cta: "Falar com vendas",
    ctaStyle: "border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="precos" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Planos para gestores
          </h2>
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-400 font-medium">
            Comece grátis. Escale quando fizer sentido.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.highlight
                  ? "relative rounded-[28px] bg-gradient-to-b from-blue-700 to-indigo-700 dark:from-violet-600 dark:to-blue-600 p-[1.5px] shadow-2xl shadow-indigo-600/20 dark:shadow-violet-600/20"
                  : "relative rounded-[28px] bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-8"
              }
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider">
                  {plan.badge}
                </div>
              )}

              <div className={plan.highlight ? "h-full rounded-[26px] bg-white dark:bg-slate-950 p-8" : ""}>
                <h3 className="text-[22px] font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="mt-1 text-[14px] text-slate-600 dark:text-slate-400">{plan.subtitle}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span
                    className={`text-[40px] font-extrabold tracking-tight ${
                      plan.highlight ? "bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-violet-400 dark:to-blue-400 bg-clip-text text-transparent" : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span className="text-slate-500">/mês</span>
                </div>

                <ul className="mt-6 space-y-3 text-[14px]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/login"
                  className={`mt-8 w-full h-11 grid place-items-center rounded-xl font-semibold transition ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>

                {plan.highlight && (
                  <p className="mt-3 text-center text-[12px] text-slate-500">Cancele quando quiser</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
