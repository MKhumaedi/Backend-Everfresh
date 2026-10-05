import { z } from 'zod';
import { QuoteStatus } from '@prisma/client';

export const createQuoteSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nama lengkap minimal 2 karakter'),
    company: z.string().optional(),
    whatsapp: z.string().min(8, 'Nomor WhatsApp minimal 8 digit'),
    email: z.string().email('Format email tidak valid').optional(),
    city: z.string().optional(),
    productId: z.string().optional(),
    capacity: z.string().optional(),
    message: z.string().max(1000).optional(),
  }),
});

export const updateQuoteStatusSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    status: z.nativeEnum(QuoteStatus),
    notes: z.string().optional(),
  }),
});

export const addQuoteNoteSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    note: z.string().min(2, 'Catatan minimal 2 karakter'),
  }),
});

export const quoteQuerySchema = z.object({
  query: z.object({
    status: z.nativeEnum(QuoteStatus).optional(),
    search: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).max(100).default(10),
  }),
});
