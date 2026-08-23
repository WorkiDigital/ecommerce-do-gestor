import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { buildLeadFilterWhere, FilterState } from '@/lib/filters';
import { runDiagnostics } from '@/lib/diagnostics';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const accountId = searchParams.get('accountId') || undefined;
    const from = searchParams.get('from') || undefined;
    const to = searchParams.get('to') || undefined;
    const status = searchParams.get('status') ? searchParams.get('status')!.split(',') : undefined;
    const utmCampaign = searchParams.get('utmCampaign') ? searchParams.get('utmCampaign')!.split(',') : undefined;
    const searchQuery = searchParams.get('searchQuery') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '50', 10);
    const sortField = searchParams.get('sortField') || 'createdAt';
    const sortDir = (searchParams.get('sortDir') as 'asc' | 'desc') || 'desc';

    const filters: FilterState = {
      accountId,
      dateRange: from && to ? { from, to } : undefined,
      leadStatuses: status,
      utms: utmCampaign ? { campaign: utmCampaign } : undefined,
      searchQuery,
      pagination: { page, pageSize },
      sort: { field: sortField, direction: sortDir },
    };

    const where = buildLeadFilterWhere(filters);

    // Fetch accounts
    const accounts = await prisma.adAccount.findMany({
      include: {
        campaigns: {
          include: {
            adSets: {
              include: {
                ads: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // If no account exists yet, let's create a default demo account with sample campaigns & leads if needed
    if (accounts.length === 0) {
      try {
        const demoAccount = await prisma.adAccount.create({
          data: {
            name: 'Conta Principal (Demo)',
            clientName: 'Loja E-commerce Pro',
            platform: 'META_ADS',
            externalId: 'act_1029384756',
            campaigns: {
              create: [
                {
                  name: '[VENDAS] Conversão WhatsApp - Black Week',
                  externalId: 'cmp_987654321',
                  status: 'ACTIVE',
                  adSets: {
                    create: [
                      {
                        name: 'Público Aberto + Interesses Moda',
                        externalId: 'adset_12345678',
                        ads: {
                          create: [
                            {
                              name: 'Vídeo 01 - Prova Social Depoimento',
                              externalId: 'ad_111222333',
                              mediaType: 'VIDEO',
                              hookCategory: 'Prova Social',
                              creativeUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
                              thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
                            },
                            {
                              name: 'Imagem 02 - Carrossel Benefícios',
                              externalId: 'ad_444555666',
                              mediaType: 'CAROUSEL',
                              hookCategory: 'Benefício',
                              creativeUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
                              thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80',
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          include: {
            campaigns: {
              include: {
                adSets: {
                  include: {
                    ads: true,
                  },
                },
              },
            },
          },
        });

        // Add some sample leads
        const sampleAds = demoAccount.campaigns[0]?.adSets[0]?.ads || [];
        await prisma.adLead.createMany({
          data: [
            {
              accountId: demoAccount.id,
              adId: sampleAds[0]?.id,
              name: 'Lucas Ferreira',
              phone: '5511987654321',
              city: 'São Paulo',
              state: 'SP',
              utmSource: 'facebook',
              utmMedium: 'cpc',
              utmCampaign: 'black_week_vendas',
              utmContent: 'video_depoimento_01',
              ctwAciId: 'ctw_aci_998877665544',
              pixelId: '123456789012345',
              status: 'VENDA_CONCLUIDA',
              saleValue: 497.0,
              saleDate: new Date(),
              firstMessage: 'Olá, vi o anúncio e quero comprar com desconto!',
              capiSynced: true,
              capiSyncedAt: new Date(),
            },
            {
              accountId: demoAccount.id,
              adId: sampleAds[1]?.id,
              name: 'Mariana Silva',
              phone: '5521998877665',
              city: 'Rio de Janeiro',
              state: 'RJ',
              utmSource: 'instagram',
              utmMedium: 'cpc',
              utmCampaign: 'black_week_vendas',
              utmContent: 'carrossel_beneficios_02',
              ctwAciId: 'ctw_aci_112233445566',
              pixelId: '123456789012345',
              status: 'QUALIFICADO',
              firstMessage: 'Gostaria de saber mais sobre as opções de parcelamento.',
            },
            {
              accountId: demoAccount.id,
              adId: sampleAds[0]?.id,
              name: 'Carlos Alberto',
              phone: '5531988776655',
              city: 'Belo Horizonte',
              state: 'MG',
              utmSource: 'facebook',
              utmMedium: 'cpc',
              utmCampaign: 'black_week_vendas',
              utmContent: 'video_depoimento_01',
              ctwAciId: 'ctw_aci_556677889900',
              pixelId: '123456789012345',
              status: 'EM_ATENDIMENTO',
              firstMessage: 'Tem cupom de primeira compra?',
            },
            {
              accountId: demoAccount.id,
              adId: sampleAds[1]?.id,
              name: 'Juliana Costa',
              phone: '5541977665544',
              city: 'Curitiba',
              state: 'PR',
              utmSource: 'instagram',
              utmMedium: 'cpc',
              utmCampaign: 'black_week_vendas',
              utmContent: 'carrossel_beneficios_02',
              pixelId: '123456789012345',
              status: 'VENDA_CONCLUIDA',
              saleValue: 1250.0,
              saleDate: new Date(),
              firstMessage: 'Fechei o pacote completo, enviando comprovante!',
              capiSynced: false, // For error diagnostic demo
            },
            {
              accountId: demoAccount.id,
              name: 'Roberto Souza',
              phone: '5585987654321',
              city: 'Fortaleza',
              state: 'CE',
              utmSource: 'facebook',
              utmMedium: 'cpc',
              utmCampaign: 'black_week_vendas',
              status: 'NOVO_LEAD',
              createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago for bottleneck alert
              firstMessage: 'Boa tarde, qual o valor do frete?',
            },
          ],
        });
      } catch (err) {
        console.error('Error auto-seeding demo analytics data:', err);
      }
    }

    // Query leads with relations
    const [leads, totalCount] = await Promise.all([
      prisma.adLead.findMany({
        where,
        include: {
          ad: {
            include: {
              adSet: {
                include: {
                  campaign: true,
                },
              },
            },
          },
          account: true,
        },
        orderBy: {
          [sortField]: sortDir,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.adLead.count({ where }),
    ]);

    // Query all leads in filter scope for aggregate KPI metrics
    const allMatchingLeads = await prisma.adLead.findMany({
      where,
      select: {
        id: true,
        createdAt: true,
        status: true,
        saleValue: true,
        capiSynced: true,
        ctwAciId: true,
        pixelId: true,
        ad: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const totalLeads = allMatchingLeads.length;
    const salesLeads = allMatchingLeads.filter((l) => l.status === 'VENDA_CONCLUIDA' && Number(l.saleValue || 0) > 0);
    const totalSalesCount = salesLeads.length;
    const totalRevenue = salesLeads.reduce((acc, l) => acc + Number(l.saleValue || 0), 0);

    // Estimated spend model (calculates benchmark / simulated investment based on leads)
    const estimatedInvestment = Math.max(totalLeads * 8.5, 350.0);
    const cpl = totalLeads > 0 ? estimatedInvestment / totalLeads : 0;
    const cac = totalSalesCount > 0 ? estimatedInvestment / totalSalesCount : 0;
    const roas = estimatedInvestment > 0 ? totalRevenue / estimatedInvestment : 0;
    const conversionRate = totalLeads > 0 ? (totalSalesCount / totalLeads) * 100 : 0;

    // Run diagnostics
    const diagnostics = runDiagnostics({
      leads: allMatchingLeads.map((l) => ({
        ...l,
        saleValue: l.saleValue ? Number(l.saleValue) : null,
      })),
      metrics: {
        investment: estimatedInvestment,
        revenue: totalRevenue,
        roas,
      },
    });

    // Return aggregated payload
    return NextResponse.json({
      success: true,
      data: {
        leads,
        pagination: {
          page,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
        },
        metrics: {
          investment: estimatedInvestment,
          leads: totalLeads,
          cpl,
          salesCount: totalSalesCount,
          revenue: totalRevenue,
          cac,
          roas,
          conversionRate,
        },
        diagnostics,
        accounts: await prisma.adAccount.findMany({
          select: { id: true, name: true, clientName: true, platform: true },
        }),
      },
    });
  } catch (error: any) {
    console.error('Error in Analytics API:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
