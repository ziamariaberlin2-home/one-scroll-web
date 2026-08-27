'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pizza } from 'lucide-react';
import { basePath } from '@/lib/basePath';

// House rule, straight from the "How Much Pizza Per Person" guide: 2 slices
// per person, every pizza cut into 3 generous Roman-style slices.
const SLICES_PER_PERSON = 2;
const SLICES_PER_PIZZA = 3;
// When drinks/alcohol are part of the event, guests graze slower over a
// longer window, so the standard count can be trimmed 10-15%. We use the
// midpoint.
const DRINKS_DISCOUNT = 0.125;
const MAX_GUESTS = 120;
const MAX_ICONS = 24;

const EVENT_TYPES = [
  { value: 'lunch', label: 'Seated Lunch', hint: 'Short window' },
  { value: 'party', label: 'Evening Party', hint: 'Guests graze longer' },
];

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

  const sliderPct = Math.round((guests / MAX_GUESTS) * 100);
  const visibleIcons = Math.min(pizzas, MAX_ICONS);
  const extraIcons = pizzas - visibleIcons;

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
            Our house rule: 2 slices per person, 3 slices per pizza. Slide to your headcount.
          </p>
        </div>
      )}

      {/* Guest slider */}
      <div className="text-center">
        <motion.p
          key={guests}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="display-heading text-3xl text-ink md:text-4xl"
        >
          {guests} {Number(guests) === 1 ? 'guest' : 'guests'}
        </motion.p>
        <input
          type="range"
          min="1"
          max={MAX_GUESTS}
          step="1"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          aria-label="Number of guests"
          className="range-wine mt-4 w-full"
          style={{
            background: `linear-gradient(to right, #C53416 0%, #C53416 ${sliderPct}%, #FBEFE0 ${sliderPct}%, #FBEFE0 100%)`,
          }}
        />
        <div className="mt-1 flex justify-between font-mono text-[10px] uppercase tracking-widest text-ink/40">
          <span>1</span>
          <span>{MAX_GUESTS}+</span>
        </div>
      </div>

      {/* Event type toggle */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {EVENT_TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setEventType(t.value)}
            className={`rounded-2xl border px-4 py-3 text-center transition-colors ${
              eventType === t.value
                ? 'border-wine bg-wine text-white'
                : 'border-ink/15 bg-white text-ink/70 hover:border-wine/40'
            }`}
          >
            <span className="block text-sm font-semibold">{t.label}</span>
            <span className={`block text-xs ${eventType === t.value ? 'text-white/80' : 'text-ink/45'}`}>
              {t.hint}
            </span>
          </button>
        ))}
      </div>

      {/* Drinks toggle switch */}
      <button
        type="button"
        onClick={() => setHasDrinks((v) => !v)}
        className="mt-4 flex w-full items-center justify-between rounded-2xl border border-ink/15 bg-white px-4 py-3"
      >
        <span className="text-left text-sm text-ink/70">
          Drinks / alcohol will be flowing <span className="block text-xs text-ink/45">People eat a bit slower</span>
        </span>
        <span
          className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${hasDrinks ? 'bg-wine' : 'bg-ink/15'}`}
        >
          <span
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              hasDrinks ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </span>
      </button>

      {/* Result */}
      <div className="mt-6 rounded-2xl bg-cream px-6 py-6 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50">You&rsquo;ll need about</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={pizzas}
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="display-heading mt-1 text-4xl text-wine md:text-5xl"
          >
            {pizzas} {pizzas === 1 ? 'pizza' : 'pizzas'}
          </motion.p>
        </AnimatePresence>
        <p className="mt-1 text-sm text-ink/60">
          ({slices} slices for {guests || 0} guest{Number(guests) === 1 ? '' : 's'})
        </p>

        {pizzas > 0 && (
          <div className="mx-auto mt-4 flex max-w-md flex-wrap justify-center gap-1.5">
            {Array.from({ length: visibleIcons }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.25, delay: i * 0.02 }}
                className="leading-none"
                aria-hidden="true"
              >
                <Pizza
                  className="h-5 w-5"
                  style={{ color: i % 2 === 0 ? '#C53416' : '#991B1B' }}
                  strokeWidth={2.25}
                />
              </motion.span>
            ))}
            {extraIcons > 0 && (
              <span className="ml-1 self-center font-mono text-xs uppercase tracking-widest text-ink/50">
                +{extraIcons} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <a href={`${basePath}/catering/#catering-form`} className="btn-pill-wine">
          Get a Catering Quote
        </a>
      </div>
    </div>
  );
}
