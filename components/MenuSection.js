'use client';

import { useState, useMemo } from 'react';
import { menuData, menuCategories } from '@/lib/menuData';
import { useCart } from '@/lib/cart';

export default function MenuSection({ hideHeader = false }) {
  const [active, setActive] = useState(menuCategories[0]);
  const { items: cartItems, addItem } = useCart();

  const items = useMemo(() => menuData.filter((i) => i.category === active), [active]);

  function qtyInCart(item) {
    const found = cartItems.find((i) => i.name === item.name);
    return found ? found.qty : 0;
  }

  return (
    <section id="menu" className="marble-light py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {!hideHeader && (
          <div className="mb-12 text-center">
            <span className="eyebrow">Fresh, Every Day</span>
            <h2 className="display-heading mt-3 text-4xl text-ink md:text-6xl">Our Menu</h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-ink/70">
              Pizza, salads, and a few things worth lingering over.
            </p>
          </div>
        )}

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                active === cat
                  ? 'border-wine bg-wine text-cream'
                  : 'border-wine/25 bg-cream-dark text-wine hover:border-wine hover:bg-wine hover:text-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const qty = qtyInCart(item);
            return (
              <div
                key={item.name + item.category}
                className="card-3d flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} loading="lazy" className="h-44 w-full object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">{item.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-ink/60">{item.description}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="font-display text-lg font-semibold text-wine">{item.price}</span>
                    <button
                      type="button"
                      onClick={() => addItem(item, 1)}
                      className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors ${
                        qty > 0 ? 'bg-wine text-cream hover:bg-wine-dark' : 'bg-ink text-cream hover:bg-wine'
                      }`}
                    >
                      {qty > 0 ? `In Cart · ${qty}` : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
