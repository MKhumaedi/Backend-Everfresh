import { prisma } from '../../config/prisma.js';
import { DayQuoteCount } from './dashboard.types.js';

async function fetchSummaryCounts() {
  const [newQuotes, publishedArticles, draftArticles, publishedProducts, publishedProjects] =
    await Promise.all([
      prisma.quoteRequest.count({ where: { status: 'NEW' } }),
      prisma.article.count({ where: { status: 'PUBLISHED' } }),
      prisma.article.count({ where: { status: 'DRAFT' } }),
      prisma.product.count({ where: { status: 'PUBLISHED' } }),
      prisma.project.count({ where: { status: 'PUBLISHED' } }),
    ]);

  return {
    newQuotesCount: newQuotes,
    newQuotesDiffYesterday: 2,
    publishedArticlesCount: publishedArticles,
    draftArticlesCount: draftArticles,
    activeProductsCount: publishedProducts,
    completedProjectsCount: publishedProjects,
  };
}

async function fetchUserStats() {
  const [totalUsers, activeUsers, superAdmins] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isActive: true } }),
    prisma.user.count({ where: { role: 'SUPERADMIN' } }),
  ]);
  return { totalUsers, activeUsers, superAdmins, admins: totalUsers - superAdmins };
}

async function fetch30DaysQuotes(): Promise<DayQuoteCount[]> {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const quotes = await prisma.quoteRequest.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    select: { createdAt: true },
  });
  const countMap: Record<string, number> = {};
  for (let i = 0; i <= 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (30 - i));
    countMap[d.toISOString().slice(0, 10)] = 0;
  }
  quotes.forEach((q) => {
    const key = q.createdAt.toISOString().slice(0, 10);
    if (countMap[key] !== undefined) countMap[key]++;
  });
  return Object.entries(countMap).map(([date, count]) => ({ date, count }));
}

export async function getDashboardData(role?: string) {
  const isSuperAdmin = role === 'SUPERADMIN';
  const [summary, quoteChart30Days, recentQuotes, draftArticles] = await Promise.all([
    fetchSummaryCounts(),
    fetch30DaysQuotes(),
    prisma.quoteRequest.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, company: true, status: true, createdAt: true },
    }),
    prisma.article.findMany({
      where: { status: 'DRAFT' },
      take: 3,
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, updatedAt: true },
    }),
  ]);

  const recentActivities = isSuperAdmin
    ? await prisma.activityLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { id: true, name: true, role: true } } },
      })
    : [];

  const userStats = isSuperAdmin ? await fetchUserStats() : null;
  return { summary, quoteChart30Days, recentQuotes, draftArticles, recentActivities, userStats };
}
