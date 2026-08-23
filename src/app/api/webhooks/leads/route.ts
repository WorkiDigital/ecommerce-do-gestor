import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Extrair os dados do webhook
    const {
      accountId,
      name,
      phone,
      city,
      state,
      country,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      sourceId,
      pageId,
      ctwAciId,
      pixelId,
      eventSourceUrl,
      instanceName,
      firstMessage,
    } = body;

    // Validar campos obrigatórios
    if (!accountId || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: accountId, phone' },
        { status: 400 }
      );
    }

    // Criar o Lead no banco de dados com os parâmetros de atribuição
    const newLead = await prisma.adLead.create({
      data: {
        accountId,
        name,
        phone,
        city,
        state,
        country: country || 'BR',
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
        sourceId,
        pageId,
        ctwAciId,
        pixelId,
        eventSourceUrl,
        instanceName,
        firstMessage,
        status: 'NOVO_LEAD',
      },
    });

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
