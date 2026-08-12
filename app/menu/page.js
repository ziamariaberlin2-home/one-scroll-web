import MenuSection from '@/components/MenuSection';

export const metadata = {
  title: 'Menu, Roman Pizza in Friedrichshain, Berlin',
  description: 'Explore the Zia Maria menu: fresh Roman-style pizza, salads, and drinks in the heart of Friedrichshain, Berlin. Vegetarian and vegan options available.',
};

export default function MenuPage() {
  return (
    <main className="pt-24">
      <MenuSection />
    </main>
  );
}
