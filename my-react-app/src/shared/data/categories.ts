export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const categories: Category[] = [
  { id: 'banquettes', name: 'Банкетки', slug: 'banketki' },
  { id: 'libraries', name: 'Библиотеки', slug: 'biblioteki' },
  { id: 'vitrines', name: 'Витрины', slug: 'vitriny' },
  { id: 'mirrors', name: 'Зеркала', slug: 'zerkala' },
  { id: 'commodes', name: 'Комоды', slug: 'komody' },
  { id: 'consoles', name: 'Консоль', slug: 'konsol' },
  { id: 'beds', name: 'Кровати', slug: 'krovati' },
  { id: 'shelves', name: 'Полки', slug: 'polki' },
  { id: 'racks', name: 'Стеллажи', slug: 'stellazhi' },
  { id: 'coffee-tables', name: 'Столы журнальные', slug: 'stoly-zhurnalnye' },
  { id: 'dining-tables', name: 'Столы обеденные', slug: 'stoly-obedennye' },
  { id: 'desks', name: 'Столы письменные', slug: 'stoly-pismennye' },
  { id: 'chairs', name: 'Стулья', slug: 'stulya' },
  { id: 'stools', name: 'Табуреты', slug: 'taburety' },
  { id: 'vanity', name: 'Туалетные столики', slug: 'tualetnye-stoliki' },
  { id: 'bedside', name: 'Тумбы', slug: 'tumby' },
  { id: 'wardrobes', name: 'Шкафы', slug: 'shkafy1' },
];
