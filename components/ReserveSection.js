'use client';

import { useState } from 'react';
import { sendEnquiry, EMAILJS_RESERVATION_TEMPLATE } from '@/lib/emailjs';

const TIMES = ['12:00','12:30','13:00','13:30','14:00','14:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'];

export default function ReserveSection() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = e.target;
    const data = {
      name: form.fullName.value,
      phone: form.phone.value,
      email: form.email.value,
      date: form.date.value,
      time: form.time.value,
      guests: form.guests.value,
      notes: form.notes.value,
    };
    try {
      await sendEnquiry({ templateId: EMAILJS_RESERVATION_TEMPLATE, data });
      setStatus({ type: 'success', message: 'Reservation sent! We will confirm shortly.' });
      form.reset();
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again or call us.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="reserve" className="marble-light py-24 md:py-28">
      <div className="mx-auto max-w-xl px-6 md:px-10">
        <div className="mb-10 text-center">
          <span className="eyebrow">Book a Table</span>
          <h2 className="display-heading mt-3 text-4xl text-ink md:text-5xl">Reserve</h2>
          <p className="mt-4 font-body text-ink/70">Book your spot in Friedrichshain.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-ink/10 bg-white/50 p-6 md:p-8">
          {status && (
            <p className={`rounded-xl p-3 text-center text-sm ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {status.message}
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name *" name="fullName" required />
            <Field label="Phone *" name="phone" type="tel" required />
          </div>
          <Field label="Email *" name="email" type="email" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Date *" name="date" type="date" required />
            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-ink/60">Time *</label>
              <select name="time" required className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm">
                <option value="">Select Time</option>
                {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-ink/60">Number of Guests *</label>
            <select name="guests" required defaultValue="2" className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm">
              {['1','2','3','4','5','6','7','8+'].map((g) => <option key={g} value={g}>{g} {g === '1' ? 'Person' : 'People'}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-ink/60">Special Requests</label>
            <textarea name="notes" rows={3} placeholder="Allergies, birthday, etc." className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm" />
          </div>
          <button type="submit" disabled={loading} className="btn-pill-wine w-full disabled:opacity-60">
            {loading ? 'Sending…' : 'Confirm Reservation'}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = 'text', required }) {
  return (
    <div>
      <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-ink/60">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm"
      />
    </div>
  );
}
