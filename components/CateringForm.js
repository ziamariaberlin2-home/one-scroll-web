'use client';

import { useMemo, useState } from 'react';
import { sendEnquiry, EMAILJS_HOST_TEMPLATE } from '@/lib/emailjs';
import { Field, Select, TextArea } from '@/components/FormField';
import { menuData } from '@/lib/menuData';

const ENQUIRY_TYPES = ['Catering', 'Private Event / Celebration', 'Birthday', 'Corporate Dinner', 'Team Event', 'Other'];
const STEP = 5;
const CATERING_ITEMS = menuData.filter((item) => item.category === 'Most Ordered');

function OrderBuilder({ quantities, onChange }) {
  const totalSlices = useMemo(
    () => Object.values(quantities).reduce((sum, n) => sum + n, 0),
    [quantities]
  );

  function adjust(name, delta) {
    onChange((prev) => {
      const next = Math.max(0, (prev[name] || 0) + delta);
      return { ...prev, [name]: next };
    });
  }

  return (
    <div className="rounded-3xl border border-ink/10 bg-white/50 p-6 md:p-8">
      <div className="mb-2">
        <h3 className="font-display text-xl font-semibold text-ink">Build Your Order (Optional)</h3>
        <p className="mt-1 text-sm text-ink/60">
          Not sure how many trays you need? Add slices per pizza style in batches of five and
          we&rsquo;ll use it as a starting point for your quote.
        </p>
      </div>
      <ul className="mt-5 divide-y divide-ink/10">
        {CATERING_ITEMS.map((item) => {
          const qty = quantities[item.name] || 0;
          return (
            <li key={item.name} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="font-display text-sm font-semibold text-ink">{item.name}</p>
                <p className="text-xs text-ink/50">{item.price} per slice</p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => adjust(item.name, -STEP)}
                  disabled={qty === 0}
                  aria-label={`Remove 5 slices of ${item.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink hover:border-wine hover:text-wine-dark disabled:opacity-30"
                >
                  &minus;
                </button>
                <span className="w-6 text-center font-mono text-sm text-ink">{qty}</span>
                <button
                  type="button"
                  onClick={() => adjust(item.name, STEP)}
                  aria-label={`Add 5 slices of ${item.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink hover:border-wine hover:text-wine-dark"
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-right font-mono text-xs uppercase tracking-widest text-ink/50">
        {totalSlices} slice{totalSlices === 1 ? '' : 's'} selected
      </p>
    </div>
  );
}

export default function CateringForm() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = e.target;
    const raw = new FormData(form);
    const parts = [];
    for (const [key, value] of raw.entries()) if (value) parts.push(`${key}: ${value}`);

    const orderLines = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([name, qty]) => `${name}: ${qty} slices`);
    if (orderLines.length) {
      parts.push('--- Build Your Order ---');
      parts.push(...orderLines);
    }

    const data = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      city: '',
      event_date: form.date.value,
      event_type: form.enquiryType.value,
      guests: form.guests.value,
      budget: form.budget.value,
      message: `[Catering / Event Enquiry]\n${parts.join('\n')}`,
    };
    try {
      await sendEnquiry({ templateId: EMAILJS_HOST_TEMPLATE, data });
      setStatus({ type: 'success', message: 'Request sent! We will get back to you with a quote soon.' });
      form.reset();
      setQuantities({});
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again or email us directly.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="catering-form" className="marble-light scroll-mt-24 py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="eyebrow">Request a Quote</span>
          <h2 className="display-heading mt-3 text-4xl text-wine/90 md:text-5xl">
            Get a Catering or Private Event Quote in Berlin
          </h2>
          <p className="mt-4 font-body text-ink/75">
            Tell us your date, headcount, and occasion, whether it&rsquo;s a catering order or a
            private celebration, and we&rsquo;ll send a custom quote.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
          <OrderBuilder quantities={quantities} onChange={setQuantities} />

          <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-ink/10 bg-white/50 p-6 md:p-8">
            {status && (
              <p className={`rounded-xl p-3 text-center text-sm ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {status.message}
              </p>
            )}
            <Field label="Your Name *" name="name" required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone *" name="phone" type="tel" required />
              <Field label="Email *" name="email" type="email" required />
            </div>
            <Select label="What Are You Enquiring About? *" name="enquiryType" required options={ENQUIRY_TYPES} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Event Date *" name="date" type="date" required />
              <Select label="Guest Count *" name="guests" required options={['Up to 10', '10–25', '25–50', '50–100', '100+']} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Select label="Delivery or Pickup *" name="fulfilment" required options={['Delivery', 'Pickup', 'Not sure yet']} />
              <Select label="Budget Range" name="budget" options={['Under €500', '€500 to €1000', '€1000 to €2000', '€2000+', 'To be discussed']} />
            </div>
            <Field label="Delivery Address (if applicable)" name="address" placeholder="Street, postcode, Berlin" />
            <TextArea label="Tell us about your event *" name="message" required placeholder="Dietary needs, budget, time, occasion..." />
            <button type="submit" disabled={loading} className="btn-pill-wine w-full disabled:opacity-60">
              {loading ? 'Sending…' : 'Request Quote'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
