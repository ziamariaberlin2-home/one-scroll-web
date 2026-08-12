'use client';

import { useState, useMemo } from 'react';
import { menuData, menuCategories } from '@/lib/menuData';

export default function MenuSection() {
  const [active, setActive] = useState(menuCategories[0]);

  const items = useMemo(() => menuData.filter((i) => i.category === active), [active]);

  return (
    <section id="menu" className="marble-light py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 text-center">
          <span className="eyebrow">Fresh, Every Day</span>
          <h2 className="display-heading mt-3 text-4xl text-ink md:text-6xl">Our Menu</h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-ink/70">
            Pizza, salads, and a few things worth lingering over.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                active === cat
                  ? 'border-wine bg-wine text-cream'
                  : 'border-ink/20 text-ink/70 hover:border-wine hover:text-wine'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.name + item.category}
              className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/40 shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} loading="lazy" className="h-44 w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold text-ink">{item.name}</h3>
                <p className="mt-1 flex-1 text-sm text-ink/60">{item.description}</p>
                <span className="mt-3 font-display text-lg font-semibold text-wine">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
