import { NextResponse } from 'next/server';
import { sendWhatsAppOrderAlert } from '@/lib/whatsapp';

// Fires the owner-facing WhatsApp "new order" alert. Called from Checkout.js
// right after an order is placed (via PayPal or WhatsApp checkout), in
// parallel with the customer's own confirmation email. Always responds 200 --
// a missing WhatsApp config or a delivery hiccup here should never surface
// as an error to the customer, who has already paid or sent their order.
export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: 'Invalid request body.' });
  }

  const {
    name, phone, email, fulfillment, date, time, address, items, subtotal, notes, readyEstimate, via,
  } = data || {};

  const bodyText = [
    `${name || 'A customer'} · ${phone || ''}`,
    `${fulfillment || ''}${date ? ` on ${date}` : ''}${time ? ` at ${time}` : ''}`,
    fulfillment === 'Delivery' && address ? `Address: ${address}` : null,
    items ? `Items:\n${items}` : null,
    subtotal ? `Total: ${subtotal}` : null,
    readyEstimate ? `Ready in: ${readyEstimate}` : null,
    notes && notes !== '—' ? `Notes: ${notes}` : null,
    via ? `Paid via: ${via}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const result = await sendWhatsAppOrderAlert(bodyText);
    return NextResponse.json({ ok: result.sent, reason: result.reason });
  } catch (err) {
    console.error('WhatsApp notify-order error:', err);
    return NextResponse.json({ ok: false, reason: 'WhatsApp send failed.' });
  }
}
