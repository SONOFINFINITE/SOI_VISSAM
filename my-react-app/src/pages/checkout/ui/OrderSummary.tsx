import { useCartStore } from '../../../shared/store/useCartStore';
import s from './CheckoutPage.module.scss';

interface OrderSummaryProps {
  deliveryMethod: 'courier' | 'pickup';
}

export function OrderSummary({ deliveryMethod }: OrderSummaryProps) {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const productsSum = totalPrice();
  const deliveryCost = deliveryMethod === 'courier' ? 2500 : 0;
  const finalSum = productsSum + deliveryCost;

  const handleMouseEnter = () => {
    if (items.length > 5) {
      document.body.style.overflow = 'hidden';
    }
  };

  const handleMouseLeave = () => {
    document.body.style.overflow = '';
  };

  return (
    <div
      className={s.summary}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className={s.summaryTitle}>Ваш заказ</h2>

      <div className={s.itemList}>
        {items.map((item) => (
          <div key={item.id} className={s.item}>
            <div className={s.itemImg}>
              <img src={item.image} alt={item.name} />
            </div>
            <div className={s.itemInfo}>
              <span className={s.itemName}>{item.name}</span>
              <span className={s.itemQty}>{item.quantity} шт.</span>
            </div>
            <span className={s.itemPrice}>
              {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
            </span>
          </div>
        ))}
      </div>

      <div className={s.totals}>
        <div className={s.totalRow}>
          <span>Товаров на:</span>
          <span>{productsSum.toLocaleString('ru-RU')} руб.</span>
        </div>

        {/* НДС Simulation if needed, assuming 20% included, but I'll omit to keep it elegant or show it like image */}
        <div className={s.totalRow}>
          <span className={s.vatLabel}>
            В т.ч. НДС (20%):
          </span>
          <span className={s.vatLabel}>
            {Math.round(productsSum * 0.2 / 1.2).toLocaleString('ru-RU')} руб.
          </span>
        </div>

        <div className={s.totalRow}>
          <span>Доставка:</span>
          <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost.toLocaleString('ru-RU')} руб.`}</span>
        </div>

        <div className={`${s.totalRow} ${s.final}`}>
          <span>Итого:</span>
          <span>{finalSum.toLocaleString('ru-RU')} руб.</span>
        </div>
      </div>
    </div>
  );
}
