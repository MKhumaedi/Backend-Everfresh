import { prisma } from '../../config/prisma.js';
import { parsePaginationParams, buildPaginationResult } from '../../utils/pagination.js';
import { logActivity } from '../../utils/activityLogger.js';
import { NotFoundError } from '../../utils/errors.js';
import {
  CreateQuoteInput,
  QuoteQueryFilter,
  UpdateQuoteStatusInput,
  AddQuoteNoteInput,
} from './quote.types.js';

function buildWhere(filter: QuoteQueryFilter) {
  const where: Record<string, unknown> = {};
  if (filter.status) where.status = filter.status;
  if (filter.search) {
    where.OR = [
      { name: { contains: filter.search, mode: 'insensitive' } },
      { company: { contains: filter.search, mode: 'insensitive' } },
      { email: { contains: filter.search, mode: 'insensitive' } },
      { whatsapp: { contains: filter.search, mode: 'insensitive' } },
    ];
  }
  return where;
}

export async function createPublicQuote(input: CreateQuoteInput) {
  return prisma.quoteRequest.create({
    data: {
      name: input.name,
      company: input.company,
      whatsapp: input.whatsapp,
      email: input.email,
      city: input.city,
      productId: input.productId,
      capacity: input.capacity,
      message: input.message,
      status: 'NEW',
    },
  });
}

export async function listQuotes(filter: QuoteQueryFilter) {
  const { page, pageSize, skip } = parsePaginationParams(filter);
  const where = buildWhere(filter);

  const [items, total] = await Promise.all([
    prisma.quoteRequest.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      include: {
        product: { select: { id: true, name: true, slug: true } },
        _count: { select: { notes: true, statusLogs: true } },
      },
    }),
    prisma.quoteRequest.count({ where }),
  ]);
  return buildPaginationResult(items, total, page, pageSize);
}

export async function getQuoteById(id: string) {
  const quote = await prisma.quoteRequest.findUnique({
    where: { id },
    include: {
      product: true,
      statusLogs: { include: { user: { select: { id: true, name: true } } }, orderBy: { createdAt: 'desc' } },
      notes: { include: { user: { select: { id: true, name: true } } }, orderBy: { createdAt: 'desc' } },
    },
  });
  if (!quote) throw new NotFoundError('Permintaan penawaran tidak ditemukan');
  return quote;
}

export async function updateQuoteStatus(id: string, input: UpdateQuoteStatusInput, userId: string) {
  const quote = await getQuoteById(id);
  const updated = await prisma.$transaction([
    prisma.quoteRequest.update({ where: { id }, data: { status: input.status } }),
    prisma.quoteStatusLog.create({
      data: { quoteId: id, fromStatus: quote.status, toStatus: input.status, userId },
    }),
  ]);

  await logActivity({ userId, action: 'STATUS_CHANGE', entity: 'QUOTE', entityId: id });
  return updated[0];
}

export async function addQuoteNote(id: string, input: AddQuoteNoteInput, userId: string) {
  await getQuoteById(id);
  const note = await prisma.quoteNote.create({
    data: { quoteId: id, userId, body: input.note },
  });

  await logActivity({ userId, action: 'ADD_NOTE', entity: 'QUOTE', entityId: id });
  return note;
}
