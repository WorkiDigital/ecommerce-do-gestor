import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-600/20 mb-6">
          <Zap className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="font-[family-name:var(--font-outfit)] text-6xl font-bold text-slate-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          Página não encontrada
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8 font-medium">
          A página que você estava tentando acessar não existe mais ou foi movida. 
          Vamos redirecionar você para os conteúdos mais assertivos para a sua busca.
        </p>
        
        <div className="flex sm:flex-row flex-col gap-4">
          <Link
            href="/gestores"
            className="h-12 px-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-bold hover:opacity-90 transition-opacity"
          >
            Navegar pelos Gestores
          </Link>
          <Link
            href="/"
            className="h-12 px-8 inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Voltar para o Início
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
