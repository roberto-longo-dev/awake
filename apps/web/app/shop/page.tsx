import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Coffees",
  description:
    "Single origin, small batch coffees from Ethiopia, Colombia, and Guatemala.",
};

import { client } from "@/lib/sanity/client";
import { allProductsQuery } from "@/lib/sanity/queries";
import { ShopClient } from "@/components/shop/ShopClient";

type CoverImage = {
  asset: object;
  alt?: string;
};

type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  origin: string;
  region: string;
  process: string;
  roastLevel: string;
  price: number;
  weight: number;
  excerpt: string;
  tastingNotes: string[];
  inStock: boolean;
  coverImage?: CoverImage;
};

export default async function ShopPage() {
  const products = await client.fetch<Product[]>(allProductsQuery);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-text mb-2">Our Coffees</h1>
      <p className="text-text-muted mb-8">
        Single origin. Small batch. Direct trade.
      </p>

      <ShopClient initialProducts={products} />
    </div>
  );
}
