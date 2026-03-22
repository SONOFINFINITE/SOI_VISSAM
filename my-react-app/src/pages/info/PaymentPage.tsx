import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { InfoSidebar } from './ui/InfoSidebar';
import s from './ui/InfoPage.module.scss';

export function PaymentPage() {
  const containerRef = useRef<HTMLElement>(null);
  const displayTitle = 'УСЛОВИЯ ОПЛАТЫ';

  useGSAP(() => {
    if (containerRef.current) {
      gsap.fromTo(gsap.utils.selector(containerRef)('.hero-title-char'), 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.05, ease: 'power4.out', delay: 0.2 }
      );
      gsap.fromTo(gsap.utils.selector(containerRef)(`.${s.content}`),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.6 }
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

  return (
    <>
      <Header />
      <main className={s.infoPage} ref={containerRef}>
        <div className={s.container}>
          <div className={s.heroHeader}>
            <h1 className={s.magTitle}>
              {renderTitle(displayTitle)}
            </h1>
          </div>
          
          <div className={s.mainContent}>
            <div className={s.leftColumn}>
              <div className={s.content}>
                <h1>Условия оплаты</h1>
                <p>Вы можете выбрать один из трёх вариантов оплаты:</p>
                
                <h3>Оплата наличными</h3>
                <p>При выборе варианта оплаты наличными, вы дожидаетесь приезда курьера и передаёте ему сумму за товар в рублях. Курьер предоставляет товар, который можно осмотреть на предмет повреждений, соответствие указанным условиям. Покупатель подписывает товаросопроводительные документы, вносит денежные средства и получает чек.</p>
                <p>Также оплата наличными доступна при самовывозе из магазина, оплаты по почте или использовании постамата.</p>
                
                <h3>Безналичный расчёт</h3>
                <p>При оформлении заказа в корзине вы можете выбрать вариант безналичной оплаты. Мы принимаем карты Visa и Master Card. Чтобы оплатить покупку, вас перенаправит на сервер системы ASSIST, где вы должны ввести номер карты, срок действия, имя держателя.</p>
                <p>Вам могут отказать от авторизации в случае:</p>
                <ul>
                  <li>если ваш банк не поддерживает технологию 3D-Secure;</li>
                  <li>на карте недостаточно средств для покупки;</li>
                  <li>банк не поддерживает услугу платежей в интернете;</li>
                  <li>истекло время ожидания ввода данных;</li>
                  <li>в данных была допущена ошибка.</li>
                </ul>
                <p>В этом случае вы можете повторить авторизацию через 20 минут, воспользоваться другой картой или обратиться в свой банк для решения вопроса.</p>
                <p>Безналичным расчётом можно воспользоваться при курьерской доставке, использовании постамата или самовывоза из магазина.</p>
                
                <h3>Электронные системы</h3>
                <p>Для оплаты вы можете воспользоваться одной из электронных платёжных систем:</p>
                <ul>
                  <li>PayPal;</li>
                  <li>WebMoney;</li>
                  <li>Яндекс.Деньги.</li>
                </ul>
                <p>Вас перенаправит на страницу платежного сервиса, следуя инструкциям, заполните правильную форму.</p>
              </div>
            </div>

            <InfoSidebar />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
