// GROQ queries -- add queries here as new content types are defined in Sanity

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt
}`;
