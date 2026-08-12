import Image from 'next/image';
import { basePath } from '@/lib/basePath';
import { reviews, GOOGLE_MAPS_URL } from '@/lib/reviews';

function Stars() {
  return (
    <div className="flex gap-0.5 text-sand" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 14.9 8.6 22 9.2 16.7 13.9 18.2 21 12 17.3 5.8 21 7.3 13.9 2 9.2 9.1 8.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="marble-dark relative overflow-hidden py-24 text-cream md:py-28">
      <div className="absolute inset-0">
        <Image
          src={`${basePath}/images/reviews-bg.jpg`}
          alt=""
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/70" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-14 text-center">
          <span className="eyebrow text-sand">Loved in Friedrichshain</span>
          <h2 className="display-heading mt-3 text-4xl text-cream md:text-6xl">What Berlin Says</h2>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cream/70 hover:text-cream"
          >
            <Stars />
            4.8 out of 5, 1,229 Google reviews
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <a
              key={r.name}
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col rounded-2xl border border-cream/15 bg-cream/5 p-6 backdrop-blur transition-colors hover:bg-cream/10"
            >
              <Stars />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/85">&ldquo;{r.quote}&rdquo;</p>
              <div className="mt-5 border-t border-cream/10 pt-4">
                <p className="font-display text-sm font-semibold text-cream">{r.name}</p>
                <p className="font-mono text-xs uppercase tracking-widest text-cream/50">{r.meta}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
