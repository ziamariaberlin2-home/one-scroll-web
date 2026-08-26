import { Pizza } from 'lucide-react';

// Small pizza glyph, used in place of the word "pizza" in a few UI spots
// (calculator teasers, callouts) — a real icon rather than an emoji so it
// stays crisp and on-brand at any size.
export default function PizzaIcon({ className = '' }) {
  return (
    <Pizza
      className={`inline h-4 w-4 -translate-y-0.5 ${className}`}
      style={{ color: '#C53416' }}
      strokeWidth={2.25}
      aria-label="pizza"
    />
  );
}
