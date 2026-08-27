import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Gallery from '@/components/Gallery';
import MenuTeaser from '@/components/MenuTeaser';
import ReviewsSection from '@/components/ReviewsSection';
import CateringSection from '@/components/CateringSection';
import WhyChoose from '@/components/WhyChoose';
import EventsSection from '@/components/EventsSection';
import FAQSection from '@/components/FAQSection';
import CateringForm from '@/components/CateringForm';
import ReserveSection from '@/components/ReserveSection';
import LocationsSection from '@/components/LocationsSection';
import FeatureStrip from '@/components/FeatureStrip';
import QuoteBanner from '@/components/QuoteBanner';

const HOME_FACTS = [
  'Roman-style pizza in Friedrichshain',
  'Dine-in, catering, and business lunch',
  'Vegetarian and vegan options',
  'Fresh, baked daily',
];

export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureStrip items={HOME_FACTS} />
      <Story />
      <Gallery />
      <MenuTeaser />
      <ReviewsSection />
      <CateringSection />
      <WhyChoose />
      <EventsSection />
      <FAQSection />
      <QuoteBanner
        text="Tell us the occasion, number of guests and location, we&rsquo;ll respond with a clear recommendation for quantities and menu."
        ctaText="Request a Quote"
        ctaHref="#catering-form"
      />
      <CateringForm />
      <ReserveSection />
      <LocationsSection />
    </main>
  );
}
