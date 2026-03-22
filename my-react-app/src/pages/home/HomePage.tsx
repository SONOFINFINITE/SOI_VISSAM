import { Header } from '../../widgets/Header/Header';
import { HeroSlider } from './ui/HeroSlider/HeroSlider';
import { Benefits } from './ui/Benefits/Benefits';
import { CollectionSection } from './ui/CollectionSection/CollectionSection';
import { FAQ } from './ui/FAQ/FAQ';
import { Footer } from '../../widgets/Footer/Footer';
import { collections } from '../../shared/data/collections';

export function HomePage() {
  return (
    <>
      <Header isTransparentMobile={true} />
      <HeroSlider />
      <Benefits />

      <main>
        <CollectionSection collections={collections} />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}
