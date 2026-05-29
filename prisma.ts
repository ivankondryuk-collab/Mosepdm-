"use client";

import { useState } from "react";
import type { Product } from "@prisma/client";
import { FileDown } from "lucide-react";

interface Props {
  product: Product;
}

const TABS = ["Описание", "Характеристики", "Документация"];

export default function ProductTabs({ product }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Tab headers */}
      <div className="flex border-b border-gray-100">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`flex-1 sm:flex-none px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
              i === active
                ? "border-accent-DEFAULT text-accent-DEFAULT"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6 lg:p-8">
        {active === 0 && (
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        )}

        {active === 1 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Артикул", product.sku],
                  ["Толщина / Фракция", product.thickness],
                  ["Состав", product.composition],
                  ["Тип покрытия", product.coverType],
                  ["Цветовая гамма", product.colorRange],
                  ["Серия", product.series],
                  ["Поверхность", product.surfaceType],
                  ["Наличие", product.inStock ? "В наличии" : "Нет в наличии"],
                ]
                  .filter(([, v]) => v)
                  .map(([label, value]) => (
                    <tr
                      key={label}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 pr-6 text-gray-500 font-medium w-40 lg:w-56">
                        {label}
                      </td>
                      <td className="py-3 text-gray-900">{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {active === 2 && (
          <div>
            {product.certDocs.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Документация и сертификаты на данный товар предоставляются по запросу.
                Свяжитесь с нами: <a href="tel:+74992830732" className="text-accent-DEFAULT">+7 (499) 283-07-32</a>
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {product.certDocs.map((doc, i) => (
                  <a
                    key={i}
                    href={doc}
                    download
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <FileDown className="w-5 h-5 text-accent-DEFAULT" />
                    <span className="text-sm font-medium text-gray-700">
                      Сертификат {i + 1}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
