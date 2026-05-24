// GROQ queries -- add queries here as new content types are defined in Sanity

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt
}`;

export const featuredProductsQuery = `*[_type == "product" && isFeatured == true] | order(_createdAt asc) [0...3] {
  _id,
  name,
  slug,
  origin,
  region,
  process,
  roastLevel,
  price,
  weight,
  excerpt,
  tastingNotes
}`;

export const latestPostsQuery = `*[_type == "post"] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt
}`;

export const allPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  body
}`;

export const allProductsQuery = `*[_type == "product"] | order(_createdAt asc) {
  _id,
  name,
  slug,
  origin,
  region,
  process,
  roastLevel,
  price,
  weight,
  excerpt,
  tastingNotes,
  inStock
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  origin,
  region,
  process,
  roastLevel,
  grindOptions,
  price,
  weight,
  excerpt,
  description,
  tastingNotes,
  inStock,
  isSubscription
}`;
