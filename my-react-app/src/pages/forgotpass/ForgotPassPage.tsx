import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import s from './ForgotPassPage.module.scss';

export function ForgotPassPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const q = gsap.utils.selector(containerRef);
      
      gsap.fromTo(q('.title-char'),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: 'power4.out', delay: 0.2 }
      );

      gsap.fromTo(q(`.${s.subtitle}, .${s.form}`),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, stagger: 0.2 }
      );
    }
  }, []);

  const renderTitle = (title: string) => {
    return title.split(' ').map((word, wIdx) => (
      <span key={wIdx} className={s.titleWord}>
        {word.split('').map((char, cIdx) => (
          <span
            key={cIdx}
            className="title-char"
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
      <main className={s.page}>
        <div className={s.container} ref={containerRef}>
          <h1 className={s.title}>
            {renderTitle('ВОССТАНОВЛЕНИЕ ПАРОЛЯ')}
          </h1>
          
          <p className={s.subtitle}>Если вы забыли пароль, введите логин или email.</p>

          <form className={s.form} onSubmit={(e) => e.preventDefault()}>
            <div className={s.inputGroup}>
              <label className={s.label}>
                Логин или email <span>*</span>
              </label>
              <input type="text" className={s.input} required placeholder="Ваш email" />
            </div>

            <p className={s.infoText}>
              Контрольная строка для смены пароля, а также ваши регистрационные данные, будут высланы вам по E-Mail.
            </p>

            <div className={s.actions}>
              <button type="submit" className={s.submitBtn}>
                ВОССТАНОВИТЬ
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
