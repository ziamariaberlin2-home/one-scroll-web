const FAQS = [
  {
    q: 'Do you offer pizza catering in Berlin?',
    a: 'Yes, we cater Roman-style pizza across Berlin, from small office lunches in Friedrichshain to large private events. Delivery or pickup, with custom quotes based on your headcount and location.',
  },
  {
    q: 'How far in advance should I book catering for my team?',
    a: 'For business lunch orders, 24–48 hours notice is usually enough. For larger catering or private events, we recommend booking at least a week ahead to guarantee your date.',
  },
  {
    q: 'What makes your pizza “Roman-style”?',
    a: 'Roman-style pizza uses a slow-fermented dough that bakes into a thin, light, crisp base, different from a Neapolitan pie. It’s the same style you’ll find in the best pizzerias in Rome, made fresh daily here in Berlin.',
  },
  {
    q: 'Do you deliver business lunch to offices in Friedrichshain and beyond?',
    a: 'Yes. We regularly deliver business lunch and standing weekly orders to teams in Friedrichshain and across Berlin. Set up a one-off order or a recurring team lunch, just reach out with your headcount.',
  },
  {
    q: 'Can I host a private event at Zia Maria?',
    a: 'Absolutely, birthdays, team celebrations, and private dinners are all welcome. We can set aside space for your group or arrange a semi-private section depending on your size and date.',
  },
  {
    q: 'Do you have vegetarian and vegan pizza options?',
    a: 'Yes, our menu includes several vegetarian and vegan Roman-style pizzas, and we’re happy to accommodate dietary needs for catering and events, just let us know when you enquire.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FAQSection() {
  return (
    <section id="faq" className="marble-light py-24 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <div className="mb-12 text-center">
          <span className="eyebrow">Good to Know</span>
          <h2 className="display-heading mt-3 text-4xl text-ink md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 font-body text-ink/70">
            Catering, business lunch, and Roman-style pizza in Berlin, answered.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-ink/10 bg-white/50 p-5 open:bg-white/80">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-base font-semibold text-ink">
                {f.q}
                <span className="ml-4 flex-shrink-0 font-mono text-lg text-wine-dark transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
