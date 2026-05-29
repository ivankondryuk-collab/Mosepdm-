"use client";

import { useState } from "react";
import { ShoppingCart, Check, MessageSquare } from "lucide-react";
import { useCart } from "@/store/cart";
import type { Product } from "@prisma/client";

interface Props {
  product: Product;
  compact?: boolean;
}

export default function AddToCartButton({ product, compact = false }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (product.priceOnRequest) {
    return (
      <a
        href={`/price-request?product=${product.id}`}
        className={`flex items-center gap-2 ${
          compact
            ? "text-sm px-3 py-2"
            : "text-base px-5 py-3"
        } bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors`}
      >
        <MessageSquare className={compact ? "w-4 h-4" : "w-5 h-5"} />
        {!compact && "Запросить цену"}
      </a>
    );
  }

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price ?? 0,
      image: product.images[0],
      sku: product.sku,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={!product.inStock}
      className={`flex items-center gap-2 ${
        compact
          ? "text-sm px-3 py-2"
          : "text-base px-5 py-3"
      } ${
        added
          ? "bg-green-500 text-white"
          : product.inStock
          ? "bg-accent-DEFAULT hover:bg-accent-hover text-white shadow-accent hover:shadow-accent-lg"
          : "bg-gray-200 text-gray-400 cursor-not-allowed"
      } font-semibold rounded-xl transition-all duration-200`}
    >
      {added ? (
        <Check className={compact ? "w-4 h-4" : "w-5 h-5"} />
      ) : (
        <ShoppingCart className={compact ? "w-4 h-4" : "w-5 h-5"} />
      )}
      {!compact && (added ? "Добавлено!" : "В корзину")}
    </button>
  );
}
