import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { menuData, parsePrice } from '@/lib/menuData';

// Server-side order total verification: the client only ever sends item
// names and quantities. The actual price for every line comes from
// menuData here, on the server — a tampered client-side total can never
// reach Stripe. This is the backend check the PayPal flow was missing.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { items, fulfillment, customer } = body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 });
  }

  const lineItems = [];
  for (const item of items) {
    const menuItem = menuData.find((m) => m.name === item?.name);
    if (!menuItem) {
      return NextResponse.json({ error: `We couldn't find "${item?.name}" on the menu.` }, { status: 400 });
    }
    const qty = Math.max(1, Math.min(50, parseInt(item.qty, 10) || 1));
    const unitAmount = Math.round(parsePrice(menuItem.price) * 100);
    if (!unitAmount || unitAmount <= 0) {
      return NextResponse.json({ error: `"${menuItem.name}" has no valid price.` }, { status: 400 });
    }
    lineItems.push({
      price_data: {
        currency: 'eur',
        product_data: { name: menuItem.name },
        unit_amount: unitAmount,
      },
      quantity: qty,
    });
  }

  const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ziamariaberlin.com';

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/order/?stripe=success`,
      cancel_url: `${origin}/order/?stripe=cancelled`,
      metadata: {
        customerName: customer?.name || '',
        customerPhone: customer?.phone || '',
        fulfillment: fulfillment || '',
        address: customer?.address || '',
        notes: customer?.notes || '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout session error:', err);
    return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 500 });
  }
}
