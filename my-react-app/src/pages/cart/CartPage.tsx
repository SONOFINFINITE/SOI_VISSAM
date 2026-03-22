import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { useCartStore } from '../../shared/store/useCartStore';
import s from './CartPage.module.scss';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const totalOldPrice = useCartStore((state) => state.totalOldPrice);
  const totalCount = useCartStore((state) => state.totalCount);

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

  const isEmpty = items.length === 0;

  return (
    <>
      <Header />
      <main className={s.cart} ref={containerRef}>
        <div className={s.cart__inner}>
          
          <div className={s.heroHeader}>
            <h1 className={s.magTitle}>
              {renderTitle('КОРЗИНА')}
              {!isEmpty && (
                <span className={s.cart__countBadge}>{totalCount()}</span>
              )}
            </h1>
          </div>

          <div className={s.cart__header}>
            <Link to="/catalog" className={s.cart__back}>
              <ArrowLeft size={18} />
              Назад в каталог
            </Link>
          </div>

          {isEmpty ? (
            <div className={s.empty}>
              <div className={s.empty__icon}>
                <ShoppingBag size={64} strokeWidth={1} />
              </div>
              <h2 className={s.empty__title}>Корзина пуста</h2>
              <p className={s.empty__text}>
                Добавьте товары из каталога и они появятся здесь
              </p>
              <Link to="/catalog" className={s.empty__btn}>
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <div className={s.cart__body}>
              <div className={s.cart__items}>
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.selectedColor || 'default'}-${index}`} className={s.cartItem}>
                    <div className={s.cartItem__imageWrap}>
                      <img src={item.image} alt={item.name} className={s.cartItem__image} />
                    </div>

                    <div className={s.cartItem__content}>
                      <div className={s.cartItem__info}>
                        <span className={s.cartItem__category}>{item.category}</span>
                        <h3 className={s.cartItem__name}>{item.name}</h3>
                        <div className={s.cartItem__meta}>
                          <span className={s.cartItem__sku}>
                            Арт. {item.colors?.find(c => c.name === item.selectedColor)?.sku || item.sku}
                          </span>
                        </div>
                      </div>

                      <div className={s.cartItem__actions}>
                        <div className={s.cartItem__qty}>
                          <button
                            className={s.cartItem__qtyBtn}
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor)}
                            aria-label="Уменьшить"
                          >
                            <Minus size={14} />
                          </button>
                          <span className={s.cartItem__qtyValue}>{item.quantity}</span>
                          <button
                            className={s.cartItem__qtyBtn}
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor)}
                            aria-label="Увеличить"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className={s.cartItem__priceBlock}>
                          {item.oldPrice && (
                            <div className={s.cartItem__discountWrap}>
                              <span className={s.cartItem__oldPrice}>
                                {(item.oldPrice * item.quantity).toLocaleString('ru-RU')} ₽
                              </span>
                              <span className={s.cartItem__discountBadge}>
                                -{Math.round((1 - item.price / item.oldPrice) * 100)}%
                              </span>
                            </div>
                          )}
                          <span className={s.cartItem__price}>
                            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      className={s.cartItem__remove}
                      onClick={() => removeItem(item.id, item.selectedColor)}
                      aria-label="Удалить"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className={s.cart__summary}>
                <div className={s.summary}>
                  <h2 className={s.summary__title}>Итого</h2>

                  <div className={s.summary__rows}>
                    <div className={s.summary__promo}>
                      <input
                        type="text"
                        placeholder="Промокод"
                        className={s.summary__promoInput}
                      />
                      <button className={s.summary__promoBtn}>Применить</button>
                    </div>

                    <div className={s.summary__row}>
                      <span className={s.summary__label}>До скидки</span>
                      <span className={s.summary__value}>
                        {totalOldPrice().toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    {totalOldPrice() > totalPrice() && (
                      <div className={s.summary__row}>
                        <span className={s.summary__label}>Скидка</span>
                        <span className={`${s.summary__value} ${s.summary__value_discount}`}>
                          - {(totalOldPrice() - totalPrice()).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    )}
                    <div className={s.summary__row}>
                      <span className={s.summary__label}>Итого</span>
                      <span className={s.summary__value}>
                        {totalPrice().toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>

                  <div className={s.summary__total}>
                    <span>К оплате</span>
                    <span className={s.summary__totalPrice}>
                      {totalPrice().toLocaleString('ru-RU')} ₽
                    </span>
                  </div>

                  <Link to="/checkout" className={s.summary__orderBtn}>
                    Оформить заказ
                  </Link>

                  <button
                    className={s.summary__clearBtn}
                    onClick={clearCart}
                  >
                    Очистить корзину
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
