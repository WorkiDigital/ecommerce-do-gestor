import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | TrafegoHub",
  description: "Termos de Uso e condições gerais para a utilização da plataforma TrafegoHub.",
};

export default function TermosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-20">
        <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Termos de Uso
        </h1>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300">
          <p>
            Estes termos e condições descrevem as regras de uso do site da TrafegoHub.
          </p>
          
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-10">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar o site TrafegoHub, você concorda em cumprir estes termos de serviço, bem como todas 
            as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de 
            usar ou acessar este site.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-10">2. Serviços do Marketplace</h2>
          <p>
            A TrafegoHub atua exclusivamente como uma plataforma de conexão (marketplace) entre empresas contratantes 
            e gestores de tráfego independentes. Não nos responsabilizamos pelos serviços prestados, contratos fechados 
            ou resultados não alcançados entre as partes. Toda e qualquer negociação via WhatsApp é de responsabilidade 
            exclusiva do usuário e do prestador de serviço.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-10">3. Isenção de Responsabilidade</h2>
          <p>
            Os dados de portfólio, avaliações e certificações apresentados nos perfis dos gestores são fornecidos 
            pelos próprios profissionais. A TrafegoHub envida esforços para manter o controle de qualidade e a veracidade, 
            mas as informações podem sofrer alterações sem aviso prévio. O serviço é oferecido "como está".
          </p>
          
          <p className="mt-12 text-sm text-slate-500">
            Última atualização: 20 de Abril de 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
