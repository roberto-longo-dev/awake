import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "From the Journal",
  description: "Thoughts on coffee, craft, and origin.",
};
import { client } from "@/lib/sanity/client";
import { allPostsQuery } from "@/lib/sanity/queries";

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

export default async function JournalPage() {
  const posts = await client.fetch<Post[]>(allPostsQuery);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-text mb-2">From the Journal</h1>
      <p className="text-text-muted mb-12">
        Thoughts on coffee, craft, and origin.
      </p>

      <ul className="divide-y divide-neutral">
        {posts.map((post) => (
          <li key={post._id} className="py-8">
            <time
              dateTime={post.publishedAt}
              className="text-xs text-text-muted block mb-2"
            >
              {formatDate(post.publishedAt)}
            </time>
            <h2 className="text-xl font-bold text-text mb-2">{post.title}</h2>
            <p className="text-text-muted text-sm mb-4">{post.excerpt}</p>
            <Link
              href={`/journal/${post.slug.current}`}
              className="text-xs font-medium tracking-widest text-primary uppercase hover:border-b hover:border-primary transition-colors duration-200"
            >
              READ MORE &rarr;
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
