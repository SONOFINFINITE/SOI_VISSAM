import { useState } from 'react';
import { MapPin, Mail, Phone, Send, ChevronDown } from 'lucide-react';
import { collections } from '../../shared/data/collections';
import s from './Footer.module.scss';

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className={s.footer}>
      <div className={s.main}>

        {/* Column 1: Main Links */}
        <div className={s.col_main}>
          <div className={s.main_links}>
            <a href="/catalog/" className={s.main_link}>КАТАЛОГ</a>
            <a href="/sale/" className={s.main_link}>АКЦИИ</a>
            <a href="/contacts/" className={s.main_link}>КОНТАКТЫ</a>
          </div>
          <div className={`${s.copyright} ${s['desktop-only']}`}>
            {new Date().getFullYear()} © Vissam
          </div>
        </div>

        <div className={s.accordionRow}>
          {/* Column 2: Collections Accordion */}
          <div className={s.col}>
            <div
              className={s.col__header_with_link}
              aria-expanded={openSection === 'collections'}
            >
              <a href="/collection" className={s.col__title}>КОЛЛЕКЦИИ</a>
              <button
                className={s.col__mobile_toggle}
                onClick={() => toggleSection('collections')}
                aria-expanded={openSection === 'collections'}
              >
                <ChevronDown size={14} className={s.col__chevron} />
              </button>
            </div>
            <div className={`${s.col__links} ${openSection === 'collections' ? s['col__links--open'] : ''}`}>
              {collections.slice(0, 5).map((col) => (
                <a key={col.id} href={`/catalog/?collection=${encodeURIComponent(col.name)}`} className={s.col__link}>
                  Коллекция {col.name}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Information Accordion */}
          <div className={s.col}>
            <button
              className={s.col__title}
              onClick={() => toggleSection('info')}
              aria-expanded={openSection === 'info'}
            >
              ИНФОРМАЦИЯ
              <ChevronDown size={14} className={s.col__chevron} />
            </button>
            <div className={`${s.col__links} ${openSection === 'info' ? s['col__links--open'] : ''}`}>
              <a href="/payment" className={s.col__link}>Условия оплаты</a>
              <a href="/delivery" className={s.col__link}>Условия доставки</a>
              <a href="/privacy" className={s.col__link}>Политика конфиденциальности</a>
            </div>
          </div>

          {/* Column 4: Company Accordion */}
          <div className={s.col}>
            <button
              className={s.col__title}
              onClick={() => toggleSection('company')}
              aria-expanded={openSection === 'company'}
            >
              КОМПАНИЯ
              <ChevronDown size={14} className={s.col__chevron} />
            </button>
            <div className={`${s.col__links} ${openSection === 'company' ? s['col__links--open'] : ''}`}>
              <a href="/company/" className={s.col__link}>О компании</a>
            </div>
          </div>
        </div>

        {/* Column 5: Contacts & Social */}
        <div className={s.contacts_col}>
          <div className={s.contact_item_mobile_row}>
            <div className={s.contact_item}>
              <Phone size={14} className={s.contact_icon} />
              <div className={s.contact_text_wrapper}>
                <a href="tel:+79108237272" className={s.contact_phone}>+7 (910) 823-72-72</a>
                <span className={s.contact_dot}>·</span>
                <button className={s.contact_callback}>ЗАКАЗАТЬ ЗВОНОК</button>
              </div>
            </div>
          </div>

          <div className={s.contact_item}>
            <Mail size={14} className={s.contact_icon} />
            <a href="mailto:koksius@mail.ru" className={s.contact_link}>koksius@mail.ru</a>
          </div>
          <div className={s.contact_item}>
            <MapPin size={14} className={s.contact_icon} />
            <span className={s.contact_text}>Ярославская обл, г.Рыбинск,<br />ул.Чкалова, 64</span>
          </div>

          <a href="https://t.me/vissam" target="_blank" rel="noopener noreferrer" className={s.telegram_btn} aria-label="Написать в Telegram">
            <Send size={20} />
          </a>
        </div>
      </div>

      <div className={s.footer_bottom}>
        <div className={s.footer_bottom__inner}>
          <div className={`${s.copyright} ${s['mobile-only']}`}>
            {new Date().getFullYear()} © Vissam
          </div>
        </div>
      </div>
    </footer>
  );
}
