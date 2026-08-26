'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { basePath } from '@/lib/basePath';
import { useCart } from '@/lib/cart';

const LINKS = [
  { href: `${basePath}/`, label: 'Home' },
  { href: `${basePath}/menu/`, label: 'Ordering & Menu' },
  { href: `${basePath}/catering/`, label: 'Catering' },
  { href: `${basePath}/business-lunch/`, label: 'Business Lunch' },
  { href: `${basePath}/our-story/`, label: 'Our Story' },
  { href: `${basePath}/blog/`, label: 'Blog' },
];

const CONTACT_LINK = { href: `${basePath}/#visit`, label: 'Contact Us' };

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();

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
        <a href={`${basePath}/`} className="flex items-center">
          <Image
            src={`${basePath}/images/zia-maria-logo-wordmark.png`}
            alt="Zia Maria"
            width={900}
            height={261}
            className="h-8 w-auto md:h-9"
            priority
          />
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link-olive font-mono text-xs uppercase tracking-widest text-ink/80 transition-colors hover:text-olive"
            >
              {l.label}
            </a>
          ))}
          <a href={CONTACT_LINK.href} className="btn-pill-dark">
            {CONTACT_LINK.label}
          </a>
          <a href={`${basePath}/order/`} className="btn-pill-wine relative">
            Order Now
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-cream">
                {count}
              </span>
            )}
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
          <a
            href={CONTACT_LINK.href}
            onClick={() => setOpen(false)}
            className="btn-pill-dark mt-2 w-full"
          >
            {CONTACT_LINK.label}
          </a>
          <a
            href={`${basePath}/order/`}
            onClick={() => setOpen(false)}
            className="btn-pill-wine relative mt-2 w-full"
          >
            Order Now
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-cream">
                {count}
              </span>
            )}
          </a>
        </nav>
      )}
    </header>
  );
}
