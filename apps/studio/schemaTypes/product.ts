import { defineField, defineType } from "sanity";

export const product = defineType({
  type: "document",
  name: "product",
  title: "Product",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "origin",
      title: "Origin",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "process",
      title: "Process",
      type: "string",
      options: {
        list: [
          { title: "Natural", value: "natural" },
          { title: "Washed", value: "washed" },
          { title: "Honey", value: "honey" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "roastLevel",
      title: "Roast Level",
      type: "string",
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Medium", value: "medium" },
          { title: "Dark", value: "dark" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "grindOptions",
      title: "Grind Options",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Whole Bean", value: "whole-bean" },
          { title: "Filter", value: "filter" },
          { title: "Espresso", value: "espresso" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "weight",
      title: "Weight",
      type: "number",
      description: "Weight in grams (e.g. 250)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      description: "Price in EUR",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tastingNotes",
      title: "Tasting Notes",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      description: "Show on homepage",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isSubscription",
      title: "Subscription",
      type: "boolean",
      description: "Subscription product (Awake Club)",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
  ],
});
