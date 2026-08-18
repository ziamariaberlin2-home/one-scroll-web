import { basePath } from '@/lib/basePath';
import { menuData } from '@/lib/menuData';

const featured = menuData.slice(0, 3);

export default function MenuTeaser() {
  return (
    <section id="menu" className="marble-light py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 text-center">
          <span className="eyebrow">Fresh, Every Day</span>
          <h2 className="display-heading mt-3 text-4xl text-ink md:text-6xl">Our Menu</h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-ink/70">
            Roman-style pizza, salads, and a few things worth lingering over, pizza from €2.50.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {featured.map((item) => (
            <div
              key={item.name}
              className="card-3d flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} loading="lazy" className="h-44 w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold text-ink">{item.name}</h3>
                <p className="mt-1 flex-1 text-sm text-ink/60">{item.description}</p>
                <span className="mt-3 font-display text-lg font-semibold text-wine-dark">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href={`${basePath}/menu/`} className="btn-pill-dark">View Full Menu</a>
        </div>
      </div>
    </section>
  );
}
