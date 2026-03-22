import { ChevronRight } from 'lucide-react';
import s from './ProductPage.module.scss';
import type { Product } from '../../../shared/data/products';

interface ProductTabsProps {
  product: Product;
  activeTab: string | null;
  onTabChange: (id: string | null) => void;
}

export function ProductTabs({ product, activeTab, onTabChange }: ProductTabsProps) {
  const TABS_CONTENT = [
    {
      id: 'fullSpecs',
      anchorId: 'full-specs',
      title: 'ПОЛНЫЕ ХАРАКТЕРИСТИКИ',
      content: () => {
        const allSpecs = [
          { label: 'Артикул', value: product.sku },
          { label: 'Категория', value: product.category },
          { label: 'Коллекция', value: product.collection || 'ART-DECO' },
          ...(product.quickSpecs || []),
          ...(product.fullSpecs || [])
        ];
        
        // Remove duplicates by label (favoring the last occurrence which is usually more detailed if overlap exists)
        const uniqueSpecs = Array.from(new Map(allSpecs.map(s => [s.label.toLowerCase(), s])).values());

        return (
          <ul className={s.specsListFull}>
            {uniqueSpecs.map((spec, idx) => (
              <li key={idx}><span>{spec.label}:</span> <span>{spec.value}</span></li>
            ))}
          </ul>
        );
      }
    },
    {
      id: 'howToBuy',
      title: 'КАК КУПИТЬ',
      content: () => (
        <div className={s.textContent}>
          <p>Для покупки товара в нашем интернет-магазине выберите понравившийся товар и добавьте его в корзину. Далее перейдите в Корзину и нажмите на «Оформить заказ» или «Быстрый заказ».</p>
          <p>Когда оформляете быстрый заказ, напишите ФИО, телефон и e-mail. Вам перезвонит менеджер и уточнит условия заказа. По результатам разговора вам придет подтверждение на почту или через СМС.</p>
        </div>
      )
    },
    {
      id: 'payment',
      title: 'ОПЛАТА',
      content: () => (
        <div className={s.textContent}>
          <p><strong>Оплата онлайн:</strong> Вы можете оплатить заказ картой на сайте сразу после оформления.</p>
          <p><strong>Банковский перевод:</strong> Менеджер вышлет счет для оплаты через банк.</p>
          <p><strong>Рассрочка:</strong> Возможна покупка в рассрочку или кредит через банки-партнеры.</p>
        </div>
      )
    },
    {
      id: 'delivery',
      title: 'ДОСТАВКА',
      content: () => (
        <div className={s.textContent}>
          <ul className={s.bulletListAll}>
            <li>Доставка по Москве и области — в течение 1–3 рабочих дней.</li>
            <li>Доставка в регионы — транспортными компаниями (ПЭК, Деловые Линии).</li>
            <li>Самовывоз со склада — бесплатно.</li>
            <li>Подъем на этаж и сборка мебели оговариваются отдельно при заказе.</li>
          </ul>
        </div>
      )
    }
  ];

  const toggleTab = (id: string) => {
    onTabChange(activeTab === id ? null : id);
  };

  return (
    <div className={s.accordion}>
      {TABS_CONTENT.map(tab => (
        <div 
          key={tab.id} 
          id={tab.anchorId}
          className={`${s.accordionItem} ${activeTab === tab.id ? s.accordionActive : ''}`}
        >
          <button 
            className={s.accordionHeader} 
            onClick={() => toggleTab(tab.id)}
          >
            <span>{tab.title}</span>
            <ChevronRight className={s.accordionIcon} size={20} />
          </button>
          
          <div className={`${s.accordionContentWrap} ${activeTab === tab.id ? s.contentOpen : ''}`}>
            <div className={s.accordionContent}>
              {tab.content()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
