import { z } from 'zod';
import { PublishStatus } from '@prisma/client';

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Judul proyek minimal 2 karakter'),
    slug: z.string().optional(),
    categoryId: z.string().optional(),
    capacityLabel: z.string().optional(),
    location: z.string().optional(),
    clientName: z.string().optional(),
    description: z.string().optional(),
    coverUrl: z.string().url().optional(),
    isFeatured: z.boolean().optional(),
    status: z.nativeEnum(PublishStatus).optional(),
    sortOrder: z.number().int().optional(),
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: createProjectSchema.shape.body.partial(),
});

export const projectQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    status: z.nativeEnum(PublishStatus).optional(),
    isFeatured: z.enum(['true', 'false']).optional(),
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).max(100).default(10),
  }),
});
