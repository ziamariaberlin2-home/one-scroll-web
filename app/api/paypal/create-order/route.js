import { NextResponse } from 'next/server';
import { paypalFetch } from '@/lib/paypal';
import { menuData, parsePrice } from '@/lib/menuData';

// Server-side order total verification, same pattern as the Stripe checkout
// route it replaces: the client only ever sends item names and quantities.
// The real price for every line comes from menuData here, on the server --
// a tampered client-side total can never reach PayPal.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { items } = body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 });
  }

  let total = 0;
  const orderItems = [];
  for (const item of items) {
    const menuItem = menuData.find((m) => m.name === item?.name);
    if (!menuItem) {
      return NextResponse.json({ error: `We couldn't find "${item?.name}" on the menu.` }, { status: 400 });
    }
    const qty = Math.max(1, Math.min(50, parseInt(item.qty, 10) || 1));
    const unitPrice = parsePrice(menuItem.price);
    if (!unitPrice || unitPrice <= 0) {
      return NextResponse.json({ error: `"${menuItem.name}" has no valid price.` }, { status: 400 });
    }
    total += unitPrice * qty;
    orderItems.push({
      name: menuItem.name.slice(0, 127),
      unit_amount: { currency_code: 'EUR', value: unitPrice.toFixed(2) },
      quantity: String(qty),
    });
  }
  total = Math.round(total * 100) / 100;

  try {
    const order = await paypalFetch('/v2/checkout/orders', {
      method: 'POST',
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: total.toFixed(2),
              breakdown: { item_total: { currency_code: 'EUR', value: total.toFixed(2) } },
            },
            items: orderItems,
          },
        ],
      }),
    });

    return NextResponse.json({ id: order.id });
  } catch (err) {
    console.error('PayPal create-order error:', err);
    return NextResponse.json({ error: 'Could not start PayPal checkout. Please try again.' }, { status: 500 });
  }
}
