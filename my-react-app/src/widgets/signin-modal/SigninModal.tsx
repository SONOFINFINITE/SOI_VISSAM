import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAuthStore } from '../../shared/store/useAuthStore';
import s from './SigninModal.module.scss';

gsap.registerPlugin(useGSAP);

interface SigninModalProps {
  // Can be used if controlled completely from store, but we'll adapt to keep existing props but merge behavior
  isOpen?: boolean;
  onClose?: () => void;
}

export function SigninModal({ isOpen: propsIsOpen, onClose: propsOnClose }: SigninModalProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const loginAction = useAuthStore((state) => state.login);
  const storeIsOpen = useAuthStore((state) => state.isAuthModalOpen);
  const setStoreIsOpen = useAuthStore((state) => state.setAuthModalOpen);

  const isOpen = propsIsOpen !== undefined ? propsIsOpen : storeIsOpen;

  const handleClose = () => {
    if (propsOnClose) propsOnClose();
    setStoreIsOpen(false);
  };


  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        modalRef.current,
        { y: 30, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' });
      gsap.to(modalRef.current, { y: 20, opacity: 0, duration: 0.2, ease: 'power2.in' });
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Test user credentials
    if (login === 'test' && password === 'test') {
      loginAction(login, remember);
      handleClose();
      
      if (location.pathname !== '/checkout') {
        navigate('/personal/');
      }
    } else {
      setError('Неверный логин или пароль. Используйте test / test');
    }
  };

  const handleSignup = () => {
    handleClose();
    navigate('/signup');
  };

  const handleForgot = () => {
    handleClose();
    navigate('/forgotpass');
  };

  return (
    <div ref={containerRef} className={`${s.modalOverlay} ${isOpen ? s.isOpen : ''}`}>
      <div className={s.modalBackdrop} onClick={handleClose} />
      <div ref={modalRef} className={s.modalContent}>
        <button className={s.closeBtn} onClick={handleClose} aria-label="Закрыть">
          <X size={24} strokeWidth={1} />
        </button>
        <h2 className={s.title}>Войти в кабинет</h2>

        <form className={s.form} onSubmit={handleLogin}>
          {error && <div className={s.errorMessage}>{error}</div>}
          <div className={s.inputGroup}>
            <label className={s.label}>
              Логин <span>*</span>
            </label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              className={s.input}
              placeholder="E-mail или телефон"
            />
          </div>

          <div className={s.inputGroup}>
            <label className={s.label}>
              Пароль <span>*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={s.input}
            />
          </div>

          <div className={s.formActions}>
            <label className={s.rememberLabel}>
              <div className={`${s.toggleSwitch} ${remember ? s.active : ''}`}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className={s.visuallyHidden}
                />
                <span className={s.slider} />
              </div>
              Запомнить меня
            </label>
            <button type="button" onClick={handleForgot} className={s.forgotLink}>
              ЗАБЫЛИ ПАРОЛЬ?
            </button>
          </div>

          <div className={s.buttonsGroup}>
            <button type="submit" className={s.submitBtn}>
              ВОЙТИ
            </button>
            <button type="button" onClick={handleSignup} className={s.registerBtn}>
              РЕГИСТРАЦИЯ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
