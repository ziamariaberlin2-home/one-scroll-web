import MenuSection from '@/components/MenuSection';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Menu, Roman Pizza in Friedrichshain, Berlin',
  description: 'Explore the Zia Maria menu: fresh Roman-style pizza, salads, and drinks in the heart of Friedrichshain, Berlin. Vegetarian and vegan options available.',
  path: '/menu/',
});

export default function MenuPage() {
  return (
    <main className="pt-24">
      <section className="marble-light pb-4 pt-16 text-center md:pt-20">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <span className="eyebrow">Fresh, Every Day</span>
          <h1 className="display-heading mt-3 text-4xl text-ink md:text-6xl">
            Roman Pizza Menu in Friedrichshain, Berlin
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-ink/70">
            Slow-fermented Roman-style pizza, salads, and drinks, with vegetarian and vegan
            options, from just €2.40 a slice.
          </p>
        </div>
      </section>

      <MenuSection hideHeader />
    </main>
  );
}
