import { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { catalogProducts, type Product } from '../../shared/data/products';
import { collections, type Collection } from '../../shared/data/collections';
import s from './SearchOverlay.module.scss';

gsap.registerPlugin(useGSAP);

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ products: Product[], collections: Collection[] }>({ products: [], collections: [] });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // document.body.style.overflow = 'hidden'; // Header already manages overflow if needed, but let's do it safely
      document.body.classList.add('no-scroll');
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.classList.remove('no-scroll');
      setTimeout(() => {
        setQuery('');
        setResults({ products: [], collections: [] });
      }, 300);
    }
    return () => { document.body.classList.remove('no-scroll'); };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const lowerQuery = query.toLowerCase();
      const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 0);
      
      // Phonetic/Transliteration mappings for collections
      const collectionMappings: Record<string, string[]> = {
        'art-deco': ['арт деко', 'артдеко', 'арт-деко'],
        'soho': ['сохо'],
        'manhattan': ['манхэттен', 'манхеттен', 'манхэттэн'],
        'bryce': ['брайс'],
        'dalton': ['далтон'],
        'florence': ['флоренс'],
        'gven': ['гвен'],
        'maranta': ['маранта'],
        'nice': ['найс', 'ницца', 'найсе'],
        'oldem': ['олдем'],
        'sydney': ['сидней']
      };

      const matchedProducts = catalogProducts.filter(p => {
        const searchPool = [
          p.name,
          p.sku,
          p.category,
          p.collection || '',
          ...(p.colors?.map(c => `${c.name} ${c.sku}`) || [])
        ].join(' ').toLowerCase();

        // Check if all query words are present in the search pool or mapping
        return queryWords.every(word => {
          // Direct match
          if (searchPool.includes(word)) return true;
          
          // Check if the word is a phonetic match for the product's collection
          if (p.collection) {
            const collKey = p.collection.toLowerCase();
            const mappings = collectionMappings[collKey];
            if (mappings && mappings.some(m => m.includes(word) || word.includes(m))) return true;
          }

          return false;
        });
      }).slice(0, 8);
      
      const matchedCollections = collections.filter(c => {
        const searchPool = (c.name + ' ' + c.description).toLowerCase();
        const collKey = c.id.toLowerCase();
        const mappings = collectionMappings[collKey];

        return queryWords.every(word => {
          if (searchPool.includes(word)) return true;
          if (mappings && mappings.some(m => m.includes(word) || word.includes(m))) return true;
          return false;
        });
      }).slice(0, 3);
      
      setResults({ products: matchedProducts, collections: matchedCollections });
    } else {
      setResults({ products: [], collections: [] });
    }
  }, [query]);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(containerRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
    } else {
      gsap.to(containerRef.current, { y: '-10%', opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [isOpen]);

  return (
    <div 
      ref={containerRef} 
      className={`${s.searchOverlay} ${isOpen ? s.isOpen : ''}`}
      style={{ transform: 'translateY(-10%)', opacity: 0 }}
    >
      <div className={s.searchOverlay__inner}>
        <div className={s.searchOverlay__header}>
          <div className={s.searchOverlay__inputWrapper}>
            <Search className={s.searchOverlay__icon} size={24} />
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Поиск по каталогу (название, артикул)..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={s.searchOverlay__input}
            />
          </div>
          <button className={s.searchOverlay__close} onClick={onClose} aria-label="Закрыть поиск">
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>

        {query.trim().length > 1 && (
          <div className={s.searchOverlay__results}>
            {results.products.length === 0 && results.collections.length === 0 ? (
              <div className={s.searchOverlay__empty}>По вашему запросу ничего не найдено.</div>
            ) : (
              <>
                {results.collections.length > 0 && (
                  <div className={s.searchOverlay__section}>
                    <h3 className={s.searchOverlay__sectionTitle}>Коллекции</h3>
                    <div className={s.searchOverlay__collectionsList}>
                      {results.collections.map(c => (
                        <Link 
                          key={c.id} 
                          to={`/catalog/?collection=${encodeURIComponent(c.name)}`} 
                          className={s.searchOverlay__collectionItem}
                          onClick={onClose}
                        >
                          <img src={c.images[0]} alt={c.name} />
                          <span>Коллекция {c.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {results.products.length > 0 && (
                  <div className={s.searchOverlay__section}>
                    <h3 className={s.searchOverlay__sectionTitle}>Товары</h3>
                    <div className={s.searchOverlay__productsList}>
                      {results.products.map(p => (
                        <Link 
                          key={p.id} 
                          to={`/product/${p.id}`} 
                          className={s.searchOverlay__productItem}
                          onClick={onClose}
                        >
                          <img src={p.image} alt={p.name} className={s.searchOverlay__productImage} />
                          <div className={s.searchOverlay__productInfo}>
                            <div className={s.searchOverlay__productName}>{p.name}</div>
                            <div className={s.searchOverlay__productSku}>Арт: {p.sku}</div>
                            <div className={s.searchOverlay__productPrice}>
                              {p.price.toLocaleString('ru-RU')} ₽
                              {p.oldPrice && <span className={s.searchOverlay__oldPrice}>{p.oldPrice.toLocaleString('ru-RU')} ₽</span>}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div className={s.searchOverlay__backdrop} onClick={onClose} />
    </div>
  );
}
