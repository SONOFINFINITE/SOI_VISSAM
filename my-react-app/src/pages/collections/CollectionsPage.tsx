import { useRef } from 'react';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './CollectionsPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useFilterStore } from '../../shared/store/useFilterStore';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CollectionItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  filterValue: string | null;
  categoryValue?: string | null;
}

const collectionPageData: CollectionItem[] = [
  {
    id: 1,
    title: 'Коллекция ART-DECO',
    description: 'Коллекция ART-DECO — это воплощение элегантности, роскоши и утонченного стиля, характерного для эпохи 1920-х и 1930-х годов. Она выполнена из массива дуба в цвете дуб венге — это тёмный, насыщенный оттенок с глубоким коричневым и черным подтоном дает ощущение природной роскоши и современного стиля.\n\nРучки из натуральной латуни добавляют изысканности и служат надежной и приятной в использовании деталью.\n\nНаклонная фрезеровка на фасадах создает мебели уникальный характер, подчеркивая стиль ART-DECO и создавая эффект объемности.',
    image: 'https://vissam.ru/upload/resize_cache/uf/86b/6ugcswrev09orml1ftbbbbw40r6c86t6/700_550_1/art-deko.png',
    link: '/catalog/kollektsii/kollektsiya-art-deco/',
    filterValue: 'ART-DECO'
  },
  {
    id: 2,
    title: 'Коллекция Bryce',
    description: 'Если вы хотите получить уникальный и оригинальный дизайн, то лучше всего подойдет фрезерованный фасад. Фасады с фрезеровкой коллекции Bryce стали одним из самых модных трендов этого года, который будет сохраняться еще долгое время.\n\nТакой узор на мебели будет идеально вписываться в пространство гостиной, спальни, библиотеки или офиса, прекрасно сочетаясь, как со стенами с грубой обработкой, так и при наличии на них декоративных реек.\n\nМебель коллекции Bryce с фасадами, обработанными по технологии фрезерования, выглядит гармонично в интерьерах минимализма, скандинавского, классического и неоклассического стилей.',
    image: 'https://vissam.ru/upload/resize_cache/uf/76a/k0np6giizpccbritibfpjxjzpljqtmot/700_550_1/Vitrina_2_3.jpg',
    link: '/catalog/kollektsii/kollektsiya-bryce/',
    filterValue: 'Bryce'
  },
  {
    id: 3,
    title: 'Коллекция Dalton',
    description: 'Натуральный дуб (массив + шпон) коллекции — ключевой маркер стиля mid-century. Тёплый, спокойный оттенок древесины без контрастной тонировки.\n\nЛатунные ручки не выступают как отдельный декор, а подчёркивают геометрию фасадов, как отсылка к стилю ар-деко, но в очень спокойной, современной подаче.\n\nОтличительные черты коллекции: - Баланс между строгостью и уютом; - Скруглённые углы и мягкие переходы; - Тонкие рамки, аккуратные фасады;\nОна отлично впишется в современные интерьеры с тёплой палитрой, в интерьеры «тихой люкс», Japandi, modern eclectic.',
    image: 'https://vissam.ru/upload/resize_cache/uf/80a/221hio6hwg1afzyh4n5ir5ong5y8h360/700_550_1/Bufet-4_kh-dvernyy-Dalton_2000kh1500_5.jpg',
    link: '/catalog/kollektsii/kollektsiya-dalton/',
    filterValue: 'Dalton'
  },
  {
    id: 4,
    title: 'Коллекция Florence',
    description: 'Коллекция мебели Florence в оливковом цвете вдохновляет своей элегантностью и современным стилем. Цвет оливки привносит теплоту и уют, а сочетание с черными ножками создает стильный контраст.\n\nКорпус и фасад выполнены из качественного МДФ с эмалевым покрытием, что обеспечивает долговечность и легкость в уходе. Ножки из массива бука черного цвета добавляют прочности и стабильности.\n\nВ коллекцию входят различные предметы мебели: комоды, прикроватные тумбы и тумбы под телевизор, что позволяет создать гармоничное пространство в любой комнате.',
    image: 'https://vissam.ru/upload/resize_cache/uf/630/t6cfwq16sa6pw842q8wcslmo5oe01stt/700_550_1/Tumba-TV-6-yashchikov_2000kh1500_1.jpg',
    link: '/catalog/kollektsii/kollektsiya-florence/',
    filterValue: 'Florence'
  },
  {
    id: 5,
    title: 'Коллекция Gven',
    description: 'Стиль минимализм и натуральное дерево идеально гармонируют в Коллекции мебели Gven. Использование МДФ и шпона дуба обеспечивает долговечность и эстетическую привлекательность, а ножки из массива дуба добавляют прочности и стабильности. Мебельные ручки под латунь придают коллекции утонченный вид.\n\nРазнообразие цветов корпусов коллекции, таких как глейс американский орех и нежного оттенка серая галька, позволяет легко сочетать предметы с различными стилями и цветами интерьера. Также предлагается вариант в цвете кофе клейс.\n\nКаждый предмет мебели продуман с особым вниманием к деталям, что делает коллекцию не только красивой, но и придает ей солидности в интерьере.',
    image: 'https://vissam.ru/upload/resize_cache/uf/6ad/4h8wyqhgnxhz86wml0rtmhf58bzye2lg/700_550_1/Konsol-s-2_mya-yashchikami-Gven_2000kh1500_3.jpg',
    link: '/catalog/kollektsii/kollektsiya-gven/',
    filterValue: 'Gven'
  },
  {
    id: 6,
    title: 'Коллекция Manhattan',
    description: 'Коллекция Manhattan - это стильные лаконичные модели из натурального массива бука. Прямые четкие линии, трапециевидное расширение ножек и верхней части изделий отсылает к особенному английскому стилю.\n\nФактурные дверцы и фасады мебели добавляют изысканности и способствуют созданию атмосферы уюта. Геометричная фурнитура подчёркивает классические прямые линии и симметрию.\n\nВсе изделия коллекции Manhattan выполнены в 4 цветах: белый, молочный, серый и черный.',
    image: 'https://vissam.ru/upload/resize_cache/uf/d0a/i1240b999918cg2b61aqnwn0aweskv0y/700_550_1/1_Interactive-LightMix.jpg',
    link: '/catalog/kollektsii/kollektsiya-manhattan_1/',
    filterValue: 'Manhattan'
  },
  {
    id: 7,
    title: 'Коллекция MARANTA',
    description: 'Коллекция мебели MARANTA представляет собой стильное и функциональное решение для вашего интерьера. В её состав входят комоды, витрины, тумбы, зеркала и консоли.\n\nНожки и ручки выполнены из массива бука, что обеспечивает прочность и долговечность. Корпус мебели из ЛДСП, а фасад — из МДФ со шпоном ясеня.\n\nЛинии мебели MARANTA отличает лаконичность и элегантность, что делает её уместной как в классических, так и в современных интерьеров.',
    image: 'https://vissam.ru/upload/resize_cache/uf/ade/u414ms3anq3mngs3weptzkczsoauu071/700_550_1/KOMOD-3-YASHCHIKA-kremovyy_0.jpg',
    link: '/catalog/kollektsii/kollektsiya-maranta/',
    filterValue: 'Maranta'
  },
  {
    id: 8,
    title: 'Коллекция Nice',
    description: 'Коллекция мебели Nice представлена в нежном молочном и пудровом оттенках, создающих атмосферу уюта и гармонии в любом интерьере.\n\nНожки из массива бука обеспечивают прочность и устойчивость, в то время как корпус и фасад из МДФ, покрытые эмалью, придают мебели элегантный и современный вид. Фасады выполнены как с гладкой поверхностью, так и с вертикальной фрезеровкой.\n\nВ данной коллекции представлено разнообразие предметов: витрины, комоды, консоли, кровати, шкафы, столы и тумбы.',
    image: 'https://vissam.ru/upload/resize_cache/uf/13b/6d2466pekzicjiwl9o32n8cs745yk3g7/700_550_1/Tumba-TV-bolshaya-s-4_mya-raspashnymi-fasadami-Nice_molochnyy_2000kh1500.jpg',
    link: '/catalog/kollektsii/kollektsiya-nice/',
    filterValue: 'Nice'
  },
  {
    id: 9,
    title: 'Коллекция SOHO',
    description: 'Изделия коллекции SOHO отлично впишутся в любой интерьер, так как используемый стиль контемпорари объединяет европейскую элегантность и скандинавскую ясность форм.\n\nВ основе моделей лежат прямые и чёткие линии, а аккуратные изгибы на углах придают мягкость.\n\nСилуэт модели полностью отражает стиль контемпорари с интуитивно понятными линиями и утончённым акцентом в виде закруглённых элегантных элементов.',
    image: 'https://vissam.ru/upload/resize_cache/uf/ffb/n889wz12ln2d989f0rxk35rnra1fl8ro/700_550_1/IMG_0457.jpg',
    link: '/catalog/kollektsii/kollektsiya-soho_1/',
    filterValue: 'Soho'
  },
  {
    id: 10,
    title: 'Коллекция Oldem',
    description: 'Коллекция Oldem из массива дуба и шпона дуба легко вписывается в различные интерьеры и создает уютную и натуральную атмосферу в доме.\n\nЛегкая фрезеровка на фасадах добавляет изящества и современного стиля. Ножки, царга и ручки из массива дуба подчеркивают натуральную красоту и прочность.\n\nКорпус и фасады из МДФ толщиной 18 мм с элегантной матовой эмалью в графитовом сером и бежевом цвете.',
    image: 'https://vissam.ru/upload/resize_cache/uf/f1a/ebxsipy9zljyrdly6l06wpl09wj8r6uf/700_550_1/OLDEM-Konsol-bolshaya-s-2_ya-yashchikami-1_1.png',
    link: '/catalog/kollektsii/kollektsiya-oldem/',
    filterValue: 'Oldem'
  },
  {
    id: 11,
    title: 'Коллекция Sydney',
    description: 'Коллекция Sydney выполнена из натурального массива дуба.\n\nИзделия отличаются интересным сочетанием латунной фурнитуры с темно-графитовым цветом основания, что создает благородный и при этом современный стильный дизайн.',
    image: 'https://vissam.ru/upload/resize_cache/uf/b80/sn58eyhy1bi36ahcw2dfjf34bmajx4hh/700_550_1/IMG_0236-2000kh1500.jpg',
    link: '/catalog/kollektsii/kollektsiya-sydney_1/',
    filterValue: 'Sydney'
  },
  {
    id: 12,
    title: 'Столовые группы',
    description: 'Компания VISSAM предлагает стильную и функциональную столовую группу мебели, которая идеально подойдет для вашего дома или ресторана. Наша коллекция включает в себя разнообразные столы и стулья Премиум класса. Ножки столов и стульев изготовлены из массива дерева.\n\nПриглашаем вас ознакомиться с нашей коллекцией и выбрать мебель, которая соответствует вашим требованиям!',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
    link: '/catalog/stolovye-gruppy/',
    filterValue: null,
    categoryValue: 'Столы и стулья'
  }
];

