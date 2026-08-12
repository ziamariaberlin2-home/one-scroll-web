'use client';

import { useState } from 'react';
import { sendEnquiry, EMAILJS_HOST_TEMPLATE } from '@/lib/emailjs';
import { Field, Select, TextArea } from '@/components/FormField';

const ENQUIRY_TYPES = ['Catering', 'Private Event / Celebration', 'Birthday', 'Corporate Dinner', 'Team Event', 'Other'];

export default function CateringForm() {
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
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again or email us directly.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="catering-form" className="marble-light scroll-mt-24 py-24 md:py-28">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <div className="mb-10 text-center">
          <span className="eyebrow">Request a Quote</span>
          <h2 className="display-heading mt-3 text-4xl text-ink md:text-5xl">
            Get a Catering or Private Event Quote in Berlin
          </h2>
          <p className="mt-4 font-body text-ink/70">
            Tell us your date, headcount, and occasion, whether it&rsquo;s a catering order or a
            private celebration, and we&rsquo;ll send a custom quote.
          </p>
        </div>

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
    </section>
  );
}
