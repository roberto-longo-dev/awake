import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import { productBySlugQuery } from "@/lib/sanity/queries";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  origin: string;
  region: string;
  process: string;
  roastLevel: string;
  grindOptions: string[];
  price: number;
  weight: number;
  excerpt: string;
  tastingNotes: string[];
  inStock: boolean;
  isSubscription: boolean;
};

type ProductSlugResult = {
  slug: { current: string };
};

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const backLinkClasses =
  "text-xs font-medium tracking-widest text-primary uppercase hover:border-b hover:border-primary transition-colors duration-200";

const sectionLabelClasses =
  "text-xs tracking-widest uppercase text-text-muted mb-2";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await client.fetch<Product | null>(productBySlugQuery, {
    slug,
  });
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.excerpt };
}

export async function generateStaticParams() {
  const products = await client.fetch<ProductSlugResult[]>(
    `*[_type == "product"]{ slug }`
  );
  return products.map((product) => ({ slug: product.slug.current }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await client.fetch<Product | null>(productBySlugQuery, {
    slug,
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/shop" className={backLinkClasses}>
        &larr; SHOP
      </Link>

      <div className="mt-8 md:grid md:grid-cols-2 md:gap-12">
        {/* Left: image placeholder */}
        <div className="bg-neutral rounded-lg aspect-square flex items-center justify-center text-text-muted text-sm mb-8 md:mb-0">
          No image yet
        </div>

        {/* Right: product details */}
        <div>
          <div className="mb-4">
            <Badge variant="amber">
              {product.origin}, {product.region}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold text-text mb-2">{product.name}</h1>
          <p className="text-2xl font-medium text-text mb-1">
            &euro;{product.price}
          </p>
          <p className="text-sm text-text-muted mb-4">{product.weight}g</p>

          <p className="text-text-muted italic border-l-2 border-accent pl-4 my-4">
            {product.excerpt}
          </p>

          {product.tastingNotes?.length > 0 && (
            <div className="mt-6">
              <p className={sectionLabelClasses}>Tasting notes</p>
              <div className="flex flex-wrap gap-2">
                {product.tastingNotes.map((note) => (
                  <Badge key={note} variant="amber">
                    {note}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className={sectionLabelClasses}>Details</p>
            <ul className="text-sm text-text space-y-1">
              <li>
                <span className="text-text-muted">Origin:</span>{" "}
                {product.origin}, {product.region}
              </li>
              <li>
                <span className="text-text-muted">Process:</span>{" "}
                {capitalize(product.process)}
              </li>
              <li>
                <span className="text-text-muted">Roast:</span>{" "}
                {capitalize(product.roastLevel)}
              </li>
              {product.grindOptions?.length > 0 && (
                <li>
                  <span className="text-text-muted">Grind options:</span>{" "}
                  {product.grindOptions.map(capitalize).join(", ")}
                </li>
              )}
            </ul>
          </div>

          <div className="flex gap-2 mt-6">
            {product.isSubscription && (
              <Badge variant="green">Awake Club</Badge>
            )}
            {!product.inStock && (
              <Badge variant="amber">Out of stock</Badge>
            )}
          </div>

          <div className="mt-8">
            <Button
              variant="primary"
              className="w-full opacity-50 cursor-not-allowed"
              disabled
            >
              Add to cart
            </Button>
            <p className="text-xs text-text-muted text-center mt-3">
              Online ordering coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
