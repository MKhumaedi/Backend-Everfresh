import { z } from 'zod';

export const updateSiteSettingSchema = z.object({
  body: z.record(z.unknown()),
});

export const createOfficeSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nama kantor minimal 2 karakter'),
    city: z.string().min(2, 'Kota cabang minimal 2 karakter'),
    address: z.string().min(5, 'Alamat cabang wajib diisi'),
    phone: z.string().optional(),
    mapUrl: z.string().url().optional(),
    sortOrder: z.number().int().optional(),
  }),
});

export const updateOfficeSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: createOfficeSchema.shape.body.partial(),
});
