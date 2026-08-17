// Shared helper for building a page's metadata export. Centralizing this
// keeps canonical + Open Graph + Twitter fields consistent and page-specific
// across every route, instead of silently inheriting the homepage's values
// (Next.js does not deep-merge `openGraph`/`alternates` from the root layout
// once a page defines its own metadata object, so each page needs its own
// complete, explicit values).
const SITE_NAME = 'Zia Maria';
const DEFAULT_IMAGE = '/images/home.jpg';

export function pageMetadata({ title, description, path, image = DEFAULT_IMAGE }) {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
