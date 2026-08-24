'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { basePath } from '@/lib/basePath';

export default function Footer() {
  const logoRef = useRef(null);

  // Scroll-linked left-to-right wipe reveal of the wordmark as it scrolls into view,
  // matching Pizzeria Sei's footer treatment.
  const { scrollYProgress } = useScroll({
    target: logoRef,
    offset: ['start 95%', 'start 45%'],
  });
  const clipRight = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipPath = useTransform(clipRight, (v) => `inset(0% ${v}% 0% 0%)`);

  // Every crawlable page on the site, for the visible HTML sitemap block below —
  // kept in the same order as the main nav, plus the pages nav doesn't list directly.
  const SITEMAP_LINKS = [
    { href: `${basePath}/`, label: 'Home' },
    { href: `${basePath}/menu/`, label: 'Ordering & Menu' },
    { href: `${basePath}/catering/`, label: 'Catering' },
    { href: `${basePath}/business-lunch/`, label: 'Business Lunch' },
    { href: `${basePath}/our-story/`, label: 'Our Story' },
    { href: `${basePath}/blog/`, label: 'Blog' },
    { href: `${basePath}/order/`, label: 'Order Online' },
    { href: `${basePath}/#reserve`, label: 'Reserve a Table' },
    { href: `${basePath}/#visit`, label: 'Contact Us' },
  ];

  const linkClass =
    'text-base font-medium text-ink/85 transition-colors hover:text-wine-dark hover:underline underline-offset-4';

  return (
    <footer className="relative overflow-hidden border-t border-ink/10 pb-14 pt-16 text-ink/70">
      <div className="marble-light absolute inset-0" />
      <Image
        src={`${basePath}/images/gallery/food-5.jpg`}
        alt=""
        fill
        className="object-cover opacity-30"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-cream/60" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex justify-center border-b border-ink/10 pb-12 md:pb-16">
          <motion.div ref={logoRef} className="w-[min(85vw,560px)] overflow-hidden" style={{ clipPath }}>
            <Image
              src={`${basePath}/images/zia-maria-wordmark.png`}
              alt="Zia Maria — Contemporary Experience"
              width={1600}
              height={358}
              className="h-auto w-full"
            />
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <h4 className="font-display text-xl font-semibold text-ink">Zia Maria</h4>
            <p className="mt-3 text-sm">Roman-style pizza in the heart of Friedrichshain, Berlin.</p>
            <a
              href="https://www.instagram.com/ziamaria.fhain/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 hover:border-wine hover:text-wine-dark"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 3.3.15 4.8 1.7 4.95 4.95.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.15 3.25-1.65 4.8-4.95 4.95-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-3.3-.15-4.8-1.7-4.95-4.95C2.08 15.6 2.07 15.2 2.07 12s0-3.6.07-4.9C2.29 3.85 3.79 2.3 7.1 2.15 8.4 2.09 8.8 2.08 12 2.08zM12 0C8.74 0 8.33 0 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C0 8.33 0 8.74 0 12s0 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 24 8.74 24 12 24s3.67 0 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.07-1.28.07-1.69.07-4.95s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67 0 15.26 0 12 0z"/><path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4z"/><circle cx="18.41" cy="5.59" r="1.44"/></svg>
            </a>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-ink">Explore</h4>
            <ul className="mt-4 space-y-2.5">
              <li><a href={`${basePath}/`} className={linkClass}>Home</a></li>
              <li><a href={`${basePath}/menu/`} className={linkClass}>Ordering &amp; Menu</a></li>
              <li><a href={`${basePath}/catering/`} className={linkClass}>Catering</a></li>
              <li><a href={`${basePath}/business-lunch/`} className={linkClass}>Business Lunch</a></li>
              <li><a href={`${basePath}/our-story/`} className={linkClass}>Our Story</a></li>
              <li><a href={`${basePath}/blog/`} className={linkClass}>Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-ink">Contact Us</h4>
            <p className="mt-4 text-sm">Neue Bahnhofstraße 32,<br />10245 Berlin, Friedrichshain</p>
            <a href="https://wa.me/4917627705583" target="_blank" rel="noopener noreferrer" className={`mt-3 block ${linkClass}`}>
              Chat on WhatsApp
            </a>
            <a href="mailto:bringteamtogether@ziamariaberlin.com" className={`mt-2 block ${linkClass}`}>
              bringteamtogether@ziamariaberlin.com
            </a>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-ink">Hours</h4>
            <p className="mt-4 text-sm">Mon – Wed: 12:00–22:00</p>
            <p className="text-sm">Thu – Sat: 12:00–23:00</p>
            <p className="text-sm">Sun: 12:00–22:00</p>
            <a href={`${basePath}/#reserve`} className="btn-pill-dark mt-4 inline-flex">Reserve a Table</a>
          </div>
        </div>

        <div className="mt-12 border-t border-ink/10 pt-8">
          <h4 className="font-mono text-xs uppercase tracking-widest text-ink">Sitemap</h4>
          <nav aria-label="Sitemap" className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {SITEMAP_LINKS.map((l) => (
              <a key={l.label} href={l.href} className={linkClass}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-6 text-center text-xs text-ink/40 md:flex-row md:text-left">
          <span>&copy; {new Date().getFullYear()} Zia Maria Berlin.</span>
          <div className="flex items-center gap-4">
            <a href={`${basePath}/imprint.pdf`} className="hover:text-wine-dark">Imprint</a>
            <a href={`${basePath}/privacy-policy.pdf`} className="hover:text-wine-dark">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
