import { useState, useRef, useMemo, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { catalogProducts } from '../../shared/data/products';
import { CatalogFilters } from './ui/CatalogFilters';
import { ProductCard } from '../../widgets/ProductCard/ProductCard';
import { useFilterStore } from '../../shared/store/useFilterStore';
import { ChevronDown, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import s from './CatalogPage.module.scss';

export function CatalogPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const {
    activeCategory, setActiveCategory,
    activeCollection, setActiveCollection,
    activeAvailability,
    priceRange,
    sortBy, setSortBy,
    currentPage, setCurrentPage
  } = useFilterStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 9;

  // Handle URL params on mount or when searchParams change
  useEffect(() => {
    const collParam = searchParams.get('collection');
    const catParam = searchParams.get('category');
    let hasChanged = false;

    if (collParam) {
      setActiveCollection(collParam);
      hasChanged = true;
    }
    if (catParam) {
      setActiveCategory(catParam);
      hasChanged = true;
    }

    if (hasChanged) {
      navigate('/catalog/', { replace: true });
    }
  }, [searchParams, setActiveCollection, setActiveCategory, navigate]);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterOpen]);

  const sortOptions = [
    { id: 'default', label: 'По умолчанию' },
    { id: 'sale', label: 'Сначала акции' },
    { id: 'price-asc', label: 'Сначала недорогие' },
    { id: 'price-desc', label: 'Сначала дорогие' },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return catalogProducts.filter(p => {
      const matchesCategory = activeCategory ? p.category === activeCategory : true;
      const matchesCollection = activeCollection ? p.collection === activeCollection : true;

      let matchesAvailability = true;
      if (activeAvailability === 'in-stock') matchesAvailability = p.inStock;
      if (activeAvailability === 'on-order') matchesAvailability = !p.inStock;

      const min = parseFloat(priceRange.min) || 0;
      const max = parseFloat(priceRange.max) || Infinity;
      const matchesPrice = p.price >= min && p.price <= max;

      return matchesCategory && matchesCollection && matchesAvailability && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'sale') {
        const aHasPromo = !!a.oldPrice;
        const bHasPromo = !!b.oldPrice;
        if (aHasPromo && !bHasPromo) return -1;
        if (!aHasPromo && bHasPromo) return 1;
        return 0;
      }
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [activeCategory, activeCollection, activeAvailability, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const displayedItems = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [filteredProducts, currentPage]);

  const catalogRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(catalogRef);

    // Title letter-by-letter animation
    gsap.fromTo(q('.catalog-title-char'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: 'power4.out',
        delay: 0.1
      }
    );

    // Fade in count badge
    gsap.fromTo(q(`.${s.catalog__count}`),
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.6, ease: 'power2.out' }
    );

    if (gridRef.current && displayedItems.length > 0) {
      gsap.fromTo(
        gridRef.current.children,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }
  }, { dependencies: [displayedItems, activeCategory], scope: catalogRef });

  const renderTitleChars = (word: string) => {
    return word.split('').map((char, index) => (
      <span
        key={`${word}-${index}`}
        className="catalog-title-char"
        style={{ display: 'inline-block', whiteSpace: 'pre' }}
      >
        {char}
      </span>
    ));
  };

  return (
    <>
      <Header />
      <main className={s.catalog} ref={catalogRef}>
        <div className={s.catalog__inner}>

          <div className={s.catalog__header}>
            <h1 className={s.catalog__title}>
              {renderTitleChars('КАТАЛОГ')}
              <span className={s.catalog__count}>{filteredProducts.length}</span>
            </h1>

            <div className={s.catalog__controls}>
              <button
                className={s.filterToggle}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={18} />
                Фильтры
              </button>

              <div className={s.sort}>
                <span className={s.sort__label}>Сортировка:</span>
                <div className={s.sort__container}>
                  <button
                    className={s.sort__select}
                    onClick={() => setIsSortOpen(!isSortOpen)}
                  >
                    <span className={s.sort__activeLabel}>
                      {sortOptions.find(opt => opt.id === sortBy)?.label}
                    </span>
                    <ChevronDown className={`${s.sort__icon} ${isSortOpen ? s['sort__icon--active'] : ''}`} size={14} />
                  </button>

                  {isSortOpen && (
                    <div className={s.sort__dropdown}>
                      {sortOptions.map(option => (
                        <button
                          key={option.id}
                          className={`${s.sort__option} ${sortBy === option.id ? s['sort__option--active'] : ''}`}
                          onClick={() => {
                            setSortBy(option.id as any);
                            setIsSortOpen(false);
                          }}
                        >
                          <div className={s.sort__radio}>
                            <div className={s.sort__radioInner} />
                          </div>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={s.catalog__layout}>
            <CatalogFilters isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
            <div className={s.grid}>
              <div className={s.grid__items} ref={gridRef}>
                {displayedItems.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className={s.pagination}>
                  <button
                    className={s.pagination__btn}
                    disabled={currentPage === 1}
                    onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    aria-label="Назад"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className={s.pagination__pages}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        className={`${s.pagination__page} ${currentPage === page ? s['pagination__page--active'] : ''}`}
                        onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    className={s.pagination__btn}
                    disabled={currentPage === totalPages}
                    onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    aria-label="Вперед"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
