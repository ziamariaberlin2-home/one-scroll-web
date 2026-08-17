import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost } from '@/lib/blogData';
import { pageMetadata } from '@/lib/seo';
import { basePath } from '@/lib/basePath';

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
          <a href={`${basePath}/blog/`} className="font-mono text-xs uppercase tracking-widest text-wine hover:text-wine-dark">
            &larr; Blog &amp; Events
          </a>

          <div className="mt-6 text-center">
            <span className="eyebrow">Zia Maria Journal</span>
            <h1 className="display-heading mt-3 text-4xl text-ink md:text-6xl">{post.title}</h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink/40">
              {formattedDate} &middot; {post.readTime}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl space-y-5 font-body leading-relaxed text-ink/75">
            {post.body.map((block, i) =>
              block.type === 'h2' ? (
                <h2 key={i} className="display-heading pt-4 text-2xl text-ink md:text-3xl">
                  {block.text}
                </h2>
              ) : (
                <p key={i}>{block.text}</p>
              )
            )}
          </div>

          <div className="mx-auto mt-14 max-w-2xl border-t border-ink/10 pt-8 text-center">
            <p className="font-body text-ink/70">Hungry for the real thing?</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a href={`${basePath}/menu/`} className="btn-pill-wine">View the Menu</a>
              <a href={`${basePath}/order/`} className="btn-pill-dark">Order Online</a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
