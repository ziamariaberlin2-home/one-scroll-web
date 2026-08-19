import Image from 'next/image';
import CateringForm from '@/components/CateringForm';
import EventsSection from '@/components/EventsSection';
import FAQBlock from '@/components/FAQBlock';
import ReviewsSection from '@/components/ReviewsSection';
import PizzaCalculator from '@/components/PizzaCalculator';
import { pageMetadata } from '@/lib/seo';
import { basePath } from '@/lib/basePath';
import { whatsappLink } from '@/lib/emailjs';

export const metadata = pageMetadata({
  title: 'Pizza Catering Berlin for Offices, Weddings & Private Events',
  description: 'Roman-style pizza catering across Berlin: office parties, birthdays, weddings, and private events of any size. Vegetarian and vegan options, delivery or pickup in Friedrichshain.',
  path: '/catering/',
});

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Pizza Catering',
  name: 'Zia Maria Pizza Catering',
  description: 'Roman-style pizza catering for offices, weddings, birthdays, and private events across Berlin, delivered or picked up in Friedrichshain.',
  areaServed: {
    '@type': 'City',
    name: 'Berlin',
  },
  provider: {
    '@type': 'Restaurant',
    name: 'Zia Maria',
    telephone: '+49-176-27705583',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Neue Bahnhofstraße 32',
      addressLocality: 'Berlin',
      addressRegion: 'Friedrichshain',
      postalCode: '10245',
      addressCountry: 'DE',
    },
  },
};

const FEATURES = [
  'Family-style pizza trays, cut and ready to share',
  'Vegetarian and vegan options on every order',
  'Delivery across Berlin or pickup in Friedrichshain',
  'Custom quotes based on headcount, date, and budget',
  'On-site equipment and staffing, confirmed in writing ahead of your event',
  'Fast turnaround, some orders ready within 24–48 hours',
];

const OCCASIONS = [
  { title: 'Office Parties & Corporate Events', body: 'Year-end parties, team offsites, or a full office buyout, we scale from a dozen colleagues to a large company event.' },
  { title: 'Weddings & Engagements', body: 'A relaxed, generous alternative (or addition) to a formal menu, Roman-style pizza that guests actually remember.' },
  { title: 'Birthdays & Private Celebrations', body: 'Family-style spreads built around what your group likes, at our place or delivered to yours.' },
  { title: 'Team Lunches & Standing Orders', body: 'One-off or recurring, we set up weekly office lunch orders as easily as a single event.' },
];

const FAQS = [
  {
    q: 'How many guests can Zia Maria cater for?',
    a: 'From an intimate group of ten to large company events, we scale the order to your headcount. Tell us your guest count and we will put together a quote sized for the group.',
  },
  {
    q: 'Do you offer vegetarian, vegan, or dietary-friendly options?',
    a: 'Yes. Our menu includes a full range of vegetarian and vegan Roman-style pizzas, and we are happy to build a mixed order that covers different dietary needs, just let us know when you request a quote.',
  },
  {
    q: 'Do you deliver, or do we need to collect?',
    a: 'Both. We deliver catering orders across Berlin, or you are welcome to collect from us in Friedrichshain if that suits your event better.',
  },
  {
    q: 'How far in advance should we book catering?',
    a: 'For smaller orders, a few days notice is usually enough. For larger events, weddings, or a specific date you cannot move, we recommend booking at least a week or two ahead to guarantee availability.',
  },
  {
    q: 'Can you cater a recurring event, like a weekly office lunch?',
    a: 'Yes, this is one of the most common ways companies work with us. We can set up a standing weekly or monthly order so you only have to arrange it once.',
  },
  {
    q: 'How do we get a quote?',
    a: 'Send us your date, headcount, and occasion using the form on this page, or message us on WhatsApp. We will follow up with a custom quote based on your group and budget.',
  },
];

