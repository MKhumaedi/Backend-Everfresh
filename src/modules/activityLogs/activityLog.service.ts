import { prisma } from '../../config/db.js';

interface LogFilter {
  userId?: string;
  action?: string;
  targetType?: string;
  limit?: number;
  offset?: number;
}

export async function listActivityLogs(filter: LogFilter = {}) {
  const where: any = {};
  if (filter.userId) where.userId = filter.userId;
  if (filter.action) where.action = filter.action;
  if (filter.targetType) where.entity = filter.targetType;

  const [items, total] = await Promise.all([
    prisma.activityLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: filter.limit || 50,
      skip: filter.offset || 0,
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    }),
    prisma.activityLog.count({ where }),
  ]);

  return { items, total };
}