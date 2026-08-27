import MenuSection from '@/components/MenuSection';
import FeatureStrip from '@/components/FeatureStrip';
import QuoteBanner from '@/components/QuoteBanner';
import { pageMetadata } from '@/lib/seo';
import { basePath } from '@/lib/basePath';

export const metadata = pageMetadata({
  title: 'Menu, Roman Pizza in Friedrichshain, Berlin',
  description: 'Explore the Zia Maria menu: fresh Roman-style pizza, salads, and drinks in the heart of Friedrichshain, Berlin. Vegetarian and vegan options available.',
  path: '/menu/',
});

const MENU_FACTS = [
  'Pizza priced per slice, from €2.50',
  'Vegetarian and vegan options',
  'Order online or via WhatsApp',
  'Pickup or delivery in Berlin',
];

export default function MenuPage() {
  return (
    <main className="pt-24">
      <section className="marble-light pb-4 pt-16 text-center md:pt-20">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <span className="eyebrow">Fresh, Every Day</span>
          <h1 className="display-heading mt-3 text-4xl text-wine/90 md:text-6xl">
            Roman Pizza Menu in Friedrichshain, Berlin
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-ink/75">
            Roman-style pizza, salads, and drinks, with vegetarian and vegan options, from just
            €2.50 a slice.
          </p>
          <p className="mx-auto mt-2 max-w-xl font-mono text-xs uppercase tracking-widest text-ink/40">
            All pizza is priced per slice. Salads and desserts are priced per portion. Drinks are
            priced individually.
          </p>
          <div className="mt-6 flex justify-center">
            <a href={`${basePath}/catering/#catering-form`} className="btn-pill-wine">Host an Event With Us</a>
          </div>
        </div>
      </section>

      <FeatureStrip items={MENU_FACTS} />

      <MenuSection hideHeader />

      <QuoteBanner
        text="Planning a private event or office lunch? Tell us the occasion, headcount, and location, we&rsquo;ll recommend the right quantities and menu."
        ctaText="Request a Quote"
        ctaHref={`${basePath}/catering/#catering-form`}
      />
    </main>
  );
}
