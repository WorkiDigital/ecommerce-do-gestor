export interface FilterState {
  accountId?: string;
  dateRange?: {
    from: string; // ISO 8601
    to: string;
  };
  comparisonDateRange?: {
    from: string;
    to: string;
  };
  platforms?: string[];
  campaignIds?: string[];
  adSetIds?: string[];
  adIds?: string[];
  mediaTypes?: ('IMAGE' | 'VIDEO' | 'CAROUSEL')[];
  utms?: {
    source?: string[];
    medium?: string[];
    campaign?: string[];
    content?: string[];
  };
  leadStatuses?: string[];
  financial?: {
    minSaleValue?: number;
    maxSaleValue?: number;
    hasSale?: boolean;
  };
  searchQuery?: string;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export function buildLeadFilterWhere(filters: FilterState) {
  const where: any = {};
  
  if (filters.accountId) {
    where.accountId = filters.accountId;
  }
  
  if (filters.dateRange) {
    where.createdAt = {
      gte: new Date(filters.dateRange.from),
      lte: new Date(filters.dateRange.to),
    };
  }
  
  if (filters.leadStatuses && filters.leadStatuses.length > 0) {
    where.status = { in: filters.leadStatuses };
  }
  
  if (filters.utms?.campaign && filters.utms.campaign.length > 0) {
    where.utmCampaign = { in: filters.utms.campaign };
  }
  
  if (filters.financial?.hasSale !== undefined) {
    if (filters.financial.hasSale) {
      where.saleValue = { gt: 0 };
    } else {
      where.saleValue = null;
    }
  }
  
  if (filters.searchQuery) {
    const q = filters.searchQuery.trim();
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { phone: { contains: q } },
      { utmCampaign: { contains: q, mode: 'insensitive' } },
      { utmContent: { contains: q, mode: 'insensitive' } },
      { firstMessage: { contains: q, mode: 'insensitive' } },
    ];
  }
  
  return where;
}
