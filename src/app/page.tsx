import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedGestores from "@/components/home/FeaturedGestores";
import Pricing from "@/components/home/Pricing";
import FinalCTA from "@/components/home/FinalCTA";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  let featuredGestores: any[] = [];
  let totalGestores = 0;
  let gestoresData: any[] = [];

  try {
    // Buscar gestores em destaque do banco de dados real
    featuredGestores = await prisma.profile.findMany({
      where: { isFeatured: true },
      take: 6,
      orderBy: { avgRating: "desc" }
    });
    totalGestores = await prisma.profile.count();
    gestoresData = JSON.parse(JSON.stringify(featuredGestores));
  } catch (err) {
    // Engole o erro silenciosamente para o Next.js não puxar a tela de erro no ambiente de dev
    totalGestores = 0;
    gestoresData = [];
  }

  return (
    <>
      <Header />
      <main>
        <Hero totalGestores={totalGestores} />
        <Features />
        <HowItWorks />
        <FeaturedGestores initialGestores={gestoresData} />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

