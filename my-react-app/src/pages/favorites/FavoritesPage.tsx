import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { useFavoritesStore } from '../../shared/store/useFavoritesStore';
import { useCartStore } from '../../shared/store/useCartStore';
import s from './FavoritesPage.module.scss';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function FavoritesPage() {
  const items = useFavoritesStore((state) => state.items);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  const addToCart = useCartStore((state) => state.addItem);
  const isInCart = useCartStore((state) => state.isInCart);

  const isEmpty = items.length === 0;
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      gsap.fromTo(gsap.utils.selector(containerRef)('.hero-title-char'), 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.05, ease: 'power4.out', delay: 0.2 }
      );
    }
  }, []);

  const renderTitle = (title: string, count?: number) => {
    const words = title.split(' ');
    return (
      <>
        {words.map((word, wIdx) => (
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
        ))}
        {count !== undefined && count > 0 && (
          <span className={s.favorites__countBadge}>{count}</span>
        )}
      </>
    );
  };

  return (
    <>
      <Header />
      <main className={s.favorites} ref={containerRef}>
        <div className={s.favorites__inner}>

          <div className={s.heroHeader}>
            <h1 className={s.magTitle}>
              {renderTitle('ИЗБРАННОЕ', items.length)}
            </h1>
          </div>

          <div className={s.favorites__header}>
            <Link to="/catalog" className={s.favorites__back}>
              <ArrowLeft size={18} />
              Назад в каталог
            </Link>
            {!isEmpty && (
              <button
                className={s.favorites__clearBtn}
                onClick={clearFavorites}
              >
                Очистить всё
              </button>
            )}
          </div>

          {isEmpty ? (
            <div className={s.empty}>
              <div className={s.empty__icon}>
                <Heart size={64} strokeWidth={1} />
              </div>
              <h2 className={s.empty__title}>Список избранного пуст</h2>
              <p className={s.empty__text}>
                Нажмите на иконку сердечка на карточке товара, чтобы сохранить его здесь
              </p>
              <Link to="/catalog" className={s.empty__btn}>
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <div className={s.grid}>
              {items.map((product) => (
                <div key={product.id} className={s.productCard}>
                  <div className={s.productCard__imageWrap}>
                    {product.isNew && (
                      <span className={s.productCard__badge}>Новинка</span>
                    )}

                    <button
                      className={s.productCard__removeBtn}
                      onClick={() => removeFavorite(product.id)}
                      aria-label="Убрать из избранного"
                    >
                      <Trash2 size={16} />
                    </button>

                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className={s.productCard__info}>
                    <span className={s.productCard__category}>Арт. {product.sku} | {product.category}</span>
                    <h3 className={s.productCard__name}>{product.name}</h3>

                    <div className={s.productCard__priceRow}>
                      <span className={s.productCard__price}>
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      {product.oldPrice && (
                        <span className={s.productCard__oldPrice}>
                          {product.oldPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      )}
                    </div>

                    <button
                      className={`${s.productCard__cartBtn} ${isInCart(product.id) ? s['productCard__cartBtn--added'] : ''}`}
                      onClick={() => {
                        if (!isInCart(product.id)) {
                          const defaultColor = product.colors?.find(c => c.stockCount > 0)?.name || product.colors?.[0]?.name;
                          addToCart(product, 1, defaultColor);
                        }
                      }}
                    >
                      <ShoppingCart size={16} />
                      {isInCart(product.id) ? 'В корзине' : 'В корзину'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
