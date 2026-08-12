'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { basePath } from '@/lib/basePath';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Framed, rounded image -> full-bleed rectangle as the user scrolls through the pinned section.
  const borderRadius = useTransform(scrollYProgress, [0, 0.55], ['32px', '0px']);
  const widthPct = useTransform(scrollYProgress, [0, 0.55], ['88%', '100%']);
  const heightPct = useTransform(scrollYProgress, [0, 0.55], ['82%', '100%']);
  const brightness = useTransform(scrollYProgress, [0, 0.55], [0.78, 0.55]);

  return (
    <section id="top" ref={containerRef} className="marble-light relative" style={{ height: '190vh' }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden pt-16">
        <motion.div
          className="relative overflow-hidden"
          style={{
            width: widthPct,
            height: heightPct,
            borderRadius,
          }}
        >
          <motion.div className="absolute inset-0" style={{ filter: useTransform(brightness, (b) => `brightness(${b})`) }}>
            <Image
              src={`${basePath}/images/home.jpg`}
              alt="Fresh Roman-style pizza at Zia Maria, Friedrichshain, Berlin"
              fill
              priority
              className="object-cover"
              sizes="100vw"
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
