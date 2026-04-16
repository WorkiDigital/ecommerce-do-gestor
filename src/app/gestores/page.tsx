import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import prisma from "@/lib/prisma";
import GestoresClientPage from "./GestoresClientPage";
import { Suspense } from "react";
import { NICHOS, PLATAFORMAS } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const BASE_URL = "https://trafegohub.workidigital.tech";

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const nicho = params.nicho as string;
  const plataforma = params.plataforma as string;
  const query = params.q as string;

  let title = "Encontre os Melhores Gestores de Tráfego";
  let description = "Explore nosso marketplace de gestores de tráfego pago. Filtre por nicho, plataforma e veja avaliações reais antes de contratar.";

  if (nicho) {
    const label = NICHOS.find(n => n.value === nicho)?.label;
    title = `Gestores de Tráfego para ${label} | TrafegoHub`;
    description = `Lista atualizada com os melhores gestores de tráfego especialistas em ${label}. Confira portfólios e avaliações.`;
  } else if (plataforma) {
    const label = PLATAFORMAS.find(p => p.value === plataforma)?.label;
    title = `Especialistas em ${label} | TrafegoHub`;
    description = `Encontre gestores de tráfego certificados em ${label} para escalar seus resultados.`;
  } else if (query) {
    title = `Resultados para "${query}" | TrafegoHub`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/gestores`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 12;

export default async function GestoresPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  // PARAMS
  const page = Number(params.page) || 1;
  const query = (params.q as string) || "";
  const nicho = (params.nicho as string) || "";
  const plataforma = (params.plataforma as string) || "";
  const sort = (params.sort as string) || "rating";

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

    // SCHEMA ITEM LIST (Para SEO de listagem)
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": gestores.map((gestor, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${BASE_URL}/gestores/${gestor.slug}`
      }))
    };

    // Serialização
    const gestoresData = JSON.parse(JSON.stringify(gestores));

    return (
      <>
        <JsonLd data={itemListSchema} />
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
