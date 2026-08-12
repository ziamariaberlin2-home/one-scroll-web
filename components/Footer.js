import Image from 'next/image';
import { basePath } from '@/lib/basePath';

export default function Footer() {
  return (
    <footer className="marble-dark border-t border-cream/10 py-14 text-cream/70">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <Image
              src={`${basePath}/images/zia-maria-logo.png`}
              alt="Zia Maria"
              width={56}
              height={56}
              className="h-14 w-14"
            />
            <h4 className="mt-3 font-display text-xl font-semibold text-cream">Zia Maria</h4>
            <p className="mt-3 text-sm">Roman-style pizza in the heart of Friedrichshain, Berlin.</p>
            <a
              href="https://www.instagram.com/ziamaria.fhain/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 hover:border-wine hover:text-wine"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 3.3.15 4.8 1.7 4.95 4.95.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.15 3.25-1.65 4.8-4.95 4.95-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-3.3-.15-4.8-1.7-4.95-4.95C2.08 15.6 2.07 15.2 2.07 12s0-3.6.07-4.9C2.29 3.85 3.79 2.3 7.1 2.15 8.4 2.09 8.8 2.08 12 2.08zM12 0C8.74 0 8.33 0 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C0 8.33 0 8.74 0 12s0 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 24 8.74 24 12 24s3.67 0 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.07-1.28.07-1.69.07-4.95s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67 0 15.26 0 12 0z"/><path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4z"/><circle cx="18.41" cy="5.59" r="1.44"/></svg>
            </a>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-cream">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={`${basePath}/our-story/`} className="hover:text-cream">Our Story</a></li>
              <li><a href={`${basePath}/menu/`} className="hover:text-cream">Menu</a></li>
              <li><a href={`${basePath}/#catering`} className="hover:text-cream">Catering</a></li>
              <li><a href={`${basePath}/business-lunch/`} className="hover:text-cream">Business Lunch</a></li>
              <li><a href={`${basePath}/blog/`} className="hover:text-cream">Blog and Events</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-cream">Visit</h4>
            <p className="mt-4 text-sm">Neue Bahnhofstraße 32,<br />10245 Berlin, Friedrichshain</p>
            <a href="https://wa.me/4917627705583" target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm hover:text-cream">
              Chat on WhatsApp
            </a>
            <a href="mailto:bringteamtogether@ziamariaberlin.com" className="mt-1 block text-sm hover:text-cream">
              bringteamtogether@ziamariaberlin.com
            </a>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-cream">Hours</h4>
            <p className="mt-4 text-sm">Mon – Wed: 12:00–22:00</p>
            <p className="text-sm">Thu – Sat: 12:00–23:00</p>
            <p className="text-sm">Sun: 12:00–22:00</p>
            <a href={`${basePath}/#reserve`} className="btn-pill-light mt-4 inline-flex">Reserve a Table</a>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6 text-center text-xs text-cream/40">
          &copy; {new Date().getFullYear()} Zia Maria Berlin.
        </div>
      </div>
    </footer>
  );
}
