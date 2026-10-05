import { z } from 'zod';

export const createInquirySchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'Nama lengkap minimal 2 karakter'),
    companyName: z.string().min(2, 'Nama perusahaan minimal 2 karakter'),
    email: z.string().email('Format email tidak valid'),
    phone: z.string().min(8, 'Nomor telepon/WhatsApp minimal 8 digit'),
    city: z.string().min(2, 'Kota/Lokasi wajib diisi'),
    interestedProduct: z.string().min(2, 'Pilih produk yang diminati'),
    targetCapacity: z.string().optional(),
    notes: z.string().max(1000).optional(),
  }),
});

export const inquiryQuerySchema = z.object({
  query: z.object({
    status: z.string().optional(),
    search: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).max(100).default(10),
  }),
});
