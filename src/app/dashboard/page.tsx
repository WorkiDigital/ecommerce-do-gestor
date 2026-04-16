import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

const DAY_NAMES_PT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

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

  // Build last 7 days range
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const dailyStats = await prisma.dailyProfileStats.findMany({
    where: {
      profileId: profile.id,
      date: { gte: sevenDaysAgo },
    },
    orderBy: { date: "asc" },
  });

  // Build a map for quick lookup
  const statsMap = new Map(
    dailyStats.map((s) => [s.date.toISOString().slice(0, 10), s])
  );

  // Build 7-day array, filling missing days with zeros
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sevenDaysAgo);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    const stat = statsMap.get(key);
    return {
      name: DAY_NAMES_PT[d.getDay()],
      views: stat?.views ?? 0,
      actions: stat?.whatsappClicks ?? 0,
    };
  });

  return (
    <DashboardClient
      profile={profile}
      initialLeads={profile.leads}
      chartData={chartData}
      stats={{
        views: (profile as any).views || 0,
        whatsappClicks: (profile as any).whatsappClicks || 0,
        leadsCount: profile.leads.length,
        avgRating: profile.avgRating,
        reviewCount: profile.reviewCount,
      }}
    />
  );
}
