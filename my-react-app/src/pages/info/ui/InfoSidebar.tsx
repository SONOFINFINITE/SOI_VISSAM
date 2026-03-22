import { Link, useLocation } from 'react-router-dom';
import s from './InfoPage.module.scss';

export function InfoSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className={s.sidebar}>
      <nav className={s.sidebarNav}>
        <Link 
          to="/payment" 
          className={`${s.sidebarLink} ${pathname === '/payment' ? s.active : ''}`}
        >
          Условия оплаты
        </Link>
        <Link 
          to="/delivery" 
          className={`${s.sidebarLink} ${pathname === '/delivery' ? s.active : ''}`}
        >
          Условия доставки
        </Link>
        <Link 
          to="/privacy" 
          className={`${s.sidebarLink} ${pathname === '/privacy' ? s.active : ''}`}
        >
          Политика конфиденциальности
        </Link>
      </nav>
    </aside>
  );
}
