'use client';

import { useUrlFilters } from '@/hooks/useUrlFilters';

export function QuickFilterBar() {
  const { searchParams, setFilter } = useUrlFilters();
  const currentStatus = searchParams.get('status') || '';

  return (
    <div className="flex gap-4 p-4 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
      <div className="flex-1">
        <input 
          type="text" 
          placeholder="Buscar leads por nome, telefone ou UTM..."
          className="w-full px-4 py-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
          onChange={(e) => setFilter('searchQuery', e.target.value)}
          defaultValue={searchParams.get('searchQuery') || ''}
        />
      </div>
      <select 
        className="px-4 py-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
        value={currentStatus}
        onChange={(e) => setFilter('status', e.target.value)}
      >
        <option value="">Todos os Status</option>
        <option value="NOVO_LEAD">Novo Lead</option>
        <option value="EM_ATENDIMENTO">Em Atendimento</option>
        <option value="VENDA_CONCLUIDA">Venda Concluída</option>
      </select>
    </div>
  );
}
