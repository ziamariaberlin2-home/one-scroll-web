'use client';

import { useMemo, useState } from 'react';
import { basePath } from '@/lib/basePath';

// House rule, straight from the "How Much Pizza Per Person" guide: 2 slices
// per person, every pizza cut into 3 generous Roman-style slices.
const SLICES_PER_PERSON = 2;
const SLICES_PER_PIZZA = 3;
// When drinks/alcohol are part of the event, guests graze slower over a
// longer window, so the standard count can be trimmed 10-15%. We use the
// midpoint.
const DRINKS_DISCOUNT = 0.125;

export default function PizzaCalculator({ compact = false }) {
  const [guests, setGuests] = useState(20);
  const [eventType, setEventType] = useState('lunch');
  const [hasDrinks, setHasDrinks] = useState(false);

  const { slices, pizzas } = useMemo(() => {
    const g = Math.max(0, Number(guests) || 0);
    let rawSlices = g * SLICES_PER_PERSON;
    if (hasDrinks) rawSlices *= 1 - DRINKS_DISCOUNT;
    // A seated daytime lunch has a short window, so round the slice count
    // up rather than down; an evening party self-corrects over a few hours.
    const roundedSlices = eventType === 'lunch' ? Math.ceil(rawSlices) : Math.round(rawSlices);
    const pizzaCount = g > 0 ? Math.ceil(roundedSlices / SLICES_PER_PIZZA) : 0;
    return { slices: roundedSlices, pizzas: pizzaCount };
  }, [guests, eventType, hasDrinks]);

  return (
    <div
      className={`rounded-3xl border border-ink/10 bg-white/50 p-6 md:p-8 ${compact ? '' : 'mx-auto max-w-2xl'}`}
    >
      {!compact && (
        <div className="mb-6 text-center">
          <span className="eyebrow">Pizza Calculator</span>
          <h3 className="display-heading mt-2 text-2xl text-wine/90 md:text-3xl">
            How Many Pizzas Do I Need?
          </h3>
          <p className="mt-2 text-sm text-ink/60">
            Our house rule: 2 slices per person, 3 slices per pizza. Adjust below for your event.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-ink/60">
            Number of Guests
          </label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-ink/60">
            Event Type
          </label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm"
          >
            <option value="lunch">Seated lunch (short window)</option>
            <option value="party">Evening party (guests graze longer)</option>
          </select>
        </div>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={hasDrinks}
          onChange={(e) => setHasDrinks(e.target.checked)}
          className="h-4 w-4 rounded border-ink/30 text-wine focus:ring-wine"
        />
        Drinks / alcohol will be flowing (people eat a bit slower)
      </label>

      <div className="mt-6 rounded-2xl bg-cream px-6 py-5 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50">You&rsquo;ll need about</p>
        <p className="display-heading mt-1 text-4xl text-wine md:text-5xl">
          {pizzas} {pizzas === 1 ? 'pizza' : 'pizzas'}
        </p>
        <p className="mt-1 text-sm text-ink/60">
          ({slices} slices for {guests || 0} guest{Number(guests) === 1 ? '' : 's'})
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <a href={`${basePath}/catering/#catering-form`} className="btn-pill-wine">
          Get a Catering Quote
        </a>
      </div>
    </div>
  );
}
