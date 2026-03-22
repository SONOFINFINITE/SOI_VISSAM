const CDN = 'https://vissam.ru/upload/resize_cache/uf';

export interface Collection {
  id: string;
  name: string;
  slug: string;
  link: string;
  description: string;
  images: string[];
}

export const collections: Collection[] = [
  {
    id: 'art-deco',
    name: 'ART-DECO',
    slug: 'kollektsiya-art-deco',
    link: '/catalog/kollektsii/kollektsiya-art-deco/',
    description:
      'Коллекция ART-DECO — это воплощение элегантности, роскоши и утонченного стиля 1920–30-х годов. Выполнена из массива дуба в цвете дуб венге — тёмный насыщенный оттенок с коричневым и чёрным подтоном создаёт ощущение природной роскоши. Ручки из натуральной латуни добавляют изысканности. Наклонная фрезеровка на фасадах создаёт уникальный характер и эффект объёмности.',
    images: [
      `${CDN}/f55/ajgq6jlyjwda4d20uj62iwu89ry57sy0/700_550_1/stol-pismennyy-artdeko.png`,
      `${CDN}/129/h7d6rzbgqajje4lz4rzv8w9uah09qmta/700_550_1/art-deko-stol-pismennyy.png`,
      `${CDN}/86b/6ugcswrev09orml1ftbbbbw40r6c86t6/700_550_1/art-deko.png`,
      `${CDN}/318/90cx6dypjg6wfm4slie5ii60i2ecf2vh/700_550_1/art-deko_1.png`,
      `${CDN}/008/w5tw7j3t50oc0hzk74t21r7h2qniqtl3/700_550_1/art-deko_2.png`,
      `${CDN}/473/se8wxsc7b7clws2thc21shny5fbyvfpj/700_550_1/stol-pism-artdeko.png`,
    ],
  },
  {
    id: 'bryce',
    name: 'Bryce',
    slug: 'kollektsiya-bryce',
    link: '/catalog/kollektsii/kollektsiya-bryce/',
    description:
      'Фасады с фрезеровкой коллекции Bryce — один из самых модных трендов этого года. Идеально вписывается в интерьеры минимализма, скандинавского, классического и неоклассического стилей. Гармонично смотрится как со стенами с грубой обработкой, так и с декоративными рейками.',
    images: [
      'https://i.pinimg.com/originals/cc/57/6d/cc576d5dfecd2756c3e167a4cfb93221.png',
      `${CDN}/bc5/uusjydlnlptxzozm2rtax7riiz0uohnl/700_550_1/TVtumba_2.jpg`,
      `${CDN}/53e/q1u8xnm45n6hcazjx6ssuzw8pf4by50r/700_550_1/Konsol_s_3_mya_yashchikami_Bryce_dub-kapuchino_1_2000kh1500.jpg`,
      `${CDN}/76a/k0np6giizpccbritibfpjxjzpljqtmot/700_550_1/Vitrina_2_3.jpg`,
      `${CDN}/efb/zi7nalam5272fcm3t13qxptqrr5dj140/700_550_1/Komod_3_2.jpg`,
      `${CDN}/1dd/6oa0m62c6clm3dylt8j6nc0pyco6pxvr/700_550_1/Komod_6_3.jpg`,
      `${CDN}/956/z7obj54y1ijue4vup015bkbau2fodah5/700_550_1/Konsol_2_3.jpg`,
      `${CDN}/a54/w1u2yxt7hziybfslgs1mo6s9i4vx2jva/700_550_1/Bed_3.jpg`,
      `${CDN}/d07/0q5ld8agyx8hmuduy3hmd0ybo2g6hqwu/700_550_1/Stellaj_2.jpg`,
      `${CDN}/aa8/41tt9m7i1d7zh62esbbzw9nfikiutn14/700_550_1/Table140_2.jpg`,
    ],
  },
  {
    id: 'dalton',
    name: 'Dalton',
    slug: 'kollektsiya-dalton',
    link: '/catalog/kollektsii/kollektsiya-dalton/',
    description:
      'Натуральный дуб (массив + шпон) коллекции — ключевой маркер стиля mid-century. Тёплый, спокойный оттенок древесины без контрастной тонировки. Латунные ручки подчёркивают геометрию фасадов. Баланс между строгостью и уютом, скруглённые углы и мягкие переходы. Отлично впишется в интерьеры «тихий люкс», Japandi, modern eclectic.',
    images: [
      'https://i.pinimg.com/originals/8c/41/2d/8c412dd8be78a6542e389359667bc03f.jpg',
      `${CDN}/80a/221hio6hwg1afzyh4n5ir5ong5y8h360/700_550_1/Bufet-4_kh-dvernyy-Dalton_2000kh1500_5.jpg`,
      `${CDN}/0bd/57dromok6y99rj7jzwcvw85trkms42c2/700_550_1/Tumba-prikrovatnaya-Dalton-s-1-yashchikom_seraya-galka_2000kh1500_5.jpg`,
      `${CDN}/d6c/s3ssi4k1zv8h68e2jyi3f6wthfyjd7kq/700_550_1/Vitrina-2-dvernaya-Dalton_2000kh1500_4.jpg`,
      `${CDN}/c0d/h8phq41tnpvbn1nnnm8mkp9whmy72mfn/700_550_1/Vitrina-2-dvernaya-Dalton_2000kh1500_3.jpg`,
      `${CDN}/510/pvzwqse7czrrs3jh4szak02aluk2g4g5/700_550_1/Komod-s-6_yu-yashchikami-Dalton_2000kh1500_7.jpg`,
      `${CDN}/f74/yl27nqa8kbr429n5qcn34i33qr13ympp/700_550_1/Komod-s-6_yu-yashchikami-Dalton_2000kh1500_3.jpg`,
      `${CDN}/4b2/2i49izubxf2k9wunr6j8ajdos7qtjqjw/700_550_1/Konsol-s-3_mya-yashchikami-Dalton_2000kh1500_8.jpg`,
      `${CDN}/25c/mrico8kk2qo0ri7l9iw1xcvmq2lekbuj/700_550_1/Stol-zhurnalnyy-Dalton-kruglyy_2000kh1500_4.jpg`,
    ],
  },
  {
    id: 'florence',
    name: 'Florence',
    slug: 'kollektsiya-florence',
    link: '/catalog/kollektsii/kollektsiya-florence/',
    description:
      'Коллекция мебели Florence в оливковом цвете вдохновляет своей элегантностью. Цвет оливки привносит теплоту и уют, а сочетание с чёрными ножками создаёт стильный контраст. Корпус и фасад из качественного МДФ с эмалевым покрытием, ножки из массива бука.',
    images: [
      'https://i.pinimg.com/originals/4c/57/b9/4c57b9cb82116d085c79257b187b07fb.jpg',
      `${CDN}/630/t6cfwq16sa6pw842q8wcslmo5oe01stt/700_550_1/Tumba-TV-6-yashchikov_2000kh1500_1.jpg`,
      `${CDN}/7f1/1tx0plhljr2c8pdin5z9jhda9efq1mxi/700_550_1/Komod-3-yashchika-2000kh1500_1.jpg`,
      `${CDN}/c9c/vzdx8w4jvlupt2lxsu6td9krsuawmq0s/700_550_1/Tumba-prikrovatnaya-s-2-yashchikami-2000kh1500.jpg`,
      `${CDN}/2cf/uhy2mc97um7aya6bro43qhs1oqxv2nec/700_550_1/Tumba-prikrovatnaya-s-1-yashchikom_2000kh1500_1.jpg`,
      `${CDN}/5e3/gj46sgi7n59odeynattrp5gpnpr5a47s/700_550_1/Tumba-TV-4-yashchika_2000kh1500_1.jpg`,
      `${CDN}/07c/snqcavrnlv03vft0ahc0fs2vz01ayrtb/700_550_1/Komod-3-dverki-3-yashchika-2000kh1500.jpg`,
    ],
  },
  {
    id: 'gven',
    name: 'Gven',
    slug: 'kollektsiya-gven',
    link: '/catalog/kollektsii/kollektsiya-gven/',
    description:
      'Стиль минимализм и натуральное дерево идеально гармонируют в коллекции Gven. МДФ и шпон дуба обеспечивают долговечность. Ножки из массива дуба, мебельные ручки под латунь придают утончённый вид. Доступны цвета: глейс американский орех, серая галька, кофе клейс.',
    images: [
      'https://artum.studio/Images/6614.6ecab194fa26b9a38115f56ceac20e1d.jpg',
      `${CDN}/6ad/4h8wyqhgnxhz86wml0rtmhf58bzye2lg/700_550_1/Konsol-s-2_mya-yashchikami-Gven_2000kh1500_3.jpg`,
      `${CDN}/2f0/su8b6h39ycm1dcb5efpo7j55v5u1tzzv/700_550_1/vitrina-gven.png`,
      `${CDN}/a61/5nqj2qqprx6ororjsszyetfpjxm7yfs6/700_550_1/Komod-s-3_mya-yashchikami-Gven_galka_2000kh1500_3.jpg`,
      `${CDN}/174/na7rlc59aybhnhagw3e1j3fgadeqw3cr/700_550_1/Komod-s-3_mya-yashchikami-Gven_gleys_2000kh1500_6.jpg`,
      `${CDN}/a84/ybvzcxir1xn0ihq822zbswgvycpkwmgx/700_550_1/Vitrina-2-dvernaya-Gven_2000kh1500_2.jpg`,
      `${CDN}/35d/szshhj9eow502r2i3jzp1otpfmarqvpk/700_550_1/Komod-s-6_yu-yashchikami-Gven_2000kh1500_4.jpg`,
      `${CDN}/220/4ms54prre6ph3b0brk55acsxlr78nmze/700_550_1/Tumba-TV-s-2_mya-yashch-i-2_mya-rasp-fasadami-Gven_2000kh1500_3.jpg`,
      `${CDN}/e2d/zz2aoy4gyyn3niwthzp3w4t2optmh3re/700_550_1/Stol-pismennyy-160-Gven_kofe_2000kh1500_3.jpg`,
      `${CDN}/a30/710acooc7f3cnrsoabvfufvzvitd0ru1/700_550_1/Tumba-prikrovatnaya-Gven-s-1-yashchikom_galka_2000kh1500_2.jpg`,
    ],
  },
  {
    id: 'manhattan',
    name: 'Manhattan',
    slug: 'kollektsiya-manhattan',
    link: '/catalog/kollektsii/kollektsiya-manhattan_1/',
    description:
      'Коллекция Manhattan — стильные лаконичные модели из натурального массива бука. Прямые чёткие линии, трапециевидное расширение ножек. Фактурные дверцы добавляют изысканности. Геометричная фурнитура подчёркивает классические линии. Доступна в 4 цветах: белый, молочный, серый и чёрный.',
    images: [
      `${CDN}/485/h19ewj8uspughf1p6gdyszyjqimdyvzy/700_550_1/mankhetten.png`,
      `${CDN}/d0a/i1240b999918cg2b61aqnwn0aweskv0y/700_550_1/1_Interactive-LightMix.jpg`,
      `${CDN}/dfb/paf7jeqs10a98kuvn15w7ne20uz0zl8k/700_550_1/3_Interactive-LightMix-_1_.jpg`,
      `${CDN}/34d/ipfrgtt5suewaj01esntk2is20zwflkp/700_550_1/Bruklin-101.jpg`,
      `${CDN}/32f/kqy32epu37izqh164c9y4ybgjy8sy1xh/700_550_1/Bruklin2.jpg`,
      `${CDN}/b8b/tze92z6pwx5q04skfrfjni2gwhoryvpj/700_550_1/2_Interactive-LightMix.jpg`,
      `${CDN}/3ac/j17doebvxud38f1hj08ao0db44q0ue4t/700_550_1/00_Post-_002_11.jpg`,
    ],
  },
  {
    id: 'maranta',
    name: 'MARANTA',
    slug: 'kollektsiya-maranta',
    link: '/catalog/kollektsii/kollektsiya-maranta/',
    description:
      'Коллекция MARANTA — стильное и функциональное решение. Комоды, витрины, тумбы, зеркала и консоли. Ножки и ручки из массива бука, фасад из МДФ со шпоном ясеня. Лаконичность и элегантность линий уместна как в классических, так и в современных интерьерах.',
    images: [
      `${CDN}/ade/u414ms3anq3mngs3weptzkczsoauu071/700_550_1/KOMOD-3-YASHCHIKA-kremovyy_0.jpg`,
      `${CDN}/5f8/lawiczouib1ua9hnrh2avwj6q8e6acez/700_550_1/konsol-maranta.png`,
      `${CDN}/09b/2m9f61mklqi2tck3e83wadx9x929x0q7/700_550_1/DSC07074-kopiya-2.jpg`,
      `${CDN}/33e/jnlxkrkiibj2asyk17kq9sflm5qxa9f2/700_550_1/DSC07116-kopiya-2.jpg`,
      `${CDN}/796/nyefl7tp8hy9nofx0pj6din66f2rd1sr/700_550_1/DSC07139-kopiya-2.jpg`,
      `${CDN}/c03/p0qffvk8ogiswhkbxljvo5s8jgwgecro/700_550_1/DSC07093.jpg`,
    ],
  },
  {
    id: 'nice',
    name: 'Nice',
    slug: 'kollektsiya-nice',
    link: '/catalog/kollektsii/kollektsiya-nice/',
    description:
      'Коллекция мебели Nice представлена в нежном молочном и пудровом оттенках. Ножки из массива бука, корпус и фасад из МДФ с эмалью. Фасады с гладкой поверхностью и вертикальной фрезеровкой. В коллекции: витрины, комоды, консоли, кровати, шкафы, столы и тумбы.',
    images: [
      `${CDN}/b0f/huqme6tihyxt9cp6u3c4zoyzysboxbw6/700_550_1/SHkaf-trekhstvorchatyy-Nice_pudrovyy_2000kh1500_1.jpg`,
      `${CDN}/35b/i36wr3wdfvvxp31182hobpl2h0dqhp4l/700_550_1/nitstsa.jpg`,
      `${CDN}/ecd/mzcy1ntzmun1h4wxih23adokvsd4enaw/700_550_1/8043LBLBL-komod-bolshoy-front.jpg`,
      `${CDN}/500/thfn8ezf0sh3p75v028h2c0ecuygtcnm/700_550_1/8046PBLOR-komod-na-vysokikh-nozhkakh-bolshoy.jpg`,
      `${CDN}/4ae/2kfcrmdjj006l5af3habye3k4dhdxc4c/700_550_1/8054LBLOR-tualetnyy-stol.jpg`,
      `${CDN}/6fe/h1l0xv1jvshvpfowsu333vgqkg1q2w1g/700_550_1/NIZZA-BED-1800_2000_2.jpg`,
      `${CDN}/13b/6d2466pekzicjiwl9o32n8cs745yk3g7/700_550_1/Tumba-TV-bolshaya-s-4_mya-raspashnymi-fasadami-Nice_molochnyy_2000kh1500.jpg`,
    ],
  },
  {
    id: 'soho',
    name: 'Soho',
    slug: 'kollektsiya-soho',
    link: '/catalog/kollektsii/kollektsiya-soho_1/',
    description:
      'Изделия коллекции SOHO отлично впишутся в любой интерьер. Стиль контемпорари объединяет европейскую элегантность и скандинавскую ясность форм. Прямые и чёткие линии, аккуратные изгибы на углах придают мягкость. Утончённый акцент в виде закруглённых элементов.',
    images: [
      `${CDN}/ffb/n889wz12ln2d989f0rxk35rnra1fl8ro/700_550_1/IMG_0457.jpg`,
      `${CDN}/4f3/xabttxqxck72p6rcqq23e5ofxkpldj5w/700_550_1/tumba-sokho.png`,
      `${CDN}/5b1/xmtux2r24q2m33al73t7rvefhrbv6q0a/700_550_1/IMG_0352.jpg`,
      `${CDN}/5eb/vhwhoo2x3kd784xj82kbgmuclum0h0fe/700_550_1/IMG_0418.jpg`,
      `${CDN}/bc8/fldfkmq7yunxswxb72dkrtocczodavt9/700_550_1/4A0A9574_redakt.jpg`,
      `${CDN}/cdc/umfqf8ied8cx0h3k9zy81kxq61ekk4yx/700_550_1/4A0A9739_redakt.jpg`,
      `${CDN}/163/sdg2xoq2a2xepqntsbo6ktu77dnya6b8/700_550_1/IMG_0296.jpg`,
    ],
  },
  {
    id: 'oldem',
    name: 'Oldem',
    slug: 'kollektsiya-oldem',
    link: '/catalog/kollektsii/kollektsiya-oldem/',
    description:
      'Коллекция Oldem из массива дуба и шпона дуба создаёт уютную и натуральную атмосферу. Лёгкая фрезеровка на фасадах добавляет изящества. Ножки, царга и ручки из массива дуба. Корпус и фасады из МДФ 18 мм с матовой эмалью в графитовом сером и бежевом цвете.',
    images: [
      `${CDN}/f1a/ebxsipy9zljyrdly6l06wpl09wj8r6uf/700_550_1/OLDEM-Konsol-bolshaya-s-2_ya-yashchikami-1_1.png`,
      `${CDN}/2c5/0wabqc5izb6s3sdiw63hztcmptdaz2ek/700_550_1/OLDEM-Konsol-malaya-s-2_ya-yashchikami-1_1.png`,
      `${CDN}/f29/u230a5zqwohpp8pb1myvgy4kgd2yrlox/700_550_1/OLDEM-Komod-bolshoy-bolshoy-s-4_ya-yashchikami-i-fasadom-1_1.png`,
      `${CDN}/c91/xa8yzpba9r41jrnvvuzmv010sn4kqkn1/700_550_1/OLDEM-Tumba-prikrovatnaya-1_1.png`,
    ],
  },
  {
    id: 'sydney',
    name: 'Sydney',
    slug: 'kollektsiya-sydney',
    link: '/catalog/kollektsii/kollektsiya-sydney_1/',
    description:
      'Коллекция Sydney выполнена из натурального массива дуба. Изделия отличаются интересным сочетанием латунной фурнитуры с темно-графитовым цветом основания, что создаёт благородный и при этом современный стильный дизайн.',
    images: [
      `${CDN}/b80/sn58eyhy1bi36ahcw2dfjf34bmajx4hh/700_550_1/IMG_0236-2000kh1500.jpg`,
      `${CDN}/765/o9upgmu9xk1ysd5s25n9v49o3wuuxb6i/700_550_1/Komod-sidney2.png`,
      `${CDN}/639/aqfgjysy15qwzx2cfne6vhhuk6i1bc8l/700_550_1/komod-sidney.png`,
      `${CDN}/294/ukfq4sz7fciu27tsnn9nxkujn6995she/700_550_1/IMG_0612.jpg`,
      `${CDN}/bc9/0iymksa8b3yi68fijud02t6ji3kk97kn/700_550_1/IMG_0481_-copy.jpg`,
      `${CDN}/31b/85wvwqzx4orajew6wrff9ab3xflz6hse/700_550_1/IMG_0553.jpg`,
      `${CDN}/254/fl42hlmqawo9smgoe3ahkd37gxhl65l3/700_550_1/IMG_0590.jpg`,
      `${CDN}/d8e/3ha00i4cws8jk9ggkcumz6spupsh3zji/700_550_1/IMG_0267-2000kh2500.jpg`,
      `${CDN}/17d/o5ejyyc8345h6bb7tafi1q6spqo7251y/700_550_1/IMG_0257-2000kh2500.jpg`,
    ],
  },
];

