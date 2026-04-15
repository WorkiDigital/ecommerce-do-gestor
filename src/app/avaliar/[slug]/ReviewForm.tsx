"use client";

import { useState } from "react";
import { Star, CheckCircle, Loader2 } from "lucide-react";
import { submitReviewAction } from "./actions";
import Link from "next/link";

export default function ReviewForm({ gestor }: { gestor: any }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await submitReviewAction({
      slug: gestor.slug,
      reviewerName: name,
      reviewerCompany: company,
      rating,
      comment,
    });

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || "Ocorreu um erro ao enviar sua avaliação.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="text-center max-w-md mx-auto py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 grid place-items-center">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Avaliação enviada!</h1>
        <p className="mt-2 text-slate-500">
          Sua avaliação para <strong>{gestor.displayName}</strong> foi publicada com sucesso. Obrigado por contribuir!
        </p>
        <Link
          href={`/gestores/${gestor.slug}`}
          className="mt-6 inline-flex h-11 px-8 items-center rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition"
        >
          Voltar ao perfil
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

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
              disabled={loading}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition hover:scale-110 disabled:opacity-50"
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
          rows={4}
          placeholder="Conte como foi sua experiência com este gestor..."
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !rating || !name || !email || !comment}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold shadow-lg shadow-violet-600/25 hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Enviando..." : "Enviar avaliação"}
      </button>
      <p className="text-center text-[12px] text-slate-500">
        Suas informações são tratadas com segurança e privacidade.
      </p>
    </form>
  );
}
