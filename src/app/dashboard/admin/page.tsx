import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  const isAdminMaster = session?.user?.email === "workidigitaloficial@gmail.com";

  // Segurança: Apenas ADMIN ou Master pode acessar
  if (session?.user?.role !== "ADMIN" && !isAdminMaster) {
    redirect("/dashboard");
  }

  // Se for master mas não tiver role ADMIN no banco, vamos tentar promover (através da renderização do cliente)
  // Mas no server side, apenas permitimos a passagem.

  // 1. Buscar todos os usuários
  const users = await prisma.user.findMany({
    include: {
      profile: {
        include: {
          _count: {
            select: { leads: true }
          }
        }
      }
    },
    orderBy: {
      id: "desc"
    }
  });

  // 2. Buscar Métricas Globais
  const [totalLeads, totalViewsResult] = await Promise.all([
    prisma.lead.count(),
    prisma.profile.aggregate({
      _sum: {
        views: true
      }
    })
  ]);

  const globalStats = {
    totalUsers: users.length,
    totalLeads,
    totalViews: totalViewsResult._sum.views || 0,
    activeProfiles: users.filter(u => u.profile).length
  };

  return (
    <div className="p-0">
      <AdminClient 
        initialUsers={users} 
        globalStats={globalStats}
        isAdminMaster={isAdminMaster}
      />
    </div>
  );
}
