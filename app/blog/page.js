import { events } from '@/lib/events';

export const metadata = {
  title: 'Blog & Events',
  description: 'Stories from Zia Maria, team lunches, private celebrations, wine nights, and events in the heart of Friedrichshain, Berlin.',
};

export default function BlogPage() {
  return (
    <main className="pt-32">
      <section className="marble-light py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <span className="eyebrow">Life at Zia Maria</span>
          <h1 className="display-heading mt-3 text-4xl text-ink md:text-6xl">
            Stories & Events in Friedrichshain, Berlin
          </h1>
        </div>
      </section>

      <section className="marble-light pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl space-y-20 px-6 md:px-10">
          {events.map((ev) => (
            <article key={ev.slug} id={ev.slug} className="scroll-mt-28">
              <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-wine/15 via-cream to-sand/25 md:h-96">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="text-wine/25">
                  <path d="M12 2 2 20h20L12 2z" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </div>
              <h2 className="display-heading mt-8 text-3xl text-ink md:text-4xl">{ev.title}</h2>
              <p className="mt-4 font-body leading-relaxed text-ink/70">{ev.long}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
