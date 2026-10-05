import { z } from 'zod';

export const updateMediaAltTextSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    altText: z.string().max(255),
  }),
});

export const mediaQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    mimeType: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).max(100).default(20),
  }),
});
