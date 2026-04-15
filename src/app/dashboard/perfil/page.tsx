import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { UserCircle, Edit3 } from "lucide-react";

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
        <h1 className="text-3xl font-bold font-[family-name:var(--font-outfit)] text-slate-900 dark:text-white">Meu Perfil</h1>
        <p className="text-slate-500 mt-1">Gerencie os detalhes do seu perfil público de gestor.</p>
      </div>

      {!profile ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mb-4">
            <UserCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Você ainda não criou seu perfil!</h2>
          <p className="text-slate-500 mb-6 max-w-md">
            Para aparecer na lista de gestores e começar a captar leads, você precisa preencher as informações do seu perfil público.
          </p>
          <a href="/cadastrar" className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium transition">
            Criar meu Perfil Agora
          </a>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
             <div className="flex items-center gap-4">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="Avatar" className="w-20 h-20 rounded-full object-cover border border-slate-200" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                     <UserCircle className="w-10 h-10 text-violet-600 dark:text-violet-400" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold">{profile.displayName}</h2>
                  <p className="text-slate-500">{profile.title}</p>
                </div>
             </div>
             <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition">
               <Edit3 className="w-4 h-4" />
               Editar Perfil
             </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">Sobre Mim</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm whitespace-pre-wrap leading-relaxed">
                {profile.bio}
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">Nichos de Atuação</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.niches.map((niche, i) => (
                    <span key={i} className="px-3 py-1 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 text-sm rounded-full font-medium">
                      {niche}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">Plataformas Dominadas</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.platforms.map((platform, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-sm rounded-full font-medium">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
