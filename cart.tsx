"use client";

import { useState } from "react";
import { Minus, Plus, Package, CheckCircle, XCircle } from "lucide-react";
import type { Product, Category } from "@prisma/client";
import AddToCartButton from "@/components/catalog/AddToCartButton";

interface Props {
  product: Product & { category: Category };
}

export default function ProductInfo({ product }: Props) {
  const [qty, setQty] = useState(1);

  return (
    <div>
      {/* Breadcrumb category */}
      <p className="text-sm text-gray-400 mb-2">{product.category.name}</p>

      <h1 className="text-h1 font-bold text-gray-900 leading-tight">{product.name}</h1>

      <p className="text-sm text-gray-400 mt-2">Артикул: {product.sku}</p>

      {/* Status */}
      <div className="mt-4 flex items-center gap-2">
        {product.inStock ? (
          <>
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-600">В наличии</span>
          </>
        ) : (
          <>
            <XCircle className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-500">Нет в наличии</span>
          </>
        )}
      </div>

      {/* Price */}
      <div className="mt-6 pb-6 border-b border-gray-100">
        {product.priceOnRequest ? (
          <p className="text-2xl font-bold text-gray-700">Цена по запросу</p>
        ) : product.price ? (
          <div>
            <span className="text-3xl font-black text-gray-900">
              {(product.price * qty).toLocaleString("ru")} ₽
            </span>
            <span className="text-gray-400 ml-2 text-sm">/ {qty} тонна{qty > 1 ? (qty < 5 ? "ы" : "") : ""}</span>
            {qty > 1 && (
              <p className="text-sm text-gray-500 mt-1">
                {product.price.toLocaleString("ru")} ₽ за тонну
              </p>
            )}
          </div>
        ) : null}
      </div>

      {/* Quick specs */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {product.thickness && (
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Толщина / Фракция</p>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">{product.thickness}</p>
          </div>
        )}
        {product.series && (
          <div className="bg-accent-light rounded-xl p-3">
            <p className="text-xs text-gray-400">Серия</p>
            <p className="text-sm font-bold text-accent-DEFAULT mt-0.5">{product.series}</p>
          </div>
        )}
        {product.colorRange && (
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Цвет</p>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">{product.colorRange}</p>
          </div>
        )}
        {product.surfaceType && (
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Применение</p>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">{product.surfaceType}</p>
          </div>
        )}
      </div>

      {/* Quantity + Add to cart */}
      {!product.priceOnRequest && (
        <div className="mt-6 flex items-center gap-4">
          {/* Quantity */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="p-3 hover:bg-gray-50 transition-colors"
              aria-label="Уменьшить"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-semibold">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="p-3 hover:bg-gray-50 transition-colors"
              aria-label="Увеличить"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1">
            <AddToCartButton product={product} />
          </div>
        </div>
      )}

      {product.priceOnRequest && (
        <div className="mt-6">
          <a
            href={`/price-request?product=${product.id}`}
            className="btn-accent w-full flex items-center justify-center gap-2"
          >
            <Package className="w-5 h-5" />
            Запросить цену
          </a>
        </div>
      )}

      {/* Short description */}
      {product.shortDesc && (
        <p className="mt-6 text-gray-600 leading-relaxed">{product.shortDesc}</p>
      )}
    </div>
  );
}
