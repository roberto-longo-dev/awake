import { client } from "@/lib/sanity/client";
import { postsQuery } from "@/lib/sanity/queries";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
};

export default async function HomePage() {
  const posts = await client.fetch<Post[]>(postsQuery);

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
