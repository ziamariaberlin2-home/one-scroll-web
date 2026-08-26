'use client';

import { useState } from 'react';
import Image from 'next/image';
import { sendEnquiry, EMAILJS_HOST_TEMPLATE } from '@/lib/emailjs';
import { Field, Select, TextArea } from '@/components/FormField';
import EventsSection from '@/components/EventsSection';
import FAQBlock from '@/components/FAQBlock';
import ReviewsSection from '@/components/ReviewsSection';
import { basePath } from '@/lib/basePath';
import { BIZ_ICONS } from '@/lib/icons';
import IconChip from '@/components/IconBadge';

const PERKS = [
  { text: 'One-time and recurring orders', icon: 'recurring' },
  { text: 'Delivery across Berlin', icon: 'delivery' },
  { text: 'Simple company invoice', icon: 'invoice' },
  { text: 'Vegetarian and vegan options', icon: 'vegan' },
];

const SETS = [
  { name: 'Classic Set', items: ['Pizza Margherita', 'Garlic olive oil', 'Still or sparkling water'], price: '€9.50', icon: 'classic' },
  { name: 'Green Set', items: ['Insalata Mista', 'Pizza Spinaci', 'Still or sparkling water'], price: '€12.50', icon: 'green' },
  { name: 'Hearty Set', items: ['Pizza Piccantina', 'Insalata Mista (small)', 'Soft drink or water'], price: '€13.50', icon: 'hearty' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Tell us your headcount',
    body: 'Send us your team size, preferred day and time, and any dietary notes, one-off or a standing weekly order, whatever works for your office.',
    icon: 'headcount',
  },
  {
    step: '02',
    title: 'We build your set',
    body: 'We put together a mix of Roman-style pizza, salad, and drinks sized for your group, including vegetarian and vegan options where needed.',
    icon: 'build',
  },
  {
    step: '03',
    title: 'Delivered or ready for pickup',
    body: 'Your order arrives hot and on time, or is ready to collect from Friedrichshain, so your team is back at their desks without the wait.',
    icon: 'deliver',
  },
];

