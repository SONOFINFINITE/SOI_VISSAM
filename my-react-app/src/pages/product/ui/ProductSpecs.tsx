import type { Product } from '../../../shared/data/products';
import s from './ProductPage.module.scss';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

interface ProductSpecsProps {
  product: Product;
  selectedColor: string;
  onShowMore: () => void;
}

export function ProductSpecs({ product, selectedColor, onShowMore }: ProductSpecsProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const selectedVariant = product.colors?.find(c => c.name === selectedColor);
  const currentSku = selectedVariant ? selectedVariant.sku : product.sku;

  useGSAP(() => {
    if (!listRef.current) return;
    gsap.fromTo(listRef.current.children, 
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
    );
  }, [product.id, selectedColor]);

  return (
    <div className={s.quickSpecsTable}>
      <ul className={s.specsList} ref={listRef}>
        <li><span>Артикул:</span> <span>{currentSku}</span></li>
        {product.quickSpecs?.map((spec, idx) => (
          <li key={idx}><span>{spec.label}:</span> <span>{spec.value}</span></li>
        ))}
      </ul>
      <button className={s.allSpecsLink} onClick={onShowMore}>Все характеристики</button>
    </div>
  );
}
