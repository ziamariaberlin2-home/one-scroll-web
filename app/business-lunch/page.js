import BusinessLunchContent from '@/components/BusinessLunchContent';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Business Lunch for Teams in Friedrichshain, Berlin',
  description: 'Fresh, Roman-style pizza lunch sets for offices and teams in the heart of Friedrichshain, Berlin. Order ahead or set up a standing weekly order.',
  path: '/business-lunch/',
});

export default function BusinessLunchPage() {
  return (
    <main className="pt-32">
      <BusinessLunchContent />
    </main>
  );
}
