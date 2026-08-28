import { DELIVERY_TIERS } from '@/lib/delivery';

// Informational section shown on the Menu and Catering pages so customers
// know roughly what to expect before they even get to checkout. Left-aligned
// header + a row of tier cards (title, size range, big estimate, caption).
export default function DeliveryTiersBanner({ className = '' }) {
  return (
    <div className={`rounded-3xl border border-ink/10 bg-white/60 p-6 md:p-10 ${className}`}>
      <div className="max-w-xl">
        <span className="eyebrow">Delivery Times</span>
        <h3 className="display-heading mt-2 text-2xl text-wine/90 md:text-3xl">
          How Long Until Your Order Arrives
        </h3>
        <p className="mt-3 font-body text-sm font-medium text-ink/65">
          Prep and delivery time scales with the size of your order — here&rsquo;s roughly what
          to expect.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DELIVERY_TIERS.map((t) => (
          <div
            key={t.key}
            className="card-3d card-pop rounded-2xl border border-ink/10 bg-white p-5 text-left transition-colors"
          >
            <p className="font-display text-base font-semibold text-ink">{t.title}</p>
            <p className="mt-0.5 text-xs font-medium text-ink/50">{t.range}</p>
            <p className="mt-4 font-display text-2xl font-semibold text-wine-dark">{t.estimate}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink/40">
              {t.caption}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm font-medium text-ink/55">
        Ordering more than 50 items? Message us on WhatsApp or request a quote first so we can
        plan timing together.
      </p>
    </div>
  );
}
