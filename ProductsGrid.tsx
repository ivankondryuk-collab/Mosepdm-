import { PrismaClient, ProductSeries } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Начало заполнения базы данных...");

  // Создаем администратора
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD ?? "admin123",
    10
  );
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL ?? "admin@mosepdm.ru" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL ?? "admin@mosepdm.ru",
      name: "Администратор",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });
  console.log("✅ Администратор создан");

  // Категории
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "epdm-crumbs" },
      update: {},
      create: {
        name: "ЭПДМ крошка",
        slug: "epdm-crumbs",
        description: "Цветная резиновая крошка из EPDM каучука для создания ярких покрытий",
        image: "https://placehold.co/400x300/FF4C00/FFFFFF?text=ЭПДМ+крошка",
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: "rubber-crumbs" },
      update: {},
      create: {
        name: "Резиновая крошка",
        slug: "rubber-crumbs",
        description: "Черная резиновая крошка из вторичного сырья для нижнего слоя покрытий",
        image: "https://placehold.co/400x300/1A1A1A/FFFFFF?text=Резиновая+крошка",
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: "polyurethane-glue" },
      update: {},
      create: {
        name: "Полиуретановый клей",
        slug: "polyurethane-glue",
        description: "Однокомпонентный и двухкомпонентный клей для укладки резиновых покрытий",
        image: "https://placehold.co/400x300/374151/FFFFFF?text=ПУ+Клей",
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: "ready-coverings" },
      update: {},
      create: {
        name: "Готовые изделия",
        slug: "ready-coverings",
        description: "Готовые резиновые плиты, дорожки и бордюры",
        image: "https://placehold.co/400x300/6B7280/FFFFFF?text=Готовые+изделия",
        order: 4,
      },
    }),
  ]);
  console.log("✅ Категории созданы");

  const epdmCat = categories[0];
  const rubberCat = categories[1];
  const glueCat = categories[2];
  const readyCat = categories[3];

  // Продукты
  const productsData = [
    // ЭПДМ крошка
    {
      name: "ЭПДМ крошка Красная (серия Standard)",
      slug: "epdm-crumbs-red-standard",
      sku: "EPDM-RED-STD",
      description: "Цветная крошка из EPDM каучука красного цвета. Содержание каучука не менее 22%. Предназначена для верхнего декоративного слоя бесшовных покрытий детских и спортивных площадок.",
      shortDesc: "Яркая красная крошка EPDM, фракция 1-4 мм",
      price: 85000,
      priceOnRequest: false,
      inStock: true,
      images: [
        "https://placehold.co/600x400/CC0000/FFFFFF?text=EPDM+Красная",
        "https://placehold.co/600x400/FF4C00/FFFFFF?text=Фракция+1-4мм",
      ],
      thickness: "Фракция 1-4 мм",
      composition: "EPDM каучук ≥22%, наполнитель, красители",
      coverType: "Верхний декоративный слой",
      colorRange: "Красный (RAL 3020)",
      series: ProductSeries.STANDARD,
      surfaceType: "Бесшовное покрытие",
      popular: true,
      featured: true,
      categoryId: epdmCat.id,
      certDocs: [],
    },
    {
      name: "ЭПДМ крошка Синяя (серия Standard)",
      slug: "epdm-crumbs-blue-standard",
      sku: "EPDM-BLUE-STD",
      description: "Цветная крошка из EPDM каучука синего цвета. Содержание каучука не менее 22%. Применяется для разметки дорожек, спортивных зон и детских площадок.",
      shortDesc: "Синяя крошка EPDM для спортивных покрытий",
      price: 85000,
      priceOnRequest: false,
      inStock: true,
      images: [
        "https://placehold.co/600x400/1E40AF/FFFFFF?text=EPDM+Синяя",
        "https://placehold.co/600x400/3B82F6/FFFFFF?text=Фракция+1-4мм",
      ],
      thickness: "Фракция 1-4 мм",
      composition: "EPDM каучук ≥22%, наполнитель, красители",
      coverType: "Верхний декоративный слой",
      colorRange: "Синий (RAL 5005)",
      series: ProductSeries.STANDARD,
      surfaceType: "Бесшовное покрытие",
      popular: true,
      featured: false,
      categoryId: epdmCat.id,
      certDocs: [],
    },
    {
      name: "ЭПДМ крошка Зеленая (серия Classic)",
      slug: "epdm-crumbs-green-classic",
      sku: "EPDM-GRN-CLS",
      description: "Крошка EPDM зеленого цвета серии Classic. Повышенное содержание каучука обеспечивает улучшенную эластичность и долговечность покрытия. Идеально для футбольных полей и беговых дорожек.",
      shortDesc: "Зеленая крошка EPDM, серия Classic",
      price: 92000,
      priceOnRequest: false,
      inStock: true,
      images: [
        "https://placehold.co/600x400/16A34A/FFFFFF?text=EPDM+Зеленая",
        "https://placehold.co/600x400/22C55E/FFFFFF?text=Серия+Classic",
      ],
      thickness: "Фракция 1-4 мм",
      composition: "EPDM каучук ≥25%, наполнитель, красители",
      coverType: "Верхний декоративный слой",
      colorRange: "Зеленый (RAL 6018)",
      series: ProductSeries.CLASSIC,
      surfaceType: "Спортивное покрытие",
      popular: true,
      featured: true,
      categoryId: epdmCat.id,
      certDocs: [],
    },
    {
      name: "ЭПДМ крошка Желтая (серия Classic)",
      slug: "epdm-crumbs-yellow-classic",
      sku: "EPDM-YLW-CLS",
      description: "Ярко-желтая крошка EPDM серии Classic. Применяется для создания разметки, дорожек и детских зон. Устойчива к УФ-излучению, сохраняет цвет на протяжении всего срока службы.",
      shortDesc: "Желтая крошка EPDM, УФ-стойкая",
      price: 92000,
      priceOnRequest: false,
      inStock: true,
      images: [
        "https://placehold.co/600x400/CA8A04/FFFFFF?text=EPDM+Желтая",
      ],
      thickness: "Фракция 1-4 мм",
      composition: "EPDM каучук ≥25%, наполнитель, красители",
      coverType: "Верхний декоративный слой",
      colorRange: "Желтый (RAL 1023)",
      series: ProductSeries.CLASSIC,
      surfaceType: "Детские и спортивные площадки",
      popular: false,
      featured: false,
      categoryId: epdmCat.id,
      certDocs: [],
    },
    {
      name: "ЭПДМ крошка Оранжевая (серия Comfort)",
      slug: "epdm-crumbs-orange-comfort",
      sku: "EPDM-ORG-CMF",
      description: "Крошка EPDM оранжевого цвета серии Comfort. Максимальное содержание каучука обеспечивает непревзойденную мягкость и амортизацию. Рекомендована для детских площадок с высокими требованиями безопасности.",
      shortDesc: "Оранжевая крошка EPDM, серия Comfort — максимальная мягкость",
      price: 98000,
      priceOnRequest: false,
      inStock: true,
      images: [
        "https://placehold.co/600x400/EA580C/FFFFFF?text=EPDM+Оранжевая",
        "https://placehold.co/600x400/FF4C00/FFFFFF?text=Серия+Comfort",
      ],
      thickness: "Фракция 1-4 мм",
      composition: "EPDM каучук ≥30%, наполнитель, красители",
      coverType: "Верхний декоративный слой",
      colorRange: "Оранжевый (RAL 2004)",
      series: ProductSeries.COMFORT,
      surfaceType: "Детские площадки",
      popular: true,
      featured: true,
      categoryId: epdmCat.id,
      certDocs: [],
    },
    {
      name: "ЭПДМ крошка Серая (серия Sport)",
      slug: "epdm-crumbs-gray-sport",
      sku: "EPDM-GRY-SPT",
      description: "Серая крошка EPDM серии Sport. Специальная рецептура для высоконагруженных спортивных покрытий: беговые дорожки, теннисные корты, хоккейные площадки. Повышенная стойкость к истиранию.",
      shortDesc: "Серая крошка EPDM для спортивных нагрузок",
      price: 105000,
      priceOnRequest: false,
      inStock: true,
      images: [
        "https://placehold.co/600x400/4B5563/FFFFFF?text=EPDM+Серая",
        "https://placehold.co/600x400/6B7280/FFFFFF?text=Серия+Sport",
      ],
      thickness: "Фракция 1-4 мм",
      composition: "EPDM каучук ≥28%, спортивный наполнитель, красители",
      coverType: "Спортивный верхний слой",
      colorRange: "Серый (RAL 7040)",
      series: ProductSeries.SPORT,
      surfaceType: "Спортивные покрытия",
      popular: false,
      featured: true,
      categoryId: epdmCat.id,
      certDocs: [],
    },
    // Резиновая крошка
    {
      name: "Резиновая крошка черная 2-5 мм",
      slug: "rubber-crumbs-black-2-5",
      sku: "RUB-BLK-25",
      description: "Черная резиновая крошка из вторичных шин, фракция 2-5 мм. Используется как нижний подготовительный слой в системе покрытий. Обеспечивает амортизацию и дренаж. Производство полного цикла собственными мощностями более 10 тонн в сутки.",
      shortDesc: "Черная крошка из вторичных шин для нижнего слоя",
      price: 18000,
      priceOnRequest: false,
      inStock: true,
      images: [
        "https://placehold.co/600x400/1A1A1A/FFFFFF?text=Черная+крошка",
        "https://placehold.co/600x400/374151/FFFFFF?text=Фракция+2-5мм",
      ],
      thickness: "Фракция 2-5 мм",
      composition: "Вторичная резина (СРП-030)",
      coverType: "Нижний подготовительный слой",
      colorRange: "Черный",
      series: null,
      surfaceType: "Бесшовное покрытие",
      popular: true,
      featured: false,
      categoryId: rubberCat.id,
      certDocs: [],
    },
    {
      name: "Резиновая крошка черная 0.5-2 мм (мелкая)",
      slug: "rubber-crumbs-black-fine",
      sku: "RUB-BLK-FIN",
      description: "Мелкая черная резиновая крошка фракции 0.5-2 мм. Применяется для заполнения искусственных газонов и как мелкодисперсный подслой. Высокая степень очистки от металлокорда и текстиля.",
      shortDesc: "Мелкая черная крошка для газонов и подслоя",
      price: 22000,
      priceOnRequest: false,
      inStock: true,
      images: [
        "https://placehold.co/600x400/111827/FFFFFF?text=Мелкая+крошка",
      ],
      thickness: "Фракция 0.5-2 мм",
      composition: "Вторичная резина, очищенная",
      coverType: "Заполнитель, подслой",
      colorRange: "Черный",
      series: null,
      surfaceType: "Искусственный газон, многослойное покрытие",
      popular: false,
      featured: false,
      categoryId: rubberCat.id,
      certDocs: [],
    },
    // Клей
    {
      name: "Клей полиуретановый однокомпонентный MOSEPDM PU-1",
      slug: "pu-glue-1component",
      sku: "PU1-18L",
      description: "Однокомпонентный влагоотверждаемый полиуретановый клей для укладки резиновых и ЭПДМ покрытий. Расход: 0.8-1.2 кг/м² при толщине слоя 1 см. Время полимеризации: 24-48 часов. Канистра 18 кг.",
      shortDesc: "Однокомпонентный ПУ клей, канистра 18 кг",
      price: 5800,
      priceOnRequest: false,
      inStock: true,
      images: [
        "https://placehold.co/600x400/78350F/FFFFFF?text=ПУ+Клей+1К",
      ],
      thickness: null,
      composition: "Полиуретановый преполимер, катализаторы",
      coverType: "Связующее для покрытий",
      colorRange: "Прозрачный/янтарный",
      series: null,
      surfaceType: "Все типы оснований",
      popular: true,
      featured: false,
      categoryId: glueCat.id,
      certDocs: [],
    },
    {
      name: "Клей полиуретановый двухкомпонентный MOSEPDM PU-2",
      slug: "pu-glue-2component",
      sku: "PU2-20KG",
      description: "Двухкомпонентный полиуретановый клей повышенной прочности. Применяется для укладки покрытий в условиях повышенных нагрузок и низких температур. Жизнеспособность смеси: 30-40 минут. Комплект 20 кг.",
      shortDesc: "Двухкомпонентный ПУ клей для сложных условий",
      price: 7200,
      priceOnRequest: false,
      inStock: true,
      images: [
        "https://placehold.co/600x400/92400E/FFFFFF?text=ПУ+Клей+2К",
      ],
      thickness: null,
      composition: "Полиол + изоцианат, пигменты",
      coverType: "Связующее для покрытий",
      colorRange: "Серый",
      series: null,
      surfaceType: "Спортивные площадки, высокие нагрузки",
      popular: false,
      featured: false,
      categoryId: glueCat.id,
      certDocs: [],
    },
    // Готовые изделия
    {
      name: "Резиновая плитка 500×500×30 мм (черная)",
      slug: "rubber-tile-500x500x30-black",
      sku: "TILE-BLK-30",
      description: "Прессованная резиновая плитка стандартного размера 500×500 мм, толщина 30 мм. Предназначена для открытых спортивных площадок, входных групп, ведомственных объектов. Укладывается насухую или на клей.",
      shortDesc: "Черная резиновая плитка 500×500×30 мм",
      price: 850,
      priceOnRequest: false,
      inStock: true,
      images: [
        "https://placehold.co/600x400/1F2937/FFFFFF?text=Плитка+500x500x30",
      ],
      thickness: "30 мм",
      composition: "Вторичная резина 100%",
      coverType: "Прессованная плитка",
      colorRange: "Черный",
      series: null,
      surfaceType: "Открытые площадки",
      popular: true,
      featured: false,
      categoryId: readyCat.id,
      certDocs: [],
    },
    {
      name: "Резиновая плитка 500×500×40 мм (цветная вставка)",
      slug: "rubber-tile-500x500x40-color",
      sku: "TILE-CLR-40",
      description: "Двухслойная резиновая плитка: нижний слой — черная резиновая крошка, верхний — цветная ЭПДМ крошка. Размер 500×500 мм, толщина 40 мм. Яркий внешний вид и высокая амортизация для детских площадок.",
      shortDesc: "Двухслойная плитка с цветным ЭПДМ слоем, 500×500×40 мм",
      price: 1200,
      priceOnRequest: false,
      inStock: true,
      images: [
        "https://placehold.co/600x400/FF4C00/FFFFFF?text=Плитка+с+ЭПДМ",
        "https://placehold.co/600x400/16A34A/FFFFFF?text=Цветная+вставка",
      ],
      thickness: "40 мм",
      composition: "Нижний слой: вторичная резина; верхний: EPDM ≥22%",
      coverType: "Двухслойная прессованная плитка",
      colorRange: "Красный, синий, зеленый, желтый, оранжевый",
      series: null,
      surfaceType: "Детские площадки",
      popular: true,
      featured: true,
      categoryId: readyCat.id,
      certDocs: [],
    },
  ];

  for (const product of productsData) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }
  console.log("✅ Продукты созданы");

  // Проекты
  const projects = [
    {
      title: "Детская площадка ЖК «Сколково Парк»",
      description: "Монтаж бесшовного резинового покрытия площадью 850 м². Система двухслойного покрытия: черный подслой 30 мм + цветной ЭПДМ слой 10 мм серии Comfort. Рисунок — игровые зоны с разметкой.",
      category: "Детские площадки",
      area: 850,
      city: "Москва",
      year: 2024,
      images: [
        "https://placehold.co/800x600/FF4C00/FFFFFF?text=ЖК+Сколково+Парк",
        "https://placehold.co/800x600/16A34A/FFFFFF?text=Детская+площадка",
      ],
      featured: true,
      order: 1,
    },
    {
      title: "Спортивный комплекс «Лужники» — разминочные зоны",
      description: "Укладка беговых дорожек и разминочных зон. Применена серия Sport с повышенной стойкостью к нагрузкам. Общая площадь 1200 м².",
      category: "Спортивные площадки",
      area: 1200,
      city: "Москва",
      year: 2023,
      images: [
        "https://placehold.co/800x600/1E40AF/FFFFFF?text=Лужники+дорожки",
      ],
      featured: true,
      order: 2,
    },
    {
      title: "Дворовые территории г. Пушкино",
      description: "Благоустройство 12 дворовых территорий в рамках государственного контракта. Покрытие Standard, нейтральные оттенки, площадь 4500 м².",
      category: "Дворовые территории",
      area: 4500,
      city: "Пушкино",
      year: 2024,
      images: [
        "https://placehold.co/800x600/6B7280/FFFFFF?text=Дворы+Пушкино",
      ],
      featured: false,
      order: 3,
    },
    {
      title: "Футбольное поле ФК «Локомотив» (тренировочная база)",
      description: "Устройство покрытия для тренировочного поля и трибунных зон. Серия Sport, специальная рецептура для интенсивных нагрузок.",
      category: "Спортивные площадки",
      area: 2100,
      city: "Химки",
      year: 2023,
      images: [
        "https://placehold.co/800x600/16A34A/FFFFFF?text=Тренировочное+поле",
      ],
      featured: true,
      order: 4,
    },
    {
      title: "Детский сад №45 — игровая площадка",
      description: "Безопасное бесшовное покрытие серии Comfort для дошкольного учреждения. Яркая цветовая схема, специальные антибактериальные добавки.",
      category: "Детские площадки",
      area: 320,
      city: "Мытищи",
      year: 2024,
      images: [
        "https://placehold.co/800x600/CA8A04/FFFFFF?text=Детский+сад",
      ],
      featured: false,
      order: 5,
    },
    {
      title: "Теннисный корт клуба «Олимп»",
      description: "Профессиональное покрытие для теннисного корта. Серия Sport, темно-зеленый и терракотовый цвета, разметка включена в стоимость.",
      category: "Спортивные площадки",
      area: 620,
      city: "Подольск",
      year: 2022,
      images: [
        "https://placehold.co/800x600/1A1A1A/FFFFFF?text=Теннисный+корт",
      ],
      featured: false,
      order: 6,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project }).catch(() => {
      // already exists
    });
  }
  console.log("✅ Проекты созданы");

  // Статьи
  const articles = [
    {
      title: "Как выбрать резиновое покрытие для детской площадки",
      slug: "how-to-choose-rubber-cover-playground",
      excerpt: "Разбираем ключевые параметры безопасного покрытия для детских площадок: толщина, состав, сертификаты. Что означают серии Standard, Classic и Comfort.",
      content: `# Как выбрать резиновое покрытие для детской площадки

Безопасность детей на игровых площадках во многом зависит от правильно выбранного покрытия. Рассмотрим основные критерии выбора.

## Основные серии покрытий

**Standard** — базовая серия. Толщина 20-30 мм. Подходит для малоактивных зон отдыха, дорожек, дворовых территорий.

**Classic** — оптимальный выбор. Толщина 30-40 мм. Рекомендуется для большинства детских площадок с оборудованием до 1,5 м высотой.

**Comfort** — премиум сегмент. Толщина 40-60 мм. Максимальная амортизация для игровых комплексов с горками и качелями.

## Требования ГОСТ и СП

Согласно действующим нормам, покрытие должно иметь сертификаты соответствия требованиям безопасности...`,
      image: "https://placehold.co/1200x630/FF4C00/FFFFFF?text=Выбор+покрытия",
      published: true,
      publishedAt: new Date("2024-09-15"),
      author: "Редакция MOSEPDM",
    },
    {
      title: "EPDM vs Резиновая крошка: в чем разница?",
      slug: "epdm-vs-rubber-crumbs-difference",
      excerpt: "Подробное сравнение ЭПДМ крошки и крошки из вторичных шин. Состав, физические свойства, области применения, цена и срок службы.",
      content: `# EPDM vs Резиновая крошка: в чем разница?

На рынке бесшовных покрытий присутствуют два основных материала...`,
      image: "https://placehold.co/1200x630/1E40AF/FFFFFF?text=EPDM+vs+Крошка",
      published: true,
      publishedAt: new Date("2024-08-20"),
      author: "Технический отдел",
    },
    {
      title: "Технология укладки бесшовного покрытия своими руками",
      slug: "seamless-cover-installation-diy",
      excerpt: "Пошаговая инструкция укладки резинового покрытия: подготовка основания, нанесение клея, распределение крошки, выравнивание и финишная обработка.",
      content: `# Технология укладки бесшовного покрытия

Самостоятельная укладка резинового покрытия возможна при наличии опыта строительных работ...`,
      image: "https://placehold.co/1200x630/16A34A/FFFFFF?text=Укладка+покрытия",
      published: true,
      publishedAt: new Date("2024-07-10"),
      author: "Бригадир Алексей Соколов",
    },
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
  }
  console.log("✅ Статьи созданы");

  console.log("🎉 База данных успешно заполнена!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
