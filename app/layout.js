import '@fontsource/dosis/400.css';
import '@fontsource/dosis/500.css';
import '@fontsource/dosis/600.css';
import '@fontsource/dosis/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import QuickContact from '@/components/QuickContact';
import FloatingCartBar from '@/components/FloatingCartBar';
import AuntZiaSuggests from '@/components/AuntZiaSuggests';
import { CartProvider } from '@/lib/cart';
import { basePath } from '@/lib/basePath';
import { buildMenuJsonLd } from '@/lib/menuData';

export const metadata = {
  metadataBase: new URL('https://www.ziamariaberlin.com'),
  title: {
    default: 'Zia Maria – Roman Pizza in the Heart of Berlin',
    template: '%s | Zia Maria',
  },
  description: 'Zia Maria, fresh Roman pizza in the heart of Friedrichshain, Berlin. Catering, business lunch for your team, private events, and a table for everyone.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Zia Maria – Roman Pizza in the Heart of Berlin',
    description: 'Fresh, Roman-style pizza in the heart of Berlin. Catering, business lunch for your team, and private events.',
    url: 'https://www.ziamariaberlin.com/',
    siteName: 'Zia Maria',
    images: ['/images/home.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zia Maria – Roman Pizza in the Heart of Berlin',
    description: 'Fresh, Roman-style pizza in the heart of Berlin. Catering, business lunch for your team, and private events.',
    images: ['/images/home.jpg'],
  },
  icons: {
    icon: `${basePath}/images/zia-maria-logo.png`,
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Zia Maria',
  url: 'https://www.ziamariaberlin.com/',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Zia Maria',
  description: 'Fresh Roman-style pizza in the heart of Friedrichshain, Berlin. Catering, business lunch, and private events.',
  servesCuisine: ['Italian', 'Roman Pizza', 'Pizza'],
  image: 'https://www.ziamariaberlin.com/images/home.jpg',
  url: 'https://www.ziamariaberlin.com/',
  telephone: '+49-176-27705583',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Neue Bahnhofstraße 32',
    addressLocality: 'Berlin',
    addressRegion: 'Friedrichshain',
    postalCode: '10245',
    addressCountry: 'DE',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday'], opens: '12:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Thursday', 'Friday', 'Saturday'], opens: '12:00', closes: '23:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '12:00', closes: '22:00' },
  ],
  sameAs: ['https://www.instagram.com/ziamaria.fhain/'],
  hasMenu: buildMenuJsonLd(),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CartProvider>
          <Nav />
          {children}
          <Footer />
          <QuickContact />
          <FloatingCartBar />
          <AuntZiaSuggests />
        </CartProvider>
      </body>
    </html>
  );
}
