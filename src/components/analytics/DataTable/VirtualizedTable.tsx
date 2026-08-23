'use client';

import React, { useMemo, useState } from 'react';
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  MessageSquare, 
  Eye, 
  Phone, 
  Calendar,
  Sparkles,
  MapPin,
  Tag,
  Search
} from 'lucide-react';
import { InlineStatusSelector } from './InlineStatusSelector';
import { CreativePreviewModal } from './CreativePreviewModal';

export interface AdLeadRow {
  id: string;
  name: string | null;
  phone: string;
  city: string | null;
  state: string | null;
  utmSource: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  ctwAciId: string | null;
  status: string;
  saleValue: number | null;
  capiSynced: boolean;
  firstMessage: string | null;
  createdAt: string | Date;
  ad: {
    id: string;
    name: string;
    mediaType?: 'IMAGE' | 'VIDEO' | 'CAROUSEL' | null;
    creativeUrl?: string | null;
    thumbnailUrl?: string | null;
    hookCategory?: string | null;
    adSet?: {
      name: string;
      campaign?: {
        name: string;
      };
    };
  } | null;
}

interface VirtualizedTableProps {
  data: AdLeadRow[];
  loading?: boolean;
  visibleColumns?: Record<string, boolean>;
  onLeadStatusUpdated?: (leadId: string, status: string, saleValue?: number, capiSynced?: boolean) => void;
}

