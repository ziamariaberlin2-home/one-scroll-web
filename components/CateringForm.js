'use client';

import { useMemo, useState } from 'react';
import { sendEnquiry, EMAILJS_HOST_TEMPLATE } from '@/lib/emailjs';
import { Field, Select, TextArea } from '@/components/FormField';
import PizzaIcon from '@/components/PizzaIcon';
import { menuData, parsePrice } from '@/lib/menuData';
import { basePath } from '@/lib/basePath';

const ENQUIRY_TYPES = ['Catering', 'Private Event / Celebration', 'Birthday', 'Corporate Dinner', 'Team Event', 'Other'];
const CATERING_ITEMS = menuData.filter((item) => item.category === 'Most Ordered');
// Menu prices are listed per slice; a whole Roman-style catering pizza is
// cut into 3 slices, so this is the multiplier used to price whole pizzas
// in the order builder below.
const SLICES_PER_PIZZA = 3;
const pizzaPrice = (item) => parsePrice(item.price) * SLICES_PER_PIZZA;
// A handful of the Most Ordered items to spotlight as crowd favorites.
const BEST_SELLERS = CATERING_ITEMS.slice(0, 4);

function OrderBuilder({ quantities, onChange }) {
  const { totalPizzas, totalCost } = useMemo(() => {
    let pizzas = 0;
    let cost = 0;
    for (const item of CATERING_ITEMS) {
      const qty = quantities[item.name] || 0;
      pizzas += qty;
      cost += qty * pizzaPrice(item);
    }
    return { totalPizzas: pizzas, totalCost: cost };
  }, [quantities]);

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
        <p className="mt-1 text-sm font-medium text-ink/65">
          Not sure how many trays you need? Add whole pizzas per style below and we&rsquo;ll use
          it as a starting point for your quote.
        </p>
      </div>
      <ul className="mt-5 divide-y divide-ink/10">
        {CATERING_ITEMS.map((item) => {
          const qty = quantities[item.name] || 0;
          return (
            <li key={item.name} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="font-display text-sm font-semibold text-ink">{item.name}</p>
                <p className="text-xs font-medium text-ink/55">€{pizzaPrice(item).toFixed(2)} per pizza</p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => adjust(item.name, -1)}
                  disabled={qty === 0}
                  aria-label={`Remove one ${item.name} pizza`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink hover:border-wine hover:text-wine-dark disabled:opacity-30"
                >
                  &minus;
                </button>
                <span className="w-6 text-center font-mono text-sm text-ink">{qty}</span>
                <button
                  type="button"
                  onClick={() => adjust(item.name, 1)}
                  aria-label={`Add one ${item.name} pizza`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink hover:border-wine hover:text-wine-dark"
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
        <span className="font-mono text-xs uppercase tracking-widest text-ink/50">
          {totalPizzas} pizza{totalPizzas === 1 ? '' : 's'} selected
        </span>
        <span className="font-display text-lg font-semibold text-wine-dark">
          €{totalCost.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

function BestSellersStrip() {
  return (
    <div className="mx-auto mb-10 max-w-4xl rounded-3xl border border-ink/10 bg-white/40 p-6 md:p-8">
      <div className="mb-5 text-center md:text-left">
        <span className="eyebrow">Crowd Favorites</span>
        <h3 className="display-heading mt-2 text-2xl text-wine/90 md:text-3xl">
          Pizzas Loved by Our Guests
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {BEST_SELLERS.map((item) => (
          <div
            key={item.name}
            className="card-3d card-pop group overflow-hidden rounded-2xl border border-ink/10 bg-white transition-colors hover:border-wine/30"
          >
            <div className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-28 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-36"
              />
              <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-wine-dark shadow">
                Most Ordered
              </span>
            </div>
            <div className="p-3 text-center">
              <p className="font-display text-sm font-semibold leading-tight text-ink">{item.name}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-wine-dark">{item.price} / slice</p>
            </div>
          </div>
        ))}
      </div>
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

    const orderEntries = Object.entries(quantities).filter(([, qty]) => qty > 0);
    if (orderEntries.length) {
      const totalPizzas = orderEntries.reduce((sum, [, qty]) => sum + qty, 0);
      const totalCost = orderEntries.reduce((sum, [name, qty]) => {
        const item = CATERING_ITEMS.find((i) => i.name === name);
        return sum + (item ? qty * pizzaPrice(item) : 0);
      }, 0);
      parts.push('--- Build Your Order ---');
      parts.push(...orderEntries.map(([name, qty]) => `${name}: ${qty} pizza${qty === 1 ? '' : 's'}`));
      parts.push(`Total: ${totalPizzas} pizza${totalPizzas === 1 ? '' : 's'}, €${totalCost.toFixed(2)}`);
    }

    const data = {
      name: form.name.value,
      // The EmailJS "Contact Us-Catering and Event" template's subject/body
      // use {{yourName}}, {{eventType}}, {{eventDate}} while its From Name
      // field uses {{name}} -- send both key spellings with the same
      // values so no placeholder renders blank in the email the owner gets.
      yourName: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      city: '',
      event_date: form.date.value,
      eventDate: form.date.value,
      event_type: form.enquiryType.value,
      eventType: form.enquiryType.value,
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
          <a
            href={`${basePath}/blog/how-much-pizza-per-person-to-order/`}
            className="card-3d mt-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-5 py-2.5 text-sm font-semibold text-ink/85 transition-colors hover:border-wine/40"
          >
            <span>
              Not sure how many <PizzaIcon /> you need? Explore our{' '}
              <span className="font-semibold text-wine-dark">pizza calculator</span>
            </span>
          </a>
        </div>

        <BestSellersStrip />

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
