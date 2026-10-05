import { prisma } from '../../config/prisma.js';
import { CreateInquiryInput, InquiryFilterQuery } from './inquiry.types.js';

export async function createInquiry(input: CreateInquiryInput) {
  return prisma.quoteRequest.create({
    data: {
      name: input.fullName,
      company: input.companyName,
      email: input.email,
      whatsapp: input.phone,
      city: input.city,
      capacity: input.targetCapacity,
      message: input.notes,
      status: 'NEW',
    },
  });
}

function buildSearchWhere(search?: string) {
  if (!search) return {};
  return {
    OR: [
      { name: { contains: search, mode: 'insensitive' as const } },
      { company: { contains: search, mode: 'insensitive' as const } },
      { whatsapp: { contains: search, mode: 'insensitive' as const } },
    ],
  };
}

export async function listInquiries(query: InquiryFilterQuery) {
  const page = query.page || 1;
  const pageSize = query.pageSize || 10;
  const skip = (page - 1) * pageSize;
  const where = buildSearchWhere(query.search);

  const [items, total] = await Promise.all([
    prisma.quoteRequest.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.quoteRequest.count({ where }),
  ]);

  return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}
