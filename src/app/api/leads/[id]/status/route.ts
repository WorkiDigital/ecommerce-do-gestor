import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendMetaPurchaseEvent } from '@/lib/capi';

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { status, saleValue, syncCapi = true } = body;

    // Buscar lead atual
    const lead = await prisma.adLead.findUnique({
      where: { id },
      include: {
        account: true,
      },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 });
    }

    const updateData: any = {
      status,
      updatedAt: new Date(),
    };

    if (saleValue !== undefined) {
      updateData.saleValue = Number(saleValue);
      if (status === 'VENDA_CONCLUIDA') {
        updateData.saleDate = new Date();
      }
    }

    let capiResult = null;

    // Disparar CAPI automaticamente se virou VENDA_CONCLUIDA
    if (status === 'VENDA_CONCLUIDA' && syncCapi) {
      const pixelId = lead.pixelId || process.env.META_PIXEL_ID || '123456789012345';
      const token = process.env.META_CAPI_ACCESS_TOKEN || 'EAAB...';

      const capiResponse = await sendMetaPurchaseEvent({
        pixelId,
        token,
        phone: lead.phone,
        saleValue: Number(saleValue || lead.saleValue || 0),
        ctwAciId: lead.ctwAciId,
        eventSourceUrl: lead.eventSourceUrl,
      });

      capiResult = capiResponse;
      if (capiResponse.success) {
        updateData.capiSynced = true;
        updateData.capiSyncedAt = new Date();
      }
    }

    const updatedLead = await prisma.adLead.update({
      where: { id },
      data: updateData,
      include: {
        ad: true,
      },
    });

    return NextResponse.json({
      success: true,
      lead: updatedLead,
      capiResult,
    });
  } catch (error: any) {
    console.error('Error updating lead status:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao atualizar status do lead' },
      { status: 500 }
    );
  }
}
