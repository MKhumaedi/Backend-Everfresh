// Mengubah bentuk data database (Prisma) menjadi bentuk yang diharapkan frontend publik.

const SECTION_KEY_MAP: Record<string, string> = {
  HERO: 'hero',
  CATEGORIES: 'product_catalog',
  STATS: 'telemetry_stats',
  ABOUT: 'energy_efficiency',
  SERVICES: 'services',
  PROJECTS: 'featured_projects',
  TESTIMONIALS: 'testimonials',
  CTA: 'quote_cta',
  NEWS: 'articles',
};

const asString = (v: unknown, fallback = ''): string =>
  typeof v === 'string' ? v : v == null ? fallback : String(v);

export function mapSection(s: any) {
  return {
    id: s.id,
    sectionKey: SECTION_KEY_MAP[s.key] ?? String(s.key).toLowerCase(),
    title: s.title ?? '',
    subtitle: s.subtitle ?? null,
    sortOrder: s.sortOrder,
    isEnabled: s.isVisible,
    config: s.content ?? null,
  };
}

export function mapHero(h: any) {
  if (!h) return null;
  return {
    id: h.id,
    headline: h.title,
    subheadline: h.subtitle ?? '',
    badgeText: h.label ?? null,
    ctaPrimaryText: h.primaryText ?? 'Minta Penawaran',
    ctaPrimaryLink: h.primaryLink ?? '/quote',
    ctaSecondaryText: h.secondaryText ?? null,
    ctaSecondaryLink: h.secondaryLink ?? null,
    imageUrl: h.imageUrl ?? null,
    isActive: h.isActive,
    sortOrder: h.sortOrder,
  };
}

export function mapHeroMachine(m: any) {
  return {
    id: m.id,
    key: asString(m.label).toLowerCase().replace(/\s+/g, '-'),
    label: m.label,
    name: m.label,
    tagline: m.subtitle ?? null,
    imageUrl: m.imageUrl,
    sortOrder: m.sortOrder,
    isActive: m.isActive,
  };
}

export function mapCategory(c: any) {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description ?? null,
    iconName: null,
    sortOrder: c.sortOrder,
  };
}

export function mapProject(p: any) {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    clientName: p.clientName ?? '',
    location: p.location ?? '',
    capacity: p.capacityLabel ?? '',
    summary: p.description ?? '',
    description: p.description ?? '',
    coverImage: p.coverUrl ?? null,
    images: [],
    status: p.status,
    isFeatured: p.isFeatured,
    completionDate: null,
    createdAt: p.createdAt,
  };
}

export function mapTestimonial(t: any) {
  return {
    id: t.id,
    clientName: t.name,
    company: '',
    role: t.role,
    content: t.quote,
    rating: t.rating,
    avatarUrl: t.avatarUrl ?? null,
    status: 'PUBLISHED',
    isFeatured: true,
  };
}

export function mapArticle(a: any) {
  const words = asString(a.content).split(/\s+/).filter(Boolean).length;
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    category: a.category?.name ?? 'Umum',
    excerpt: a.excerpt,
    content: a.content,
    coverImage: a.coverUrl ?? null,
    readTimeMin: Math.max(1, Math.ceil(words / 200)),
    publishedAt: a.publishedAt ?? null,
    author: a.author ? { name: a.author.name, avatarUrl: a.author.avatarUrl ?? null } : undefined,
  };
}

export function mapProduct(p: any) {
  const specs: Record<string, string> = {};
  (p.specs ?? []).forEach((s: any) => { specs[s.label] = s.value; });
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    categoryId: p.categoryId,
    tagline: p.shortDesc ?? null,
    description: p.description,
    capacityTons: null,
    refrigerant: specs['Refrigerant'] ?? null,
    powerKw: null,
    compressorBrand: specs['Kompresor'] ?? null,
    dimensions: null,
    specs,
    faqs: (p.faqs ?? []).map((f: any) => ({ question: f.question, answer: f.answer })),
    gallery: (p.gallery ?? []).map((g: any) => g.url),
    images: [p.coverUrl, ...(p.gallery ?? []).map((g: any) => g.url)].filter(Boolean),
    capacityLabel: p.capacityLabel ?? null,
    coverUrl: p.coverUrl ?? null,
    isFeatured: false,
    isActive: p.status === 'PUBLISHED',
    sortOrder: p.sortOrder,
    category: p.category ? mapCategory(p.category) : undefined,
  };
}

export function mapService(s: any) {
  return {
    id: s.id,
    slug: s.slug,
    title: s.title,
    tagline: s.summary,
    description: s.content,
    iconName: null,
    coverImage: s.coverUrl ?? null,
    features: [],
    status: s.status,
    isFeatured: false,
    sortOrder: s.sortOrder,
  };
}

export function mapOffice(o: any, index: number) {
  return {
    id: o.id,
    city: o.city,
    officeType: o.name,
    address: o.address,
    phone: o.phone ?? '',
    email: '',
    googleMapsUrl: o.mapUrl ?? null,
    isHeadquarters: index === 0,
    sortOrder: o.sortOrder,
  };
}

export function mapSettings(raw: Record<string, any>) {
  const wa = asString(raw.whatsapp);
  return {
    id: 'site-settings',
    siteName: asString(raw.site_name, 'EVERFRESH'),
    tagline: asString(raw.site_tagline),
    whatsappNumber: wa,
    consultationPhone: wa,
    salesEmail: asString(raw.email),
    supportEmail: asString(raw.email),
    operationalHours: asString(raw.business_hours),
    addressSummary: '',
    socialLinks: raw.social_links ?? null,
    seoKeywords: [],
  };
}