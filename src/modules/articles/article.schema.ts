import { z } from 'zod';
import { PublishStatus } from '@prisma/client';

export const createArticleSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Judul artikel minimal 3 karakter'),
    slug: z.string().optional(),
    excerpt: z.string().min(5, 'Ringkasan artikel wajib diisi'),
    content: z.string().min(10, 'Konten artikel wajib diisi'),
    coverUrl: z.string().url().optional(),
    categoryId: z.string().optional(),
    status: z.nativeEnum(PublishStatus).optional(),
    publishedAt: z.coerce.date().optional(),
    metaTitle: z.string().optional(),
    metaDesc: z.string().optional(),
  }),
});

export const updateArticleSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: createArticleSchema.shape.body.partial(),
});

export const articleQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    categoryId: z.string().optional(),
    status: z.nativeEnum(PublishStatus).optional(),
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).max(100).default(10),
  }),
});

export const articleCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nama kategori minimal 2 karakter'),
    slug: z.string().optional(),
  }),
});
