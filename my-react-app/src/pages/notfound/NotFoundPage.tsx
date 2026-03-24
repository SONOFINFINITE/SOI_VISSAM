import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import s from './NotFoundPage.module.scss';

export function NotFoundPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'cubic.out' } });

    // Animate 404 numbers with stagger - faster and smoother
    tl.fromTo(
      gsap.utils.selector(numbersRef)('.number-char'),
      { 
        y: 100, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.7, 
        stagger: 0.08,
        ease: 'cubic.out'
      }
    );

    // Animate message
    tl.fromTo(
      `.${s.message}`,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.3'
    );

    // Animate description
    tl.fromTo(
      `.${s.description}`,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.2'
    );

    // Animate buttons (including button)
    tl.fromTo(
      `.${s.actions} a, .${s.actions} button`,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.06 },
      '-=0.1'
    );

    // Floating animation for decorative elements - subtle and smooth
    gsap.to(`.${s.floatingCircle}`, {
      y: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.3
    });

  }, []);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const moveX = (clientX - centerX) / 50;
      const moveY = (clientY - centerY) / 50;

      gsap.to(`.${s.floatingCircle}`, {
        x: moveX,
        y: moveY,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Header />
      <main className={s.notFoundPage} ref={containerRef}>
        <div className={s.container}>

          {/* Decorative floating elements */}
          <div className={`${s.floatingCircle} ${s.circle1}`} />
          <div className={`${s.floatingCircle} ${s.circle2}`} />
          <div className={`${s.floatingCircle} ${s.circle3}`} />

          {/* Main 404 content */}
          <div className={s.content}>
            <div className={s.numbersWrapper} ref={numbersRef}>
              <span className="number-char">4</span>
              <span className="number-char">0</span>
              <span className="number-char">4</span>
            </div>

            <h1 className={s.message}>Страница не найдена</h1>

            <p className={s.description}>
              Похоже, вы заблудились. Страница, которую вы ищете,
              не существует или была перемещена.
            </p>

            <div className={s.actions}>
              <Link to="/" className={s.primaryBtn}>
                <Home size={20} />
                <span>На главную</span>
              </Link>

              <Link to="/catalog" className={s.secondaryBtn}>
                <Search size={20} />
                <span>Каталог</span>
              </Link>

              <button onClick={() => window.history.back()} className={s.tertiaryBtn}>
                <ArrowLeft size={20} />
                <span>Назад</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
