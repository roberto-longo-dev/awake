import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Coffees",
  description:
    "Single origin, small batch coffees from Ethiopia, Colombia, and Guatemala.",
};
import Image from "next/image";
import { client } from "@/lib/sanity/client";
import { allProductsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { Badge } from "@/components/ui/Badge";

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg border border-neutral p-6 flex flex-col"
          >
            {product.coverImage?.asset && (
              <Image
                src={urlFor(product.coverImage).width(400).height(400).url()}
                alt={product.coverImage.alt || product.name}
                width={400}
                height={400}
                className="w-full aspect-square object-cover rounded-md mb-4"
              />
            )}
            <div className="mb-4">
              <Badge variant="amber">
                {product.origin}, {product.region}
              </Badge>
            </div>
            <h2 className="text-lg font-bold text-text mb-2">{product.name}</h2>
            <p className="text-text-muted text-sm mb-4">{product.excerpt}</p>
            <p className="font-medium text-text mb-1">&euro;{product.price}</p>
            <p className="text-xs text-text-muted mb-2">{product.weight}g</p>
            {product.tastingNotes?.length > 0 && (
              <p className="text-xs text-text-muted mb-4 capitalize">
                {product.tastingNotes.join(", ")}
              </p>
            )}
            {!product.inStock && (
              <div className="mb-4">
                <Badge variant="amber">Out of stock</Badge>
              </div>
            )}
            <div className="mt-auto">
              <Link
                href={`/shop/${product.slug.current}`}
                className="text-xs font-medium tracking-widest text-primary uppercase hover:border-b hover:border-primary transition-colors duration-200"
              >
                VIEW PRODUCT &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
