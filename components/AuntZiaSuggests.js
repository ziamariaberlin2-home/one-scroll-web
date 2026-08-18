'use client';

import { useCart } from '@/lib/cart';

export default function AuntZiaSuggests() {
  const { suggestion, dismissSuggestion, acceptSuggestion } = useCart();

  if (!suggestion) return null;

  return (
    <div className="fixed inset-x-0 bottom-5 z-[70] flex justify-center px-4 md:inset-x-auto md:right-5 md:justify-end">
      <div className="flex w-full max-w-sm items-center gap-4 rounded-2xl border border-wine/20 bg-cream p-4 shadow-2xl animate-[fade-in-up_0.25s_ease-out]">
        {suggestion.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={suggestion.image}
            alt={suggestion.name}
            className="h-14 w-14 flex-shrink-0 rounded-xl object-cover"
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-wine-dark">Aunt Zia suggests</p>
          <p className="mt-0.5 truncate font-display text-sm font-semibold text-ink">
            Add {suggestion.name}? <span className="font-body font-normal text-ink/50">{suggestion.price}</span>
          </p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={acceptSuggestion}
              className="rounded-full bg-wine px-3 py-1.5 text-xs font-semibold text-white hover:bg-wine-dark"
            >
              Add it
            </button>
            <button
              type="button"
              onClick={dismissSuggestion}
              className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/60 hover:border-ink/30"
            >
              No thanks
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={dismissSuggestion}
          aria-label="Dismiss suggestion"
          className="self-start text-ink/30 hover:text-ink/60"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