// Hero slider images (Sydney collection showcase)
export const heroSlides = [
  {
    id: 1,
    image: `${CDN}/b80/sn58eyhy1bi36ahcw2dfjf34bmajx4hh/700_550_1/IMG_0236-2000kh1500.jpg`,
    collection: 'Коллекция Sydney',
    description:
      'Выполнена из натурального массива дуба. Латунная фурнитура с темно-графитовым цветом основания.',
    link: '/catalog/kollektsii/kollektsiya-sydney_1/',
  },
  {
    id: 2,
    image: `${CDN}/294/ukfq4sz7fciu27tsnn9nxkujn6995she/700_550_1/IMG_0612.jpg`,
    collection: 'Коллекция Sydney',
    description:
      'Благородный и при этом современный стильный дизайн для вашего дома.',
    link: '/catalog/kollektsii/kollektsiya-sydney_1/',
  },
  {
    id: 3,
    image: `${CDN}/d8e/3ha00i4cws8jk9ggkcumz6spupsh3zji/700_550_1/IMG_0267-2000kh2500.jpg`,
    collection: 'Коллекция Sydney',
    description:
      'Натуральный массив дуба в сочетании с изысканной латунной фурнитурой.',
    link: '/catalog/kollektsii/kollektsiya-sydney_1/',
  },
];
