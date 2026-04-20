"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";

const faqs = [
  {
    question: "Quanto custa usar o TrafegoHub?",
    answer: "Para as empresas que buscam contratar, a plataforma é 100% gratuita. Você navega, avalia os portfólios e entra em contato direto no WhatsApp do profissional sem nenhum custo ou taxa."
  },
  {
    question: "A plataforma cobra comissão sobre os serviços fechados?",
    answer: "Não cobramos comissionamento. Toda negociação, contratação e formatação de pagamento é feita de forma privada via WhatsApp ou e-mail diretamente entre você e o Gestor de Tráfego selecionado."
  },
  {
    question: "Como funciona a verificação dos gestores?",
    answer: "Todos os perfis possuem um sistema de reviews e portfólios. Recomendamos sempre checar cases de sucesso descritos no perfil do Gestor e as estrelas recebidas por clientes anteriores."
  },
  {
    question: "Como faço para criar meu perfil profissional como Gestor?",
    answer: "Basta clicar em 'Quero ser encontrado' no topo do site e realizar o seu cadastro. Imediatamente após a criação de conta, seu perfil público estará disponível e posicionado para indexação no Google e em nas nossas buscas internas."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Geração do Schema Markup da página de FAQ para o Google (Rich Snippets)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-24 sm:py-32">
      <JsonLd data={faqSchema} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-400 font-medium">
            Tire suas dúvidas antes de começar a usar o marketplace
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <div 
                key={idx}
                className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                  isOpen 
                    ? "border-violet-500/20 bg-violet-50/50 dark:bg-violet-500/5 dark:border-violet-500/20" 
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-bold text-slate-900 dark:text-white text-[16px] pr-8">
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isOpen ? "bg-violet-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-48 pb-5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[15px] font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
