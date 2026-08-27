'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCart } from '@/lib/cart';
import { whatsappLink, sendEnquiry, EMAILJS_ORDER_TEMPLATE } from '@/lib/emailjs';
import PayPalButton from './PayPalButton';

const EMPTY_FORM = { name: '', phone: '', email: '', fulfillment: 'pickup', address: '', time: '', notes: '' };

// Same 30-minute slot pattern used on the Reservations form, so pickup and
// delivery times stay consistent with the kitchen's actual service windows.
const TIME_SLOTS = ['12:00','12:30','13:00','13:30','14:00','14:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'];

// Pending Stripe orders lose React state across the hosted-checkout redirect,
// so the details needed for the confirmation email are stashed here and read
// back once Stripe sends the customer back to `?stripe=success`.
const STRIPE_PENDING_KEY = 'zia_pending_stripe_order';

// Emails the pickup/delivery confirmation via the same EmailJS setup already
// used for reservations and catering enquiries. Never blocks or fails the
// checkout flow itself — if the template isn't configured yet, this just
// quietly no-ops.
async function sendOrderConfirmation({ form, items, subtotal, via }) {
  try {
    const data = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      fulfillment: form.fulfillment === 'delivery' ? 'Delivery' : 'Pickup',
      time: form.time,
      address: form.fulfillment === 'delivery' ? form.address : '—',
      items: items.map((i) => `${i.qty}x ${i.name} (${i.price} each)`).join('\n'),
      subtotal: `€${subtotal.toFixed(2)}`,
      notes: form.notes || '—',
      via,
    };
    await sendEnquiry({ templateId: EMAILJS_ORDER_TEMPLATE, data });
  } catch (err) {
    // Swallow errors — a missing/unconfigured template shouldn't block an order.
  }
}

