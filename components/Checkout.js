'use client';

import { useMemo, useState } from 'react';
import { useCart } from '@/lib/cart';
import { whatsappLink, sendEnquiry, EMAILJS_ORDER_TEMPLATE } from '@/lib/emailjs';
import PayPalButton from './PayPalButton';

const EMPTY_FORM = { name: '', phone: '', email: '', fulfillment: 'pickup', address: '', time: '', notes: '' };

// Same 30-minute slot pattern used on the Reservations form, so pickup and
// delivery times stay consistent with the kitchen's actual service windows.
const TIME_SLOTS = ['12:00','12:30','13:00','13:30','14:00','14:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'];

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
  const [placed, setPlaced] = useState(null); // { via: 'paypal' | 'whatsapp' }

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

  // The PayPal button only ever needs item names/quantities (the backend
  // looks up real prices) -- memoized on the cart's own items reference so
  // typing in the form fields doesn't hand PayPalButton a new array every
  // render and force it to re-render its SDK buttons unnecessarily.
  const paypalItems = useMemo(() => items.map((i) => ({ name: i.name, qty: i.qty })), [items]);

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
                  <label className="font-mono text-xs font-bold uppercase tracking-widest text-cream/75">
                    Your Name *
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-cream/15 bg-cream/95 px-3 py-2 text-sm font-semibold text-ink placeholder:font-normal placeholder:text-ink/40 outline-none focus:border-wine"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs font-bold uppercase tracking-widest text-cream/75">
                    Phone *
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-cream/15 bg-cream/95 px-3 py-2 text-sm font-semibold text-ink placeholder:font-normal placeholder:text-ink/40 outline-none focus:border-wine"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs font-bold uppercase tracking-widest text-cream/75">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-xl border border-cream/15 bg-cream/95 px-3 py-2 text-sm font-semibold text-ink placeholder:font-normal placeholder:text-ink/40 outline-none focus:border-wine"
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
                  <label className="font-mono text-xs font-bold uppercase tracking-widest text-cream/75">
                    {isDelivery ? 'Delivery Time *' : 'Pickup Time *'}
                  </label>
                  <select
                    value={form.time}
                    onChange={(e) => updateField('time', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-cream/15 bg-cream/95 px-3 py-2 text-sm font-semibold text-ink placeholder:font-normal placeholder:text-ink/40 outline-none focus:border-wine"
                  >
                    <option value="">Select a time</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {isDelivery && (
                  <div>
                    <label className="font-mono text-xs font-bold uppercase tracking-widest text-cream/75">
                      Delivery Address *
                    </label>
                    <input
                      value={form.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      className="mt-1 w-full rounded-xl border border-cream/15 bg-cream/95 px-3 py-2 text-sm font-semibold text-ink placeholder:font-normal placeholder:text-ink/40 outline-none focus:border-wine"
                    />
                  </div>
                )}

                <div>
                  <label className="font-mono text-xs font-bold uppercase tracking-widest text-cream/75">Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    className="mt-1 h-16 w-full resize-y rounded-xl border border-cream/15 bg-cream/95 px-3 py-2 text-sm font-semibold text-ink placeholder:font-normal placeholder:text-ink/40 outline-none focus:border-wine"
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
                <PayPalButton items={paypalItems} onSuccess={handlePayPalSuccess} disabled={!canCheckout} />
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
