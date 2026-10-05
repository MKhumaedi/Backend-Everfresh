import { z } from 'zod';

export const createTestimonialSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    role: z.string().min(2, 'Peran / jabatan wajib diisi'),
    quote: z.string().min(5, 'Isi kutipan testimoni wajib diisi'),
    rating: z.number().int().min(1).max(5).default(5),
    avatarUrl: z.string().url().optional(),
    isVisible: z.boolean().optional(),
    sortOrder: z.number().int().optional(),
  }),
});

export const updateTestimonialSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: createTestimonialSchema.shape.body.partial(),
});

export const testimonialQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    isVisible: z.enum(['true', 'false']).optional(),
  }),
});
