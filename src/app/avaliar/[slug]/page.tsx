"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Star, ArrowLeft, CheckCircle } from "lucide-react";
import { MOCK_GESTORES } from "@/lib/data";
import { useParams } from "next/navigation";

export default function AvaliarPage() {
  const params = useParams();
  const slug = params.slug as string;
  const gestor = MOCK_GESTORES.find((g) => g.slug === slug);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to Supabase
    setSubmitted(true);
  };

  if (!gestor) {
    return (
      <>
        <Header />
        <main className="flex-1 grid place-items-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gestor não encontrado</h1>
            <Link href="/gestores" className="mt-4 text-violet-600 hover:underline text-sm font-medium">
              Voltar para gestores
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="flex-1 grid place-items-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 grid place-items-center">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Avaliação enviada!</h1>
            <p className="mt-2 text-slate-500">
              Sua avaliação para <strong>{gestor.displayName}</strong> será publicada após moderação. Obrigado!
            </p>
            <Link
              href={`/gestores/${gestor.slug}`}
              className="mt-6 inline-flex h-10 px-5 items-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition"
            >
              Voltar ao perfil
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <Link
            href={`/gestores/${gestor.slug}`}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-violet-600 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao perfil de {gestor.displayName}
          </Link>

          <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <img
                src={gestor.avatarUrl}
                alt={gestor.displayName}
                className="w-14 h-14 rounded-2xl object-cover"
              />
              <div>
                <h1 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-slate-900 dark:text-white">
                  Avaliar {gestor.displayName}
                </h1>
                <p className="text-[13px] text-slate-500">{gestor.city}, {gestor.state}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Stars */}
              <div>
                <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-3">
                  Sua nota *
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoverRating || rating)
                            ? "text-amber-500 fill-current"
                            : "text-slate-300 dark:text-slate-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                  Seu nome *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="João da Silva"
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                  Seu e-mail * <span className="normal-case font-normal">(não será exibido)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="joao@empresa.com.br"
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                />
              </div>

              {/* Company */}
              <div>
                <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                  Empresa <span className="normal-case font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Nome da empresa"
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                  Seu comentário *
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={4}
                  placeholder="Conte como foi sua experiência com este gestor..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!rating || !name || !email || !comment}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold shadow-lg shadow-violet-600/25 hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar avaliação
              </button>
              <p className="text-center text-[12px] text-slate-500">
                Avaliações passam por moderação antes de serem publicadas.
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
