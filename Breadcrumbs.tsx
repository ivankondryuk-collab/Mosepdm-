"use client";

import { useRouter, usePathname } from "next/navigation";
import { type Category } from "@prisma/client";
import { SlidersHorizontal, X } from "lucide-react";

interface FiltersProps {
  categories: Category[];
  currentCategory?: string;
  currentSeries?: string;
  currentSort?: string;
  inStock?: string;
}

const SERIES = [
  { value: "standard", label: "Standard" },
  { value: "classic", label: "Classic" },
  { value: "comfort", label: "Comfort" },
  { value: "sport", label: "Sport" },
];

const SORT_OPTIONS = [
  { value: "", label: "По умолчанию" },
  { value: "popular", label: "По популярности" },
  { value: "price-asc", label: "Цена: по возрастанию" },
  { value: "price-desc", label: "Цена: по убыванию" },
];

export default function CatalogFilters({
  categories,
  currentCategory,
  currentSeries,
  currentSort,
  inStock,
}: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const buildUrl = (params: Record<string, string | undefined>) => {
    const current = new URLSearchParams();
    if (currentCategory) current.set("category", currentCategory);
    if (currentSeries) current.set("series", currentSeries);
    if (currentSort) current.set("sort", currentSort);
    if (inStock) current.set("inStock", inStock);

    Object.entries(params).forEach(([key, value]) => {
      if (value) current.set(key, value);
      else current.delete(key);
    });
    current.delete("page");
    const qs = current.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  const hasFilters = currentCategory || currentSeries || inStock === "true";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Фильтры
        </h3>
        {hasFilters && (
          <button
            onClick={() => router.push(pathname)}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-accent-DEFAULT transition-colors"
          >
            <X className="w-3 h-3" />
            Сбросить
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Сортировка
        </label>
        <select
          value={currentSort ?? ""}
          onChange={(e) => router.push(buildUrl({ sort: e.target.value || undefined }))}
          className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-accent-DEFAULT/30 focus:border-accent-DEFAULT"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Тип продукции
        </label>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => router.push(buildUrl({ category: undefined }))}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !currentCategory
                ? "bg-accent-light text-accent-DEFAULT font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Все категории
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => router.push(buildUrl({ category: cat.slug }))}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                currentCategory === cat.slug
                  ? "bg-accent-light text-accent-DEFAULT font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Series */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Серия покрытия
        </label>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => router.push(buildUrl({ series: undefined }))}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !currentSeries
                ? "bg-accent-light text-accent-DEFAULT font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Все серии
          </button>
          {SERIES.map((s) => (
            <button
              key={s.value}
              onClick={() => router.push(buildUrl({ series: s.value }))}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                currentSeries === s.value
                  ? "bg-accent-light text-accent-DEFAULT font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Серия {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* In stock toggle */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={inStock === "true"}
              onChange={(e) =>
                router.push(buildUrl({ inStock: e.target.checked ? "true" : undefined }))
              }
            />
            <div
              className={`w-11 h-6 rounded-full transition-colors ${
                inStock === "true" ? "bg-accent-DEFAULT" : "bg-gray-200"
              }`}
            />
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                inStock === "true" ? "translate-x-5" : ""
              }`}
            />
          </div>
          <span className="text-sm text-gray-700 font-medium">Только в наличии</span>
        </label>
      </div>
    </div>
  );
}
