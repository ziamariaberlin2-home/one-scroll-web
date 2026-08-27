'use client';

import { useState, useMemo } from 'react';
import { menuData, menuCategories } from '@/lib/menuData';
import { useCart } from '@/lib/cart';
import { CATEGORY_ICONS } from '@/lib/icons';
import IconChip, { IconGlyph } from '@/components/IconBadge';

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
            <h2 className="display-heading mt-3 text-4xl text-wine/90 md:text-6xl">Our Menu</h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-ink/75">
              Pizza, salads, and a few things worth lingering over.
            </p>
          </div>
        )}

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {menuCategories.map((cat) => {
            const isActive = active === cat;
            const { Icon, color } = CATEGORY_ICONS[cat] || {};
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2.5 font-mono text-sm font-semibold uppercase tracking-widest transition-all duration-200 ${
                  isActive
                    ? 'border-wine bg-wine text-white shadow-md shadow-wine/30'
                    : 'border-wine/25 bg-cream-dark text-wine-dark hover:border-wine hover:bg-wine hover:text-white hover:-translate-y-0.5'
                }`}
              >
                {Icon && <IconGlyph icon={Icon} color={color} active={isActive} size="sm" />}
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const qty = qtyInCart(item);
            const { Icon, color } = CATEGORY_ICONS[item.category] || {};
            return (
              <div
                key={item.name + item.category}
                className="card-3d card-pop hover-line-wine group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/40 transition-colors hover:border-wine/30"
              >
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {Icon && (
                    <IconChip
                      icon={Icon}
                      color={color}
                      bg="rgba(255,255,255,0.95)"
                      size="md"
                      className="absolute left-3 top-3 shadow-md"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">{item.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-ink/60">{item.description}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="font-display text-lg font-semibold text-wine-dark">{item.price}</span>
                    <button
                      type="button"
                      onClick={() => addItem(item, 1)}
                      className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors ${
                        qty > 0 ? 'bg-wine text-white font-semibold hover:bg-wine-dark' : 'bg-ink text-cream hover:bg-wine hover:text-white'
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
