import { NextResponse } from 'next/server';
import { paypalFetch } from '@/lib/paypal';

// Captures (actually charges) a PayPal order after the buyer approves it in
// the PayPal popup -- this is the step that moves money. The order's amount
// was already fixed server-side when it was created (see create-order), so
// this re-fetches the order first as a defense-in-depth check against a
// stale, mismatched, or already-captured order ID before telling PayPal to
// take the payment.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { orderID } = body || {};
  if (!orderID || typeof orderID !== 'string') {
    return NextResponse.json({ error: 'Missing order ID.' }, { status: 400 });
  }

  try {
    const order = await paypalFetch(`/v2/checkout/orders/${orderID}`, { method: 'GET' });
    if (order.status === 'COMPLETED') {
      return NextResponse.json({ error: 'This order has already been paid.' }, { status: 409 });
    }
    if (order.status !== 'APPROVED') {
      return NextResponse.json({ error: 'This order has not been approved by the buyer yet.' }, { status: 409 });
    }

    const capture = await paypalFetch(`/v2/checkout/orders/${orderID}/capture`, { method: 'POST' });
    return NextResponse.json({ status: capture.status, id: capture.id });
  } catch (err) {
    console.error('PayPal capture-order error:', err);
    return NextResponse.json({ error: 'Could not complete payment. Please try again.' }, { status: 500 });
  }
}