export function CollectionsPage() {
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const resetFilters = useFilterStore((state) => state.resetFilters);
  const setActiveCollection = useFilterStore((state) => state.setActiveCollection);
  const setActiveCategory = useFilterStore((state) => state.setActiveCategory);

  const handleCollectionClick = (e: React.MouseEvent<HTMLAnchorElement>, filterValue: string | null, categoryValue?: string | null) => {
    e.preventDefault();
    resetFilters();
    
    if (filterValue) {
      setActiveCollection(filterValue);
    }
    
    if (categoryValue) {
      setActiveCategory(categoryValue);
    }
    
    window.scrollTo({ top: 0, behavior: 'instant' });
    const url = filterValue 
      ? `/catalog/?collection=${encodeURIComponent(filterValue)}` 
      : categoryValue 
        ? `/catalog/?category=${encodeURIComponent(categoryValue)}`
        : '/catalog';
    navigate(url);
  };

  useGSAP(() => {
    gsap.from('.hero-title-char', {
      duration: 1.2,
      y: 100,
      opacity: 0,
      stagger: 0.05,
      ease: 'power4.out',
      delay: 0.2
    });

    const items = gsap.utils.toArray<HTMLElement>('.collection-item');

    items.forEach((item) => {
      const img = item.querySelector('.item-img');
      const textWrap = item.querySelector('.item-text-wrap');
      const number = item.querySelector('.item-bg-number');
      const hr = item.querySelector('.item-hr');

      gsap.from(textWrap, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      if (hr) {
        gsap.from(hr, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          scaleX: 0,
          transformOrigin: item.classList.contains(s['item--even']) ? 'right center' : 'left center',
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2
        });
      }

      if (img) {
        gsap.to(img, {
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          y: '30%', // Parallax down from top: -15% to top: 15%
          ease: 'none'
        });
      }

      if (number) {
        gsap.to(number, {
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          y: '-30%', // Moves up gracefully
          ease: 'none'
        });
      }
    });
  }, { scope: container });

  const renderTitleChars = (word: string) => {
    return word.split('').map((char, index) => (
      <span key={index} className="hero-title-char inline-block" style={{ display: 'inline-block' }}>{char}</span>
    ));
  };

  return (
    <div ref={container} className={s.page}>
      <Header />
      
      <main className={s.main}>
        <section className={s.hero}>
          <h1 className={s.hero__title}>
            {renderTitleChars('Коллекции')}
          </h1>
          <div className={s.hero__subtitle}>
            Вдохновение и стиль для каждого дома
          </div>
        </section>

        <section className={s.list}>
          {collectionPageData.map((item, index) => {
            const isEven = index % 2 === 1;
            
            return (
              <article 
                key={item.id} 
                className={`${s.item} ${isEven ? s['item--even'] : ''} collection-item`}
              >
                <div className={s.item__visual}>
                  <div className={s.item__imgWrapper}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className={`${s.item__img} item-img`} 
                      loading={index < 2 ? 'eager' : 'lazy'} 
                    />
                  </div>
                </div>

                <div className={s.item__content}>
                  <div className={`${s.item__bgNumber} item-bg-number`}>
                    0{index + 1}
                  </div>
                  <div className={`${s.item__textWrapper} item-text-wrap`}>
                    <h2 className={s.item__title}>{item.title}</h2>
                    <hr className={`${s.item__hr} item-hr`} />
                    <div className={s.item__desc}>
                      {item.description.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                    <a 
                      href="/catalog" 
                      onClick={(e) => handleCollectionClick(e, item.filterValue, item.categoryValue)} 
                      className={s.item__btn}
                    >
                      <span>Смотреть</span>
                      <div className={s.item__btnIcon}>
                        <ArrowUpRight strokeWidth={2.5} size={18} />
                      </div>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}
