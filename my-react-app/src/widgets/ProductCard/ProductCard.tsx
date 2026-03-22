import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../shared/store/useCartStore';
import { useFavoritesStore } from '../../shared/store/useFavoritesStore';
import type { Product } from '../../shared/data/products';
import s from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  /** Pass a discount percentage for promo cards */
  discountPercentage?: number;
}

export function ProductCard({ product, discountPercentage }: ProductCardProps) {
  const addToCart = useCartStore(state => state.addItem);
  const removeFromCart = useCartStore(state => state.removeItem);
  const cartItems = useCartStore(state => state.items);
  
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
  const favoritesItems = useFavoritesStore(state => state.items);

  const isItemInCart = cartItems.some(i => i.id === product.id);
  const isItemFavorite = favoritesItems.some(i => i.id === product.id);

  let displayDiscount = discountPercentage;
  if (!displayDiscount && product.oldPrice && product.oldPrice > product.price) {
    displayDiscount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }

  return (
    <div className={s.productCard}>
      <div className={s.productCard__imageWrap}>
        <Link to={`/product/${product.id}`} className={s.productCard__imageLink} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className={`${s.productCard__badges} ${ (displayDiscount || product.isNew) ? s['productCard__badges--multiple'] : '' }`}>
            {displayDiscount ? (
              <span className={s.productCard__promoBadge}>-{displayDiscount}%</span>
            ) : product.isNew ? (
              <span className={s.productCard__badge}>Новинка</span>
            ) : null}
            
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
                  <span className={s.status__text}>
                    Под заказ
                    <span className={s.status__suffix}> до 30 дней</span>
                  </span>
                </div>
              )}
            </div>
          </div>
          <img src={product.image} alt={product.name} />
        </Link>
        
        <button
          className={`${s.productCard__favoriteBtn} ${isItemFavorite ? s['productCard__favoriteBtn--active'] : ''}`}
          onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
          aria-label={isItemFavorite ? 'Убрать из избранного' : 'В избранное'}
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
          className={`${s.productCard__cartBtn} ${isItemInCart ? s['productCard__cartBtn--added'] : ''}`}
          onClick={() => {
            if (isItemInCart) {
              const itemInCart = cartItems.find(i => i.id === product.id);
              removeFromCart(product.id, itemInCart?.selectedColor);
            } else {
              const defaultColor = product.colors?.find(c => c.stockCount > 0)?.name || product.colors?.[0]?.name;
              addToCart(product, 1, defaultColor);
            }
          }}
        >
          {isItemInCart ? (
            <><ShoppingCart size={16} /> В корзине</>
          ) : 'В корзину'}
        </button>
      </div>
    </div>
  );
}
