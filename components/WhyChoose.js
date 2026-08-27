import { WHY_ICONS } from '@/lib/icons';
import IconChip from '@/components/IconBadge';

const POINTS = [
  {
    title: 'Slow-Rested Roman Dough',
    body: 'Our dough rests for days before it ever sees the oven, the secret to a light, crisp, authentic Roman-style base.',
    icon: 'dough',
  },
  {
    title: 'Fresh Ingredients, Every Day',
    body: 'No shortcuts. Toppings are prepped fresh daily with seasonal, quality ingredients sourced with care.',
    icon: 'fresh',
  },
  {
    title: 'Pizza From Just €2.50',
    body: 'Real Italian pizza in Berlin, priced for everyday enjoyment, from a quick slice to a full team catering order.',
    icon: 'price',
  },
  {
    title: 'In the Heart of Friedrichshain',
    body: 'Easy to find, easy to love, our Neue Bahnhofstraße spot is a Friedrichshain favorite for locals and teams alike.',
    icon: 'location',
  },
];

export default function WhyChoose() {
  return (
    <section id="why-choose" className="marble-light py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 text-center">
          <span className="eyebrow">Why Zia Maria</span>
          <h2 className="display-heading mt-3 text-4xl text-wine/90 md:text-6xl">
            Why Choose Zia Maria
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-ink/75">
            The best Roman-style pizza in Berlin, made the way it should be.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p, i) => {
            const { Icon, color } = WHY_ICONS[p.icon];
            return (
              <div
                key={p.title}
                className="card-3d card-pop hover-line-wine group flex flex-col rounded-2xl border border-ink/10 bg-white/50 p-6 transition-colors hover:border-wine/30"
              >
                <div className="flex items-center justify-between">
                  <IconChip icon={Icon} color={color} size="lg" />
                  <span className="font-display text-2xl font-semibold text-ink/15">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink/65">{p.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
