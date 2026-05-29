"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const series = [
  {
    name: "Standard",
    slug: "standard",
    tagline: "Базовое решение",
    description:
      "Однослойное или двухслойное покрытие из черной резиновой крошки с цветным ЭПДМ верхним слоем. Оптимально для дворовых территорий и дорожек.",
    thickness: "20–30 мм",
    features: ["EPDM ≥22%", "Дворы, дорожки", "Бюджетный вариант"],
    color: "from-gray-100 to-gray-50",
    badge: "bg-gray-200 text-gray-700",
    price: "от 2 100 ₽/м²",
  },
  {
    name: "Classic",
    slug: "classic",
    tagline: "Оптимальный выбор",
    description:
      "Усиленная рецептура с повышенным содержанием каучука. Стойкость к нагрузкам и УФ-излучению. Подходит для большинства детских и спортивных объектов.",
    thickness: "30–40 мм",
    features: ["EPDM ≥25%", "Детские площадки", "5 лет гарантии"],
    color: "from-blue-50 to-indigo-50",
    badge: "bg-blue-100 text-blue-700",
    price: "от 2 600 ₽/м²",
    popular: true,
  },
  {
    name: "Comfort",
    slug: "comfort",
    tagline: "Максимальная мягкость",
    description:
      "Максимальное содержание EPDM каучука для превосходной амортизации. Рекомендован для площадок с высоким оборудованием и требованиями безопасности.",
    thickness: "40–60 мм",
    features: ["EPDM ≥30%", "Высокое оборудование", "Лучшая амортизация"],
    color: "from-green-50 to-emerald-50",
    badge: "bg-green-100 text-green-700",
    price: "от 3 200 ₽/м²",
  },
  {
    name: "Sport",
    slug: "sport",
    tagline: "Для профи",
    description:
      "Специальная рецептура для высоконагруженных профессиональных покрытий: стадионы, беговые дорожки, теннисные корты, хоккейные площадки.",
    thickness: "10–20 мм",
    features: ["EPDM ≥28%", "Стадионы, корты", "Стойкость к истиранию"],
    color: "from-orange-50 to-red-50",
    badge: "bg-orange-100 text-orange-700",
    price: "от 3 800 ₽/м²",
  },
];

export default function CoveringSeries() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-accent-DEFAULT font-semibold text-sm uppercase tracking-wider">
            Серии покрытий
          </span>
          <h2 className="section-heading mt-3">Выберите подходящую серию</h2>
          <p className="section-subheading mx-auto">
            4 серии покрытий для любых задач — от бюджетных дворовых до профессиональных спортивных
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {series.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-gradient-to-br ${item.color} rounded-2xl p-6 border border-white flex flex-col hover:shadow-lg transition-shadow`}
            >
              {item.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-DEFAULT text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  Популярный
                </div>
              )}

              <div className={`inline-block self-start px-3 py-1 rounded-full text-xs font-bold mb-4 ${item.badge}`}>
                {item.tagline}
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-1">
                Серия {item.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Толщина: <span className="font-medium text-gray-700">{item.thickness}</span>
              </p>

              <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-4 flex-1">
                {item.description}
              </p>

              <ul className="space-y-1.5 mb-5">
                {item.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-accent-DEFAULT flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="text-lg font-bold text-gray-900 mb-4">
                {item.price}
              </div>

              <Link
                href={`/catalog?series=${item.slug}`}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-accent-DEFAULT hover:text-accent-DEFAULT text-gray-700 font-semibold py-2.5 px-4 rounded-xl text-sm transition-all group"
              >
                Подробнее
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
