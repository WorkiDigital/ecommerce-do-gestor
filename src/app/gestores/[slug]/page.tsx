import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import prisma from "@/lib/prisma";
import { NICHOS } from "@/lib/constants";
import GestorProfileView from "./GestorProfileView";
import JsonLd from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // Cache individual de cada perfil dura 1 hora

const BASE_URL = "https://trafegohub.workidigital.tech";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const gestor = await prisma.profile.findUnique({
    where: { slug },
  });

  if (!gestor) return { title: "Gestor não encontrado" };

  // SEO Local: Incluir Cidade no título para ranqueamento regional
  const nichoPrincipal = gestor.niches.length > 0 
    ? NICHOS.find(n => n.value === gestor.niches[0])?.label 
    : "Tráfego Pago";
  
  const title = `${gestor.displayName} — Gestor de ${nichoPrincipal} em ${gestor.city}${gestor.state ? `, ${gestor.state}` : ""}`;
  const description = `⭐ ${gestor.avgRating} (${gestor.reviewCount} avaliações) • Especialista em ${gestor.niches.map(n => NICHOS.find(nn => nn.value === n)?.label || n).join(", ")}. Contato direto via WhatsApp.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/gestores/${slug}`,
    },
    openGraph: {
      title: `${gestor.displayName} | TrafegoHub`,
      description: gestor.tagline || "",
      images: gestor.avatarUrl ? [gestor.avatarUrl] : [`${BASE_URL}/og-image.png`],
      type: "profile",
      url: `${BASE_URL}/gestores/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: gestor.avatarUrl ? [gestor.avatarUrl] : [`${BASE_URL}/og-image.png`],
    },
  };
}

export async function generateStaticParams() {
  // Pré-gera estaticamente os 20 gestores mais bem avaliados no momento do build
  const topGestores = await prisma.profile.findMany({
    where: { user: { status: "ACTIVE" } },
    orderBy: { avgRating: "desc" },
    take: 20,
    select: { slug: true }
  });

  return topGestores.map((gestor) => ({
    slug: gestor.slug,
  }));
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

  // 1. Esquema de Pessoa/Profissional
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": gestor.displayName,
    "image": gestor.avatarUrl || `${BASE_URL}/og-image.png`,
    "description": gestor.tagline,
    "url": `${BASE_URL}/gestores/${slug}`,
    "telephone": gestor.whatsapp,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": gestor.city,
      "addressRegion": gestor.state,
      "addressCountry": "BR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": gestor.avgRating || 5,
      "reviewCount": gestor.reviewCount || 1,
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "R$"
  };

  // 2. Esquema de Breadcrumb (Trilha de Navegação)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Gestores",
        "item": `${BASE_URL}/gestores`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": gestor.displayName,
        "item": `${BASE_URL}/gestores/${slug}`
      }
    ]
  };

  const gestorData = JSON.parse(JSON.stringify(gestor));
  const reviewsData = JSON.parse(JSON.stringify(gestor.reviews));

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="flex-1">
        <GestorProfileView gestor={gestorData} reviews={reviewsData} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
