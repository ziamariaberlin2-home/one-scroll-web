// Dark, contained quote-request banner — inspired by the "Tell us the
// occasion..." CTA band on Storia's business-lunch page. Reuses the
// site's existing .marble-dark texture (same dark surface as the checkout
// section) as a rounded card rather than introducing a new color, so the
// white CTA pill gets the same high-contrast pop the reference has.
export default function QuoteBanner({ text, ctaText = 'Request a Quote', ctaHref }) {
  return (
    <section className="marble-light px-6 py-10 md:px-10 md:py-14">
      <div className="marble-dark mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-3xl px-8 py-9 text-center md:flex-row md:justify-between md:px-12 md:text-left">
        <p className="max-w-2xl font-body text-base leading-relaxed text-cream/90 md:text-lg">
          {text}
        </p>
        <a href={ctaHref} className="btn-pill-white flex-shrink-0 whitespace-nowrap">
          {ctaText}
        </a>
      </div>
    </section>
  );
}
