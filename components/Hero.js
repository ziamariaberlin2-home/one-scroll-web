'use client';

import { useEffect, useRef, useState } from 'react';
import { basePath } from '@/lib/basePath';
import { motion, useScroll, useTransform } from 'framer-motion';

// Actual pixel aspect of /videos/opening-hero.mp4 (portrait footage).
const VIDEO_ASPECT = 1920 / 3414; // ≈ 0.5625

// Container aspect ratio at rest that keeps ~80% of the video frame visible
// under object-cover (derived from VIDEO_ASPECT / desiredVisibleFraction).
const REST_ASPECT = VIDEO_ASPECT / 0.8; // ≈ 0.703

export default function Hero() {
  const containerRef = useRef(null);
  // Sensible desktop default so SSR/first paint match; corrected on mount.
  const [viewport, setViewport] = useState({ width: 1512, height: 800 });

  useEffect(() => {
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Tall, arched "oven mouth" at rest (à la Pizzeria Sei) -> full-bleed rectangle on scroll.
  let restHeight = viewport.height * 0.86;
  let restWidth = restHeight * REST_ASPECT;
  const maxWidth = viewport.width * 0.94;
  if (restWidth > maxWidth) {
    restWidth = maxWidth;
    restHeight = restWidth / REST_ASPECT;
  }

  const archAmount = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const borderRadius = useTransform(
    archAmount,
    (v) => `${50 * v}% ${50 * v}% 0% 0% / ${46 * v}% ${46 * v}% 0% 0%`
  );
  const widthPx = useTransform(scrollYProgress, [0, 0.55], [restWidth, viewport.width]);
  const heightPx = useTransform(scrollYProgress, [0, 0.55], [restHeight, viewport.height]);
  const brightness = useTransform(scrollYProgress, [0, 0.55], [0.78, 0.55]);

  return (
    <section id="top" ref={containerRef} className="marble-light relative" style={{ height: '190vh' }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden pt-16">
        <motion.div
          className="relative overflow-hidden"
          style={{
            width: widthPx,
            height: heightPx,
            borderRadius,
          }}
        >
          <motion.div className="absolute inset-0" style={{ filter: useTransform(brightness, (b) => `brightness(${b})`) }}>
            <video
              className="h-full w-full object-cover"
              src={`${basePath}/videos/opening-hero.mp4`}
              poster={`${basePath}/videos/poster-frame.jpg`}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          </motion.div>

          {/* Permanent contrast scrim, independent of the brightness filter above */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <span className="eyebrow text-cream/90 drop-shadow">Roman Pizza · Friedrichshain, Berlin</span>
            <h1 className="display-heading mt-3 text-3xl text-cream drop-shadow-sm sm:text-4xl md:mt-4 md:text-6xl">
              Roman Pizza in the Heart of Berlin
            </h1>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-cream/90 drop-shadow-sm sm:text-base md:mt-6 md:text-lg">
              Fresh, Roman-style pizza baked daily for our Friedrichshain neighbors. Join us for
              dinner, bring your team for a business lunch, or let us cater your next event.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-8 md:gap-4">
              <a href={`${basePath}/order/`} className="btn-pill-wine">Order Now</a>
              <a href="#catering" className="btn-pill-light">Catering</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
