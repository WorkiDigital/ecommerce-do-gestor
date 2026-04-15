import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();

  // Segurança: Apenas ADMIN pode acessar
  if (session?.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Buscar todos os usuários com perfis e contagem de leads
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
      id: "asc" // Ou por data de criação se houvesse
    }
  });

  return (
    <div className="p-6 md:p-10">
      <AdminClient initialUsers={users} />
    </div>
  );
}
