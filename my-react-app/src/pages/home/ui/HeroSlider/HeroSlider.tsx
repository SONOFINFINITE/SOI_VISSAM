import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ShoppingBag, Plus } from 'lucide-react';
import s from './HeroSlider.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const SLIDES = [
  {
    id: 1,
    watermarks: ['СКАНДИ', 'ПРИРОДА', 'УЮТ'],
    image: 'https://i.pinimg.com/originals/00/53/8b/00538baa9b2eca1b086294c2d02b43ba.jpg',
    title: 'Скандинавский уют',
    link: `/catalog/?collection=${encodeURIComponent('Gven')}`
  },
  {
    id: 2,
    watermarks: ['СМЕЛОСТЬ', 'ФОРМЫ', 'ФАКТУРЫ'],
    image: 'https://geometrium-school.ru/wp-content/uploads/2025/10/u4228977262_interior_design_2026_warm_neutrals_organic_curves_3a963032-1341-4f76-a322-b17eaeeceac3_0.png',
    title: 'Эклектика в интерьере',
    link: `/catalog/?collection=${encodeURIComponent('Bryce')}`
  },
  {
    id: 3,
    watermarks: ['БЕТОН', 'МЕТАЛЛ', 'ЛОФТ'],
    image: 'https://kraski-net.ru/wp-content/uploads/2021/08/Izumrudnaya-stena.jpg',
    title: 'Индустриальный лофт',
    link: `/catalog/?collection=${encodeURIComponent('Sydney')}`
  },
  {
    id: 4,
    watermarks: ['ГЕОМЕТРИЯ', 'МАССИВ', 'СТИЛЬ'],
    image: 'https://i.pinimg.com/originals/41/eb/ec/41ebec1f018eb0dc10412b517d55fb6d.png',
    title: 'Лаконичный Манхэттен',
    link: `/catalog/?collection=${encodeURIComponent('Manhattan')}`
  },
  {
    id: 5,
    watermarks: ['МИНИМАЛИЗМ', 'ДЕРЕВО', 'ГАРМОНИЯ'],
    image: 'https://i.pinimg.com/originals/b1/67/c2/b167c29ca3b7a67e2c523a29c0b564c7.jpg',
    title: 'Строгость линий',
    link: `/catalog/?collection=${encodeURIComponent('Dalton')}`
  }
];

export function HeroSlider() {
  const [current, setCurrent] = useState(2);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkBaseRef = useRef<HTMLDivElement>(null);

  const goTo = (idx: number) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => goTo(current + 1), 7000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current]);

  const { contextSafe } = useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline(); // No delay

      // 1. Cards "Bloom" from center - appear one by one organically
      tl.from(`.${s.card}`, {
        opacity: 0,
        scale: 0.2,
        x: 0,
        y: 0,
        rotationZ: (i) => (i - 2) * 15,
        filter: 'blur(20px)', // Organic blur-to-focus
        duration: 1.5,
        stagger: {
          each: 0.15,
          from: 'center', // The middle card appears first
        },
        ease: 'expo.out',
        clearProps: 'all',
      });

      // 2. Title lines reveal (Wait for cards to settle a bit)
      tl.from(`.${s.titleLine}`, {
        opacity: 0,
        y: 60,
        skewY: 10,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
      }, "-=0.7"); // Start while cards are finishing their move

      // 3. Subtitle and Controls reveal
      tl.from(`.${s.subtitle}`, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
      }, "-=0.5");

      tl.from([`.${s.progressBar}`, `.${s.num}`, `.${s.arrows} button`, `.${s.pcArrows} button`], {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      }, "-=0.4");

      // 4. Continuous floating effect
      gsap.to('.gsap-float', {
        y: 20,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: {
          each: 0.4,
          from: 'random',
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const handleMouseMove = contextSafe((e: React.MouseEvent) => {
    if (!watermarkBaseRef.current) return;
    const { clientX, clientY } = e;

    // "сдвигается в направлении указателя" -> positive multiplier
    const x = (clientX / window.innerWidth - 0.5) * 100;
    const y = (clientY / window.innerHeight - 0.5) * 80;

    gsap.to(watermarkBaseRef.current, {
      x,
      y,
      duration: 1.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });

  return (
    <section
      className={s.wrapper}
      aria-label="Главный баннер"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      <div className={s.watermark}>
        <div className={s.watermarkInner} ref={watermarkBaseRef}>
          {SLIDES.map((slide, i) => (
            <div key={slide.id} className={`${s.watermarkGroup} ${current === i ? s.active : ''}`}>
              {slide.watermarks.map((word, wIdx) => (
                <div key={wIdx} className={`${s.watermarkText} ${s[`pos-${wIdx}`]}`}>
                  {word}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={s.leftText}>
        <h1 className={s.title}>
          <div className={s.titleLine}>ПРЕМИАЛЬНАЯ</div>
          <div className={s.titleLine}>МЕБЕЛЬ ДЛЯ</div>
          <div className={s.titleLine}>ВАШЕГО ДОМА</div>
        </h1>
        <p className={s.subtitle}>Отражение вашей индивидуальности в каждой детали.<br />Создайте дом, в который хочется возвращаться.</p>
      </div>

      <div className={s.sliderContainer}>
        <div className={s.track} ref={trackRef}>
          {SLIDES.map((slide, i) => {
            let offset = i - current;
            // Handle wrap around for 5 items: -2, -1, 0, 1, 2
            if (offset < -2) offset += SLIDES.length;
            if (offset > 2) offset -= SLIDES.length;

            return (
              <div
                key={slide.id}
                className={s.card}
                data-offset={offset}
                onClick={() => { if (offset !== 0) goTo(i) }}
              >
                <div className={`gsap-float ${s.cardInner}`}>
                  <img src={slide.image} alt={slide.title} />
                  <div className={s.bagIcon}><ShoppingBag size={20} strokeWidth={1.5} /></div>

                  {offset === 0 && (
                    <a href={slide.link} className={s.cardLink}>
                      <div className={s.linkIcon}><Plus size={16} /></div>
                      <span>{slide.title}</span>
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Separate PC Arrows for better visibility */}
        <div className={s.pcArrows}>
          <button onClick={() => goTo(current - 1)} className={s.pcArrowPrev} aria-label="Предыдущий слайд">
            <ArrowLeft size={24} strokeWidth={1.2} />
          </button>
          <button onClick={() => goTo(current + 1)} className={s.pcArrowNext} aria-label="Следующий слайд">
            <ArrowRight size={24} strokeWidth={1.2} />
          </button>
        </div>

        <div className={s.bottomControls}>
          <div className={s.progress}>
            <span className={s.num}>{String(current + 1).padStart(2, '0')}</span>
            <div className={s.progressBar}><div className={s.progressFill} style={{ width: `${((current + 1) / SLIDES.length) * 100}%` }}></div></div>
            <span className={s.num}>{String(SLIDES.length).padStart(2, '0')}</span>
          </div>

          <div className={s.arrows}>
            <button onClick={() => goTo(current - 1)} aria-label="Предыдущий слайд"><ArrowLeft size={18} strokeWidth={1.5} /></button>
            <button onClick={() => goTo(current + 1)} aria-label="Следующий слайд"><ArrowRight size={18} strokeWidth={1.5} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
