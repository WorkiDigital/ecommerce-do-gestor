import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ProfileForm from "@/components/dashboard/ProfileForm";

export const dynamic = "force-dynamic";

export default async function PerfilPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
  });

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-outfit)] text-slate-900 dark:text-white">
          {profile ? "Editar Perfil" : "Crie seu Perfil Profissional"}
        </h1>
        <p className="text-slate-500 mt-1">
          {profile 
            ? "Mantenha seus dados atualizados para atrair mais clientes." 
            : "Complete as informações abaixo para começar a aparecer no marketplace."}
        </p>
      </div>

      <ProfileForm initialData={profile} />
    </div>
  );
}

