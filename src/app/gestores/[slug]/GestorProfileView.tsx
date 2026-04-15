"use client";

import { NICHOS, PLATAFORMAS } from "@/lib/constants";
import { createLeadAction } from "./actions";
import { incrementProfileViews, incrementWhatsappClicks } from "@/app/actions/analytics";
import { useEffect } from "react";

function StarRating({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <div className="flex text-amber-500">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={star <= Math.round(rating) ? "fill-current" : "text-slate-300 dark:text-slate-600"}
          width={size}
          height={size}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">{review.reviewerName}</p>
          {review.reviewerCompany && (
            <p className="text-[13px] text-slate-500">{review.reviewerCompany}</p>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <StarRating rating={review.rating} size={14} />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{review.rating}.0</span>
        </div>
      </div>
      <p className="mt-3 text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed">
        {review.comment}
      </p>
      {review.response && (
        <div className="mt-4 pl-4 border-l-2 border-violet-500/30">
          <p className="text-[12px] font-semibold text-violet-700 dark:text-violet-300 mb-1">
            Resposta do gestor
          </p>
          <p className="text-[13px] text-slate-600 dark:text-slate-400">{review.response}</p>
        </div>
      )}
      <p className="mt-3 text-[12px] text-slate-400">
        {new Date(review.createdAt).toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}

export default function GestorProfileView({
  gestor,
  reviews,
}: {
  gestor: GestorProfile;
  reviews: Review[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    revenue: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Track page view
  useEffect(() => {
    if (gestor.id) {
      incrementProfileViews(gestor.id);
    }
  }, [gestor.id]);

  const handleWhatsappClick = async () => {
    if (gestor.id) {
      await incrementWhatsappClicks(gestor.id);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Usando a Server Action real para salvar no banco
      const result = await createLeadAction({
        profileId: gestor.id,
        ...leadForm
      });
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert("Erro ao enviar solicitação. Tente novamente.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Link
          href="/gestores"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-violet-600 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para gestores
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile header */}
            <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="relative shrink-0">
                  <img
                    src={gestor.avatarUrl}
                    alt={gestor.displayName}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                  {gestor.isVerified && (
                    <span className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-emerald-500 rounded-full border-3 border-white dark:border-slate-900 grid place-items-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                      {gestor.displayName}
                    </h1>
                    {gestor.badge && (
                      <span className="px-2.5 py-0.5 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 text-[12px] font-semibold">
                        {gestor.badge}
                      </span>
                    )}
                    {gestor.plan !== "free" && (
                      <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[12px] font-semibold uppercase">
                        {gestor.plan}
                      </span>
                    )}
                  </div>

                  <div className="mt-1.5 flex items-center gap-2 text-slate-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-[14px]">{gestor.city}, {gestor.state}</span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <StarRating rating={gestor.avgRating} />
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {gestor.avgRating.toFixed(1)}
                    </span>
                    <span className="text-[14px] text-slate-500">({gestor.reviewCount} avaliações)</span>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {gestor.niches.map((n) => (
                      <span key={n} className="px-3 py-1 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 text-[12px] font-medium">
                        {NICHOS.find((nn) => nn.value === n)?.label || n}
                      </span>
                    ))}
                    {gestor.platforms.map((p) => (
                      <span key={p} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[12px] font-medium">
                        {PLATAFORMAS.find((pp) => pp.value === p)?.label || p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Sobre</h3>
                <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {gestor.bio}
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-slate-900 dark:text-white">
                  Avaliações ({reviews.length})
                </h2>
                <Link
                  href={`/avaliar/${gestor.slug}`}
                  className="text-[13px] font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  Deixar avaliação
                </Link>
              </div>

              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
                  <p className="text-slate-500">Nenhuma avaliação ainda.</p>
                  <Link
                    href={`/avaliar/${gestor.slug}`}
                    className="mt-2 inline-block text-[14px] font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    Seja o primeiro a avaliar
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Contact card */}
            <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 sticky top-20">
              <div className="text-center mb-5">
                <p className="text-[12px] text-slate-500 uppercase tracking-wide font-medium">A partir de</p>
                <p className="text-[32px] font-extrabold text-slate-900 dark:text-white">
                  R${gestor.minPrice.toLocaleString("pt-BR")}
                  <span className="text-[14px] font-normal text-slate-500">/mês</span>
                </p>
              </div>

              <div className="space-y-3">
                {/* Primary CTA: Form */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold shadow-lg shadow-violet-600/25 hover:shadow-xl transition"
                >
                  Quero Contratar
                </button>

                {/* Secondary CTA: WhatsApp */}
                <a
                  href={`https://wa.me/${gestor.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsappClick}
                  className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  <svg width="18" height="18" fill="#25D366" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  Perguntar no WhatsApp
                </a>
              </div>

              {/* Social links */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                {gestor.instagram && (
                  <a
                    href={`https://instagram.com/${gestor.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-10 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[13px] font-semibold hover:opacity-90 transition"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.76 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    @{gestor.instagram}
                  </a>
                )}
                {gestor.facebook && (
                  <a
                    href={`https://facebook.com/${gestor.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-10 flex items-center justify-center gap-2 rounded-xl bg-[#1877F2] text-white text-[13px] font-semibold hover:opacity-90 transition"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                )}
                {gestor.website && (
                  <a
                    href={gestor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-10 flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 text-[13px] font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visitar site
                  </a>
                )}
              </div>

              {/* Stats */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-[20px] font-bold text-slate-900 dark:text-white">{gestor.avgRating.toFixed(1)}</p>
                  <p className="text-[12px] text-slate-500">Nota média</p>
                </div>
                <div>
                  <p className="text-[20px] font-bold text-slate-900 dark:text-white">{gestor.reviewCount}</p>
                  <p className="text-[12px] text-slate-500">Avaliações</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: gestor.displayName,
              description: gestor.bio,
              image: gestor.avatarUrl,
              address: {
                "@type": "PostalAddress",
                addressLocality: gestor.city,
                addressRegion: gestor.state,
                addressCountry: "BR",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: gestor.avgRating,
                reviewCount: gestor.reviewCount,
                bestRating: 5,
                worstRating: 1,
              },
            }),
          }}
        />
      </div>

      {/* Lead Capture Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-[28px] w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="p-8">
              {!isSubmitted ? (
                <>
                  <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Solicitar contato
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                    Preencha os dados abaixo e <strong>{gestor.displayName}</strong> entrará em contato com você.
                  </p>

                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div>
                      <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">
                        Nome completo *
                      </label>
                      <input
                        required
                        type="text"
                        disabled={isLoading}
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition disabled:opacity-50"
                        placeholder="João da Silva"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">
                          WhatsApp *
                        </label>
                        <input
                          required
                          type="tel"
                          disabled={isLoading}
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition disabled:opacity-50"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">
                          E-mail *
                        </label>
                        <input
                          required
                          type="email"
                          disabled={isLoading}
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition disabled:opacity-50"
                          placeholder="joao@empresa.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">
                        Instagram <span className="font-normal normal-case">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        disabled={isLoading}
                        value={leadForm.instagram}
                        onChange={(e) => setLeadForm({ ...leadForm, instagram: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition disabled:opacity-50"
                        placeholder="@suaempresa"
                      />
                    </div>

                    <div>
                      <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">
                        Faturamento mensal da empresa *
                      </label>
                      <select
                        required
                        disabled={isLoading}
                        value={leadForm.revenue}
                        onChange={(e) => setLeadForm({ ...leadForm, revenue: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition disabled:opacity-50"
                      >
                        <option value="" disabled>Selecione uma opção</option>
                        <option value="Abaixo de R$ 10.000">Abaixo de R$ 10.000</option>
                        <option value="R$ 10.000 a R$ 50.000">R$ 10.000 a R$ 50.000</option>
                        <option value="R$ 50.000 a R$ 100.000">R$ 50.000 a R$ 100.000</option>
                        <option value="Acima de R$ 100.000">Acima de R$ 100.000</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 mt-4 flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold shadow-lg shadow-violet-600/25 hover:shadow-xl transition disabled:opacity-50"
                    >
                      {isLoading ? "Enviando..." : "Enviar solicitação"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 grid place-items-center">
                    <Check className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Solicitação enviada!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    O gestor recebeu seus dados e entrará em contato em breve.
                  </p>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setTimeout(() => setIsSubmitted(false), 300);
                    }}
                    className="w-full h-11 mt-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold"
                  >
                    Fechar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
