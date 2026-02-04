import { defineCollection, z } from 'astro:content';

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    category: z.enum([
      'Bookkeeping & Accounting',
      'Financial Organization',
      'Growing Businesses',
      'Cleanup & Catch-Up',
      'Tools & Systems',
      'Tax & Compliance',
      'E-commerce',
      'Platforms',
    ]),
    disclaimer: z.boolean().default(true),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    featured: z.boolean().default(false),
    // FAQ Schema for rich results
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

const storeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    heroImage: z.string().optional(),
    lemonsqueezyUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    // What's included in the product
    includes: z.array(z.string()),
    disclaimer: z.boolean().default(true),
  }),
});

export const collections = {
  articles: articlesCollection,
  store: storeCollection,
};

