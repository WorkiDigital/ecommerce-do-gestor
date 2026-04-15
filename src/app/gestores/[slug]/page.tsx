import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import prisma from "@/lib/prisma";
import { NICHOS } from "@/lib/constants";
import GestorProfileView from "./GestorProfileView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const gestor = await prisma.profile.findUnique({
    where: { slug },
    include: {
      portfolio: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!gestor) return { title: "Gestor não encontrado" };

  return {
    title: `${gestor.displayName} — Gestor de Tráfego ${gestor.niches.map(n => NICHOS.find(nn => nn.value === n)?.label || n).join(", ")}`,
    description: `⭐ ${gestor.avgRating} (${gestor.reviewCount} avaliações) • ${gestor.city}, ${gestor.state} • ${gestor.tagline}`,
    openGraph: {
      title: `${gestor.displayName} | TrafegoHub`,
      description: gestor.tagline || "",
      images: gestor.avatarUrl ? [gestor.avatarUrl] : [],
    },
  };
}

export default async function GestorPage({ params }: PageProps) {
  const { slug } = await params;

  const gestor = await prisma.profile.findUnique({
    where: { slug },
    include: {
      reviews: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!gestor) notFound();

  // Convertendo data do Prisma para o formato esperado pelo componente UI (serialização de datas)
  const gestorData = JSON.parse(JSON.stringify(gestor));
  const reviewsData = JSON.parse(JSON.stringify(gestor.reviews));

  return (
    <>
      <Header />
      <main className="flex-1">
        <GestorProfileView gestor={gestorData} reviews={reviewsData} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
