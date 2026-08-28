import Image from 'next/image';
import CateringForm from '@/components/CateringForm';
import EventsSection from '@/components/EventsSection';
import FAQBlock from '@/components/FAQBlock';
import ReviewsSection from '@/components/ReviewsSection';
import PizzaCalculator from '@/components/PizzaCalculator';
import { pageMetadata } from '@/lib/seo';
import { basePath } from '@/lib/basePath';
import { whatsappLink } from '@/lib/emailjs';
import { FEATURE_ICONS, OCCASION_ICONS, Pizza } from '@/lib/icons';
import IconChip from '@/components/IconBadge';
import DeliveryTiersBanner from '@/components/DeliveryTiersBanner';

export const metadata = pageMetadata({
  title: 'Pizza Catering Berlin for Offices, Weddings & Private Events',
  description: 'Roman-style pizza catering across Berlin: office parties, birthdays, weddings, and private events of any size. Vegetarian and vegan options, delivery or pickup in Friedrichshain.',
  path: '/catering/',
});

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Pizza Catering',
  name: 'Pizza Catering Berlin for Offices, Weddings & Private Events',
  description: 'Roman-style pizza catering across Berlin: office parties, birthdays, weddings, and private events of any size. Vegetarian and vegan options, delivery or pickup in Friedrichshain.',
  url: 'https://www.ziamariaberlin.com/catering/',
  areaServed: {
    '@type': 'City',
    name: 'Berlin',
  },
  provider: {
    '@type': 'Restaurant',
    '@id': 'https://www.ziamariaberlin.com/#restaurant',
    name: 'Zia Maria',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Catering Packages',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Office Parties & Corporate Events' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Weddings & Engagements' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Birthdays & Private Celebrations' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Team Lunches & Standing Orders' } },
    ],
  },
};

const FEATURES = [
  { text: 'Family-style pizza trays, cut and ready to share', icon: 'pizza' },
  { text: 'Vegetarian and vegan options on every order', icon: 'vegan' },
  { text: 'Delivery across Berlin or pickup in Friedrichshain', icon: 'delivery' },
  { text: 'Custom quotes based on headcount, date, and budget', icon: 'quote' },
  { text: 'On-site equipment and staffing, confirmed in writing ahead of your event', icon: 'staffing' },
  { text: 'Fast turnaround, some orders ready within 24–48 hours', icon: 'fast' },
];

const OCCASIONS = [
  { title: 'Office Parties & Corporate Events', body: 'Year-end parties, team offsites, or a full office buyout, we scale from a dozen colleagues to a large company event.', icon: 'office' },
  { title: 'Weddings & Engagements', body: 'A relaxed, generous alternative (or addition) to a formal menu, Roman-style pizza that guests actually remember.', icon: 'wedding' },
  { title: 'Birthdays & Private Celebrations', body: 'Family-style spreads built around what your group likes, at our place or delivered to yours.', icon: 'birthday' },
  { title: 'Team Lunches & Standing Orders', body: 'One-off or recurring, we set up weekly office lunch orders as easily as a single event.', icon: 'team' },
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
      {/* FAQPage schema for the FAQS below is generated automatically by
          FAQBlock from this same array, so it's not duplicated here. */}
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
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#catering-form" className="btn-pill-wine">Request a Quote</a>
            <a href="#pizza-calculator" className="btn-pill-white">
              <Pizza className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              Calculate How Many Pizzas You Need
            </a>
            <a
              href={whatsappLink("Hi Zia Maria! I'd like a catering or private event quote in Berlin.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-white"
            >
              Inquire on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="marble-light pb-16 md:pb-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-14 md:px-10">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] order-first md:order-last">
            <Image
              src={`${basePath}/images/gallery/food-2.jpg`}
              alt="Roman-style pizza topped for a Zia Maria catering order, Friedrichshain, Berlin"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-4 text-center font-body text-ink/75 md:text-left">
            <p>
              An aunt never shows up with just enough, she brings extra, always. That&rsquo;s the
              spirit behind our Berlin catering: slow-rested Roman-style pizza, baked fresh and
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
        </div>

        <ul className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-4 px-6 text-sm font-semibold text-ink/85 sm:grid-cols-2 md:px-10">
          {FEATURES.map((f) => {
            const { Icon, color } = FEATURE_ICONS[f.icon];
            return (
              <li
                key={f.text}
                className="card-3d card-pop hover-line-wine group flex items-center gap-3 rounded-xl border border-ink/10 bg-white/40 p-4 text-left transition-colors hover:border-wine/30"
              >
                <IconChip icon={Icon} color={color} />
                <span>{f.text}</span>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm font-medium text-ink/65">
          Still unsure how much to order? Calculate how many pizzas you need below, build your own
          order pizza by pizza further down, or send us a rough headcount and we&rsquo;ll help you
          land on the right amount.
        </p>

        <div className="mt-10 px-6 md:px-10">
          <DeliveryTiersBanner />
        </div>
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
            {OCCASIONS.map((o) => {
              const { Icon, color } = OCCASION_ICONS[o.icon];
              return (
                <div key={o.title} className="card-3d card-pop hover-line-wine group rounded-2xl border border-ink/10 bg-white/50 p-6 transition-colors hover:border-wine/30">
                  <IconChip icon={Icon} color={color} size="lg" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{o.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-ink/75">{o.body}</p>
                </div>
              );
            })}
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
            Want to see what&rsquo;s on offer first? Browse the full menu, or check out our
            business lunch options for smaller, recurring office orders.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a href={`${basePath}/menu/`} className="btn-pill-dark">Browse the Full Menu</a>
            <a href={`${basePath}/business-lunch/`} className="btn-pill-wine">See Business Lunch Options</a>
          </div>
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
