"use client";

import { motion } from "framer-motion";
import { Factory, FlaskConical, ShieldCheck, Truck } from "lucide-react";

const pillars = [
  {
    icon: Factory,
    title: "Производство",
    description:
      "Собственные производственные мощности более 10 тонн крошки в сутки. Полный цикл от сырья до готовой продукции.",
  },
  {
    icon: FlaskConical,
    title: "Лаборатория",
    description:
      "Контроль качества на каждом этапе. Сертификаты соответствия ГОСТ. Содержание каучука не менее 22%.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия 5 лет",
    description:
      "Собственные методики укладки. Гарантийное обслуживание. Более 1000 успешно сданных объектов.",
  },
  {
    icon: Truck,
    title: "Доставка по России",
    description:
      "Доставка от 1 тонны в любой регион России. Собственный транспорт для Москвы и Подмосковья.",
  },
];

export default function AboutProduction() {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent-DEFAULT font-semibold text-sm uppercase tracking-wider">
              О производстве
            </span>
            <h2 className="section-heading mt-3 mb-6">
              Производство полного цикла в Подмосковье
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                MOSEPDM — российский производитель резиновой и EPDM крошки,
                полиуретановых связующих и готовых изделий из резины.
                Производство расположено в г. Пушкино Московской области.
              </p>
              <p>
                Производственная мощность составляет более <strong className="text-gray-900">10 тонн в сутки</strong>,
                что позволяет выполнять как небольшие частные заказы, так и
                крупные государственные контракты в сжатые сроки.
              </p>
              <p>
                Вся продукция проходит лабораторный контроль качества. Содержание
                EPDM каучука в крошке — не менее 22% (серия Standard) до 30% (серия Comfort).
                Выдаем официальные сертификаты соответствия.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "10+", label: "лет на рынке" },
                { value: "1000+", label: "объектов" },
                { value: "22%+", label: "каучука" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-gray-50 rounded-xl"
                >
                  <div className="text-2xl font-bold text-accent-DEFAULT">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Pillars grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 bg-accent-light rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-accent-DEFAULT" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{pillar.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
