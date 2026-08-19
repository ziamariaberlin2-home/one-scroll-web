'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { basePath } from '@/lib/basePath';
import { reviews, GOOGLE_MAPS_URL } from '@/lib/reviews';

function Stars() {
  return (
    <div className="flex justify-center gap-0.5 text-accent" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 14.9 8.6 22 9.2 16.7 13.9 18.2 21 12 17.3 5.8 21 7.3 13.9 2 9.2 9.1 8.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection({ bgImage = 'reviews-bg.jpg' }) {
  const total = reviews.length;
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i) => {
    setIndex(((i % total) + total) % total);
  }, [total]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 6000);
    return () => clearInterval(id);
  }, [total]);

  const current = reviews[index];

  return (
    <section id="reviews" className="marble-light relative overflow-hidden py-24 md:py-28">
      <div className="absolute inset-0">
        <Image
          src={`${basePath}/images/${bgImage}`}
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-cream/55" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <span className="eyebrow">Loved in Friedrichshain</span>
        <h2 className="display-heading mt-3 text-4xl text-wine/90 md:text-6xl">What Berlin Says</h2>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink/60 hover:text-wine-dark"
        >
          <Stars />
          4.8 out of 5, 1,229 Google reviews
        </a>

        {/* Rotating spotlight quote */}
        <div className="relative mt-14 min-h-[300px] md:mt-16 md:min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.a
              key={current.name}
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative z-10 block"
            >
              <Stars />
              <div className="relative mx-auto mt-8 max-w-2xl">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="absolute -left-1 -top-8 h-10 w-10 text-wine/25 md:-left-12 md:-top-4 md:h-14 md:w-14"
                >
                  <path d="M11 7c-3.6 0-6.5 2.9-6.5 6.5V25h11.5V13.5H8.5c0-1.4 1.1-2.5 2.5-2.5V7zm14 0c-3.6 0-6.5 2.9-6.5 6.5V25H30V13.5h-7.5c0-1.4 1.1-2.5 2.5-2.5V7z" />
                </svg>
                <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
                  {current.quote}
                </p>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="absolute -bottom-8 -right-1 h-10 w-10 rotate-180 text-wine/25 md:-bottom-4 md:-right-12 md:h-14 md:w-14"
                >
                  <path d="M11 7c-3.6 0-6.5 2.9-6.5 6.5V25h11.5V13.5H8.5c0-1.4 1.1-2.5 2.5-2.5V7zm14 0c-3.6 0-6.5 2.9-6.5 6.5V25H30V13.5h-7.5c0-1.4 1.1-2.5 2.5-2.5V7z" />
                </svg>
              </div>
              <p className="mt-8 font-mono text-xs uppercase tracking-widest text-ink/50">
                {current.name} &middot; {current.meta}
              </p>
            </motion.a>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous review"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 font-display text-lg text-ink/60 transition-colors hover:border-wine hover:text-wine-dark"
          >
            &#8249;
          </button>
          <div className="flex items-center gap-2">
            {reviews.map((r, i) => (
              <button
                key={r.name}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show review ${i + 1} of ${total}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-wine' : 'w-1.5 bg-ink/20 hover:bg-ink/40'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next review"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 font-display text-lg text-ink/60 transition-colors hover:border-wine hover:text-wine-dark"
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
}
