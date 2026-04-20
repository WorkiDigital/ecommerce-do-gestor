import Image from "next/image";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    content: "Encontramos o nosso gestor de e-commerce em menos de 2 horas. A conexão via WhatsApp agilizou tudo. Nosso ROAS com Google Ads já subiu 40% no primeiro mês.",
    author: "Marina Silva",
    role: "CEO, Loja de Semijoias",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    content: "Estava cansado de indicações furadas e testes caros. Pelo TrafegoHub, vi o portfólio todo antes de sequer mandar o primeiro 'oi'. Processo hiper transparente.",
    author: "Ricardo Gomes",
    role: "Diretor Comercial, TechSaaS",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
  },
  {
    content: "A ausência de taxas intermediárias e mensalidades nos ajudou muito. Fechamos um contrato semestral com um especialista em Meta Ads para negócios locais.",
    author: "Amanda Vasconcelos",
    role: "Fundadora, Rede de Clínicas",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-center mx-auto mb-16">
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Quem aprova e contrata no TrafegoHub
          </h2>
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-400 font-medium">
            Empresas reais alcançando faturamento real com gestores de tráfego encontrados aqui.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div 
              key={i} 
              className="relative p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition duration-300"
            >
              <Quote className="absolute top-6 right-8 w-8 h-8 text-violet-500/10 dark:text-violet-500/20" />
              
              <div className="flex gap-1 mb-6 text-amber-500">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-[15px] font-medium leading-relaxed mb-8">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <Image 
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-[15px]">
                    {testimonial.author}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
