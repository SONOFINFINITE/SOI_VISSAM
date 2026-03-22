import React, { useState, useRef } from 'react';
import s from './CheckoutPage.module.scss';
import { ArrowRight, Check } from 'lucide-react';
import { searchCities } from '../../../shared/third-party-api/city-search.service';

interface CheckoutFormProps {
  deliveryMethod: 'courier' | 'pickup';
  onDeliveryChange: (method: 'courier' | 'pickup') => void;
  onSubmit: () => void;
}

export function CheckoutForm({ deliveryMethod, onDeliveryChange, onSubmit }: CheckoutFormProps) {
  const [buyerType, setBuyerType] = useState<'physical' | 'legal'>('physical');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'invoice' | 'online' | 'halva'>('online');

  // City search state
  const [cityQuery, setCityQuery] = useState('');
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [isCityFocused, setIsCityFocused] = useState(false);
  const suggestionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [agreement, setAgreement] = useState(true);

  const fetchCities = async (query: string) => {
    if (query.trim().length < 2) {
      setCitySuggestions([]);
      return;
    }
    const results = await searchCities(query);
    setCitySuggestions(results || []);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCityQuery(val);
    if (suggestionTimeout.current) clearTimeout(suggestionTimeout.current);
    suggestionTimeout.current = setTimeout(() => {
      fetchCities(val);
    }, 300);
  };

  const selectCity = (city: string) => {
    setCityQuery(city);
    setCitySuggestions([]);
    setIsCityFocused(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreement) {
      alert('Необходимо согласие на обработку персональных данных');
      return;
    }
    onSubmit();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      {/* 1. Тип покупателя и регион */}
      <div className={s.section}>
        <h2 className={s.sectionTitle}>Тип покупателя и регион доставки</h2>

        <div className={s.radioRow}>
          <label className={`${s.radioLabelSmall} ${buyerType === 'physical' ? s.active : ''}`}>
            <input
              type="radio"
              name="buyerType"
              checked={buyerType === 'physical'}
              onChange={() => setBuyerType('physical')}
            />
            <div className={s.radioCustom}></div>
            <span className={s.radioTitle}>Физическое лицо</span>
          </label>
          <label className={`${s.radioLabelSmall} ${buyerType === 'legal' ? s.active : ''}`}>
            <input
              type="radio"
              name="buyerType"
              checked={buyerType === 'legal'}
              onChange={() => setBuyerType('legal')}
            />
            <div className={s.radioCustom}></div>
            <span className={s.radioTitle}>Юридическое лицо</span>
          </label>
        </div>

        <div className={s.autocompleteField}>
          <div className={s.field}>
            <input
              type="text"
              id="city"
              placeholder="Введите город доставки..."
              value={cityQuery}
              onChange={handleCityChange}
              onFocus={() => setIsCityFocused(true)}
              onBlur={() => setTimeout(() => setIsCityFocused(false), 200)}
              required
            />
            <label htmlFor="city">Город доставки *</label>
          </div>
          {isCityFocused && citySuggestions.length > 0 && (
            <ul className={s.suggestionsList}>
              {citySuggestions.map((city, idx) => (
                <li key={idx} onClick={() => selectCity(city)}>
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 2. Способ доставки */}
      <div className={s.section}>
        <h2 className={s.sectionTitle}>Способ доставки</h2>
        <div className={s.radioGroup2Col}>
          <label className={`${s.radioLabel} ${deliveryMethod === 'courier' ? s.active : ''}`}>
            <input
              type="radio"
              name="delivery"
              checked={deliveryMethod === 'courier'}
              onChange={() => onDeliveryChange('courier')}
            />
            <div className={s.radioCustom}></div>
            <div className={s.radioInfo}>
              <span className={s.radioTitle}>Доставка курьером</span>
              <span className={s.radioHighlight}>2 500 руб.</span>
              <span className={s.radioDesc}>Доставка осуществляется в течение дня в удобное для вас время.</span>
            </div>
          </label>

          <label className={`${s.radioLabel} ${deliveryMethod === 'pickup' ? s.active : ''}`}>
            <input
              type="radio"
              name="delivery"
              checked={deliveryMethod === 'pickup'}
              onChange={() => onDeliveryChange('pickup')}
            />
            <div className={s.radioCustom}></div>
            <div className={s.radioInfo}>
              <span className={s.radioTitle}>Самовывоз</span>
              <span className={s.radioHighlight}>Бесплатно</span>
              <span className={s.radioDesc}>Вы можете самостоятельно забрать заказ из нашего магазина в Москве.</span>
            </div>
          </label>
        </div>
      </div>

      {/* 3. Способ оплаты */}
      <div className={s.section}>
        <h2 className={s.sectionTitle}>Способ оплаты</h2>
        <div className={s.radioGroup2Col}>
          <label className={`${s.radioLabel} ${paymentMethod === 'cash' ? s.active : ''}`}>
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
            />
            <div className={s.radioCustom}></div>
            <div className={s.radioInfo}>
              <span className={s.radioTitle}>Наличные курьеру</span>
            </div>
          </label>

          <label className={`${s.radioLabel} ${paymentMethod === 'invoice' ? s.active : ''}`}>
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === 'invoice'}
              onChange={() => setPaymentMethod('invoice')}
            />
            <div className={s.radioCustom}></div>
            <div className={s.radioInfo}>
              <span className={s.radioTitle}>Счет на оплату</span>
            </div>
          </label>

          <label className={`${s.radioLabel} ${paymentMethod === 'online' ? s.active : ''}`}>
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === 'online'}
              onChange={() => setPaymentMethod('online')}
            />
            <div className={s.radioCustom}></div>
            <div className={s.radioInfo}>
              <span className={s.radioTitle}>Онлайн оплата на сайте</span>
            </div>
          </label>

          <label className={`${s.radioLabel} ${paymentMethod === 'halva' ? s.active : ''}`}>
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === 'halva'}
              onChange={() => setPaymentMethod('halva')}
            />
            <div className={s.radioCustom}></div>
            <div className={s.radioInfo}>
              <span className={s.radioTitle}>Онлайн оплата с рассрочкой по карте ХАЛВА</span>
            </div>
          </label>
        </div>
        <div className={s.paymentNote}>
          Оплата производится наличными деньгами, в момент получения заказа. Подтверждением вашей оплаты является чек, вручаемый во время получения заказа.
        </div>
      </div>

      {/* 4. Покупатель */}
      <div className={s.section}>
        <h2 className={s.sectionTitle}>Покупатель</h2>

        <div className={s.field}>
          <input type="text" id="fullname" placeholder="Иванов Иван Иванович" required />
          <label htmlFor="fullname">Ф.И.О. *</label>
        </div>

        <div className={s.row}>
          <div className={s.field}>
            <input type="email" id="email" placeholder="example@mail.com" required />
            <label htmlFor="email">E-Mail *</label>
          </div>
          <div className={s.field}>
            <input type="tel" id="phone" placeholder="+7 (999) 000-00-00" required />
            <label htmlFor="phone">Телефон *</label>
          </div>
        </div>

        {deliveryMethod === 'courier' && (
          <div className={s.addressBlock}>
            <div className={s.field}>
              <input type="text" id="street" placeholder="Улица" required />
              <label htmlFor="street">Улица *</label>
            </div>
            <div className={s.addressRow}>
              <div className={s.field}>
                <input type="text" id="house" placeholder="Дом" required />
                <label htmlFor="house">Дом *</label>
              </div>
              <div className={s.field}>
                <input type="text" id="building" placeholder="Корпус" />
                <label htmlFor="building">Корп/Стр</label>
              </div>
              <div className={s.field}>
                <input type="text" id="entrance" placeholder="Подъезд" />
                <label htmlFor="entrance">Подъезд</label>
              </div>
            </div>
            <div className={s.addressRow}>
              <div className={s.field}>
                <input type="text" id="floor" placeholder="Этаж" />
                <label htmlFor="floor">Этаж</label>
              </div>
              <div className={s.field}>
                <input type="text" id="apartment" placeholder="Квартира" />
                <label htmlFor="apartment">Кв/Офис</label>
              </div>
            </div>
          </div>
        )}

        <div className={s.field}>
          <textarea id="comment" placeholder="Уточнения для курьера или менеджера" rows={3} />
          <label htmlFor="comment">Комментарий к заказу</label>
        </div>
      </div>

      {/* Consent & Submit */}
      <div className={s.submitSection}>
        <label className={s.checkboxLabel}>
          <input
            type="checkbox"
            checked={agreement}
            onChange={(e) => setAgreement(e.target.checked)}
          />
          <div className={s.checkboxCustom}>
            {agreement && <Check size={14} color="#5a5048" />}
          </div>
          <span>Я согласен на <a href="#">обработку персональных данных</a></span>
        </label>

        <button type="submit" className={s.submitBtn} disabled={!agreement}>
          Оформить заказ <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
}
