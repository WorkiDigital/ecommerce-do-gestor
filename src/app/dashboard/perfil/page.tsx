import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ProfileForm from "@/components/dashboard/ProfileForm";
import PortfolioManager from "@/components/dashboard/PortfolioManager";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PerfilPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: {
      portfolio: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-outfit)] text-slate-900 dark:text-white">Seu Perfil Profissional</h1>
          <p className="text-slate-500 mt-1">Como você aparece para os clientes no marketplace.</p>
        </div>
        
        {profile?.slug && (
          <Link
            href={`/gestores/${profile.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-200 transition"
          >
            <ExternalLink className="w-4 h-4" />
            Ver Perfil Público
          </Link>
        )}
      </div>

      <div className="grid gap-10">
        <section>
          <ProfileForm initialData={profile} />
        </section>

        {profile && (
          <section>
            <PortfolioManager items={profile.portfolio} />
          </section>
        )}
      </div>
    </main>
  );
}
