// Compact horizontal strip of short trust/fact bullets, dot-separated —
// inspired by the quick-facts bands on Storia's business-lunch page. Sits on
// the plain marble-light background so it reads as a lightweight trust
// signal rather than a full section with its own heading.
export default function FeatureStrip({ items, className = '' }) {
  return (
    <section className={`marble-light py-6 md:py-8 ${className}`}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 md:px-10">
        {items.map((item) => (
          <span
            key={item}
            className="flex items-center gap-2 font-display text-sm font-semibold text-ink md:text-base"
          >
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-wine" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
