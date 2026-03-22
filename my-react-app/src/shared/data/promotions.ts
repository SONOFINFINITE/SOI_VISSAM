import type { Product } from './products';

export interface Promotion {
  id: string;
  slug: string;
  title: string;
  description: string;
  dates: string;
  discountPercentage: number;
  productIds: string[]; // Changed from single featuredProductId to array
  image: string;
  backgroundColor: string;
}

export const promotions: Promotion[] = [
  {
    id: 'promo-1',
    slug: 'skidka_15_na_pismennye_stoly_iz_kollektsii_bryce',
    title: 'Акция один месяц низкой цены на письменный стол Bryce!',
    description: 'Самое теплое время года – это период, когда проходит распродажа. Успейте заказать товар со скидкой на письменный стол из коллекции Bryce. Успейте купить товар со скидкой 15%. Удачных покупок!',
    dates: '01.03.2026-31.03.2026',
    discountPercentage: 15,
    productIds: ['promo-product-bryce-160'],
    image: 'https://vissam.ru/upload/iblock/ec9/y7qvupbfqq5ou42p87kocj0z3wag0o6f/Aktsiya_Stol_pismennyy_Bryce_15-prots-fon.jpg',
    backgroundColor: '#dbc993',
  },
  {
    id: 'promo-manhattan-banketka',
    slug: 'sale-manhattan-style',
    title: "Скидки до 20% на все банкетки!",
    dates: "15.03.2026-15.04.2026",
    description: "Коллекции Manhattan и Soho — это воплощение американской классики. Только этой весной мы предлагаем специальные условия на наши самые популярные банкетки. \nПривнесите уют и стиль в вашу прихожую или спальню с выгодой 20%.",
    discountPercentage: 20,
    productIds: ['109481', '109421'], // Multiple products
    image: 'https://vissam.ru/upload/resize_cache/iblock/2d9/bbki7vjne98x3hcoffnxqpkuhtxgj63v/1300_600_1/Banketka-belaya-front_b-2000kh1500.jpg',
    backgroundColor: '#f5f5f5',
  }
];

export const promoProducts: Record<string, Product> = {
  'promo-product-bryce-160': {
    id: "promo-product-bryce-160",
    sku: "bryce-160",
    name: "Стол письменный Bryce 160",
    category: "Столы письменные",
    collection: "Bryce",
    price: 38250,
    oldPrice: 45000,
    image: "https://vissam.ru/upload/iblock/b06/y6o6cow0ttlgb65n35ex2epyp2abjqxm/Stol_pismennyy_Bryce_160_2000kh1500_1.jpg",
    isNew: false,
    inStock: true,
    stockCount: 20
  },
  '109481': {
    id: "109481",
    sku: "7016",
    name: "Банкетка Manhattan",
    category: "Банкетки",
    collection: "Manhattan",
    price: 31520,
    oldPrice: 39400,
    image: "https://vissam.ru/upload/resize_cache/iblock/2d9/bbki7vjne98x3hcoffnxqpkuhtxgj63v/600_350_1/Banketka-belaya-front_b-2000kh1500.jpg",
    isNew: false,
    inStock: true,
    stockCount: 5
  },
  '109421': {
    id: "109421",
    sku: "7015",
    name: "Банкетка Soho",
    category: "Банкетки",
    collection: "Soho",
    price: 7360,
    oldPrice: 9200,
    image: "https://vissam.ru/upload/resize_cache/iblock/f42/kmxwva0g8ywfo0rwopr8x1y72w5i7z0m/600_350_1/Banketka_Soho_1_2000kh1500.jpg",
    isNew: false,
    inStock: true,
    stockCount: 5
  }
};
