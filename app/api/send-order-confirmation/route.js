import { NextResponse } from 'next/server';
import { sendOrderConfirmationEmail } from '@/lib/resend';

// Sends the customer-facing order-confirmation email via Resend. Called from
// Checkout.js right after an order is placed, in parallel with the WhatsApp
// owner alert (see /api/notify-order). Always responds 200 -- a missing
// Resend config or a delivery hiccup here should never surface as an error
// to the customer, who has already paid or sent their order.
export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: 'Invalid request body.' });
  }

  try {
    const result = await sendOrderConfirmationEmail(data || {});
    return NextResponse.json({ ok: result.sent, reason: result.reason });
  } catch (err) {
    console.error('Resend send-order-confirmation error:', err);
    return NextResponse.json({ ok: false, reason: 'Order confirmation email failed.' });
  }
}