const FAQS = [
  {
    q: 'How far in advance should we order business lunch?',
    a: '24–48 hours notice is usually enough for a one-off order. If you want the same time slot every week, we can set up a standing order so you never have to ask twice.',
  },
  {
    q: 'Is there a minimum group size?',
    a: 'No, we cater business lunch from a single person up to large offices. Our sign-up form starts at groups of 1–5, so small teams are just as welcome as big ones.',
  },
  {
    q: 'Can you accommodate vegetarian, vegan, or other dietary needs?',
    a: 'Yes. Our menu includes several vegetarian and vegan Roman-style pizzas and salads, and we can put together a mixed set for teams with different preferences, just note it when you send your request.',
  },
  {
    q: 'Do you deliver, or is it pickup only?',
    a: 'Both. We deliver business lunch to offices in Friedrichshain and across Berlin, or your team can pick up directly from us if that is more convenient.',
  },
  {
    q: 'Can we set up a recurring weekly order?',
    a: 'Definitely, this is one of the most common ways offices work with us. Tell us your team size and preferred day, and we will set up a standing Team Lunch Friday-style order tailored to your group.',
  },
  {
    q: 'What are your business lunch hours?',
    a: 'Business lunch orders run Monday to Friday, 12:00–15:00. Reach out ahead of time and we will work around your team’s schedule.',
  },
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
      <section className="relative overflow-hidden py-16 text-center md:py-20">
        <div className="marble-light absolute inset-0" />
        <Image
          src={`${basePath}/images/gallery/team-3.jpg`}
          alt=""
          fill
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-cream/50" />
        <div className="relative mx-auto max-w-3xl px-6 md:px-10">
          <span className="eyebrow">Business Lunch in Berlin</span>
          <h1 className="display-heading mt-3 text-4xl text-wine/90 md:text-6xl">
            Business Lunch for Teams in Friedrichshain, Berlin
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-ink/75">
            A quick, satisfying weekday lunch for nearby offices and teams, order ahead or drop
            in. Monday–Friday, 12:00–15:00.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a href="#lunch-form" className="btn-pill-wine">Request Business Lunch</a>
            <a href={`${basePath}/catering/#catering-form`} className="btn-pill-olive">Book Your Office Event</a>
          </div>
        </div>
      </section>

      <section className="marble-light pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl space-y-4 px-6 text-center font-body text-ink/75 md:px-10">
          <p>
            Skip the group-lunch debate. Instead of ten people arguing over delivery apps, one
            person sends us a headcount and we take it from there: slow-rested Roman-style
            pizza, cut and set out family-style, so everyone eats at the same time without a long
            wait or a pile of separate orders.
          </p>
          <p>
            It works just as well for a one-off team lunch as it does for a standing weekly order.
            Plenty of the offices around Friedrichshain now have a regular slot with us, same day,
            same time, no need to re-order every week. Mix in vegetarian and vegan options where
            your team needs them, and we will build the set around it. Every order comes with a
            simple company invoice, so whoever&rsquo;s ordering lunch isn&rsquo;t stuck sorting
            receipts afterward.
          </p>
        </div>

        <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 px-6 text-sm text-ink/70 sm:grid-cols-2 md:px-10">
          {PERKS.map((f) => {
            const { Icon, color } = BIZ_ICONS[f.icon];
            return (
              <li
                key={f.text}
                className="card-3d card-pop hover-line-olive group flex flex-col items-center gap-2 rounded-xl border border-ink/10 bg-white/40 p-4 text-center transition-colors hover:border-olive/30"
              >
                <IconChip icon={Icon} color={color} />
                {f.text}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="marble-light pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="mb-10 text-center">
            <span className="eyebrow">How It Works</span>
            <h2 className="display-heading mt-3 text-3xl text-wine/90 md:text-5xl">
              From Headcount to Table in Three Steps
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map((s) => {
              const { Icon, color } = BIZ_ICONS[s.icon];
              return (
                <div key={s.step} className="card-3d card-pop hover-line-olive group rounded-2xl border border-ink/10 bg-white/50 p-6 text-left transition-colors hover:border-olive/30">
                  <div className="flex items-center justify-between">
                    <IconChip icon={Icon} color={color} size="lg" />
                    <span className="font-mono text-xs uppercase tracking-widest text-wine-dark">Step {s.step}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="lunch-form" className="marble-light scroll-mt-24 pb-24 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {SETS.map((set) => {
              const { Icon, color } = BIZ_ICONS[set.icon];
              return (
                <div key={set.name} className="card-3d card-pop hover-line-olive group rounded-2xl border border-ink/10 bg-white/50 p-6 text-left transition-colors hover:border-olive/30">
                  <IconChip icon={Icon} color={color} size="lg" />
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">{set.name}</h3>
                  <ul className="mt-3 space-y-1 text-sm text-ink/60">
                    {set.items.map((i) => <li key={i}>&middot; {i}</li>)}
                  </ul>
                  <span className="mt-4 block font-display text-lg font-semibold text-wine-dark">{set.price}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink/40">
            Sample pricing, ask about your team&rsquo;s standing order
          </p>

          <div className="mt-6 flex justify-center">
            <a href={`${basePath}/catering/#catering-form`} className="btn-pill-olive">Plan Your Office Event</a>
          </div>

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

      <EventsSection
        eyebrow="Office Favorites"
        heading="Business Lunches Berlin Teams Love"
        description="A look at the standing orders and office lunches we&rsquo;ve built with teams around Friedrichshain."
      />

      <ReviewsSection bgImage="gallery/food-1.jpg" />

      <FAQBlock
        id="business-lunch-faq"
        heading="Business Lunch, Answered"
        description="Ordering hours, dietary options, and standing orders for Berlin offices."
        faqs={FAQS}
      />
    </>
  );
}
