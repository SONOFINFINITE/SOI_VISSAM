import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../shared/store/useCartStore';
import { useAuthStore } from '../../shared/store/useAuthStore';
import type { Order } from '../../shared/data/testUser';
import s from './ui/CheckoutPage.module.scss';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { CheckoutForm } from './ui/CheckoutForm';
import { OrderSummary } from './ui/OrderSummary';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const { isAuthenticated, addOrder, setAuthModalOpen } = useAuthStore();

  const isEmpty = items.length === 0;
  const [isSuccess, setIsSuccess] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'pickup'>('courier');

  const containerRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current && !isEmpty && !isSuccess) {
      gsap.fromTo(gsap.utils.selector(containerRef)('.hero-title-char'), 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.05, ease: 'power4.out', delay: 0.2 }
      );
    }
  }, [isEmpty, isSuccess]);

  useGSAP(() => {
    if (isSuccess && successRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(gsap.utils.selector(successRef)('.success-icon'),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
      );

      tl.fromTo(gsap.utils.selector(successRef)('.hero-title-char'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power4.out' },
        "-=0.5"
      );

      tl.fromTo(gsap.utils.selector(successRef)('.success-text'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        "-=0.3"
      );

      tl.fromTo(gsap.utils.selector(successRef)('.success-action'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        "-=0.5"
      );
    }
  }, [isSuccess]);

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

  const handleCheckoutSubmit = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }

    const orderTotal = totalPrice();
    const deliveryCost = deliveryMethod === 'courier' ? 2500 : 0;
    const finalSum = orderTotal + deliveryCost;
    
    // Format date like '21 Марта 2026'
    const dateStr = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).replace(' г.', '');

    const newOrder: Order = {
      id: `VS-${Math.floor(Math.random() * 9000) + 1000}`,
      date: dateStr,
      status: 'В обработке',
      type: 'active',
      total: `${finalSum.toLocaleString('ru-RU')} ₽`,
      items: items.reduce((acc, i) => acc + i.quantity, 0)
    };

    addOrder(newOrder);
    clearCart();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <main className={s.checkoutPage}>
          <div className={s.container}>
            <div className={s.successState} ref={successRef}>
              <div className={`${s.successIcon} success-icon`}>
                <CheckCircle2 size={100} strokeWidth={1} />
              </div>
              <h2 className={s.successTitle}>
                {renderTitle('СПАСИБО ЗА ПОКУПКУ!')}
              </h2>
              <p className={`${s.successText} success-text`}>
                Ваш заказ успешно принят в работу. Мы свяжемся с вами в ближайшее время для уточнения деталей доставки.
              </p>
              <div className={s.successActions}>
                <Link to="/personal" className={`${s.successBtn} success-action`}>
                  В ЛИЧНЫЙ КАБИНЕТ
                </Link>
                <Link to="/catalog" className={`${s.secondaryBtn} success-action`}>
                  ПРОДОЛЖИТЬ ПОКУПКИ
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (isEmpty) {
    return (
      <>
        <Header />
        <main className={s.checkoutPage}>
          <div className={s.container}>
            <div className={s.emptyState}>
              <h2>Ваша корзина пуста</h2>
              <p>Для оформления заказа необходимо добавить товары в корзину.</p>
              <Link to="/catalog">Вернуться к покупкам</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={s.checkoutPage} ref={containerRef}>
        <div className={s.container}>
          
          <div className={s.heroHeader}>
            <h1 className={s.magTitle}>
              {renderTitle('ОФОРМЛЕНИЕ ЗАКАЗА')}
            </h1>
          </div>

          <div className={s.header}>
            <Link to="/cart" className={s.backLink}>
              <ArrowLeft size={16} /> Назад в корзину
            </Link>
          </div>

          <div className={s.layout}>
            <div className={s.formCol}>
              <CheckoutForm
                deliveryMethod={deliveryMethod}
                onDeliveryChange={setDeliveryMethod}
                onSubmit={handleCheckoutSubmit}
              />
            </div>

            <aside className={s.summaryCol}>
              <OrderSummary deliveryMethod={deliveryMethod} />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
