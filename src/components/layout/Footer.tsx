import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-[family-name:var(--font-outfit)] font-bold text-slate-900 dark:text-white">
              TrafegoHub
            </span>
          </div>
          <div className="flex items-center gap-6 text-[14px] text-slate-600 dark:text-slate-400">
            <Link href="/termos" className="hover:text-violet-600 transition">Termos</Link>
            <Link href="/privacidade" className="hover:text-violet-600 transition">Privacidade</Link>
            <a href="mailto:contato@trafegohub.com.br" className="hover:text-violet-600 transition">
              contato@trafegohub.com.br
            </a>
          </div>
          <p className="text-[13px] text-slate-500">© 2025 TrafegoHub. Feito no Brasil 🇧🇷</p>
        </div>
      </div>
    </footer>
  );
}
