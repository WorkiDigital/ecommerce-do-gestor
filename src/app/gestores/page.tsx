import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import prisma from "@/lib/prisma";
import GestoresClientPage from "./GestoresClientPage";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function GestoresPage() {
  // Busca todos os gestores do banco real no Server Component
  const gestores = await prisma.profile.findMany({
    orderBy: { avgRating: "desc" }
  });

  // Serialização
  const gestoresData = JSON.parse(JSON.stringify(gestores));

  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense fallback={
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="animate-pulse space-y-6">
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3" />
              <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              <div className="grid md:grid-cols-3 gap-6">
                {[1,2,3].map(i => <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />)}
              </div>
            </div>
          </div>
        }>
          <GestoresClientPage initialGestores={gestoresData} />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
