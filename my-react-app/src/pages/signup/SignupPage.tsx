import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import s from './SignupPage.module.scss';

export function SignupPage() {
  const [agreed, setAgreed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const q = gsap.utils.selector(containerRef);
      
      gsap.fromTo(q('.title-char'),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: 'power4.out', delay: 0.2 }
      );

      gsap.fromTo(q(`.${s.description}, .${s.form}`),
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
            {renderTitle('РЕГИСТРАЦИЯ')}
          </h1>

          <p className={s.description}>
            Зарегистрируйтесь, чтобы использовать все возможности личного кабинета: отслеживание заказов, настройку подписки, связи с социальными сетями и другие.
          </p>

          <form className={s.form} onSubmit={(e) => e.preventDefault()}>
            <div className={s.formGrid}>
              <div className={s.inputGroup}>
                <label className={s.label}>Фамилия Имя Отчество <span>*</span></label>
                <input type="text" className={s.input} required placeholder="Иванов Иван Иванович" />
              </div>

              <div className={s.inputGroup}>
                <label className={s.label}>E-mail <span>*</span></label>
                <input type="email" className={s.input} required placeholder="ivanov@mail.ru" />
              </div>

              <div className={s.inputGroup}>
                <label className={s.label}>Телефон</label>
                <input type="tel" className={s.input} placeholder="+7 (___) ___-__-__" />
              </div>

              <div className={s.inputGroup}>
                <label className={s.label}>Пароль <span>*</span></label>
                <input type="password" className={s.input} required />
                <div className={s.infoText}>Минимум 6 символов</div>
              </div>

              <div className={s.inputGroup}>
                <label className={s.label}>Подтверждение пароля <span>*</span></label>
                <input type="password" className={s.input} required />
              </div>

              <div className={s.captchaSection}>
                <label className={s.label}>Введите код <span>*</span></label>
                <div className={s.captchaRow}>
                  <input type="text" className={s.input} required />
                  <div className={s.captchaImage}>
                    <span>S8N62</span>
                  </div>
                  <button type="button" className={s.captchaReload} title="Обновить код">
                    ↻
                  </button>
                </div>
              </div>
            </div>

            <div className={s.agreement}>
              <label className={s.rememberLabel}>
                <div className={`${s.toggleSwitch} ${agreed ? s.active : ''}`}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className={s.visuallyHidden}
                    required
                  />
                  <span className={s.slider} />
                </div>
                Я согласен на обработку персональных данных
              </label>
            </div>

            <div className={s.actions}>
              <button type="submit" className={s.submitBtn}>
                ЗАРЕГИСТРИРОВАТЬСЯ
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
