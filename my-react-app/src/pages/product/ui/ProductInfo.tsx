import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './ProductPage.module.scss';
import type { Product } from '../../../shared/data/products';
import { useCartStore } from '../../../shared/store/useCartStore';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface ProductInfoProps {
  product: Product;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export function ProductInfo({ product, selectedColor, onColorChange }: ProductInfoProps) {
  const navigate = useNavigate();
  const addToCart = useCartStore(state => state.addItem);
  const cartItems = useCartStore(state => state.items);
  const [quantity, setQuantity] = useState(1);

  const availableColors = product.colors || [];

  const inCart = cartItems.some(item => item.id === product.id && item.selectedColor === selectedColor);

  const selectedColorData = availableColors.find(c => c.name === selectedColor);
  const baseStock = selectedColorData ? selectedColorData.stockCount : (product.stockCount || 0);
  const totalPrice = product.price * quantity;
  const totalOldPrice = product.oldPrice ? product.oldPrice * quantity : undefined;

  return (
    <div className={s.productInfoMain}>
      <h1 className={s.productTitle}>{product.name}</h1>

      <div className={s.infoGroup}>
        <div className={s.priceBlock}>
          <div className={s.priceWrapper}>
            <span className={s.mainPrice}>{totalPrice.toLocaleString('ru-RU')} ₽</span>
            {totalOldPrice && <span className={s.oldPrice}>{totalOldPrice.toLocaleString('ru-RU')} ₽</span>}
          </div>
          {baseStock > 0 ? (
            <div className={s.stockStatus}>
              <span className={s.stockDot} />
              В наличии: {baseStock}
            </div>
          ) : (
            <div className={`${s.stockStatus} ${s['status--on-order']}`}>
              <span className={s.stockDot} style={{ background: '#e31e24', boxShadow: '0 0 6px rgba(227,30,36,0.4)' }} />
              <span style={{ color: '#e31e24' }}>Под заказ до 30 дней</span>
            </div>
          )}
        </div>

        {availableColors.length > 0 && (
          <div className={s.colorSelectText}>
            <label>ЦВЕТ:</label>
            <div className={s.colorButtons}>
              {availableColors.map(color => (
                <button 
                  key={color.name}
                  className={`${s.colorBtn} ${selectedColor === color.name ? s.colorBtnActive : ''}`}
                  onClick={() => onColorChange(color.name)}
                  title={`В наличии: ${color.stockCount}`}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={s.purchaseBlock}>
          <label className={s.blockLabel}>КОЛИЧЕСТВО:</label>
          <div className={s.purchaseActions}>
            <div className={s.qtyWrapper}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
            </div>
            
            <button 
              className={`${s.cartButton} ${inCart ? s.inCart : ''}`}
              onClick={() => inCart ? navigate('/cart') : addToCart(product, quantity, selectedColor)}
            >
              {inCart ? (
                <><ShoppingCart size={18} /> В КОРЗИНЕ</>
              ) : 'В КОРЗИНУ'}
            </button>
          </div>
        </div>


      </div>
    </div>
  );
}
