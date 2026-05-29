import { notFound } from "next/navigation";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });
  if (!product) return {};
  return {
    title: `${product.name} — MOSEPDM`,
    description: product.shortDesc ?? product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.shortDesc ?? product.description.slice(0, 160),
      images: product.images[0] ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
    include: { category: true },
  });

  return (
    <div className="pt-20 min-h-screen">
      <div className="container-custom py-8">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Каталог", href: "/catalog" },
            { label: product.category.name, href: `/catalog?category=${product.category.slug}` },
            { label: product.name },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>

        <div className="mt-12">
          <ProductTabs product={product} />
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-h3 font-bold text-gray-900 mb-6">Похожие товары</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((rel) => (
                <RelatedCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { Product, Category } from "@prisma/client";

function RelatedCard({ product }: { product: Product & { category: Category } }) {
  return (
    <Link href={`/catalog/${product.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative h-36 bg-gray-50">
        <Image
          src={product.images[0] ?? `https://placehold.co/200x144/FF4C00/FFFFFF?text=Товар`}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
          sizes="200px"
        />
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-gray-800 line-clamp-2">{product.name}</p>
        {product.price && (
          <p className="mt-1 text-sm font-bold text-accent-DEFAULT">
            {product.price.toLocaleString("ru")} ₽
          </p>
        )}
      </div>
    </Link>
  );
}
