'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { basePath } from '@/lib/basePath';

const LINKS = [
  { href: `${basePath}/our-story/`, label: 'Our Story' },
  { href: `${basePath}/menu/`, label: 'Menu' },
  { href: `${basePath}/#catering`, label: 'Catering' },
  { href: `${basePath}/business-lunch/`, label: 'Business Lunch' },
  { href: `${basePath}/blog/`, label: 'Blog' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur border-b border-ink/10' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <a href={`${basePath}/`} className="flex items-center gap-2">
          <Image
            src={`${basePath}/images/zia-maria-logo.png`}
            alt="Zia Maria"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <span className="font-display text-xl font-semibold tracking-wide text-ink">Zia Maria</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-widest text-ink/80 transition-colors hover:text-wine"
            >
              {l.label}
            </a>
          ))}
          <a href={`${basePath}/#reserve`} className="btn-pill-wine">
            Reserve
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-0.5 w-6 bg-ink transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink/10 bg-cream px-5 pb-6 pt-2 lg:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 font-mono text-sm uppercase tracking-widest text-ink/80"
            >
              {l.label}
            </a>
          ))}
          <a href={`${basePath}/#reserve`} onClick={() => setOpen(false)} className="btn-pill-wine mt-2 w-full">
            Reserve
          </a>
        </nav>
      )}
    </header>
  );
}
