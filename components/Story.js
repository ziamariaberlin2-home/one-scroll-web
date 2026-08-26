import Image from 'next/image';
import { basePath } from '@/lib/basePath';

export default function Story() {
  return (
    <section id="story" className="marble-light relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-10">
        <div className="relative flex flex-col justify-center">
          <span className="eyebrow">Our Story</span>
          <h2 className="display-heading mt-3 text-[13vw] leading-[0.9] text-wine/90 md:text-[4.5vw]">
            Brings Us
            <br />
            Together
          </h2>

          <div className="relative mt-6 max-w-md space-y-4 font-body text-ink/75">
            <p>
              In Italian, <em className="text-ink">zia</em> means aunt, the one who always makes
              room, remembers what you like, and somehow has enough for one more.
            </p>
            <p>
              That&rsquo;s the table we set in the heart of Friedrichshain, Berlin: Roman-style
              dough, fresh ingredients, and a warm welcome every time.
            </p>
          </div>

          <a href={`${basePath}/our-story/`} className="btn-pill-olive mt-8 w-fit">
            Read Our Story
          </a>
        </div>

        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] md:mt-16">
          <Image
            src={`${basePath}/images/artisan-pizza.jpg`}
            alt="Artisan Pizza illustration, Zia Maria, Friedrichshain, Berlin"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
