import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { MessageCircle, Mail, Phone, DollarSign, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

const InstagramIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.76 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);


export const dynamic = "force-dynamic";

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  CONTACTED: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  CLOSED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  LOST: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const statusLabels: Record<string, string> = {
  NEW: "Novo",
  CONTACTED: "Contatado",
  CLOSED: "Fechado",
  LOST: "Perdido",
};

export default async function LeadsPage() {
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
    },
  });

  if (!profile) {
    redirect("/dashboard");
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-violet-600 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao painel
        </Link>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-outfit)] text-slate-900 dark:text-white">
          Meus Leads
        </h1>
        <p className="text-slate-500 mt-1">
          {profile.leads.length} lead{profile.leads.length !== 1 ? "s" : ""} captado{profile.leads.length !== 1 ? "s" : ""} através do seu perfil público.
        </p>
      </div>

      {profile.leads.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 grid place-items-center">
            <MessageCircle className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Nenhum lead por enquanto</h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Quando um cliente preencher o formulário na sua página pública, ele aparecerá aqui para
            você entrar em contato.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {profile.leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {lead.name}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 text-[11px] font-bold uppercase rounded-full ${
                        statusColors[lead.status] || statusColors.NEW
                      }`}
                    >
                      {statusLabels[lead.status] || lead.status}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span>{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span>{lead.phone}</span>
                    </div>
                    {lead.instagram && (
                      <div className="flex items-center gap-2">
                        <InstagramIcon />
                        <span>{lead.instagram}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                      <span>{lead.revenue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>
                        {new Date(lead.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold shadow-lg shadow-green-600/20 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
