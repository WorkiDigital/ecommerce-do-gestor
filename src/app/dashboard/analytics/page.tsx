'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { AnalyticsHeader } from '@/components/analytics/AnalyticsHeader';
import { MetricCardsSummary } from '@/components/analytics/MetricCardsSummary';
import { DiagnosticsPanel } from '@/components/analytics/DiagnosticsPanel';
import { QuickFilterBar } from '@/components/analytics/QuickFilterBar';
import { ActiveFilterChips } from '@/components/analytics/ActiveFilterChips';
import { SavedViewsDropdown } from '@/components/analytics/SavedViewsDropdown';
import { AdvancedFilterDrawer } from '@/components/analytics/AdvancedFilterDrawer';
import { ColumnSelectorModal } from '@/components/analytics/ColumnSelectorModal';
import { PresentationModeModal } from '@/components/analytics/PresentationModeModal';
import { ReportGeneratorModal } from '@/components/analytics/ReportGeneratorModal';
import { VirtualizedTable, AdLeadRow } from '@/components/analytics/DataTable/VirtualizedTable';
import { Loader2, RefreshCw } from 'lucide-react';

function AnalyticsDashboardContent() {
  const { searchParams } = useUrlFilters();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    leads: AdLeadRow[];
    metrics: {
      investment: number;
      leads: number;
      cpl: number;
      salesCount: number;
      revenue: number;
      cac: number;
      roas: number;
      conversionRate: number;
    };
    diagnostics: any[];
    accounts: Array<{ id: string; name: string; clientName: string; platform: string }>;
  }>({
    leads: [],
    metrics: {
      investment: 0,
      leads: 0,
      cpl: 0,
      salesCount: 0,
      revenue: 0,
      cac: 0,
      roas: 0,
      conversionRate: 0,
    },
    diagnostics: [],
    accounts: [],
  });

  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    createdAt: true,
    lead: true,
    creative: true,
    campaign: true,
    status: true,
    saleValue: true,
    firstMessage: true,
  });

  const tableColumns = [
    { id: 'createdAt', label: 'Data / Hora' },
    { id: 'lead', label: 'Contato & Lead' },
    { id: 'creative', label: 'Anúncio & Criativo' },
    { id: 'campaign', label: 'Campanha & UTMs' },
    { id: 'status', label: 'Status do Funil' },
    { id: 'saleValue', label: 'Valor da Venda' },
    { id: 'firstMessage', label: 'Primeira Mensagem' },
  ];

  const toggleColumn = (columnId: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnId]: prev[columnId] === false ? true : false,
    }));
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const query = searchParams.toString();
      const res = await fetch(`/api/analytics?${query}`);
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLeadStatusUpdated = (
    leadId: string,
    newStatus: string,
    newSaleValue?: number,
    capiSynced?: boolean
  ) => {
    setData((prev) => ({
      ...prev,
      leads: prev.leads.map((l) =>
        l.id === leadId
          ? {
              ...l,
              status: newStatus,
              saleValue: newSaleValue !== undefined ? newSaleValue : l.saleValue,
              capiSynced: capiSynced !== undefined ? capiSynced : l.capiSynced,
            }
          : l
      ),
    }));
    // Re-fetch aggregate metrics
    fetchData();
  };

  const currentAccountId = searchParams.get('accountId') || undefined;
  const currentAccount = data.accounts.find((a) => a.id === currentAccountId);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <AnalyticsHeader
        accounts={data.accounts}
        selectedAccountId={currentAccountId}
        onOpenAdvancedFilters={() => setIsAdvancedFilterOpen(true)}
        onOpenColumnSelector={() => setIsColumnModalOpen(true)}
        onOpenPresentationMode={() => setIsPresentationOpen(true)}
        onOpenReportGenerator={() => setIsReportOpen(true)}
      />

      {/* KPI Metric Cards */}
      <MetricCardsSummary metrics={data.metrics} />

      {/* Diagnostics Panel */}
      <DiagnosticsPanel diagnostics={data.diagnostics} />

      {/* Filter and Search Bar Section */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1">
            <QuickFilterBar />
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <SavedViewsDropdown />
            <button
              onClick={fetchData}
              disabled={loading}
              title="Atualizar dados"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
        <ActiveFilterChips />
      </div>

      {/* Virtualized Table of Leads & Creatives */}
      <VirtualizedTable
        data={data.leads}
        loading={loading}
        visibleColumns={visibleColumns}
        onLeadStatusUpdated={handleLeadStatusUpdated}
      />

      {/* Modals & Drawers */}
      <AdvancedFilterDrawer
        isOpen={isAdvancedFilterOpen}
        onClose={() => setIsAdvancedFilterOpen(false)}
      />

      <ColumnSelectorModal
        isOpen={isColumnModalOpen}
        onClose={() => setIsColumnModalOpen(false)}
        columns={tableColumns}
        visibleColumns={visibleColumns}
        onToggleColumn={toggleColumn}
      />

      <PresentationModeModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        accountName={currentAccount?.name || 'Visão Agregada'}
        clientName={currentAccount?.clientName || 'Geral'}
        metrics={data.metrics}
      />

      <ReportGeneratorModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        accountName={currentAccount?.name || 'Visão Geral'}
        clientName={currentAccount?.clientName || 'Cliente'}
        metrics={data.metrics}
      />
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[500px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
        </div>
      }
    >
      <AnalyticsDashboardContent />
    </Suspense>
  );
}
