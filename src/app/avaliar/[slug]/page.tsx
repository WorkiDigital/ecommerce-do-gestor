import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";
import ReviewForm from "./ReviewForm";

export const dynamic = "force-dynamic";

export default async function AvaliarPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  let gestor = null;
  try {
    gestor = await prisma.profile.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.warn("Falha ao buscar gestor no BD:", error);
  }

  if (!gestor) {
    return (
      <>
        <Header />
        <main className="flex-1 grid place-items-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gestor não encontrado</h1>
            <Link href="/gestores" className="mt-4 text-violet-600 hover:underline text-sm font-medium">
              Voltar para gestores
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <Link
            href={`/gestores/${gestor.slug}`}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-violet-600 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao perfil de {gestor.displayName}
          </Link>

          <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              {gestor.avatarUrl ? (
                <img
                  src={gestor.avatarUrl}
                  alt={gestor.displayName}
                  className="w-14 h-14 rounded-2xl object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 font-bold">
                  {gestor.displayName.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-slate-900 dark:text-white">
                  Avaliar {gestor.displayName}
                </h1>
                <p className="text-[13px] text-slate-500">{gestor.city}, {gestor.state}</p>
              </div>
            </div>

            <ReviewForm gestor={gestor} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
