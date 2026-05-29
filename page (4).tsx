"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, Palette, FileText, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Calculator,
    title: "Калькулятор материалов",
    description:
      "Введите площадь и тип покрытия — получите точный расчет количества крошки, клея и грунтовки с ориентировочной стоимостью.",
    href: "/calculator",
    color: "bg-blue-50 text-blue-600",
    accent: "hover:border-blue-300",
  },
  {
    icon: Palette,
    title: "Миксер цветов EPDM",
    description:
      "Подберите оттенки EPDM крошки для вашего покрытия. Визуальный конструктор с предпросмотром и автопересчётом количества.",
    href: "/color-mixer",
    color: "bg-purple-50 text-purple-600",
    accent: "hover:border-purple-300",
    featured: true,
  },
  {
    icon: FileText,
    title: "Запрос оптового прайса",
    description:
      "Заполните короткую форму и получите актуальный прайс-лист с оптовыми ценами на все позиции и бесплатные образцы.",
    href: "/price-request",
    color: "bg-green-50 text-green-600",
    accent: "hover:border-green-300",
  },
];

export default function MicroServicesBlock() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="section-heading">Сервисы для заказа</h2>
          <p className="section-subheading mx-auto mt-3">
            Быстрые инструменты для расчёта материалов и получения коммерческого предложения
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={service.href}
                  className={`group relative flex flex-col p-7 bg-white rounded-2xl border-2 border-transparent shadow-sm
                    hover:shadow-lg transition-all duration-300 ${service.accent} h-full`}
                >
                  {service.featured && (
                    <span className="absolute top-4 right-4 bg-accent-DEFAULT text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      НОВИНКА
                    </span>
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.color} mb-5`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-accent-DEFAULT transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>

                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-accent-DEFAULT">
                    Перейти
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
