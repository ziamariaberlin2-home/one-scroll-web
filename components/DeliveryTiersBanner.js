import { DELIVERY_TIERS } from '@/lib/delivery';

// Informational banner shown on the Menu and Catering pages so customers
// know roughly what to expect before they even get to checkout.
export default function DeliveryTiersBanner({ className = '' }) {
  return (
    <div className={`mx-auto max-w-3xl rounded-2xl border border-ink/10 bg-white/50 p-5 md:p-6 ${className}`}>
      <p className="text-center font-mono text-xs font-bold uppercase tracking-widest text-wine-dark">
        Delivery Time by Order Size
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        {DELIVERY_TIERS.map((t) => (
          <div key={t.key} className="rounded-xl border border-ink/10 bg-white/60 px-3 py-3 text-center">
            <p className="text-xs font-semibold text-ink/70">{t.range}</p>
            <p className="mt-1 font-display text-sm font-semibold text-wine-dark">{t.estimate}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs font-medium text-ink/50">
        For orders over 50 pizzas, message us on WhatsApp or request a quote first so we can plan
        timing together.
      </p>
    </div>
  );
}
