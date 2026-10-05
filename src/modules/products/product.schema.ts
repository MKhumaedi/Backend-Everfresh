import { z } from 'zod';
import { PublishStatus } from '@prisma/client';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nama produk minimal 2 karakter'),
    categoryId: z.string().min(1, 'Kategori produk tidak valid'),
    shortDesc: z.string().min(5, 'Deskripsi singkat wajib diisi'),
    description: z.string().min(5, 'Deskripsi produk wajib diisi'),
    capacityLabel: z.string().optional(),
    coverUrl: z.string().url().optional(),
    status: z.nativeEnum(PublishStatus).optional(),
    showInNav: z.boolean().optional(),
    sortOrder: z.number().int().optional(),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: createProductSchema.shape.body.partial(),
});

export const productQuerySchema = z.object({
  query: z.object({
    categoryId: z.string().optional(),
    search: z.string().optional(),
    status: z.nativeEnum(PublishStatus).optional(),
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).max(100).default(10),
  }),
});
