import { prisma } from '../../config/prisma.js';
import { NotFoundError } from '../../utils/errors.js';
import {
  mapSection, mapHero, mapHeroMachine, mapCategory, mapProject, mapTestimonial,
  mapArticle, mapProduct, mapOffice, mapSettings,
} from './public.mapper.js';

export async function getPublicHomeAggregate() {
  const [hero, heroMachines, sections, categories, featuredProjects, testimonials, latestArticles, rawSettings, offices, flags] =
    await Promise.all([
      prisma.heroBanner.findFirst({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.heroMachine.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.homeSection.findMany({ where: { isVisible: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.productCategory.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.project.findMany({ where: { status: 'PUBLISHED', isFeatured: true }, take: 3, orderBy: { createdAt: 'desc' } }),
      prisma.testimonial.findMany({ where: { isVisible: true }, take: 6, orderBy: { sortOrder: 'asc' } }),
      prisma.article.findMany({
        where: { status: 'PUBLISHED' },
        take: 4,
        orderBy: { publishedAt: 'desc' },
        include: { category: true, author: { select: { id: true, name: true, avatarUrl: true } } },
      }),
      prisma.siteSetting.findMany(),
      prisma.office.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.featureFlag.findMany(),
    ]);

  const settings: Record<string, unknown> = {};
  rawSettings.forEach((s) => { settings[s.key] = s.value; });

  const featureFlags: Record<string, boolean> = {};
  flags.forEach((f) => { featureFlags[f.key] = f.isEnabled; });

  // Alias agar nama flag sesuai yang dipakai frontend
  if ('whatsapp_button' in featureFlags) featureFlags.whatsapp_floating = featureFlags.whatsapp_button;

  return {
    hero: mapHero(hero),
    heroMachines: heroMachines.map(mapHeroMachine),
    sections: sections.map(mapSection),
    categories: categories.map(mapCategory),
    featuredProjects: featuredProjects.map(mapProject),
    testimonials: testimonials.map(mapTestimonial),
    latestArticles: latestArticles.map(mapArticle),
    settings: mapSettings(settings),
    offices: offices.map(mapOffice),
    featureFlags,
    maintenanceMode: !!featureFlags['maintenance_mode'],
  };
}

export async function getPublicProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, specs: true, faqs: true, gallery: true },
  });
  if (!product || product.status !== 'PUBLISHED') throw new NotFoundError('Produk tidak ditemukan');
  return mapProduct(product);
}

export async function getPublicProductsList(categoryId?: string) {
  const items = await prisma.product.findMany({
    where: { status: 'PUBLISHED', categoryId: categoryId || undefined },
    orderBy: { sortOrder: 'asc' },
    include: { category: true, specs: true },
  });
  return items.map(mapProduct);
}

export async function getPublicArticleBySlug(slug: string) {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { author: { select: { id: true, name: true, avatarUrl: true } }, category: true },
  });
  if (!article || article.status !== 'PUBLISHED') throw new NotFoundError('Artikel tidak ditemukan');
  return mapArticle(article);
}

export async function getPublicArticlesList(category?: string) {
  const items = await prisma.article.findMany({
    where: { status: 'PUBLISHED', category: category ? { slug: category } : undefined },
    orderBy: { publishedAt: 'desc' },
    include: { author: { select: { id: true, name: true, avatarUrl: true } }, category: true },
  });
  return items.map(mapArticle);
}

export async function getPublicProjectsList() {
  const items = await prisma.project.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { sortOrder: 'asc' },
    include: { category: true },
  });
  return items.map(mapProject);
}