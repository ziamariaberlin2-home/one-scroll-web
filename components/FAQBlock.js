import { Plus } from 'lucide-react';

// Reusable FAQ accordion + FAQPage structured data, for pages beyond the
// homepage (business lunch, catering) that want their own topic-specific
// FAQ content and schema rather than sharing the homepage's FAQSection.
export default function FAQBlock({ id = 'faq', eyebrow = 'Good to Know', heading, description, faqs }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section id={id} className="marble-light py-24 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <div className="mb-12 text-center">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="display-heading mt-3 text-4xl text-wine/90 md:text-5xl">{heading}</h2>
          {description && <p className="mx-auto mt-4 font-body text-ink/75">{description}</p>}
        </div>

        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-ink/10 bg-white/50 p-5 open:bg-white/80">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-base font-semibold text-ink">
                {f.q}
                <span className="ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-wine/10 text-wine transition-transform group-open:rotate-45">
                  <Plus className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