export default function Checkout() {
  const { items, updateQty, removeItem, subtotal, clearCart, hydrated } = useCart();
  const [form, setForm] = useState(EMPTY_FORM);
  const [placed, setPlaced] = useState(null); // { via: 'paypal' | 'stripe' | 'whatsapp' }
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState('');

  // Stripe redirects back here after a hosted Checkout session finishes.
  // The order total was already verified and charged server-side before
  // this redirect, so a success here is trustworthy.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stripeResult = params.get('stripe');
    if (stripeResult === 'success') {
      setPlaced({ via: 'stripe' });
      clearCart();
      try {
        const pending = sessionStorage.getItem(STRIPE_PENDING_KEY);
        if (pending) {
          const { form: savedForm, items: savedItems, subtotal: savedSubtotal } = JSON.parse(pending);
          sendOrderConfirmation({ form: savedForm, items: savedItems, subtotal: savedSubtotal, via: 'Card' });
          sessionStorage.removeItem(STRIPE_PENDING_KEY);
        }
      } catch (err) {
        // No saved order details to confirm by email — payment itself already succeeded.
      }
    } else if (stripeResult === 'cancelled') {
      setStripeError('Checkout was cancelled, your cart is still here whenever you’re ready.');
    }
    if (stripeResult) {
      const url = new URL(window.location.href);
      url.searchParams.delete('stripe');
      window.history.replaceState({}, '', url.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDelivery = form.fulfillment === 'delivery';
  const detailsValid =
    form.name.trim().length > 1 &&
    form.phone.trim().length > 4 &&
    form.email.trim().includes('@') &&
    form.time.trim().length > 0 &&
    (!isDelivery || form.address.trim().length > 4);
  const canCheckout = hydrated && items.length > 0 && detailsValid;

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  const orderMessage = useMemo(() => {
    const lines = items.map((i) => `• ${i.qty}x ${i.name} (${i.price} each)`);
    const details = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      isDelivery ? 'Delivery' : 'Pickup',
      form.time ? `Time: ${form.time}` : null,
      isDelivery && form.address ? `Address: ${form.address}` : null,
      form.notes ? `Notes: ${form.notes}` : null,
    ].filter(Boolean);

    return [
      "Hi Zia Maria! I'd like to place an order:",
      '',
      ...lines,
      '',
      `Subtotal: €${subtotal.toFixed(2)}`,
      '',
      ...details,
    ].join('\n');
  }, [items, form, isDelivery, subtotal]);

  function handleWhatsAppCheckout() {
    window.open(whatsappLink(orderMessage), '_blank', 'noopener');
    sendOrderConfirmation({ form, items, subtotal, via: 'WhatsApp' });
    setPlaced({ via: 'whatsapp' });
    clearCart();
  }

  function handlePayPalSuccess() {
    sendOrderConfirmation({ form, items, subtotal, via: 'PayPal' });
    setPlaced({ via: 'paypal' });
    clearCart();
  }

  async function handleStripeCheckout() {
    setStripeError('');
    setStripeLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ name: i.name, qty: i.qty })),
          fulfillment: form.fulfillment,
          customer: { name: form.name, phone: form.phone, email: form.email, address: form.address, time: form.time, notes: form.notes },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Could not start checkout.');
      }
      // Stash the order details so the confirmation email can be sent once
      // Stripe redirects back here — this component remounts on return, so
      // in-memory form state won't survive the round trip.
      try {
        sessionStorage.setItem(STRIPE_PENDING_KEY, JSON.stringify({ form, items, subtotal }));
      } catch (err) {
        // sessionStorage unavailable — the order still goes through, it just
        // won't get an automatic confirmation email on return.
      }
      window.location.href = data.url;
    } catch (err) {
      setStripeError(err.message || 'Could not start checkout. Please try again.');
      setStripeLoading(false);
    }
  }

  if (placed) {
    return (
      <section id="checkout" className="marble-dark py-20 text-cream md:py-24">
        <div className="mx-auto max-w-xl px-6 text-center md:px-10">
          <span className="eyebrow text-sand">Thank You</span>
          <h2 className="display-heading mt-3 text-3xl text-cream md:text-5xl">
            {placed.via === 'whatsapp' ? 'Order Sent!' : 'Payment Received!'}
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-cream/70">
            {placed.via === 'whatsapp'
              ? "We've sent your order details over, our team will confirm with you on WhatsApp shortly."
              : "We've got your payment, thank you! We'll start preparing your order right away."}
          </p>
          <p className="mx-auto mt-2 max-w-md font-body text-sm text-cream/50">
            A confirmation with your pickup/delivery time is on its way to your email.
          </p>
          <button
            type="button"
            onClick={() => {
              setPlaced(null);
              setForm(EMPTY_FORM);
            }}
            className="btn-pill-light mt-8"
          >
            Place Another Order
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="checkout" className="marble-dark py-20 text-cream md:py-24">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <div className="mb-10 text-center">
          <span className="eyebrow text-sand">Your Cart</span>
          <h2 className="display-heading mt-3 text-3xl text-cream md:text-5xl">Review &amp; Checkout</h2>
        </div>

        {!hydrated ? null : items.length === 0 ? (
          <p className="text-center text-cream/60">
            Your cart is empty. Add something delicious from the menu above.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-4 rounded-2xl border border-cream/10 bg-cream/5 p-4"
                  >
                    {item.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 flex-shrink-0 rounded-xl object-cover"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display font-semibold text-cream">{item.name}</p>
                      <p className="text-xs text-cream/50">{item.price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(item.name, item.qty - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="h-7 w-7 rounded-full border border-cream/20 text-cream hover:border-wine"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.name, item.qty + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="h-7 w-7 rounded-full border border-cream/20 text-cream hover:border-wine"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.name)}
                      aria-label={`Remove ${item.name}`}
                      className="ml-2 text-cream/40 hover:text-wine-dark"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-cream/10 pt-4">
                <span className="font-mono text-xs uppercase tracking-widest text-cream/60">Subtotal</span>
                <span className="font-display text-2xl font-semibold text-cream">€{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <div className="space-y-4 rounded-2xl border border-cream/10 bg-cream/5 p-6">
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-cream/50">
                    Your Name *
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-cream/15 bg-cream/95 px-3 py-2 text-sm text-ink outline-none focus:border-wine"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-cream/50">
                    Phone *
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-cream/15 bg-cream/95 px-3 py-2 text-sm text-ink outline-none focus:border-wine"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-cream/50">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-xl border border-cream/15 bg-cream/95 px-3 py-2 text-sm text-ink outline-none focus:border-wine"
                  />
                  <p className="mt-1 text-[11px] text-cream/40">We&rsquo;ll send your pickup/delivery time confirmation here.</p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => updateField('fulfillment', 'pickup')}
                    className={`flex-1 rounded-full border px-4 py-2 text-sm font-semibold font-mono uppercase tracking-widest transition-colors ${
                      !isDelivery ? 'border-wine-dark bg-wine-dark text-white' : 'border-cream/20 text-cream/70'
                    }`}
                  >
                    Pickup
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('fulfillment', 'delivery')}
                    className={`flex-1 rounded-full border px-4 py-2 text-sm font-semibold font-mono uppercase tracking-widest transition-colors ${
                      isDelivery ? 'border-wine-dark bg-wine-dark text-white' : 'border-cream/20 text-cream/70'
                    }`}
                  >
                    Delivery
                  </button>
                </div>

                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-cream/50">
                    {isDelivery ? 'Delivery Time *' : 'Pickup Time *'}
                  </label>
                  <select
                    value={form.time}
                    onChange={(e) => updateField('time', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-cream/15 bg-cream/95 px-3 py-2 text-sm text-ink outline-none focus:border-wine"
                  >
                    <option value="">Select a time</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {isDelivery && (
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-widest text-cream/50">
                      Delivery Address *
                    </label>
                    <input
                      value={form.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      className="mt-1 w-full rounded-xl border border-cream/15 bg-cream/95 px-3 py-2 text-sm text-ink outline-none focus:border-wine"
                    />
                  </div>
                )}

                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-cream/50">Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    className="mt-1 h-16 w-full resize-y rounded-xl border border-cream/15 bg-cream/95 px-3 py-2 text-sm text-ink outline-none focus:border-wine"
                  />
                </div>

                {!detailsValid && (
                  <p className="text-xs text-sand">
                    Fill in your name, phone, email, and {isDelivery ? 'delivery' : 'pickup'} time
                    {isDelivery ? ', and delivery address' : ''} to check out.
                  </p>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleStripeCheckout}
                  disabled={!canCheckout || stripeLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#635BFF] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:bg-[#544ee0] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {stripeLoading ? 'Redirecting to checkout…' : 'Pay with Card'}
                </button>
                {stripeError && <p className="text-xs text-sand">{stripeError}</p>}
                <PayPalButton amount={subtotal} onSuccess={handlePayPalSuccess} disabled={!canCheckout} />
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  disabled={!canCheckout}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:bg-[#20BA5A] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Order via WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
