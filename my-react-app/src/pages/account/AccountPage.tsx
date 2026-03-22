import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { LogOut, Package, User, KeyRound } from 'lucide-react';

import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { useAuthStore } from '../../shared/store/useAuthStore';
import s from './AccountPage.module.scss';
import { useNavigate } from 'react-router-dom';

type Tab = 'orders' | 'profile' | 'password';
type OrderStatus = 'all' | 'active' | 'completed' | 'cancelled';


export function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [orderFilter, setOrderFilter] = useState<OrderStatus>('all');
  const { logout, orders, user } = useAuthStore();
  const navigate = useNavigate();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const q = gsap.utils.selector(containerRef);
      
      // Title letter-by-letter animation
      gsap.fromTo(q('.title-char'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: 'power4.out',
          delay: 0.1
        }
      );

      gsap.fromTo(q(`.${s.sidebar}`),
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      );

      gsap.fromTo(q(`.${s.content}`),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      );
    }
  }, { scope: containerRef });

  useGSAP(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'all' }
      );
    }
  }, [activeTab, orderFilter]);

  const filteredOrders = orders.filter(o => orderFilter === 'all' || o.type === orderFilter);

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
      <main className={s.page} ref={containerRef}>
        <div className={s.container}>
          
          <div className={s.header}>
            <h1 className={s.mainTitle}>
              {renderTitle('ЛИЧНЫЙ КАБИНЕТ')}
            </h1>
          </div>

          <div className={s.layout}>
            
            {/* Sidebar Navigation */}
            <aside className={s.sidebar}>
              <nav className={s.nav}>
                <button 
                  className={`${s.navItem} ${activeTab === 'orders' ? s.active : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <Package size={18} />
                  Мои заказы
                </button>
                <button 
                  className={`${s.navItem} ${activeTab === 'profile' ? s.active : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <User size={18} />
                  Личные данные
                </button>
                <button 
                  className={`${s.navItem} ${activeTab === 'password' ? s.active : ''}`}
                  onClick={() => setActiveTab('password')}
                >
                  <KeyRound size={18} />
                  Сменить пароль
                </button>
                <button 
                  className={`${s.navItem} ${s.logout}`}
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  <LogOut size={18} />
                  Выйти
                </button>
              </nav>
            </aside>

            {/* Main Content Area */}
            <div className={s.content}>
              <div ref={contentRef}>
                {/* ORDERS TAB */}
                {activeTab === 'orders' && (
                  <div className={s.section}>
                    <h2 className={s.sectionTitle}>МОИ ЗАКАЗЫ</h2>
                    
                    <div className={s.filterTabs}>
                      <button 
                        className={`${s.filterTab} ${orderFilter === 'all' ? s.active : ''}`}
                        onClick={() => setOrderFilter('all')}
                      >
                        Все заказы
                      </button>
                      <button 
                        className={`${s.filterTab} ${orderFilter === 'active' ? s.active : ''}`}
                        onClick={() => setOrderFilter('active')}
                      >
                        Текущие
                      </button>
                      <button 
                        className={`${s.filterTab} ${orderFilter === 'completed' ? s.active : ''}`}
                        onClick={() => setOrderFilter('completed')}
                      >
                        Завершенные
                      </button>
                      <button 
                        className={`${s.filterTab} ${orderFilter === 'cancelled' ? s.active : ''}`}
                        onClick={() => setOrderFilter('cancelled')}
                      >
                        Отмененные
                      </button>
                    </div>

                    <div className={s.ordersList}>
                      {filteredOrders.length > 0 ? (
                        <table className={s.table}>
                          <thead>
                            <tr>
                              <th>Номер</th>
                              <th>Дата</th>
                              <th>Товаров</th>
                              <th>Сумма</th>
                              <th>Статус</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredOrders.map(order => (
                              <tr key={order.id}>
                                <td className={s.orderId} data-label="Номер">{order.id}</td>
                                <td data-label="Дата">{order.date}</td>
                                <td data-label="Товаров">{order.items}</td>
                                <td className={s.orderTotal} data-label="Сумма">{order.total}</td>
                                <td data-label="Статус">
                                  <span className={`${s.statusBadge} ${s[`status-${order.type}`]}`}>
                                    {order.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className={s.emptyState}>
                          <Package size={48} strokeWidth={1} />
                          <p>В этой категории пока нет заказов</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* PROFILE TAB */}
                {activeTab === 'profile' && (
                  <div className={s.section}>
                    <h2 className={s.sectionTitle}>ЛИЧНЫЕ ДАННЫЕ</h2>
                    <form className={s.form} onSubmit={e => e.preventDefault()}>
                      <div className={s.formGrid}>
                        <div className={s.inputGroup}>
                          <label>Фамилия Имя Отчество</label>
                          <input type="text" defaultValue={user?.name || ''} className={s.input} />
                        </div>
                        <div className={s.inputGroup}>
                          <label>E-mail</label>
                          <input type="email" defaultValue={user?.email || ''} className={s.input} />
                        </div>
                        <div className={s.inputGroup}>
                          <label>Телефон</label>
                          <input type="tel" defaultValue={user?.phone || ''} className={s.input} />
                        </div>
                      </div>
                      <button type="submit" className={s.submitBtn}>СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
                    </form>
                  </div>
                )}

                {/* PASSWORD TAB */}
                {activeTab === 'password' && (
                  <div className={s.section}>
                    <h2 className={s.sectionTitle}>СМЕНА ПАРОЛЯ</h2>
                    <form className={s.form} onSubmit={e => e.preventDefault()}>
                      <div className={s.formGrid}>
                        <div className={s.inputGroup}>
                          <label>Текущий пароль</label>
                          <input type="password" required className={s.input} />
                        </div>
                        <div className={s.inputGroup}>
                          <label>Новый пароль</label>
                          <input type="password" required className={s.input} />
                        </div>
                        <div className={s.inputGroup}>
                          <label>Подтверждение пароля</label>
                          <input type="password" required className={s.input} />
                        </div>
                      </div>
                      <button type="submit" className={s.submitBtn}>ОБНОВИТЬ ПАРОЛЬ</button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
