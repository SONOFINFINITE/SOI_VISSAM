import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import s from './ui/ContactsPage.module.scss';

export function ContactsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [shouldMountMap, setShouldMountMap] = useState(false);
  const displayTitle = 'КОНТАКТЫ';

  // Optimized loading for mobile: mount map after initial animations
  useGSAP(() => {
    const timer = setTimeout(() => {
      setShouldMountMap(true);
    }, 1500); // Wait for title and contact blocks to start/finish
    
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    if (containerRef.current) {
      // Title chars animation
      gsap.fromTo(gsap.utils.selector(containerRef)('.hero-title-char'),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.05, ease: 'power4.out', delay: 0.2 }
      );
      
      // Contact blocks staggered animation
      gsap.fromTo(gsap.utils.selector(containerRef)(`.${s.contactBlock}`),
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.6 }
      );
    }
  }, []);

  // Separate animation for map once it loads
  useGSAP(() => {
    if (isMapLoaded && mapRef.current) {
      gsap.fromTo(mapRef.current,
        { scale: 1.05, opacity: 0, filter: 'blur(10px) grayscale(100%)' },
        { 
          scale: 1, 
          opacity: 1, 
          filter: 'blur(0px) grayscale(15%)', 
          duration: 1.5, 
          ease: 'expo.out' 
        }
      );
    }
  }, [isMapLoaded]);

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
      <main className={s.contactsPage} ref={containerRef}>
        <div className={s.fullHeightLayout}>
          <div className={s.infoSide}>
            <div className={s.infoSideHeader}>
              <div className={s.heroHeader}>
                <h1 className={s.magTitle}>
                  {renderTitle(displayTitle)}
                </h1>
              </div>
            </div>

            <div className={s.contactGrid}>
              <div className={s.contactBlock}>
                <h3>Адрес шоу-рума</h3>
                <p>Дмитровское ш., 161Б, ТЦ «Империя», этаж 1</p>
                <div className={s.mapLinks}>
                  <a 
                    href="https://yandex.ru/maps/?from=mapframe&ll=37.539233%2C55.905510&source=mapframe&um=constructor%3A6ac784f5b4fba816d568be1bf957eafb690b8da3bccf5065495e8ae85e4388ba&utm_source=mapframe&z=15" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={s.link}
                  >
                    <span>Открыть на Яндекс Картах</span>
                    <div className={s.linkIcon}>
                      <ArrowUpRight strokeWidth={2.5} size={18} />
                    </div>
                  </a>
                </div>
              </div>

              <div className={s.contactBlock}>
                <h3>Офис</h3>
                <p>Ярославская обл, г. Рыбинск, ул. Чкалова, 64</p>
              </div>

              <div className={s.contactBlock}>
                <h3>Телефон</h3>
                <a href="tel:+79108237272" className={s.contactLink}>+7 (910) 823-72-72</a>
              </div>

              <div className={s.contactBlock}>
                <h3>E-mail</h3>
                <a href="mailto:koksius@mail.ru" className={s.contactLink}>koksius@mail.ru</a>
              </div>

              <div className={s.contactBlock}>
                <h3>Режим работы</h3>
                <p>Пн. – Пт.: с 9:00 до 18:00</p>
              </div>

              <div className={s.contactBlock}>
                <h3>Социальные сети</h3>
                <a href="https://t.me/vissam" target="_blank" rel="noopener noreferrer" className={s.contactLink}>Telegram</a>
              </div>

              <div className={s.contactBlock}>
                <h3>Реквизиты</h3>
                <p>ООО ВИСCАМ</p>
                <p>ИНН: 7610130772</p>
              </div>
            </div>
          </div>

          <div className={s.mapSide}>
            <div 
              className={`${s.mapFrameWrapper} ${isMapLoaded ? s.isLoaded : ''}`}
            >
              {shouldMountMap && (
                <iframe
                  onLoad={() => setIsMapLoaded(true)}
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A6ac784f5b4fba816d568be1bf957eafb690b8da3bccf5065495e8ae85e4388ba&source=constructor"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Мы на карте"
                  loading="lazy"
                ></iframe>
              )}
            </div>
            <div className={`${s.mapSkeleton} ${isMapLoaded ? s.fadeOut : ''}`} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
