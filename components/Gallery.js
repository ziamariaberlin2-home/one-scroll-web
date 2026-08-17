import Image from 'next/image';
import { basePath } from '@/lib/basePath';

const TILES = [
  { size: 'w-64 h-80', caption: 'Fresh from the oven', image: 'food-1.jpg' },
  { size: 'w-80 h-64', caption: 'The dining room', image: 'team-4.jpg' },
  { size: 'w-56 h-96', caption: 'Roman-style dough', image: 'food-2.jpg' },
  { size: 'w-72 h-72', caption: 'Team lunch spread', image: 'team-3.jpg' },
  { size: 'w-80 h-60', caption: 'Seasonal ingredients', image: 'food-5.jpg' },
  { size: 'w-60 h-80', caption: 'Private events', image: 'team-5.jpg' },
  { size: 'w-72 h-56', caption: 'Catering trays', image: 'food-4.jpg' },
  { size: 'w-64 h-64', caption: 'Behind the counter', image: 'food-3.jpg' },
];

function Tile({ tile, i }) {
  return (
    <div
      className={`relative flex ${tile.size} flex-shrink-0 items-end overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-br from-wine/15 via-cream to-sand/25`}
    >
      <Image
        src={`${basePath}/images/gallery/${tile.image}`}
        alt={tile.caption}
        fill
        className="object-cover"
        sizes="384px"
      />
      <span className="relative z-10 w-full bg-ink/40 px-4 py-3 font-mono text-xs uppercase tracking-widest text-cream backdrop-blur-sm">
        {tile.caption}
      </span>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="marble-light overflow-hidden py-20 md:py-24">
      <div className="mx-auto mb-10 max-w-7xl px-6 text-center md:px-10">
        <span className="eyebrow">A Look Inside</span>
        <h2 className="display-heading mt-3 text-3xl text-ink md:text-5xl">The Zia Maria Gallery</h2>
      </div>

      <div className="gallery-marquee-viewport">
        <div className="gallery-marquee-track">
          {TILES.map((tile, i) => (
            <Tile key={`a-${i}`} tile={tile} i={i} />
          ))}
          {TILES.map((tile, i) => (
            <Tile key={`b-${i}`} tile={tile} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
