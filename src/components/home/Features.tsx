import { Star, MessageCircle, SlidersHorizontal, Globe } from "lucide-react";

const features = [
  {
    icon: Star,
    title: "Avaliações reais",
    description: "Apenas clientes verificados podem avaliar. Nota, comentários e comprovantes de resultado.",
    gradient: "from-violet-600 to-blue-600",
    shadow: "shadow-violet-600/20",
  },
  {
    icon: MessageCircle,
    title: "Contato direto WhatsApp",
    description: "Sem intermediário. Clique e fale agora com o gestor. Lead quente, sem taxa por fechamento.",
    gradient: "from-emerald-500 to-green-600",
    shadow: "shadow-emerald-600/20",
    isWhatsApp: true,
  },
  {
    icon: SlidersHorizontal,
    title: "Filtros por nicho",
    description: "E-commerce, infoprodutos, local, SaaS, serviços. Encontre quem já tem resultado no seu mercado.",
    gradient: "from-blue-600 to-cyan-500",
    shadow: "shadow-blue-600/20",
  },
  {
    icon: Globe,
    title: "SEO para gestores",
    description: "Seu perfil rankeia no Google para \"gestor de tráfego + cidade\". Receba clientes orgânicos todo mês.",
    gradient: "from-fuchsia-600 to-violet-600",
    shadow: "shadow-fuchsia-600/20",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Benefícios de contratar o seu gestor de tráfego aqui
          </h2>
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-400 font-medium">
            Criamos o TrafegoHub para acabar com indicações às cegas.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-slate-200 to-transparent dark:from-slate-800 hover:from-violet-500/50 transition"
            >
              <div className="h-full bg-white dark:bg-slate-900 rounded-[23px] p-6">
                <div
                  className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg ${feature.shadow} group-hover:scale-110 transition`}
                >
                  {feature.isWhatsApp ? (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12.001 2.002c-5.522 0-10 4.477-10 10.001 0 1.738.44 3.372 1.206 4.796l-1.276 4.666 4.774-1.252a9.953 9.953 0 004.296.99c5.522 0 9.999-4.477 9.999-10 0-5.523-4.477-10.001-9.999-10.001zm0 18.001a7.962 7.962 0 01-4.06-1.108l-.29-.174-2.834.743.757-2.763-.189-.284a7.956 7.956 0 01-1.222-4.413c0-4.41 3.588-8 8-8s7.999 3.59 7.999 8-3.587 8-7.999 8z" />
                    </svg>
                  ) : (
                    <feature.icon className="w-5 h-5 text-white" />
                  )}
                </div>
                <h3 className="mt-5 font-bold text-slate-900 dark:text-white text-lg">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-700 dark:text-slate-400 font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
