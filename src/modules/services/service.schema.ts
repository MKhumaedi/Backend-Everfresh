import { z } from 'zod';
import { PublishStatus } from '@prisma/client';

export const createServiceSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Nama layanan minimal 2 karakter'),
    slug: z.string().optional(),
    summary: z.string().min(5, 'Ringkasan layanan wajib diisi'),
    content: z.string().min(5, 'Konten layanan wajib diisi'),
    coverUrl: z.string().url().optional(),
    status: z.nativeEnum(PublishStatus).optional(),
    showInNav: z.boolean().optional(),
    sortOrder: z.number().int().optional(),
  }),
});

export const updateServiceSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: createServiceSchema.shape.body.partial(),
});

export const serviceQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    status: z.nativeEnum(PublishStatus).optional(),
  }),
});
