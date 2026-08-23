'use client';

import { useState, useEffect } from 'react';
import { Bookmark, Plus, Check, Trash2, Loader2, Sparkles } from 'lucide-react';
import { useUrlFilters } from '@/hooks/useUrlFilters';

interface SavedViewItem {
  id: string;
  name: string;
  description?: string;
  filterState: any;
  isDefault: boolean;
}

export function SavedViewsDropdown() {
  const { searchParams, setFilter, clearAllFilters } = useUrlFilters();
  const [isOpen, setIsOpen] = useState(false);
  const [savedViews, setSavedViews] = useState<SavedViewItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [newViewName, setNewViewName] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchViews = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/saved-views');
      const data = await res.json();
      if (data.success) {
        setSavedViews(data.savedViews || []);
      }
    } catch (err) {
      console.error('Error fetching saved views:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViews();
  }, []);

  const handleSaveCurrentView = async () => {
    if (!newViewName.trim()) return;

    try {
      const currentFilters: Record<string, any> = {};
      searchParams.forEach((val, key) => {
        currentFilters[key] = val;
      });

      const res = await fetch('/api/saved-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newViewName.trim(),
          filterState: currentFilters,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNewViewName('');
        setShowCreateModal(false);
        fetchViews();
      }
    } catch (err) {
      console.error('Error saving view:', err);
    }
  };

  const handleApplyView = (view: SavedViewItem) => {
    clearAllFilters();
    Object.entries(view.filterState || {}).forEach(([key, val]) => {
      setFilter(key, val);
    });
    setIsOpen(false);
  };

  const handleDeleteView = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`/api/saved-views?id=${id}`, { method: 'DELETE' });
      setSavedViews((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      console.error('Error deleting view:', err);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
      >
        <Bookmark className="w-3.5 h-3.5 text-violet-500" />
        Visualizações Salvas ({savedViews.length})
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 z-30 p-2 space-y-1">
            <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-100 dark:border-slate-800 mb-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Meus Presets
              </span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowCreateModal(true);
                }}
                className="text-[11px] font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3 h-3" /> Salvar Atual
              </button>
            </div>

            {loading ? (
              <div className="p-3 text-center text-xs text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              </div>
            ) : savedViews.length === 0 ? (
              <p className="p-3 text-center text-xs text-slate-400 italic">
                Nenhum preset salvo ainda.
              </p>
            ) : (
              savedViews.map((v) => (
                <div
                  key={v.id}
                  onClick={() => handleApplyView(v)}
                  className="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer transition group"
                >
                  <span className="truncate max-w-[170px]">{v.name}</span>
                  <button
                    onClick={(e) => handleDeleteView(v.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Modal to Save View */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Salvar Visualização Filtrada
            </h3>
            <input
              type="text"
              placeholder="Ex: Campanha Black Friday - Vendas SP"
              value={newViewName}
              onChange={(e) => setNewViewName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveCurrentView}
                className="px-4 py-1.5 text-xs font-bold bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition"
              >
                Salvar Preset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
