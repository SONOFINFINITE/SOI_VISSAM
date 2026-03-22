// src/pages/promotions/PromotionsPage.tsx
import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { promotions, promoProducts } from '../../shared/data/promotions';
import { PromotionsSlider } from './ui/PromotionsSlider';
import { ProductCard } from '../../widgets/ProductCard/ProductCard';
import s from './ui/PromotionsPage.module.scss';

export function PromotionsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const activePromo = promotions[activeIndex];
  // Filter products for the active promotion
  const products = activePromo ? activePromo.productIds.map(id => promoProducts[id]).filter(Boolean) : [];

  const productsGridRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    if (containerRef.current) {
      gsap.fromTo(gsap.utils.selector(containerRef)('.hero-title-char'), 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.05, ease: 'power4.out', delay: 0.2 }
      );
    }
  }, []);

  const renderTitle = (title: string) => {
    return title.split(' ').map((word, wIdx) => (
      <span key={wIdx} className={s.titleWord}>
        {word.split('').map((char, cIdx) => (
          <span 
            key={cIdx} 
            className="hero-title-char" 
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {char}
          </span>
        ))}
      </span>
    ));
  };

  useGSAP(() => {
    if (productsGridRef.current && productsGridRef.current.children.length > 0) {
      gsap.fromTo(
        productsGridRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)', clearProps: 'all', delay: 0.2 }
      );
    }
  }, [activeIndex]);

  return (
    <>
      <Header />
      <main className={s.promotionsPage} ref={containerRef}>
        
        {promotions.length === 0 ? (
          <div className={s.emptyState}>
            <h1>В данный момент акций нет</h1>
            <p>Загляните позже за новыми предложениями!</p>
          </div>
        ) : (
          <>
            <div className={s.heroHeader}>
              <h1 className={s.magTitle}>
                {renderTitle('АКЦИИ')}
              </h1>
            </div>

            <PromotionsSlider 
              promotions={promotions}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />

            <section className={s.productsSection}>
              <div className={s.container}>
                <div className={s.header}>
                  <h2 className={s.title}>
                    Товары
                    <span className={s.count}>{products.length}</span>
                  </h2>
                </div>

                <div className={s.grid} ref={productsGridRef}>
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      discountPercentage={activePromo.discountPercentage}
                    />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
