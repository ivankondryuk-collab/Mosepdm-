import Link from "next/link";
import Image from "next/image";
import type { Product, Category } from "@prisma/client";
import AddToCartButton from "@/components/catalog/AddToCartButton";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";

type ProductWithCategory = Product & { category: Category };

interface ProductsGridProps {
  products: ProductWithCategory[];
  page: number;
  totalPages: number;
}

export default function ProductsGrid({ products, page, totalPages }: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Товары не найдены</h3>
        <p className="text-gray-500">Попробуйте изменить параметры фильтрации</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {page > 1 && (
            <PaginationLink page={page - 1}>
              <ChevronLeft className="w-4 h-4" />
            </PaginationLink>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationLink key={p} page={p} active={p === page}>
              {p}
            </PaginationLink>
          ))}

          {page < totalPages && (
            <PaginationLink page={page + 1}>
              <ChevronRight className="w-4 h-4" />
            </PaginationLink>
          )}
        </div>
      )}
    </div>
  );
}

function PaginationLink({
  page,
  active,
  children,
}: {
  page: number;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`/catalog?page=${page}`}
      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
        active
          ? "bg-accent-DEFAULT text-white shadow-accent"
          : "bg-white border border-gray-200 text-gray-600 hover:border-accent-DEFAULT hover:text-accent-DEFAULT"
      }`}
    >
      {children}
    </Link>
  );
}

function ProductCard({ product }: { product: ProductWithCategory }) {
  const image = product.images[0] ?? `https://placehold.co/400x300/FF4C00/FFFFFF?text=${encodeURIComponent(product.name)}`;

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <Link href={`/catalog/${product.slug}`} className="relative h-48 block overflow-hidden bg-gray-50">
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        {product.series && (
          <span className="absolute top-3 left-3 bg-accent-DEFAULT text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {product.series}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-gray-700 text-white text-sm font-semibold px-4 py-2 rounded-xl">
              Нет в наличии
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-1.5">{product.category.name}</p>
        <Link href={`/catalog/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 hover:text-accent-DEFAULT transition-colors leading-snug mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {product.shortDesc && (
          <p className="text-sm text-gray-500 line-clamp-2 flex-1">{product.shortDesc}</p>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            {product.priceOnRequest ? (
              <span className="text-sm font-semibold text-gray-500">По запросу</span>
            ) : product.price ? (
              <div>
                <span className="text-lg font-bold text-gray-900">
                  {product.price.toLocaleString("ru")} ₽
                </span>
                <span className="text-xs text-gray-400 ml-1">/тонна</span>
              </div>
            ) : null}
          </div>

          <AddToCartButton product={product} compact />
        </div>
      </div>
    </div>
  );
}
