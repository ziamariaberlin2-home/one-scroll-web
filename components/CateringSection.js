import { whatsappLink } from '@/lib/emailjs';

const FEATURES = [
  'Family-style pizza trays',
  'Vegetarian and vegan options',
  'Delivery across Berlin or pickup in Friedrichshain',
  'Private events, birthdays, and team celebrations',
  'On-site equipment and staffing, confirmed in writing',
];

export default function CateringSection() {
  return (
    <section id="catering" className="marble-light py-24 md:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <span className="eyebrow">Catering in Berlin</span>
        <h2 className="display-heading mt-3 text-4xl text-wine/90 md:text-5xl">
          Roman-Style Pizza Catering and Private Events in Berlin
        </h2>
        <div className="mx-auto mt-6 max-w-2xl space-y-4 font-body text-ink/75">
          <p>
            An aunt never shows up with just enough, she brings extra, always. That&rsquo;s the
            spirit behind our Berlin catering: generous, family-style Roman pizza for offices,
            teams, birthdays, and private events of any size, delivered fresh across the city.
          </p>
          <p>
            From a Friedrichshain team lunch to a full birthday celebration or company party, tell
            us your date, headcount, and location, and we&rsquo;ll build a menu and quote suited
            to your group and budget, the best Italian pizza catering Berlin teams and hosts keep
            coming back to.
          </p>
        </div>

        <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 text-sm text-ink/70 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <li key={f} className="card-3d rounded-xl border border-ink/10 p-4">{f}</li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#catering-form" className="btn-pill-wine">Request a Quote</a>
          <a
            href={whatsappLink("Hi Zia Maria! I'd like a catering or private event quote in Berlin.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-dark"
          >
            Inquire on WhatsApp
          </a>
        </div>

        <p className="mx-auto mt-8 max-w-lg font-mono text-xs uppercase tracking-widest text-ink/40">
          Catering &middot; business lunches &middot; birthdays &middot; private celebrations,
          all in one place
        </p>
      </div>
    </section>
  );
}
