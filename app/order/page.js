import { whatsappLink } from '@/lib/emailjs';

export const metadata = {
  title: 'Order Online',
  description: 'Order fresh Roman-style pizza online from Zia Maria in Friedrichshain, Berlin. Pickup and delivery available.',
};

export default function OrderPage() {
  return (
    <main className="pt-32">
      <section className="marble-light py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center md:px-10">
          <span className="eyebrow">Order Online</span>
          <h1 className="display-heading mt-3 text-4xl text-ink md:text-6xl">
            Order Zia Maria, Straight to Your Door
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-body text-ink/70">
            Fresh Roman-style pizza in Friedrichshain, Berlin, ready for pickup or delivery.
            Online checkout is launching soon. In the meantime, order directly with us and we&rsquo;ll
            take it from there.
          </p>

          <div className="mx-auto mt-12 max-w-md rounded-3xl border border-ink/10 bg-white/50 p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-ink/50">Pay by PayPal</p>
            <button
              type="button"
              disabled
              className="btn-pill-dark mt-4 w-full cursor-not-allowed opacity-50"
              aria-disabled="true"
            >
              Online Checkout, Coming Soon
            </button>
            <p className="mt-3 text-xs text-ink/50">
              We&rsquo;re setting up online ordering. Check back shortly, or order below.
            </p>
          </div>

          <div className="mx-auto mt-6 max-w-md space-y-3">
            <a
              href={whatsappLink("Hi Zia Maria! I'd like to place a pickup/delivery order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-wine block w-full"
            >
              Order on WhatsApp
            </a>
            <a href="tel:+4917627705583" className="btn-pill-dark block w-full">
              Call Us: +49 176 2770 5583
            </a>
          </div>

          <p className="mt-10 font-mono text-xs uppercase tracking-widest text-ink/40">
            Neue Bahnhofstraße 32, 10245 Berlin · Friedrichshain
          </p>
        </div>
      </section>
    </main>
  );
}
