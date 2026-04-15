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
  // Buscar gestores em destaque do banco de dados real
  const featuredGestores = await prisma.profile.findMany({
    where: { isFeatured: true },
    take: 6,
    orderBy: { avgRating: "desc" }
  });

  // Serialização para evitar erros de data no Client Component se houver
  const gestoresData = JSON.parse(JSON.stringify(featuredGestores));

  return (
    <>
      <Header />
      <main>
        <Hero />
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
