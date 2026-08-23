'use client';

import { X, Check, Columns3 } from 'lucide-react';

interface ColumnSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: Array<{ id: string; label: string }>;
  visibleColumns: Record<string, boolean>;
  onToggleColumn: (columnId: string) => void;
}

export function ColumnSelectorModal({
  isOpen,
  onClose,
  columns,
  visibleColumns,
  onToggleColumn,
}: ColumnSelectorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Columns3 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Personalizar Colunas
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {columns.map((col) => {
            const isVisible = visibleColumns[col.id] !== false;
            return (
              <label
                key={col.id}
                onClick={() => onToggleColumn(col.id)}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 cursor-pointer transition"
              >
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {col.label}
                </span>
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center transition ${
                    isVisible
                      ? 'bg-violet-600 text-white'
                      : 'border border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {isVisible && <Check className="w-3.5 h-3.5" />}
                </div>
              </label>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-700 transition"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
}
