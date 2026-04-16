"use client";

import { useState } from "react";
import { KeyRound, Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { changePassword } from "@/app/actions/account";

export default function ChangePasswordForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [fields, setFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    if (fields.newPassword !== fields.confirmPassword) {
      setResult({ type: "error", text: "A nova senha e a confirmação não coincidem." });
      return;
    }

    setLoading(true);
    const res = await changePassword({
      currentPassword: fields.currentPassword,
      newPassword: fields.newPassword,
    });
    setLoading(false);

    if (res.success) {
      setResult({ type: "success", text: "Senha atualizada com sucesso!" });
      setFields({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setOpen(false), 1500);
    } else {
      setResult({ type: "error", text: res.error || "Erro ao atualizar senha." });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">Alterar Senha</p>
          <p className="text-sm text-slate-500 mt-0.5">Mude a senha usada para acessar o painel.</p>
        </div>
        <button
          onClick={() => { setOpen(!open); setResult(null); }}
          className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition text-slate-700 dark:text-slate-300"
        >
          {open ? "Cancelar" : "Alterar"}
        </button>
      </div>

      {open && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {result && (
            <div className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium ${
              result.type === "success"
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
            }`}>
              {result.type === "success" && <CheckCircle2 className="w-4 h-4 shrink-0" />}
              {result.text}
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-4">
            {/* Senha Atual */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest">Senha Atual</label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  required
                  value={fields.currentPassword}
                  onChange={e => setFields({ ...fields, currentPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-10 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-2 focus:ring-violet-500 outline-none transition-all text-sm"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Nova Senha */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest">Nova Senha</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  required
                  minLength={6}
                  value={fields.newPassword}
                  onChange={e => setFields({ ...fields, newPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-10 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-2 focus:ring-violet-500 outline-none transition-all text-sm"
                  placeholder="Mín. 6 caracteres"
                />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirmar Senha */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest">Confirmar Senha</label>
              <input
                type="password"
                required
                value={fields.confirmPassword}
                onChange={e => setFields({ ...fields, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-2 focus:ring-violet-500 outline-none transition-all text-sm"
                placeholder="Repita a nova senha"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-violet-600 hover:bg-slate-800 dark:hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
              Salvar Nova Senha
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
