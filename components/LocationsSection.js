export default function LocationsSection() {
  return (
    <section id="visit" className="marble-dark py-24 text-cream md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 text-center">
          <span className="eyebrow text-sand">Find Us</span>
          <h2 className="display-heading mt-3 text-5xl text-cream md:text-7xl">Visit Us</h2>
        </div>

        <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-cream/15 md:grid-cols-2">
          <div className="bg-cream/10 p-8 md:p-10">
            <h3 className="font-display text-2xl font-semibold text-cream">Zia Maria</h3>
            <p className="mt-3 text-cream/70">
              Neue Bahnhofstraße 32
              <br />
              10245 Berlin, Friedrichshain
            </p>
            <div className="mt-6 space-y-1 text-sm text-cream/70">
              <p>Mon – Wed: 12:00–22:00</p>
              <p>Thu – Sat: 12:00–23:00</p>
              <p>Sun: 12:00–22:00</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#reserve" className="btn-pill-light">Reserve a Table</a>
              <a
                href="https://wa.me/4917627705583"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill border-cream/40 text-cream hover:bg-cream/10"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="min-h-[320px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.8!2d13.4691545!3d52.5052471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84f70271ffbe9%3A0xe1f929903a803939!2sPizza%20Zia%20Maria%20-%20pizzeria!5e0!3m2!1sen!2sde!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 320 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Zia Maria location map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
