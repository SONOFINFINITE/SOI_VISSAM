import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import s from './ProductPage.module.scss';
import type { Product } from '../../../shared/data/products';
import { useCartStore } from '../../../shared/store/useCartStore';
import { useFavoritesStore } from '../../../shared/store/useFavoritesStore';

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const addToCart = useCartStore(state => state.addItem);
  const removeFromCart = useCartStore(state => state.removeItem);
  const cartItems = useCartStore(state => state.items);
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
  const favoritesItems = useFavoritesStore(state => state.items);

  const isItemInCart = (id: string) => cartItems.some(i => i.id === id);
  const isItemFavorite = (id: string) => favoritesItems.some(i => i.id === id);

  return (
    <div className={s.relatedGrid}>
      {products.map(product => (
        <div key={product.id} className={s.productCard}>
          <div className={s.productCard__imageWrap}>
            <Link to={`/product/${product.id}`} className={s.productCard__imageLink} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className={s.productCard__badges}>
                {product.isNew && <span className={s.productCard__badge}>Новинка</span>}
                <div className={s.productCard__status}>
                  {product.inStock ? (
                    <div className={`${s.status} ${s['status--in-stock']}`}>
                      <span className={s.status__dot}></span>
                      <span className={s.status__text}>
                        В наличии: {product.stockCount || 0}
                      </span>
                    </div>
                  ) : (
                    <div className={`${s.status} ${s['status--on-order']}`}>
                      <span className={s.status__dot}></span>
                      <span className={s.status__text}>Под заказ до 30 дней</span>
                    </div>
                  )}
                </div>
              </div>

              <img src={product.image} alt={product.name} />
            </Link>
            
            <button
              className={`${s.productCard__favoriteBtn} ${isItemFavorite(product.id) ? s['productCard__favoriteBtn--active'] : ''}`}
              onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
              aria-label={isItemFavorite(product.id) ? 'Убрать из избранного' : 'В избранное'}
            >
              <Heart size={20} />
            </button>
          </div>
          <div className={s.productCard__info}>
            <span className={s.productCard__category}>Арт. {product.sku} | {product.category}</span>
            <Link to={`/product/${product.id}`} className={s.productCard__nameLink} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <h3 className={s.productCard__name}>{product.name}</h3>
            </Link>

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
              className={`${s.productCard__cartBtn} ${isItemInCart(product.id) ? s['productCard__cartBtn--added'] : ''}`}
              onClick={() => {
                if (isItemInCart(product.id)) {
                  const itemInCart = cartItems.find(i => i.id === product.id);
                  removeFromCart(product.id, itemInCart?.selectedColor);
                } else {
                  const defaultColor = product.colors?.find(c => c.stockCount > 0)?.name || product.colors?.[0]?.name;
                  addToCart(product, 1, defaultColor);
                }
              }}
            >
              {isItemInCart(product.id) ? (
                <><ShoppingCart size={16} /> В корзине</>
              ) : 'В корзину'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
