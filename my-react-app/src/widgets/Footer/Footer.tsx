import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { collections } from '../../shared/data/collections';
import s from './Footer.module.scss';

export function Footer() {
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
          <div className={s.copyright}>
            {new Date().getFullYear()} © Vissam
          </div>
        </div>

        <div className={s.accordionRow}>
          {/* Column 2: Collections */}
          <div className={s.col}>
            <a href="/collection" className={s.col__title}>КОЛЛЕКЦИИ</a>
            <div className={s.col__links}>
              {collections.slice(0, 5).map((col) => (
                <a key={col.id} href={`/catalog/?collection=${encodeURIComponent(col.name)}`} className={s.col__link}>
                  Коллекция {col.name}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Information */}
          <div className={s.col}>
            <div className={s['desktop-only']}>
              <div className={s.col__title}>ИНФОРМАЦИЯ</div>
            </div>
            <div className={s['mobile-only']}>
              <a href="/privacy" className={s.col__title}>ИНФОРМАЦИЯ</a>
            </div>
            <div className={s.col__links}>
              <a href="/payment" className={s.col__link}>Условия оплаты</a>
              <a href="/delivery" className={s.col__link}>Условия доставки</a>
              <a href="/privacy" className={s.col__link}>Политика конфиденциальности</a>
            </div>
          </div>

          {/* Column 4: Company */}
          <div className={s.col}>
            <div className={s['desktop-only']}>
              <div className={s.col__title}>КОМПАНИЯ</div>
            </div>
            <div className={s['mobile-only']}>
              <a href="/company" className={s.col__title}>КОМПАНИЯ</a>
            </div>
            <div className={s.col__links}>
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
          <div className={s.copyright}>
            {new Date().getFullYear()} © Vissam
          </div>
        </div>
      </div>
    </footer>
  );
}
