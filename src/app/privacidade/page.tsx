import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Políticas de Privacidade | TrafegoHub",
  description: "Políticas de Privacidade e tratamento de dados dos usuários da plataforma TrafegoHub.",
};

export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-20">
        <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Política de Privacidade
        </h1>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300">
          <p>
            A sua privacidade é importante para nós. É política do TrafegoHub respeitar a sua privacidade em 
            relação a qualquer informação sua que possamos coletar no site.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-10">1. Coleta de Dados (LGPD)</h2>
          <p>
            Solicitamos informações pessoais, como nome, e-mail e telefone apenas quando estritamente necessário 
            para fornecer-lhe os nossos serviços de conexão (matchmaking entre empresas e gestores). Fazemos isso por 
            meios justos e legais, com o seu conhecimento e consentimento expresso no ato do cadastro.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-10">2. Uso das Informações e Contato</h2>
          <p>
            Os gestores que cadastram o seu número de WhatsApp no perfil declaram ciência e autorização para que o 
            número seja tornado público na base de dados para que eventuais empresas entrem em contato direto para a 
            contratação dos serviços. Ao realizar o cadastro, você manifesta ciência deste funcionamento nuclear da plataforma.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-10">3. Segurança</h2>
          <p>
            Adotamos medidas de segurança reconhecidas no mercado (senhas hasheadas utilizando bcrypt) para proteger suas 
            informações em nosso VPS e bancos PostgreSQL contra acessos não autorizados. No entanto, lembre-se que 
            nenhum método de transmissão pela internet ou de armazenamento eletrônico é 100% seguro.
          </p>
          
          <p className="mt-12 text-sm text-slate-500">
            Última atualização: 20 de Abril de 2026. Em caso de dúvidas sobre LGPD, contate-nos.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
