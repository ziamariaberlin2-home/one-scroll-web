const TILES = [
  { size: 'w-64 h-80', caption: 'Fresh from the oven' },
  { size: 'w-80 h-64', caption: 'Roman-style dough' },
  { size: 'w-56 h-96', caption: 'The dining room' },
  { size: 'w-72 h-72', caption: 'Seasonal ingredients' },
  { size: 'w-80 h-60', caption: 'Catering trays' },
  { size: 'w-60 h-80', caption: 'Team lunch spread' },
  { size: 'w-72 h-56', caption: 'Private events' },
  { size: 'w-64 h-64', caption: 'Behind the counter' },
];

function Tile({ tile, i }) {
  return (
    <div
      className={`relative flex ${tile.size} flex-shrink-0 items-end overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-br from-wine/15 via-cream to-sand/25`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-wine/30">
          <path d="M12 2 2 20h20L12 2z" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="14" r="1.4" fill="currentColor" />
          <circle cx="9" cy="17" r="1" fill="currentColor" />
          <circle cx="15" cy="17" r="1" fill="currentColor" />
        </svg>
      </div>
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
      <p className="mx-auto mt-4 max-w-7xl px-6 font-mono text-xs uppercase tracking-widest text-ink/35 md:px-10">
        Real photos coming soon
      </p>
    </section>
  );
}
