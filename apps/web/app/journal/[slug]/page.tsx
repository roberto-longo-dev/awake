import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import { postBySlugQuery, allPostsQuery } from "@/lib/sanity/queries";

type PortableTextChild = {
  _key: string;
  _type: string;
  text: string;
};

type PortableTextBlock = {
  _key: string;
  _type: string;
  children: PortableTextChild[];
};

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  body: PortableTextBlock[];
};

type PostSlugResult = {
  slug: { current: string };
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const backLinkClasses =
  "text-xs font-medium tracking-widest text-primary uppercase hover:border-b hover:border-primary transition-colors duration-200";

export async function generateStaticParams() {
  const posts = await client.fetch<PostSlugResult[]>(
    `*[_type == "post"]{ slug }`
  );
  return posts.map((post) => ({ slug: post.slug.current }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/journal" className={backLinkClasses}>
        &larr; JOURNAL
      </Link>

      <div className="mt-8">
        <time
          dateTime={post.publishedAt}
          className="text-sm text-text-muted block mb-3"
        >
          {formatDate(post.publishedAt)}
        </time>
        <h1 className="text-4xl font-bold text-text mb-6">{post.title}</h1>
        <p className="text-text-muted italic border-l-2 border-accent pl-4 my-6">
          {post.excerpt}
        </p>

        <div className="text-text leading-relaxed space-y-4">
          {post.body?.map((block) => {
            if (block._type !== "block") return null;
            const text = block.children.map((child) => child.text).join("");
            return <p key={block._key}>{text}</p>;
          })}
        </div>
      </div>

      <div className="mt-12">
        <Link href="/journal" className={backLinkClasses}>
          &larr; BACK TO JOURNAL
        </Link>
      </div>
    </div>
  );
}
