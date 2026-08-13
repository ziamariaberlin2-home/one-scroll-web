'use client';

import { useCart } from '@/lib/cart';
import { basePath } from '@/lib/basePath';

export default function FloatingCartBar() {
  const { count, subtotal, hydrated } = useCart();

  if (!hydrated || count === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      <a
        href={`${basePath}/order/#checkout`}
        className="flex items-center gap-3 rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-ink/30 transition-transform hover:-translate-y-0.5 hover:bg-black"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-wine text-xs">
          {count}
        </span>
        View Cart · €{subtotal.toFixed(2)}
      </a>
    </div>
  );
}
