import { events } from '@/lib/events';
import { blogPosts } from '@/lib/blogData';
import { pageMetadata } from '@/lib/seo';
import { basePath } from '@/lib/basePath';

export const metadata = pageMetadata({
  title: 'Blog & Events',
  description: 'Stories from Zia Maria, team lunches, private celebrations, wine nights, and events in the heart of Friedrichshain, Berlin.',
  path: '/blog/',
});

export default function BlogPage() {
  return (
    <main className="pt-32">
      <section className="marble-light py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <span className="eyebrow">Life at Zia Maria</span>
          <h1 className="display-heading mt-3 text-4xl text-ink md:text-6xl">
            Stories & Events in Friedrichshain, Berlin
          </h1>
        </div>
      </section>

      <section className="marble-light pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="mb-10 text-center">
            <span className="eyebrow">From the Journal</span>
            <h2 className="display-heading mt-3 text-3xl text-ink md:text-5xl">
              Notes on Roman Pizza and Life at Zia Maria
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <a
                key={post.slug}
                href={`${basePath}/blog/${post.slug}/`}
                className="flex flex-col rounded-2xl border border-ink/10 bg-white/50 p-6 transition-colors hover:border-wine/40"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
                  {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  {' '}&middot; {post.readTime}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{post.excerpt}</p>
                <span className="mt-4 font-mono text-xs uppercase tracking-widest text-wine">Read more &rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="marble-light pb-24 md:pb-32">
        <div className="mx-auto mb-12 max-w-4xl px-6 text-center md:px-10">
          <span className="eyebrow">Events</span>
          <h2 className="display-heading mt-3 text-3xl text-ink md:text-5xl">
            What&rsquo;s Happening at Zia Maria
          </h2>
        </div>
        <div className="mx-auto max-w-4xl space-y-20 px-6 md:px-10">
          {events.map((ev) => (
            <article key={ev.slug} id={ev.slug} className="scroll-mt-28">
              <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-wine/15 via-cream to-sand/25 md:h-96">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="text-wine/25">
                  <path d="M12 2 2 20h20L12 2z" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </div>
              <h2 className="display-heading mt-8 text-3xl text-ink md:text-4xl">{ev.title}</h2>
              <p className="mt-4 font-body leading-relaxed text-ink/70">{ev.long}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
