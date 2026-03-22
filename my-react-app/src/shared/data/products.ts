export interface ColorVariant {
  name: string;
  stockCount: number;
  sku: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  collection?: string;
  price: number;
  oldPrice?: number;
  image: string;
  isNew?: boolean;
  inStock: boolean;
  stockCount?: number;
  colors?: ColorVariant[];
  quickSpecs?: ProductSpec[];
  fullSpecs?: ProductSpec[];
}



export const catalogProducts: Product[] = [
  {
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
    stockCount: 5,
    colors: [
      { name: 'Бежевый', stockCount: 3, sku: "7015-BE" },
      { name: 'Серый', stockCount: 2, sku: "7015-GR" },
      { name: 'Черный', stockCount: 0, sku: "7015-BK" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '0.15' },
      { label: 'Количество мест (шт)', value: '1' },
      { label: 'Глубина', value: '38 см' },
      { label: 'Материал обивки', value: 'Велюр' },
      { label: 'Упаковка', value: 'Пленка/Картон' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '95 × 38 × 45 см' },
      { label: 'Вес', value: '9 кг' },
      { label: 'Каркас', value: 'Массив березы' },
      { label: 'Наполнитель', value: 'ППУ высокой плотности' },
      { label: 'Производитель', value: 'VISSAM' }
    ]
  },
  {
    id: "109481",
    sku: "7016",
    name: "Банкетка Manhattan",
    category: "Банкетки",
    collection: "Manhattan",
    price: 31520,
    oldPrice: 39400,
    image: "https://vissam.ru/upload/resize_cache/iblock/2d9/bbki7vjne98x3hcoffnxqpkuhtxgj63v/600_350_1/Banketka-belaya-front_b-2000kh1500.jpg",
    isNew: false,
    inStock: false,
    colors: [
      { name: 'Белый', stockCount: 0, sku: "7016-WH" },
      { name: 'Черный', stockCount: 0, sku: "7016-BK" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '0.3' },
      { label: 'Количество мест (шт)', value: '1' },
      { label: 'Глубина', value: '45 см' },
      { label: 'Опоры', value: 'Металл (золото)' },
      { label: 'Упаковка', value: 'Гофрокороб' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '130 × 45 × 52 см' },
      { label: 'Вес', value: '22 кг' },
      { label: 'Обивка', value: 'Экокожа Premium' },
      { label: 'Стиль', value: 'Американская классика' },
      { label: 'Страна', value: 'Россия' }
    ]
  },
  {
    id: "122422",
    sku: "23018",
    name: "Витрина 2 дверная ART-DECO",
    category: "Витрины",
    collection: "ART-DECO",
    price: 264600,
    image: "https://vissam.ru/upload/resize_cache/iblock/00e/ezg0cmwo1ieyibr5pt9yni3dxc71xpq7/600_350_1/Vitrina-2-dvernaya-ART_DECO.jpg",
    isNew: false,
    inStock: true,
    stockCount: 1,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "23018-DW" },
      { name: 'Белый', stockCount: 2, sku: "23018-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '1.4' },
      { label: 'Полки', value: 'Стекло 6мм' },
      { label: 'Подсветка', value: 'LED опционально' },
      { label: 'Фасад', value: 'Шпон дуба' },
      { label: 'Стекло', value: 'Закаленное' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '120 × 48 × 210 см' },
      { label: 'Вес', value: '115 кг' },
      { label: 'Материал', value: 'МДФ, Шпон дуба, Закаленное стекло' },
      { label: 'Фурнитура', value: 'Blum (Австрия)' },
      { label: 'Гарантия', value: '24 месяца' }
    ]
  },
  {
    id: "109433",
    sku: "12033",
    name: "Витрина 1 дверная левая Bryce",
    category: "Витрины",
    collection: "Bryce",
    price: 140500,
    image: "https://vissam.ru/upload/resize_cache/iblock/37c/kz459rm3635nsjh75wl4ekp1c7z7v2fz/600_350_1/Vitrina-1-dvernaya-levaya-Bryce_2000kh1500_1.jpg",
    isNew: false,
    inStock: true,
    stockCount: 3,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12033-DW" },
      { name: 'Белый', stockCount: 2, sku: "12033-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '0.65' },
      { label: 'Открывание', value: 'Левое' },
      { label: 'Глубина', value: '42 см' },
      { label: 'Материал', value: 'МДФ' },
      { label: 'Колво ящиков', value: '1' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '65 × 42 × 195 см' },
      { label: 'Вес', value: '68 кг' },
      { label: 'Покрытие', value: 'Матовый лак' },
      { label: 'Стиль', value: 'Минимализм' },
      { label: 'Срок службы', value: '10 лет' }
    ]
  },
  {
    id: "109434",
    sku: "12034",
    name: "Витрина 1 дверная правая Bryce",
    category: "Витрины",
    collection: "Bryce",
    price: 140500,
    image: "https://vissam.ru/upload/resize_cache/iblock/c09/rro5978j8py0chtnspuykdsnofyzplha/600_350_1/Vitrina-1-dvernaya-pravaya-Bryce_2000kh1500_1.jpg",
    isNew: false,
    inStock: false,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12034-DW" },
      { name: 'Белый', stockCount: 2, sku: "12034-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '0.65' },
      { label: 'Открывание', value: 'Правое' },
      { label: 'Глубина', value: '42 см' },
      { label: 'Материал', value: 'МДФ' },
      { label: 'Колво ящиков', value: '1' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '65 × 42 × 195 см' },
      { label: 'Вес', value: '68 кг' },
      { label: 'Покрытие', value: 'Матовый лак' },
      { label: 'Стиль', value: 'Минимализм' },
      { label: 'Срок службы', value: '10 лет' }
    ]
  },
  {
    id: "109432",
    sku: "12032",
    name: "Витрина 2 дверная Bryce",
    category: "Витрины",
    collection: "Bryce",
    price: 210300,
    image: "https://vissam.ru/upload/resize_cache/iblock/76d/12t7tlersiomevol7a0nfvrm9jgprfoj/600_350_1/Vitrina-2-dvernaya-Bryce_2000kh1500_1.jpg",
    isNew: false,
    inStock: true,
    stockCount: 2,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12032-DW" },
      { name: 'Белый', stockCount: 2, sku: "12032-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '1.2' },
      { label: 'Глубина', value: '42 см' },
      { label: 'Количество дверей', value: '2' },
      { label: 'Упаковка', value: '3 коробки' },
      { label: 'Сборка', value: 'Требуется' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '120 × 42 × 195 см' },
      { label: 'Вес', value: '98 кг' },
      { label: 'Материал', value: 'МДФ, Шпон, Металл' },
      { label: 'Производитель', value: 'VISSAM' },
      { label: 'Кол-во полок', value: '6 (регулируемые)' }
    ]
  },
  {
    id: "122653",
    sku: "12053",
    name: "Витрина 2 дверная Dalton",
    category: "Витрины",
    collection: "Dalton",
    price: 267600,
    image: "https://vissam.ru/upload/resize_cache/iblock/d31/ewni2vsk51zvj76hetcy7hjhvf3c7jju/600_350_1/Vitrina-2-dvernaya-Dalton_2000kh1500_1.jpg",
    isNew: false,
    inStock: true,
    stockCount: 1,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12053-DW" },
      { name: 'Белый', stockCount: 2, sku: "12053-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '1.5' },
      { label: 'Дизайн', value: 'Неоклассика' },
      { label: 'Глубина', value: '50 см' },
      { label: 'Ножки', value: 'Массив бука' },
      { label: 'Двери', value: 'Стекло с фацетом' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '125 × 50 × 215 см' },
      { label: 'Вес', value: '125 кг' },
      { label: 'Материал корпуса', value: 'МДФ ПЭ' },
      { label: 'Декор', value: 'Резные элементы ручной работы' },
      { label: 'Фурнитура', value: 'Италия' }
    ]
  },
  {
    id: "119655",
    sku: "12055",
    name: "Витрина 1 дверная универсальная Gven",
    category: "Витрины",
    collection: "Gven",
    price: 167900,
    image: "https://vissam.ru/upload/resize_cache/iblock/58a/ctxo74ipmgnqg94yk0ai49tswb6xjs9g/600_350_1/Vitrina-1-dvernaya-Gven-levaya_2000kh1500_1.jpg",
    isNew: false,
    inStock: false,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12055-DW" },
      { name: 'Белый', stockCount: 2, sku: "12055-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '0.8' },
      { label: 'Тип', value: 'Универсальная (Л/П)' },
      { label: 'Глубина', value: '45 см' },
      { label: 'Стиль', value: 'Скандинавский' },
      { label: 'Ящики', value: 'С доводчиками' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '70 × 45 × 200 см' },
      { label: 'Вес', value: '75 кг' },
      { label: 'Материал', value: 'Массив сосны, шпон' },
      { label: 'Цвет', value: 'Натуральный дуб' },
      { label: 'Особенности', value: 'Перевешиваемая дверь' }
    ]
  },
  {
    id: "119663",
    sku: "12063",
    name: "Витрина 2 дверная Gven",
    category: "Витрины",
    collection: "Gven",
    price: 238600,
    image: "https://vissam.ru/upload/resize_cache/iblock/efd/1zv0wvegkr22uho2xs3oa0d639prlwmb/600_350_1/Vitrina-2-dvernaya-Gven_2000kh1500_1.jpg",
    isNew: false,
    inStock: true,
    stockCount: 4,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12063-DW" },
      { name: 'Белый', stockCount: 2, sku: "12063-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '1.4' },
      { label: 'Количество полок', value: '5' },
      { label: 'Глубина', value: '45 см' },
      { label: 'Материал фасада', value: 'Стекло в раме' },
      { label: 'Упаковка', value: '4 места' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '130 × 45 × 200 см' },
      { label: 'Вес', value: '110 кг' },
      { label: 'Корпус', value: 'ЛДСП Egger' },
      { label: 'Фасады', value: 'Рамочный профиль МДФ' },
      { label: 'Фурнитура', value: 'Hettich' }
    ]
  },
  {
    id: "110282",
    sku: "12082",
    name: "Витрина 1 дверная левая MARANTA",
    category: "Витрины",
    collection: "Maranta",
    price: 46400,
    image: "https://vissam.ru/upload/resize_cache/iblock/0b1/g1tlo8g0hs00on7pvd94cqkws94ifp8l/600_350_1/Vitrina-1-dvernaya-MARANTA_2000kh1500.jpg",
    isNew: false,
    inStock: true,
    stockCount: 8,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12082-DW" },
      { name: 'Белый', stockCount: 2, sku: "12082-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '0.4' },
      { label: 'Глубина', value: '35 см' },
      { label: 'Тип', value: 'Бюджетная классика' },
      { label: 'Материал', value: 'ЛДСП' },
      { label: 'Цвет корпуса', value: 'Кремовый' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '55 × 35 × 185 см' },
      { label: 'Вес', value: '42 кг' },
      { label: 'Материал', value: 'ЛДСП, Стекло обычное' },
      { label: 'Производитель', value: 'VISSAM-Basic' },
      { label: 'Страна', value: 'Россия' }
    ]
  },
  {
    id: "110295",
    sku: "12095",
    name: "Витрина 1 дверная правая MARANTA",
    category: "Витрины",
    collection: "Maranta",
    price: 46400,
    image: "https://vissam.ru/upload/resize_cache/iblock/344/p36d1ui0w814epew2phbyr3fdh949b5v/600_350_1/Vitrina-1-dvernaya-MARANTA_2000kh1500.jpg",
    isNew: false,
    inStock: false,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12095-DW" },
      { name: 'Белый', stockCount: 2, sku: "12095-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '0.4' },
      { label: 'Глубина', value: '35 см' },
      { label: 'Тип', value: 'Бюджетная классика' },
      { label: 'Материал', value: 'ЛДСП' },
      { label: 'Петли', value: 'Без доводчиков' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '55 × 35 × 185 см' },
      { label: 'Вес', value: '42 кг' },
      { label: 'Материал', value: 'ЛДСП, Стекло обычное' },
      { label: 'Производитель', value: 'VISSAM-Basic' },
      { label: 'Страна', value: 'Россия' }
    ]
  },
  {
    id: "110281",
    sku: "12081",
    name: "Витрина 2 дверная MARANTA",
    category: "Витрины",
    collection: "Maranta",
    price: 75700,
    image: "https://vissam.ru/upload/resize_cache/iblock/8d5/sbmrrnwk33nqcvf1gd3aagyvstt6c2i9/600_350_1/Vitrina-2-dvernaya-_-krem-_-1.jpg",
    isNew: false,
    inStock: true,
    stockCount: 3,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12081-DW" },
      { name: 'Белый', stockCount: 2, sku: "12081-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '0.8' },
      { label: 'Глубина', value: '35 см' },
      { label: 'Двери', value: 'Распашные 2 шт' },
      { label: 'Упаковка', value: '2 места' },
      { label: 'Каркас', value: 'Усиленный' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '105 × 35 × 185 см' },
      { label: 'Вес', value: '78 кг' },
      { label: 'Материал', value: 'ЛДСП, МДФ профиль' },
      { label: 'Полки', value: 'ЛДСП/Стекло' },
      { label: 'Срок гарантии', value: '18 месяцев' }
    ]
  },
  {
    id: "119487",
    sku: "12187",
    name: "Витрина 1 дверная левая Nice",
    category: "Витрины",
    collection: "Nice",
    price: 151900,
    image: "https://vissam.ru/upload/resize_cache/iblock/33d/i48zmo6ekg64es3get161p8ykzfg9m3u/600_350_1/Vitrina-1-dvernaya-levaya-Nice_molochnyy_2000kh1500_1.jpg",
    isNew: false,
    inStock: true,
    stockCount: 2,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12187-DW" },
      { name: 'Белый', stockCount: 2, sku: "12187-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '0.7' },
      { label: 'Глубина', value: '40 см' },
      { label: 'Цвет', value: 'Молочный' },
      { label: 'Ручки', value: 'Керамика/Металл' },
      { label: 'Ящики', value: '2 выдвижных' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '60 × 40 × 205 см' },
      { label: 'Вес', value: '62 кг' },
      { label: 'Материал', value: 'МДФ, Эмаль' },
      { label: 'Стиль', value: 'Прованс' },
      { label: 'Опоры', value: 'Изогнутые' }
    ]
  },
  {
    id: "119488",
    sku: "12188",
    name: "Витрина 1 дверная правая Nice",
    category: "Витрины",
    collection: "Nice",
    price: 151900,
    image: "https://vissam.ru/upload/resize_cache/iblock/24a/60v4jqgdi1l541x98wffru3ajihhci50/600_350_1/Vitrina-1-dvernaya-pravaya-Nice_molochnyy_2000kh1500_1.jpg",
    isNew: false,
    inStock: false,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12188-DW" },
      { name: 'Белый', stockCount: 2, sku: "12188-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '0.7' },
      { label: 'Глубина', value: '40 см' },
      { label: 'Цвет', value: 'Молочный' },
      { label: 'Петли', value: 'С доводчиками' },
      { label: 'Ящики', value: '2 выдвижных' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '60 × 40 × 205 см' },
      { label: 'Вес', value: '62 кг' },
      { label: 'Материал', value: 'МДФ, Эмаль' },
      { label: 'Стиль', value: 'Прованс' },
      { label: 'Опоры', value: 'Изогнутые' }
    ]
  },
  {
    id: "119489",
    sku: "12189",
    name: "Витрина 2 дверная Nice",
    category: "Витрины",
    collection: "Nice",
    price: 231600,
    image: "https://vissam.ru/upload/resize_cache/iblock/a52/w584p1vdkk9y3s2webivbb51xbsgq7mb/600_350_1/Vitrina-2-dvernaya-Nice_molochnyy_2000kh1500_1.jpg",
    isNew: false,
    inStock: true,
    stockCount: 5,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12189-DW" },
      { name: 'Белый', stockCount: 2, sku: "12189-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '1.3' },
      { label: 'Глубина', value: '40 см' },
      { label: 'Цвет', value: 'Молочный' },
      { label: 'Тип стекла', value: 'С фацетом' },
      { label: 'Карниз', value: 'Резной' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '110 × 40 × 205 см' },
      { label: 'Вес', value: '105 кг' },
      { label: 'Материал', value: 'МДФ, Эмаль' },
      { label: 'Стиль', value: 'Прованс' },
      { label: 'Количество полок', value: '8 (4 стеклянные)' }
    ]
  },
  {
    id: "109479",
    sku: "12279",
    name: "Витрина 1 дверная левая с зеркалом Manhattan",
    category: "Витрины",
    collection: "Manhattan",
    price: 118100,
    image: "https://vissam.ru/upload/resize_cache/iblock/3be/9s52tiwzqswd81pgd1cqj5y6h20k32b8/600_350_1/Vitrina_1_dvernaya_levaya_s_zerkalom_Manhattan_belyy_1_2000kh1500.jpg",
    isNew: false,
    inStock: true,
    stockCount: 1,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12279-DW" },
      { name: 'Белый', stockCount: 2, sku: "12279-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '0.6' },
      { label: 'Зеркало', value: 'Внутреннее' },
      { label: 'Глубина', value: '38 см' },
      { label: 'Подсветка', value: 'Встроена' },
      { label: 'Стиль', value: 'Модерн' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '60 × 38 × 190 см' },
      { label: 'Вес', value: '58 кг' },
      { label: 'Материал', value: 'МДФ, Глянец' },
      { label: 'Декор', value: 'Зеркальное полотно' },
      { label: 'Тип открывания', value: 'Push-to-open' }
    ]
  },
  {
    id: "109480",
    sku: "12280",
    name: "Витрина 1 дверная правая с зеркалом Manhattan",
    category: "Витрины",
    collection: "Manhattan",
    price: 118100,
    image: "https://vissam.ru/upload/resize_cache/iblock/ae3/q9q57t0wa4qa42721ob5ta5gzig8vrbe/600_350_1/Vitrina_1_dvernaya_pravaya_s_zerkalom_Manhattan_belyy_1_2000kh1500.jpg",
    isNew: false,
    inStock: false,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12280-DW" },
      { name: 'Белый', stockCount: 2, sku: "12280-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '0.6' },
      { label: 'Зеркало', value: 'Внутреннее' },
      { label: 'Глубина', value: '38 см' },
      { label: 'Подсветка', value: 'Встроена' },
      { label: 'Стиль', value: 'Модерн' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '60 × 38 × 190 см' },
      { label: 'Вес', value: '58 кг' },
      { label: 'Материал', value: 'МДФ, Глянец' },
      { label: 'Декор', value: 'Зеркальное полотно' },
      { label: 'Тип открывания', value: 'Push-to-open' }
    ]
  },
  {
    id: "109482",
    sku: "12282",
    name: "Витрина 2 дверная с зеркалом Manhattan",
    category: "Витрины",
    collection: "Manhattan",
    price: 162300,
    image: "https://vissam.ru/upload/resize_cache/iblock/ab5/9w962hd2wsg0b8gugh11h20j4zf3t78b/600_350_1/Vitrina_2_dvernaya_s_zerkalom_Manhattan_belyy_1_2000kh1500.jpg",
    isNew: false,
    inStock: true,
    stockCount: 2,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12282-DW" },
      { name: 'Белый', stockCount: 2, sku: "12282-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '1.1' },
      { label: 'Зеркало', value: 'Задняя стенка' },
      { label: 'Глубина', value: '38 см' },
      { label: 'Подсветка', value: '2 точки LED' },
      { label: 'Стиль', value: 'Модерн' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '115 × 38 × 190 см' },
      { label: 'Вес', value: '102 кг' },
      { label: 'Материал', value: 'МДФ, Глянец, Стекло' },
      { label: 'Фурнитура', value: 'Blum' },
      { label: 'Производитель', value: 'VISSAM' }
    ]
  },
  {
    id: "109454",
    sku: "12354",
    name: "Витрина 1 дверная левая Sydney",
    category: "Витрины",
    collection: "Sydney",
    price: 141134,
    image: "https://vissam.ru/upload/resize_cache/iblock/9a5/4oi6u251mz68iqylfi0xhmna49kmou3v/600_350_1/Vitrina_1_dvernaya_Sydney_1_2000kh1500.jpg",
    isNew: false,
    inStock: true,
    stockCount: 3,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12354-DW" },
      { name: 'Белый', stockCount: 2, sku: "12354-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '0.75' },
      { label: 'Глубина', value: '45 см' },
      { label: 'Текстура', value: 'Натуральное дерево' },
      { label: 'Места (шт)', value: '1' },
      { label: 'Упаковка', value: 'Гофрокороб' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '65 × 45 × 200 см' },
      { label: 'Вес', value: '72 кг' },
      { label: 'Материал', value: 'Массив ясеня' },
      { label: 'Покрытие', value: 'Масло-воск' },
      { label: 'Дизайн', value: 'Лофт/Эко' }
    ]
  },
  {
    id: "109455",
    sku: "12355",
    name: "Витрина 1 дверная правая Sydney",
    category: "Витрины",
    collection: "Sydney",
    price: 141134,
    image: "https://vissam.ru/upload/resize_cache/iblock/e5d/2ugnj5pxtj9ix2ai75867ktqpu2jdd70/600_350_1/Vitrina_1_dvernaya_Sydney_1_2000kh1500.jpg",
    isNew: false,
    inStock: false,
    colors: [
      { name: 'Дуб Венге', stockCount: 5, sku: "12355-DW" },
      { name: 'Белый', stockCount: 2, sku: "12355-WH" }
    ],
    quickSpecs: [
      { label: 'Объем (м3)', value: '0.75' },
      { label: 'Глубина', value: '45 см' },
      { label: 'Текстура', value: 'Натуральное дерево' },
      { label: 'Места (шт)', value: '1' },
      { label: 'Упаковка', value: 'Гофрокороб' }
    ],
    fullSpecs: [
      { label: 'Размеры', value: '65 × 45 × 200 см' },
      { label: 'Вес', value: '72 кг' },
      { label: 'Материал', value: 'Массив ясеня' },
      { label: 'Покрытие', value: 'Масло-воск' },
      { label: 'Дизайн', value: 'Лофт/Эко' }
    ]
  },
  {
    id: "promo-product-bryce-160",
    sku: "BR-160-DSK",
    name: "Стол письменный Bryce 160",
    category: "Столы письменные",
    collection: "Bryce",
    price: 38250,
    oldPrice: 45000,
    image: "https://vissam.ru/upload/iblock/b06/y6o6cow0ttlgb65n35ex2epyp2abjqxm/Stol_pismennyy_Bryce_160_2000kh1500_1.jpg",
    isNew: false,
    inStock: true,
    stockCount: 20,
    colors: [
      { name: 'Белый', stockCount: 15, sku: "BR-160-DSK-WH" },
      { name: 'Черный', stockCount: 5, sku: "BR-160-DSK-BK" }
    ],
    quickSpecs: [
      { label: 'Ширина', value: '160 см' },
      { label: 'Глубина', value: '70 см' },
      { label: 'Высота', value: '75 см' }
    ]
  }
];

