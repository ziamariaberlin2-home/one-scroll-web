import Image from 'next/image';
import { basePath } from '@/lib/basePath';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Our Story',
  description: 'The story behind Zia Maria, Roman-style pizza made fresh daily in the heart of Friedrichshain, Berlin.',
  path: '/our-story/',
  image: '/images/our-story.jpg',
});

export default function OurStoryPage() {
  return (
    <main className="pt-32">
      <section className="marble-light py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <span className="eyebrow">Our Story</span>
          <h1 className="display-heading mt-3 text-4xl text-ink md:text-6xl">
            Zia Maria, Roman Pizza in the Heart of Berlin
          </h1>
        </div>
      </section>

      <section className="marble-light pb-24 md:pb-32">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-10">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem]">
            <Image
              src={`${basePath}/images/our-story.jpg`}
              alt="Artisan Roman-style pizza being prepared at Zia Maria, Friedrichshain, Berlin"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col justify-center space-y-5 font-body text-ink/75">
            <p>
              In Italian, <em className="text-ink">zia</em> means aunt. And in every culture,
              the aunt is the one who holds everything together. She makes space when there
              isn&rsquo;t any. She remembers what everyone likes. She makes sure no one leaves
              hungry, and somehow always makes enough for one more.
            </p>
            <p>
              That&rsquo;s the spirit behind Zia Maria. We opened our doors in Friedrichshain,
              Berlin with one simple goal: bring people together around honest, Roman-style
              pizza. Our dough ferments slowly for a light, crisp base, topped daily with fresh,
              seasonal ingredients sourced with care.
            </p>
            <p>
              We&rsquo;re not a big chain and we don&rsquo;t cut corners. Every pizza that leaves
              our kitchen, whether it&rsquo;s for a walk-in table, a business lunch order, or a
              catering tray headed across Berlin, gets the same attention a family recipe
              deserves.
            </p>
            <p>
              Come as you are. Bring who matters. We&rsquo;ll take care of the rest, that&rsquo;s
              what an aunt would do.
            </p>
          </div>
        </div>
      </section>

      <section className="marble-light pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl px-6 text-center md:px-10">
          <span className="eyebrow">Good Company</span>
          <h2 className="display-heading mt-3 text-3xl text-ink md:text-5xl">
            Craft Beer. Natural Wine. Artisan Pizza.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-ink/70">
            Great pizza deserves great company. We pair our Roman-style pies with a
            thoughtfully chosen selection of craft beer and natural wine.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="relative aspect-[900/1837] w-full overflow-hidden rounded-[2rem]">
              <Image
                src={`${basePath}/images/craft-beer.jpg`}
                alt="Craft Beer illustration, Zia Maria, Friedrichshain, Berlin"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-[900/1837] w-full overflow-hidden rounded-[2rem]">
              <Image
                src={`${basePath}/images/artisan-pizza.jpg`}
                alt="Artisan Pizza illustration, Zia Maria, Friedrichshain, Berlin"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-[900/1837] w-full overflow-hidden rounded-[2rem]">
              <Image
                src={`${basePath}/images/natural-wine.jpg`}
                alt="Natural Wine illustration, Zia Maria, Friedrichshain, Berlin"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="marble-dark py-20 text-cream md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <span className="eyebrow text-sand">Roman-Style, Done Right</span>
          <h2 className="display-heading mt-3 text-3xl text-cream md:text-5xl">
            Slow Fermentation. Fresh Ingredients. Every Single Day.
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-cream/70">
            Our dough rests for days before it ever sees the oven, giving it that light, crisp,
            Roman-style bite. It&rsquo;s a small detail that makes a big difference, and it&rsquo;s
            why regulars keep coming back to our corner of Friedrichshain.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={`${basePath}/menu/`} className="btn-pill-light">View Our Menu</a>
            <a href={`${basePath}/#reserve`} className="btn-pill border-cream/40 text-cream hover:bg-cream/10">
              Reserve a Table
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