export function VirtualizedTable({
  data,
  loading = false,
  visibleColumns = {},
  onLeadStatusUpdated,
}: VirtualizedTableProps) {
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [selectedCreative, setSelectedCreative] = useState<AdLeadRow['ad'] | null>(null);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let aVal: any = (a as any)[sortField];
      let bVal: any = (b as any)[sortField];

      if (sortField === 'createdAt') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else if (sortField === 'saleValue') {
        aVal = Number(aVal || 0);
        bVal = Number(bVal || 0);
      } else {
        aVal = String(aVal || '').toLowerCase();
        bVal = String(bVal || '').toLowerCase();
      }

      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortDir]);

  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-60 group-hover:opacity-100" />;
    }
    return sortDir === 'asc' ? (
      <ArrowUp className="w-3 h-3 text-violet-600 dark:text-violet-400" />
    ) : (
      <ArrowDown className="w-3 h-3 text-violet-600 dark:text-violet-400" />
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
      {/* Table header bar */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            Leads & Atribuição de Tráfego
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {data.length} {data.length === 1 ? 'resultado' : 'resultados'}
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto min-h-[350px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800">
              {visibleColumns.createdAt !== false && (
                <th className="px-5 py-3.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  <button
                    onClick={() => handleSort('createdAt')}
                    className="flex items-center gap-1.5 hover:text-violet-600 transition group"
                  >
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Data / Hora
                    {renderSortIcon('createdAt')}
                  </button>
                </th>
              )}

              {visibleColumns.lead !== false && (
                <th className="px-5 py-3.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1.5 hover:text-violet-600 transition group"
                  >
                    Contato & Lead
                    {renderSortIcon('name')}
                  </button>
                </th>
              )}

              {visibleColumns.creative !== false && (
                <th className="px-5 py-3.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Anúncio & Criativo
                </th>
              )}

              {visibleColumns.campaign !== false && (
                <th className="px-5 py-3.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Campanha & UTMs
                </th>
              )}

              {visibleColumns.status !== false && (
                <th className="px-5 py-3.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center gap-1.5 hover:text-violet-600 transition group"
                  >
                    Status do Funil
                    {renderSortIcon('status')}
                  </button>
                </th>
              )}

              {visibleColumns.saleValue !== false && (
                <th className="px-5 py-3.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  <button
                    onClick={() => handleSort('saleValue')}
                    className="flex items-center gap-1.5 hover:text-violet-600 transition group"
                  >
                    Valor da Venda
                    {renderSortIcon('saleValue')}
                  </button>
                </th>
              )}

              {visibleColumns.firstMessage !== false && (
                <th className="px-5 py-3.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Primeira Mensagem
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-16 text-center text-xs text-slate-400 font-medium">
                  Carregando dados com filtros de alta performance...
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center text-xs text-slate-400 font-medium">
                  Nenhum lead encontrado para os filtros selecionados.
                </td>
              </tr>
            ) : (
              sortedData.map((lead) => {
                const cleanPhone = lead.phone.replace(/\D/g, '');
                const waUrl = `https://wa.me/${cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`}`;
                const date = new Date(lead.createdAt);

                return (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition group"
                  >
                    {/* Data / Hora */}
                    {visibleColumns.createdAt !== false && (
                      <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                        <span className="font-semibold text-slate-900 dark:text-white block">
                          {date.toLocaleDateString('pt-BR')}
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          {date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                    )}

                    {/* Contato & Lead */}
                    {visibleColumns.lead !== false && (
                      <td className="px-5 py-3.5 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-900 dark:text-white">
                              {lead.name || 'Lead Sem Nome'}
                            </span>
                            {(lead.city || lead.state) && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] text-slate-500 font-medium">
                                <MapPin className="w-2.5 h-2.5" />
                                {lead.city ? `${lead.city}/${lead.state || 'BR'}` : lead.state}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                            >
                              <Phone className="w-3 h-3" />
                              {lead.phone}
                            </a>
                          </div>
                        </div>
                      </td>
                    )}

                    {/* Anúncio & Criativo */}
                    {visibleColumns.creative !== false && (
                      <td className="px-5 py-3.5 text-xs">
                        {lead.ad ? (
                          <div className="flex items-center gap-2.5">
                            {lead.ad.thumbnailUrl ? (
                              <img
                                src={lead.ad.thumbnailUrl}
                                alt={lead.ad.name}
                                className="w-9 h-9 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                                <Tag className="w-4 h-4" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[160px]">
                                {lead.ad.name}
                              </p>
                              <button
                                onClick={() => setSelectedCreative(lead.ad)}
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-violet-600 dark:text-violet-400 hover:underline"
                              >
                                <Eye className="w-3 h-3" /> Ver Criativo
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">
                            Direto / Sem Anúncio
                          </span>
                        )}
                      </td>
                    )}

                    {/* Campanha & UTMs */}
                    {visibleColumns.campaign !== false && (
                      <td className="px-5 py-3.5 text-xs">
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {lead.utmCampaign || 'Direto / Sem UTM'}
                          </span>
                          {lead.utmContent && (
                            <p className="text-[10px] text-slate-400 truncate max-w-[140px]">
                              {lead.utmContent}
                            </p>
                          )}
                        </div>
                      </td>
                    )}

                    {/* Status do Funil */}
                    {visibleColumns.status !== false && (
                      <td className="px-5 py-3.5 text-xs">
                        <InlineStatusSelector
                          leadId={lead.id}
                          currentStatus={lead.status}
                          currentSaleValue={lead.saleValue}
                          capiSynced={lead.capiSynced}
                          onStatusUpdated={(newStatus, newSaleValue, capiSynced) =>
                            onLeadStatusUpdated?.(lead.id, newStatus, newSaleValue, capiSynced)
                          }
                        />
                      </td>
                    )}

                    {/* Valor da Venda */}
                    {visibleColumns.saleValue !== false && (
                      <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                        {lead.saleValue && Number(lead.saleValue) > 0 ? (
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {Number(lead.saleValue).toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                    )}

                    {/* Primeira Mensagem */}
                    {visibleColumns.firstMessage !== false && (
                      <td className="px-5 py-3.5 text-xs">
                        {lead.firstMessage ? (
                          <div
                            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 max-w-[220px] truncate"
                            title={lead.firstMessage}
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{lead.firstMessage}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Nenhuma</span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Creative Preview Modal */}
      <CreativePreviewModal
        ad={selectedCreative}
        onClose={() => setSelectedCreative(null)}
      />
    </div>
  );
}
