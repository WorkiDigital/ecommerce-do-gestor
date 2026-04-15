import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-slate-950 dark:bg-black p-[1px]">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-blue-600/20" />
          <div className="relative bg-slate-950 rounded-[31px] px-8 py-14 sm:px-14 text-center">
            <h3 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-bold text-white">
              Pronto para crescer com tráfego pago?
            </h3>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto">
              Empresas encontram o gestor ideal em minutos. Gestores recebem clientes todos os dias.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/gestores"
                className="w-full sm:w-auto h-12 px-7 grid place-items-center rounded-2xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition"
              >
                Preciso contratar
              </Link>
              <Link
                href="/cadastrar"
                className="w-full sm:w-auto h-12 px-7 grid place-items-center rounded-2xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition border border-slate-700"
              >
                Quero ser encontrado
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
