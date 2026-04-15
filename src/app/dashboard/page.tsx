import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();

  // Se não estiver logado, o middleware já redireciona, mas é bom ter uma redundância aqui
  if (!session?.user) {
    redirect("/login");
  }

  // Buscar o perfil do gestor logado
  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: {
      leads: {
        orderBy: { createdAt: "desc" },
      },
      reviews: true,
    },
  });

  if (!profile) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">Perfil não encontrado</h2>
        <p className="text-slate-500">Você ainda não possui um perfil de gestor vinculado a esta conta.</p>
      </div>
    );
  }

  // Dados reais para o cliente
  return (
    <DashboardClient 
      profile={profile} 
      initialLeads={profile.leads}
      stats={{
        views: profile.views || 0,
        whatsappClicks: profile.whatsappClicks || 0,
        leadsCount: profile.leads.length,
        avgRating: profile.avgRating,
        reviewCount: profile.reviewCount
      }}
    />
  );
}

