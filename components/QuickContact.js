'use client';

import { useState } from 'react';
import { WHATSAPP_NUMBER, CONTACT_EMAIL } from '@/lib/emailjs';

export default function QuickContact() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  function send(via) {
    if (via === 'whatsapp') {
      const msg = message.trim() || 'I want to avail 10% off on my first order';
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    } else {
      const msg = message.trim() || "Hi Zia Maria, I'd like to get in touch.";
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Website Enquiry')}&body=${encodeURIComponent(msg)}`;
    }
  }

  return (
    <div className="fixed bottom-5 left-5 z-[60]">
      {open && (
        <div className="absolute bottom-16 left-0 w-[min(340px,88vw)] rounded-3xl border border-ink/10 bg-cream p-6 shadow-2xl">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink">Ask Us Anything</h3>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-ink/50 hover:text-wine-dark">
              ✕
            </button>
          </div>
          <p className="mb-3 text-xs text-ink/60">
            Reservations, catering, business lunch, events, write it below and pick how to send it.
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. Catering for 25 people next Friday"
            className="mb-3 h-20 w-full resize-y rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm"
          />
          <div className="flex flex-col gap-2">
            <button type="button" onClick={() => send('whatsapp')} className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:bg-[#20BA5A]">
              Message on WhatsApp
            </button>
            <button type="button" onClick={() => send('email')} className="flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-cream hover:bg-black">
              Send by Email
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center gap-2 rounded-full bg-wine px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-wine/30 transition-transform hover:-translate-y-0.5 hover:bg-wine-dark"
      >
        <span className="absolute -left-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-cream bg-sand animate-ping" />
        <span className="absolute -left-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-cream bg-sand" />
        Get 10% off on your first order
      </button>
    </div>
  );
}
