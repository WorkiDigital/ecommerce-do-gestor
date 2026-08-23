'use client';

import { useUrlFilters } from '@/hooks/useUrlFilters';

export function ActiveFilterChips() {
  const { searchParams, setFilter, clearAllFilters } = useUrlFilters();
  
  const filters: { key: string; label: string; value: string }[] = [];
  
  searchParams.forEach((value, key) => {
    if (key !== 'page' && key !== 'sort') {
      filters.push({ key, label: key, value });
    }
  });

  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 p-4 items-center bg-gray-50 dark:bg-zinc-900/50">
      <span className="text-sm text-gray-500">Filtros ativos:</span>
      {filters.map((filter) => (
        <span 
          key={filter.key} 
          className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm flex items-center gap-2"
        >
          {filter.label}: {filter.value}
          <button 
            onClick={() => setFilter(filter.key, null)}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            ×
          </button>
        </span>
      ))}
      <button 
        onClick={clearAllFilters}
        className="text-sm text-gray-500 hover:text-gray-700 underline ml-2"
      >
        Limpar tudo
      </button>
    </div>
  );
}
