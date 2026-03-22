import { useParams, Link } from 'react-router-dom';
import { useMemo, useRef, useState } from 'react';
import { catalogProducts } from '../../shared/data/products';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { ProductGallery } from './ui/ProductGallery';
import { ProductInfo } from './ui/ProductInfo';
import { ProductSpecs } from './ui/ProductSpecs';
import { ProductTabs } from './ui/ProductTabs';
import { RelatedProducts } from './ui/RelatedProducts';
import s from './ui/ProductPage.module.scss';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronRight } from 'lucide-react';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [activeAccordionTab, setActiveAccordionTab] = useState<string | null>('fullSpecs');

  const product = useMemo(() => {
    return catalogProducts.find(p => p.id === id);
  }, [id]);

  const availableColors = product?.colors || [];
  const firstAvailable = availableColors.find(c => c.stockCount > 0)?.name || availableColors[0]?.name || 'Стандарт';
  const [selectedColor, setSelectedColor] = useState(firstAvailable);

  const related = useMemo(() => {
    if (!product) return [];
    return [...catalogProducts]
      .filter(p => p.id !== product.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }, [product]);

  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pageRef.current) return;
    gsap.fromTo(pageRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, [id]);

  const handleOpenFullSpecs = () => {
    setActiveAccordionTab('fullSpecs');
    const el = document.getElementById('full-specs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (!product) {
    return (
      <>
        <Header />
        <main className={s.notFound}>
          <h1>Товар не найден</h1>
          <Link to="/catalog" className={s.backBtn}>В каталог</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={s.productPage} ref={pageRef}>
        <div className={s.container}>
          <nav className={s.breadcrumbs}>
            <Link to="/">Главная</Link>
            <ChevronRight size={14} />
            <Link to="/catalog">Каталог</Link>
            {product.collection && (
              <>
                <ChevronRight size={14} />
                <span>{product.collection}</span>
              </>
            )}
            <ChevronRight size={14} />
            <span className={s.current}>{product.name}</span>
          </nav>

          <div className={s.mainSection}>
            <div className={s.galleryCol}>
              <ProductGallery image={product.image} name={product.name} />
            </div>
            <div className={s.infoCol}>
              <div className={s.rightInfoWrapper}>
                <ProductInfo 
                  product={product} 
                  selectedColor={selectedColor} 
                  onColorChange={setSelectedColor} 
                />
                <ProductSpecs 
                  product={product} 
                  selectedColor={selectedColor}
                  onShowMore={handleOpenFullSpecs} 
                />
              </div>
            </div>
          </div>

          <div className={s.fullWidthTabs}>
            <ProductTabs 
              product={product} 
              activeTab={activeAccordionTab} 
              onTabChange={setActiveAccordionTab} 
            />
          </div>

          <section className={s.relatedSection}>
            <h2 className={s.relatedTitle}>Вам также может понравиться</h2>
            <RelatedProducts products={related} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
