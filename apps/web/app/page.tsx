import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { featuredProductsQuery, latestPostsQuery } from "@/lib/sanity/queries";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

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
};

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function HomePage() {
  const [featuredProducts, latestPosts] = await Promise.all([
    client.fetch<Product[]>(featuredProductsQuery),
    client.fetch<Post[]>(latestPostsQuery),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero */}
      <section className="py-24 text-center">
        <p className="text-accent tracking-wide text-sm font-medium uppercase mb-4">
          Direct trade roastery
        </p>
        <h1 className="text-4xl font-bold text-text mb-6">
          Coffee that knows where it comes from
        </h1>
        <p className="text-text-muted max-w-xl mx-auto mb-10">
          Every bag traces back to a single farm, a single harvest, a single
          decision to do it right.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/shop">
            <Button variant="primary">Shop coffees</Button>
          </Link>
          <Link href="/about">
            <Button variant="secondary">Our story</Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8">
        <h2 className="text-2xl font-bold text-text mb-8">
          Current offerings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg border border-neutral p-6"
            >
              <div className="mb-4">
                <Badge variant="amber">
                  {product.origin}, {product.region}
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-text mb-2">
                {product.name}
              </h3>
              <p className="text-text-muted text-sm mb-4">{product.excerpt}</p>
              <p className="font-medium text-text mb-2">
                &euro;{product.price}
              </p>
              {product.tastingNotes?.length > 0 && (
                <p className="text-xs text-text-muted mb-4 capitalize">
                  {product.tastingNotes.join(", ")}
                </p>
              )}
              <Link
                href={`/shop/${product.slug.current}`}
                className="text-xs font-medium tracking-widest text-primary uppercase mt-4 inline-block hover:border-b hover:border-primary transition-colors duration-200"
              >
                VIEW PRODUCT &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-8">
        <h2 className="text-2xl font-bold text-text mb-8">
          From the journal
        </h2>
        <ul className="divide-y divide-neutral">
          {latestPosts.map((post) => (
            <li key={post._id} className="py-6">
              <h3 className="text-lg font-bold text-text mb-1">{post.title}</h3>
              <time
                dateTime={post.publishedAt}
                className="text-xs text-text-muted mb-2 block"
              >
                {formatDate(post.publishedAt)}
              </time>
              <p className="text-text-muted text-sm mb-3">{post.excerpt}</p>
              <Link
                href={`/journal/${post.slug.current}`}
                className="text-sm text-primary hover:underline"
              >
                READ MORE &rarr;
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
