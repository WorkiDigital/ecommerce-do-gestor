export interface DiagnosticAlert {
  code: 'WARN-01' | 'WARN-02' | 'ERR-01' | 'OPP-01';
  title: string;
  type: 'warning' | 'error' | 'opportunity';
  condition: string;
  action: string;
  affectedCount?: number;
  details?: string;
}

export interface DiagnosticInput {
  leads: Array<{
    id: string;
    createdAt: Date | string;
    status: string;
    saleValue: number | null;
    capiSynced: boolean;
    ctwAciId?: string | null;
    pixelId?: string | null;
    ad?: {
      id: string;
      name: string;
    } | null;
  }>;
  metrics?: {
    investment: number;
    revenue: number;
    roas: number;
    budgetUtilizationRate?: number;
  };
}

export function runDiagnostics(input: DiagnosticInput): DiagnosticAlert[] {
  const alerts: DiagnosticAlert[] = [];
  const { leads, metrics } = input;
  const now = new Date().getTime();

  // WARN-02: Gargalo de Atendimento
  // Condição: > 30% dos leads sem transição de status após 2 horas (criados há > 2h e status ainda é NOVO_LEAD)
  const twoHoursAgo = now - 2 * 60 * 60 * 1000;
  const oldNewLeads = leads.filter((lead) => {
    const createdTime = new Date(lead.createdAt).getTime();
    return createdTime < twoHoursAgo && lead.status === 'NOVO_LEAD';
  });

  if (leads.length > 0) {
    const unhandledRatio = oldNewLeads.length / leads.length;
    if (unhandledRatio > 0.3) {
      alerts.push({
        code: 'WARN-02',
        title: 'Gargalo de Atendimento no Funil',
        type: 'warning',
        condition: `${(unhandledRatio * 100).toFixed(0)}% dos leads continuam como NOVO_LEAD há mais de 2 horas.`,
        action: 'Notificar time comercial imediatamente ou revisar fluxos de automação.',
        affectedCount: oldNewLeads.length,
        details: `${oldNewLeads.length} leads aguardando primeiro contato.`,
      });
    }
  }

  // ERR-01: Queda de Sinal CAPI
  // Condição: Leads com status = VENDA_CONCLUIDA sem ctw_aci_id ou sem pixelId
  const convertedLeadsWithoutCapi = leads.filter(
    (lead) =>
      lead.status === 'VENDA_CONCLUIDA' &&
      (!lead.ctwAciId || !lead.pixelId)
  );

  if (convertedLeadsWithoutCapi.length > 0) {
    alerts.push({
      code: 'ERR-01',
      title: 'Queda de Sinal CAPI (Atribuição Incompleta)',
      type: 'error',
      condition: `${convertedLeadsWithoutCapi.length} vendas concluídas sem ctw_aci_id ou Pixel vinculado.`,
      action: 'Revisar links rastreáveis do WhatsApp, parâmetros de anúncio e Webhooks.',
      affectedCount: convertedLeadsWithoutCapi.length,
      details: 'Eventos de compra offline não poderão ser atribuídos aos anúncios Meta com precisão máxima.',
    });
  }

  // OPP-01: Oportunidade de Escala
  // Condição: ROAS > 4.0x
  if (metrics && metrics.roas >= 4.0) {
    alerts.push({
      code: 'OPP-01',
      title: 'Oportunidade Clara de Escala',
      type: 'opportunity',
      condition: `ROAS atual de ${metrics.roas.toFixed(2)}x está acima da meta máxima (4.0x).`,
      action: 'Aumentar orçamento diário em 15% a 20% mantendo monitoramento de CPA.',
      details: `Faturamento de R$ ${metrics.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} com alto retorno sobre o investimento.`,
    });
  }

  // WARN-01: Criativo com Fadiga
  // Simulação / Regra de fadiga de criativos
  alerts.push({
    code: 'WARN-01',
    title: 'Monitor de Fadiga de Criativos',
    type: 'warning',
    condition: 'Anúncios com Frequência > 3.0 e queda estimada de CTR.',
    action: 'Pausar ou trocar criativos desgastados por novos ganchos (Dor vs Benefício).',
    details: 'Mantenha rotatividade constante de criativos no AdSet para evitar encarecimento do CPM.',
  });

  return alerts;
}
