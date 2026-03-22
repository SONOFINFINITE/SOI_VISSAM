import { useState } from 'react';
import s from './FAQ.module.scss';


const FAQ_DATA = [
  {
    question: 'Как оформить заказ?',
    answer: 'Оформить заказ можно на нашем сайте, добавив интересующие товары в корзину и следуя инструкциям на этапе оформления. Также вы можете связаться с нами по телефону.',
  },
  {
    question: 'В какие регионы вы осуществляете доставку?',
    answer: 'Мы доставляем нашу мебель по всей территории России. Сроки и стоимость доставки зависят от вашего региона и выбранной транспортной компании.',
  },
  {
    question: 'Предоставляете ли вы гарантию на мебель?',
    answer: 'Да, на всю нашу продукцию предоставляется гарантия качества сроком на 24 месяца с момента покупки. Мы уверены в качестве используемых материалов и сборки.',
  },
  {
    question: 'Можно ли внести изменения в размеры изделий?',
    answer: 'В большинстве случаев мы можем адаптировать размеры мебели под ваши индивидуальные требования. Пожалуйста, свяжитесь с нашими менеджерами для обсуждения деталей.',
  },
  {
    question: 'Какие материалы вы используете в производстве?',
    answer: 'Мы используем только высококачественные и экологически чистые материалы: массив дерева, надежный металл, качественные ткани и долговечную фурнитуру от проверенных поставщиков.',
  },
];

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.header}>
          <h2 className={s.title}>Часто задаваемые вопросы</h2>
          <p className={s.desc}>
            Здесь мы собрали ответы на самые популярные вопросы, чтобы вам было удобнее совершать покупки.
          </p>
        </div>
        
        <div className={s.accordion}>
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={`${s.item} ${isOpen ? s.isOpen : ''}`}
              >
                <button 
                  className={s.question} 
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                >
                  <span className={s.questionText}>{item.question}</span>
                  <span className={s.iconWrapper}>
                    <ChevronIcon className={s.icon} />
                  </span>
                </button>
                <div className={s.answerWrapper}>
                  <div className={s.answerInner}>
                    <p className={s.answerText}>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
