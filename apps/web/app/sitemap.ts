import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";

type SlugEntry = {
  slug: { current: string };
  _updatedAt: string;
};

const base = "https://awake.robertolongo.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([
    client.fetch<SlugEntry[]>(
      `*[_type == "product"]{ slug, _updatedAt }`
    ),
    client.fetch<SlugEntry[]>(
      `*[_type == "post"]{ slug, _updatedAt }`
    ),
  ]);

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/shop/${p.slug.current}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/journal/${p.slug.current}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...productEntries,
    ...postEntries,
  ];
}
