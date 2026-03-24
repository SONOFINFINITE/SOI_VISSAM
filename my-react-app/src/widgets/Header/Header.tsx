import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, ChevronDown, Menu, X, Phone, MapPin, Mail, Send } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { collections } from '../../shared/data/collections';
import { useCartStore } from '../../shared/store/useCartStore';
import { useFavoritesStore } from '../../shared/store/useFavoritesStore';
import { useAuthStore } from '../../shared/store/useAuthStore';
import s from './Header.module.scss';
import { SearchOverlay } from './SearchOverlay';
import { SigninModal } from '../signin-modal';

gsap.registerPlugin(useGSAP);

const LOGO = 'https://vissam.ru/upload/CMax/650/251a84v2lva4w80xr1ircnuv44e2tye2/logo_5.png';

interface HeaderProps {
  isTransparentMobile?: boolean;
}

export function Header({ isTransparentMobile = false }: HeaderProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Store interaction
  const cartItems = useCartStore((state) => state.items);
  const favoritesItems = useFavoritesStore((state) => state.items);
  const { isAuthenticated, orders, setAuthModalOpen } = useAuthStore();

  const activeOrdersCount = orders.filter(o => o.type === 'active').length;

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const favoritesCount = favoritesItems.length;

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(`.${s.header__top}`, {
      y: -60,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });

    tl.from(`.${s.header__logo}`, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(1.5)'
    }, "-=0.3");

    tl.from(`.${s.nav__item}`, {
      y: -10,
      opacity: 0,
      duration: 0.3,
      stagger: 0.04,
      ease: 'power1.out'
    }, "-=0.2");
  }, { scope: containerRef });

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Check scroll position from window or root element
          const isMobile = window.innerWidth < 1024;
          const scrollY = isMobile 
            ? document.getElementById('root')?.scrollTop || 0
            : window.scrollY;
          
          const shouldBeSticky = scrollY > 50;
          if (shouldBeSticky !== isSticky) {
            setIsSticky(shouldBeSticky);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Set initial height based on viewport
    const isMobile = window.innerWidth < 1024;
    setHeaderHeight(isMobile ? 70 : 90);
    
    // Listen to scroll on appropriate element
    const scrollElement = isMobile ? document.getElementById('root') : window;
    scrollElement?.addEventListener('scroll', handleScroll, { passive: true } as any);
    
    return () => {
      scrollElement?.removeEventListener('scroll', handleScroll);
    };
  }, [isSticky]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isHomePage = location.pathname === '/';
  const isTransparent = isTransparentMobile && isHomePage && !isSticky;

  return (
    <div ref={containerRef}>
      {/* Placeholder to prevent layout shift when header becomes fixed */}
      {isSticky && <div style={{ height: `${headerHeight || 70}px` }} />}
      
      <header ref={headerRef} className={`${s.header} ${isSticky ? s['header--sticky'] : ''} ${isTransparent ? s['is-transparent'] : ''}`}>
        <div className={s.header__top}>
          <div className={s.header__inner}>

            {/* Left */}
            <div className={s.header__left}>
              <button
                className={s.header__hamburger}
                onClick={() => setMobileOpen(true)}
                aria-label="Открыть меню"
              >
                <Menu size={26} strokeWidth={1.5} />
              </button>

              <div className={s.header__phone_wrapper}>
                <a href="tel:+79108237272" className={s.header__phone}>
                  +7 (910) 823-72-72
                </a>
                <span className={s.header__dot}>·</span>
              </div>
            </div>

            {/* Center */}
            <Link to="/" className={s.header__logo}>
              <img src={LOGO} alt="Vissam — Премиальная мебель" loading="lazy" />
            </Link>

            {/* Right */}
            <div className={s.header__actions}>
              <a href="tel:+79108237272" className={`${s.header__action_icon} ${s['mobile-only']}`} aria-label="Позвонить">
                <Phone size={26} strokeWidth={1.5} />
              </a>

              <button className={s.header__action_icon} aria-label="Поиск" onClick={() => setIsSearchOpen(true)}>
                <Search size={26} strokeWidth={1.5} />
              </button>

              <button className={s.header__action_badge} onClick={() => isAuthenticated ? navigate('/personal/') : setAuthModalOpen(true)} aria-label="Войти">
                <User size={26} strokeWidth={1.5} />
                {isAuthenticated && activeOrdersCount > 0 && <span className={s.badge}>{activeOrdersCount}</span>}
              </button>

              <Link to="/favorites" className={`${s.header__action_badge} ${s['desktop-only']}`} aria-label="Отложенные">
                <Heart size={26} strokeWidth={1.5} />
                {favoritesCount > 0 && <span className={s.badge}>{favoritesCount}</span>}
              </Link>

              <Link to="/cart" className={s.header__action_badge} aria-label="Корзина">
                <ShoppingCart size={26} strokeWidth={1.5} />
                {cartCount > 0 && <span className={s.badge}>{cartCount}</span>}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Nav Row */}
        <div className={s.header__bottom}>
          <div className={s.header__inner}>
            <ul className={s.nav__list}>
              {/* Catalog — direct link */}
              <li className={s.nav__item}>
                <Link to="/catalog/" className={s.nav__link}>
                  Каталог
                </Link>
              </li>

              {/* Collections — dropdown */}
              <li className={s.nav__item}>
                <Link to="/collection" className={s.nav__link}>
                  Коллекции <ChevronDown size={13} />
                </Link>
                <div className={s.dropdown}>
                  {collections.map((col) => (
                    <Link
                      key={col.id}
                      to={`/catalog/?collection=${encodeURIComponent(col.name)}`}
                      className={s.dropdown__link}
                    >
                      Коллекция {col.name}
                    </Link>
                  ))}
                </div>
              </li>

              <li className={s.nav__item}>
                <Link to="/sale" className={s.nav__link}>Акции</Link>
              </li>

              <li className={s.nav__item}>
                <a href="/blog/" className={s.nav__link}>Блог</a>
              </li>

              <li className={s.nav__item}>
                <a href="/company/" className={s.nav__link}>Компания</a>
              </li>

              <li className={s.nav__item}>
                <a href="/contacts/" className={s.nav__link}>Контакты</a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Mobile / Sticky Drawer */}
      <div className={`${s['mobile-drawer']} ${mobileOpen ? s['mobile-drawer--open'] : ''}`}>
        <div className={s['mobile-drawer__overlay']} onClick={() => setMobileOpen(false)} />
        <div className={s['mobile-drawer__panel']}>
          <button
            className={s['mobile-drawer__close']}
            onClick={() => setMobileOpen(false)}
            aria-label="Закрыть меню"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          <div className={s['mobile-drawer__content']}>
            <div className={s['mobile-drawer__section']}>
              <Link to="/catalog/" className={s['mobile-drawer__link']}>
                Каталог
              </Link>
              <Link to="/collection" className={s['mobile-drawer__link']}>
                Коллекции
              </Link>
              <Link to="/sale" className={s['mobile-drawer__link']}>Акции</Link>
              <a href="/blog/" className={s['mobile-drawer__link']}>Блог</a>
              <a href="/company/" className={s['mobile-drawer__link']}>Компания</a>
              <a href="/contacts/" className={s['mobile-drawer__link']}>Контакты</a>
            </div>

            <div className={s['mobile-drawer__section']}>
              <a
                href="#"
                className={s['mobile-drawer__icon-link']}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  if (isAuthenticated) navigate('/personal/');
                  else setAuthModalOpen(true);
                }}
              >
                <User size={18} /> Личный кабинет
              </a>
              <Link to="/cart" className={s['mobile-drawer__icon-link']} onClick={() => setMobileOpen(false)}>
                <ShoppingCart size={18} /> Корзина {cartCount > 0 && <span className={s['mobile-drawer__badge']}>{cartCount}</span>}
              </Link>
              <Link to="/favorites" className={s['mobile-drawer__icon-link']} onClick={() => setMobileOpen(false)}>
                <Heart size={18} /> Отложенные {favoritesCount > 0 && <span className={s['mobile-drawer__badge']}>{favoritesCount}</span>}
              </Link>
            </div>

            <div className={s['mobile-drawer__section']}>
              <a href="tel:+79108237272" className={s['mobile-drawer__phone-link']}>
                <Phone size={18} /> +7 (910) 823-72-72
              </a>
            </div>

            <div className={`${s['mobile-drawer__section']} ${s['mobile-drawer__section--no-border']}`}>
              <div className={s['mobile-drawer__contacts-title']}>Контактная информация</div>
              <div className={s['mobile-drawer__contact-item']}>
                <MapPin size={16} /> <span className={s['mobile-drawer__contact-text']}>Ярославская обл, г.Рыбинск,<br />ул.Чкалова, 64</span>
              </div>
              <div className={s['mobile-drawer__contact-item']}>
                <Mail size={16} /> <a href="mailto:koksius@mail.ru">koksius@mail.ru</a>
              </div>

              <a href="https://t.me/vissam" target="_blank" rel="noopener noreferrer" className={s['mobile-drawer__telegram']}>
                <Send size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <SigninModal />
    </div>
  );
}