export default function CateringPage() {
  return (
    <main className="pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <section className="relative overflow-hidden py-16 text-center md:py-20">
        <div className="marble-light absolute inset-0" />
        <Image
          src={`${basePath}/images/gallery/food-4.jpg`}
          alt=""
          fill
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-cream/50" />
        <div className="relative mx-auto max-w-3xl px-6 md:px-10">
          <span className="eyebrow">Catering in Berlin</span>
          <h1 className="display-heading mt-3 text-4xl text-wine/90 md:text-6xl">
            Pizza Catering in Berlin for Offices, Weddings &amp; Private Events
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-ink/75">
            Generous, family-style Roman-style pizza for groups of any size, delivered across
            Berlin or picked up in Friedrichshain.
          </p>
        </div>
      </section>

      <section className="marble-light pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl space-y-4 px-6 text-center font-body text-ink/75 md:px-10">
          <p>
            An aunt never shows up with just enough, she brings extra, always. That&rsquo;s the
            spirit behind our Berlin catering: slow-fermented Roman-style pizza, baked fresh and
            cut into trays that get passed around rather than portioned out, so a group actually
            eats together instead of everyone waiting on their own plate.
          </p>
          <p>
            Whether it&rsquo;s a Friedrichshain office lunch, a wedding, a birthday, or a company
            party of a hundred people, tell us your date, headcount, and occasion, and we&rsquo;ll
            put together a menu and quote sized for your group, the same Roman-style pizza Berlin
            teams and hosts keep coming back to.
          </p>
          <p>
            For larger or more involved events, we can also take care of on-site setup, ovens,
            service staff, and everything else the day calls for, with the details confirmed in
            writing well before your date, so nothing is left to chance once guests arrive.
          </p>
        </div>

        <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 px-6 text-sm text-ink/70 sm:grid-cols-2 md:px-10">
          {FEATURES.map((f) => (
            <li key={f} className="card-3d rounded-xl border border-ink/10 p-4 text-center">{f}</li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#catering-form" className="btn-pill-wine">Request a Quote</a>
          <a href="#pizza-calculator" className="btn-pill-sand">🍕 Try the Pizza Calculator</a>
          <a
            href={whatsappLink("Hi Zia Maria! I'd like a catering or private event quote in Berlin.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-dark"
          >
            Inquire on WhatsApp
          </a>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-ink/60">
          Still unsure how much to order? Try the pizza calculator below, build your own order in
          batches of five per pizza style further down, or send us a rough headcount and
          we&rsquo;ll help you land on the right amount.
        </p>
      </section>

      <section id="pizza-calculator" className="marble-light scroll-mt-24 pb-16 md:pb-20">
        <div className="mx-auto px-6 md:px-10">
          <PizzaCalculator />
        </div>
      </section>

      <section className="marble-light pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="mb-10 text-center">
            <span className="eyebrow">Every Occasion</span>
            <h2 className="display-heading mt-3 text-3xl text-wine/90 md:text-5xl">
              A Setup for Every Kind of Event
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {OCCASIONS.map((o) => (
              <div key={o.title} className="card-3d rounded-2xl border border-ink/10 bg-white/50 p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EventsSection
        eyebrow="Catering in Action"
        heading="Catering & Private Events We&rsquo;ve Hosted"
        description="A look at the office parties, weddings, and private celebrations we&rsquo;ve catered around Berlin."
      />

      <ReviewsSection bgImage="gallery/team-5.jpg" />

      <section className="marble-light pb-24 md:pb-28">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="font-body text-ink/70">
            Want to see what&rsquo;s on offer first? Browse the full{' '}
            <a href={`${basePath}/menu/`} className="text-wine-dark underline hover:text-wine-dark">
              Zia Maria menu
            </a>{' '}
            or check out our{' '}
            <a href={`${basePath}/business-lunch/`} className="text-wine-dark underline hover:text-wine-dark">
              business lunch options
            </a>{' '}
            for smaller, recurring office orders.
          </p>
        </div>
      </section>

      <FAQBlock
        id="catering-faq"
        heading="Catering, Answered"
        description="Group sizes, dietary options, delivery, and booking timelines for Berlin catering."
        faqs={FAQS}
      />

      <CateringForm />
    </main>
  );
}
