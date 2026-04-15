"use client";

import { useState } from "react";
import { updateLeadStatus } from "@/app/actions/leads";
import { Loader2, ChevronDown } from "lucide-react";

interface LeadStatusSelectorProps {
  leadId: string;
  initialStatus: string;
}

const statusOptions = [
  { value: "NEW", label: "Novo", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  { value: "CONTACTED", label: "Contatado", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  { value: "CLOSED", label: "Fechado", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { value: "LOST", label: "Perdido", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
];

export default function LeadStatusSelector({ leadId, initialStatus }: LeadStatusSelectorProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setLoading(true);
    
    try {
      await updateLeadStatus(leadId, newStatus);
      setStatus(newStatus);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar o status do lead.");
    } finally {
      setLoading(false);
    }
  };

  const currentOption = statusOptions.find(opt => opt.value === status) || statusOptions[0];

  return (
    <div className="relative inline-flex items-center">
      {loading && (
        <Loader2 className="w-3 h-3 animate-spin absolute -left-5 text-slate-400" />
      )}
      <div className={`relative group flex items-center rounded-full transition-all ${currentOption.color}`}>
        <select
          value={status}
          onChange={handleChange}
          disabled={loading}
          className="appearance-none bg-transparent pl-3 pr-8 py-1 text-[11px] font-bold uppercase rounded-full cursor-pointer outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-50"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3 h-3 absolute right-2.5 pointer-events-none opacity-60" />
      </div>
    </div>
  );
}
