import crypto from 'crypto';

export interface MetaPurchasePayload {
  pixelId: string;
  token: string;
  phone: string;
  saleValue: number;
  ctwAciId?: string | null;
  eventSourceUrl?: string | null;
  currency?: string;
}

export async function sendMetaPurchaseEvent(lead: MetaPurchasePayload) {
  try {
    const hash = (val: string) =>
      crypto.createHash('sha256').update(val.trim().toLowerCase()).digest('hex');

    const cleanPhone = lead.phone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;

    const payload = {
      data: [
        {
          event_name: 'Purchase',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'business_messaging',
          user_data: {
            ph: [hash(formattedPhone)],
            ...(lead.ctwAciId ? { ctw_aci_id: lead.ctwAciId } : {}),
          },
          custom_data: {
            currency: lead.currency || 'BRL',
            value: Number(lead.saleValue) || 0,
          },
          event_source_url:
            lead.eventSourceUrl || 'https://adlyticspro.workidigital.tech',
        },
      ],
    };

    const response = await fetch(
      `https://graph.facebook.com/v20.0/${lead.pixelId}/events?access_token=${lead.token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    return { success: response.ok, data: result };
  } catch (error: any) {
    console.error('Error sending Meta CAPI event:', error);
    return { success: false, error: error.message };
  }
}
