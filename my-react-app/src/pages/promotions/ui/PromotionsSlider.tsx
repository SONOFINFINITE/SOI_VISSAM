import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Promotion } from '../../../shared/data/promotions';
import s from './PromotionsPage.module.scss';

interface PromotionsSliderProps {
  promotions: Promotion[];
  activeIndex: number;
  setActiveIndex: (index: number | ((prev: number) => number)) => void;
}

export function PromotionsSlider({ promotions, activeIndex, setActiveIndex }: PromotionsSliderProps) {
  const slideTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (slideTextRef.current) {
      gsap.fromTo(
        slideTextRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
      );
    }
  }, [activeIndex]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % promotions.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  useEffect(() => {
    if (promotions.length <= 1) return;
    const interval = setInterval(nextSlide, 10000); // 10 seconds as requested
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={s.sliderSection}>
      {promotions.map((promo, idx) => (
        <div key={promo.id} className={`${s.slide} ${idx === activeIndex ? s.active : ''}`}>
          <div className={s.slide__bg}>
            <img src={promo.image} alt={promo.title} />
          </div>
          
          <div className={s.slide__content} ref={idx === activeIndex ? slideTextRef : null}>
            <div className={s.slide__badge}>-{promo.discountPercentage}% Скидка</div>
            <h1 className={s.slide__title}>{promo.title}</h1>
            <div className={s.slide__desc}>{promo.description}</div>
            <div className={s.slide__dates}>{promo.dates}</div>
          </div>
        </div>
      ))}

      {promotions.length > 1 && (
        <>
          <div className={s.sliderControls}>
            <button onClick={prevSlide} aria-label="Предыдущая акция">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} aria-label="Следующая акция">
              <ChevronRight size={24} />
            </button>
          </div>
          <div className={s.sliderDots}>
            {promotions.map((_, idx) => (
              <button 
                key={idx} 
                className={idx === activeIndex ? s.active : ''}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
