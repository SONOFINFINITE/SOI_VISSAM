import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useFilterStore } from '../../../shared/store/useFilterStore';
import { categories } from '../../../shared/data/categories';
import s from './CatalogFilters.module.scss';

// Comprehensive list of collections from CollectionsPage
const availableCollections = [
  'ART-DECO',
  'Bryce',
  'Dalton',
  'Florence',
  'Gven',
  'Manhattan',
  'Maranta',
  'Nice',
  'Soho',
  'Oldem',
  'Sydney',
  'Столовые группы'
];

interface CatalogFiltersProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function CatalogFilters({ isOpen, setIsOpen }: CatalogFiltersProps) {
  const {
    activeCategory, setActiveCategory,
    activeCollection, setActiveCollection,
    activeAvailability, setActiveAvailability,
    priceRange, setPriceRange,
  } = useFilterStore();

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    collections: true,
    availability: true
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleFilterChange = (setter: Function, value: any) => {
    setter(value);
  };

  return (
    <>
      <div
        className={`${s.sidebarOverlay} ${isOpen ? s['sidebarOverlay--open'] : ''}`}
        onClick={() => setIsOpen(false)}
      />
      <aside className={`${s.sidebar} ${isOpen ? s['sidebar--open'] : ''}`}>
        <div className={s.sidebar__header}>
          <button className={s.sidebar__close} onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className={`${s.filterGroup} ${expandedGroups.categories ? s['filterGroup--expanded'] : ''}`}>
          <button className={s.filterGroup__header} onClick={() => toggleGroup('categories')}>
            <h4 className={s.filterGroup__title}>Категории</h4>
            <ChevronDown className={s.filterGroup__icon} size={16} />
          </button>
          <div className={s.filterGroup__content}>
            <div className={s.filterGroup__chips}>
              <button
                className={`${s.chip} ${activeCategory === null ? s['chip--active'] : ''}`}
                onClick={() => { handleFilterChange(setActiveCategory, null); setIsOpen(false); }}
              >
                Все
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`${s.chip} ${activeCategory === cat.name ? s['chip--active'] : ''}`}
                  onClick={() => { handleFilterChange(setActiveCategory, cat.name); setIsOpen(false); }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`${s.filterGroup} ${expandedGroups.collections ? s['filterGroup--expanded'] : ''}`}>
          <button className={s.filterGroup__header} onClick={() => toggleGroup('collections')}>
            <h4 className={s.filterGroup__title}>Коллекция</h4>
            <ChevronDown className={s.filterGroup__icon} size={16} />
          </button>
          <div className={s.filterGroup__content}>
            <div className={s.filterGroup__chips}>
              <button
                className={`${s.chip} ${activeCollection === null ? s['chip--active'] : ''}`}
                onClick={() => { handleFilterChange(setActiveCollection, null); setIsOpen(false); }}
              >
                Все
              </button>
              {availableCollections.map(coll => (
                <button
                  key={coll}
                  className={`${s.chip} ${activeCollection === coll ? s['chip--active'] : ''}`}
                  onClick={() => { handleFilterChange(setActiveCollection, coll); setIsOpen(false); }}
                >
                  {coll}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`${s.filterGroup} ${expandedGroups.availability ? s['filterGroup--expanded'] : ''}`}>
          <button className={s.filterGroup__header} onClick={() => toggleGroup('availability')}>
            <h4 className={s.filterGroup__title}>Наличие</h4>
            <ChevronDown className={s.filterGroup__icon} size={16} />
          </button>
          <div className={s.filterGroup__content}>
            <div className={s.filterGroup__chips}>
              <button
                className={`${s.chip} ${activeAvailability === 'all' ? s['chip--active'] : ''}`}
                onClick={() => handleFilterChange(setActiveAvailability, 'all')}
              >
                Все
              </button>
              <button
                className={`${s.chip} ${activeAvailability === 'in-stock' ? s['chip--active'] : ''}`}
                onClick={() => handleFilterChange(setActiveAvailability, 'in-stock')}
              >
                В наличии
              </button>
              <button
                className={`${s.chip} ${activeAvailability === 'on-order' ? s['chip--active'] : ''}`}
                onClick={() => handleFilterChange(setActiveAvailability, 'on-order')}
              >
                Под заказ
              </button>
            </div>
          </div>
        </div>

        <div className={`${s.filterGroup} ${expandedGroups.price ? s['filterGroup--expanded'] : ''}`}>
          <button className={s.filterGroup__header} onClick={() => toggleGroup('price')}>
            <h4 className={s.filterGroup__title}>Цена (₽)</h4>
            <ChevronDown className={s.filterGroup__icon} size={16} />
          </button>
          <div className={s.filterGroup__content}>
            <div className={s.filterGroup__range}>
              <input
                type="number"
                placeholder="От"
                className={s.filterGroup__input}
                value={priceRange.min}
                onChange={(e) => { setPriceRange(prev => ({ ...prev, min: e.target.value })); }}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="До"
                className={s.filterGroup__input}
                value={priceRange.max}
                onChange={(e) => { setPriceRange(prev => ({ ...prev, max: e.target.value })); }}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
