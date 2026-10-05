import { QuoteStatus } from '@prisma/client';

export interface CreateQuoteInput {
  name: string;
  company?: string;
  whatsapp: string;
  email?: string;
  city?: string;
  productId?: string;
  capacity?: string;
  message?: string;
}

export interface QuoteQueryFilter {
  status?: QuoteStatus;
  search?: string;
  page?: number | string;
  pageSize?: number | string;
}

export interface UpdateQuoteStatusInput {
  status: QuoteStatus;
  notes?: string;
}

export interface AddQuoteNoteInput {
  note: string;
}
