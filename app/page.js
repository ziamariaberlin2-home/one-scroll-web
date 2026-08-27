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

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <Gallery />
      <MenuTeaser />
      <ReviewsSection />
      <CateringSection />
      <WhyChoose />
      <EventsSection />
      <FAQSection />
      <section className="marble-light pb-4 text-center">
        <a href="#catering-form" className="btn-pill-wine">Planning an Event? Get a Quote</a>
      </section>
      <CateringForm />
      <ReserveSection />
      <LocationsSection />
    </main>
  );
}
