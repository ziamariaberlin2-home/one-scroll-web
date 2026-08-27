import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost } from '@/lib/blogData';
import { pageMetadata } from '@/lib/seo';
import { basePath } from '@/lib/basePath';
import PizzaCalculator from '@/components/PizzaCalculator';

function BlogBlock({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="display-heading pt-4 text-2xl text-wine/90 md:text-3xl">{block.text}</h2>
      );
    case 'callout':
      return (
        <div className="rounded-2xl border border-dashed border-wine/40 bg-white/50 px-6 py-5 text-center">
          <p className="display-heading text-2xl text-wine md:text-3xl">{block.title}</p>
          {block.text && <p className="mt-1 text-sm text-ink/60">{block.text}</p>}
        </div>
      );
    case 'table':
      return (
        <div className="overflow-hidden rounded-2xl border border-ink/10">
          <table className="w-full text-center text-sm">
            <thead>
              <tr className="bg-ink text-cream">
                {block.headers.map((h) => (
                  <th key={h} className="px-4 py-3 font-mono text-xs uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-cream' : 'bg-white/60'}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2.5 text-ink/80">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'tips':
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {block.items.map((tip) => (
            <div key={tip.title} className="card-3d card-pop hover-line-wine rounded-xl border border-ink/10 bg-white/50 p-4 text-left transition-colors hover:border-wine/30">
              <p className="font-display text-sm font-semibold text-ink">{tip.title}</p>
              <p className="mt-1 text-sm text-ink/60">{tip.text}</p>
            </div>
          ))}
        </div>
      );
    case 'calculator':
      return <PizzaCalculator />;
    default:
      return <p>{block.text}</p>;
  }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
  });
}

export default function BlogPostPage({ params }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'Zia Maria' },
    publisher: { '@type': 'Organization', name: 'Zia Maria' },
    mainEntityOfPage: `https://www.ziamariaberlin.com/blog/${post.slug}/`,
  };

  const formattedDate = new Date(post.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="marble-light pb-24 pt-8 md:pb-32">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <a href={`${basePath}/blog/`} className="font-mono text-xs uppercase tracking-widest text-wine-dark hover:text-wine-dark">
            &larr; Blog &amp; Events
          </a>

          <div className="mt-6 text-center">
            <span className="eyebrow">Zia Maria Journal</span>
            <h1 className="display-heading mt-3 text-4xl text-wine/90 md:text-6xl">{post.title}</h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink/40">
              {formattedDate} &middot; {post.readTime}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl space-y-5 font-body leading-relaxed text-ink/75">
            {post.body.map((block, i) => (
              <BlogBlock key={i} block={block} />
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-2xl border-t border-ink/10 pt-8 text-center">
            <p className="font-body text-ink/70">Hungry for the real thing?</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a href={`${basePath}/menu/`} className="btn-pill-dark">View the Menu</a>
              <a href={`${basePath}/order/`} className="btn-pill-wine">Order Online</a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
