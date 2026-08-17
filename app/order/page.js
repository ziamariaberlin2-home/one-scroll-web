import MenuSection from '@/components/MenuSection';
import Checkout from '@/components/Checkout';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Order Online',
  description: 'Order fresh Roman-style pizza online from Zia Maria in Friedrichshain, Berlin. Pickup and delivery available.',
  path: '/order/',
});

export default function OrderPage() {
  return (
    <main className="pt-32">
      <section className="marble-light pb-4 pt-4 md:pb-8">
        <div className="mx-auto max-w-2xl px-6 text-center md:px-10">
          <span className="eyebrow">Order Online</span>
          <h1 className="display-heading mt-3 text-4xl text-ink md:text-6xl">
            Order Zia Maria, Straight to Your Door
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-body text-ink/70">
            Add your favorites below, then check out with PayPal or send your order straight to us on
            WhatsApp.
          </p>
        </div>
      </section>

      <MenuSection hideHeader />

      <Checkout />

      <section className="marble-light py-10 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/40">
          Neue Bahnhofstraße 32, 10245 Berlin · Friedrichshain
        </p>
        <a href="tel:+4917627705583" className="mt-2 inline-block text-sm text-ink/60 hover:text-wine">
          Prefer to call? +49 176 2770 5583
        </a>
      </section>
    </main>
  );
}
