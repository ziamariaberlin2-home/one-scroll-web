'use client';

import { useState } from 'react';
import { sendEnquiry, EMAILJS_HOST_TEMPLATE } from '@/lib/emailjs';
import { Field, Select, TextArea } from '@/components/FormField';

const SETS = [
  { name: 'Classic Set', items: ['Pizza Margherita', 'Garlic olive oil', 'Still or sparkling water'], price: '€9.50' },
  { name: 'Green Set', items: ['Insalata Mista', 'Pizza Spinaci', 'Still or sparkling water'], price: '€12.50' },
  { name: 'Hearty Set', items: ['Pizza Piccantina', 'Insalata Mista (small)', 'Soft drink or water'], price: '€13.50' },
];

export default function BusinessLunchContent() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = e.target;
    const raw = new FormData(form);
    const parts = [];
    for (const [key, value] of raw.entries()) if (value) parts.push(`${key}: ${value}`);

    const data = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      city: form.company.value,
      event_date: '',
      event_type: 'Business Lunch',
      guests: form.guests.value,
      budget: '',
      message: `[Business Lunch Enquiry]\n${parts.join('\n')}`,
    };
    try {
      await sendEnquiry({ templateId: EMAILJS_HOST_TEMPLATE, data });
      setStatus({ type: 'success', message: 'Request sent! We’ll follow up shortly.' });
      form.reset();
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again or email us directly.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="marble-light py-16 text-center md:py-20">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <span className="eyebrow">Business Lunch in Berlin</span>
          <h1 className="display-heading mt-3 text-4xl text-ink md:text-6xl">
            Business Lunch for Teams in Friedrichshain, Berlin
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-ink/70">
            A quick, satisfying weekday lunch for nearby offices and teams, order ahead or drop
            in. Monday–Friday, 12:00–15:00.
          </p>
        </div>
      </section>

      <section className="marble-light pb-24 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {SETS.map((set) => (
              <div key={set.name} className="rounded-2xl border border-ink/10 bg-white/50 p-6 text-left">
                <h3 className="font-display text-xl font-semibold text-ink">{set.name}</h3>
                <ul className="mt-3 space-y-1 text-sm text-ink/60">
                  {set.items.map((i) => <li key={i}>&middot; {i}</li>)}
                </ul>
                <span className="mt-4 block font-display text-lg font-semibold text-wine">{set.price}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink/40">
            Sample pricing, ask about your team&rsquo;s standing order
          </p>

          <div className="mt-12">
            <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4 rounded-3xl border border-ink/10 bg-white/50 p-6 text-left md:p-8">
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
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Company" name="company" placeholder="Your office / team name" />
                <Select label="Approx. Headcount *" name="guests" required options={['1–5', '5–15', '15–30', '30+']} />
              </div>
              <TextArea label="What are you looking for? *" name="message" required placeholder="One-off order, weekly standing order, delivery vs pickup..." />
              <button type="submit" disabled={loading} className="btn-pill-wine w-full disabled:opacity-60">
                {loading ? 'Sending…' : 'Send Request'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
