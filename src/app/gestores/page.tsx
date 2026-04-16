import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import prisma from "@/lib/prisma";
import GestoresClientPage from "./GestoresClientPage";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Encontre os Melhores Gestores de Tráfego",
  description: "Explore nosso marketplace de gestores de tráfego pago. Filtre por nicho, plataforma e veja avaliações reais antes de contratar.",
  openGraph: {
    title: "Marketplace de Gestores de Tráfego — TrafegoHub",
    description: "Contrate especialistas certificados em Google Ads, Meta Ads e mais. Portfólio verificado.",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 12;

export default async function GestoresPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  
  // PARAMS
  const page = Number(searchParams.page) || 1;
  const query = (searchParams.q as string) || "";
  const nicho = (searchParams.nicho as string) || "";
  const plataforma = (searchParams.plataforma as string) || "";
  const sort = (searchParams.sort as string) || "rating";

  // WHERE CLAUSE
  const where: any = {};

  if (query) {
    where.OR = [
      { displayName: { contains: query, mode: "insensitive" } },
      { city: { contains: query, mode: "insensitive" } },
      { tagline: { contains: query, mode: "insensitive" } },
    ];
  }

  if (nicho) {
    where.niches = { has: nicho };
  }

  if (plataforma) {
    where.platforms = { has: plataforma };
  }

  // ORDER BY
  let orderBy: any = { avgRating: "desc" };
  if (sort === "price-asc") orderBy = { minPrice: "asc" };
  if (sort === "price-desc") orderBy = { minPrice: "desc" };
  if (sort === "reviews") orderBy = { reviewCount: "desc" };

  try {
    // BUSCA COM PAGINAÇÃO
    const [gestores, total] = await Promise.all([
      prisma.profile.findMany({
        where,
        orderBy: [
          { isFeatured: "desc" }, // Destaques sempre primeiro
          orderBy,
        ],
        skip: (page - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
      }),
      prisma.profile.count({ where }),
    ]);

    // Serialização
    const gestoresData = JSON.parse(JSON.stringify(gestores));

    return (
      <>
        <Header />
        <main className="flex-1">
          <Suspense fallback={<MarketplaceSkeleton />}>
            <GestoresClientPage 
              initialGestores={gestoresData} 
              totalItems={total}
              currentPage={page}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFloat />
      </>
    );
  } catch (error) {
    console.error("Erro ao buscar gestores:", error);
    return (
      <>
        <Header />
        <div className="flex-1 flex items-center justify-center p-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Oops! Algo deu errado.</h2>
            <p className="text-slate-500">Não conseguimos conectar ao banco de dados agora.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

function MarketplaceSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="animate-pulse space-y-6">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3" />
        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
