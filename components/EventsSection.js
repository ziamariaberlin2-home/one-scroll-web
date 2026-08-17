import Image from 'next/image';
import { basePath } from '@/lib/basePath';
import { events } from '@/lib/events';

export default function EventsSection() {
  return (
    <section id="events" className="marble-light py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 text-center">
          <span className="eyebrow">Life at Zia Maria</span>
          <h2 className="display-heading mt-3 text-4xl text-ink md:text-6xl">Events at Zia</h2>
          <p className="mx-auto mt-4 font-body text-ink/70">
            From team lunches to terrace nights, a look at what happens around our table.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((ev, i) => (
            <a
              key={ev.slug}
              href={`${basePath}/blog/#${ev.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/50 transition-shadow hover:shadow-lg"
            >
              <div className="relative flex h-48 items-end overflow-hidden bg-gradient-to-br from-wine/15 via-cream to-sand/25">
                {ev.image ? (
                  <Image
                    src={`${basePath}/images/${ev.image}`}
                    alt={ev.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-wine/25">
                      <path d="M12 2 2 20h20L12 2z" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{ev.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink/65">{ev.short}</p>
                <span className="mt-4 font-mono text-xs uppercase tracking-widest text-wine transition-transform group-hover:translate-x-1">
                  Read More →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
