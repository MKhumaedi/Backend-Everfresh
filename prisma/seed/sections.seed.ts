import { PrismaClient, HomeSectionKey } from '@prisma/client';

export const homeSectionsList: Array<{ key: HomeSectionKey; title: string; subtitle: string; sortOrder: number }> = [
  { key: HomeSectionKey.HERO, title: 'Hero Banner Utama', subtitle: 'Pintu gerbang penawaran dan katalog mesin', sortOrder: 1 },
  { key: HomeSectionKey.CATEGORIES, title: 'Kategori Mesin Unggulan', subtitle: 'Pilihan mesin es dan pendingin industri', sortOrder: 2 },
  { key: HomeSectionKey.STATS, title: 'Statistik Kapasitas Industri', subtitle: 'Metrik tonase dan keandalan pabrik es', sortOrder: 3 },
  { key: HomeSectionKey.ABOUT, title: 'Tentang EVERFRESH Indonesia', subtitle: 'Pionir teknologi mesin pendingin sejak 2012', sortOrder: 4 },
  { key: HomeSectionKey.SERVICES, title: 'Layanan Komprehensif', subtitle: 'Fabrikasi, instalasi, dan pemeliharaan berkala', sortOrder: 5 },
  { key: HomeSectionKey.PROJECTS, title: 'Proyek & Instalasi', subtitle: 'Portofolio pabrik es di berbagai pelabuhan', sortOrder: 6 },
  { key: HomeSectionKey.TESTIMONIALS, title: 'Ulasan Mitra & Pelanggan', subtitle: 'Testimoni pemilik pabrik dan koperasi nelayan', sortOrder: 7 },
  { key: HomeSectionKey.CTA, title: 'Minta Penawaran Harga', subtitle: 'Konsultasi gratis rancang bangun mesin es', sortOrder: 8 },
  { key: HomeSectionKey.NEWS, title: 'Berita & Artikel Industri', subtitle: 'Wawasan cold chain dan efisiensi refrigerasi', sortOrder: 9 },
];

export async function seedHeroBanner(prisma: PrismaClient): Promise<void> {
  const existing = await prisma.heroBanner.findFirst();
  const bannerData = {
    label: 'TEKNOLOGI PENDINGIN INDUSTRI TERPERCAYA SEJAK 2012',
    title: 'Mesin Es Industri & Cold Storage Standar Internasional',
    subtitle: 'Solusi fabrikasi mesin es Tube, Flake, Block direct cooling, dan cold storage walk-in hemat energi dengan dukungan teknisi 24/7 di seluruh Indonesia.',
    primaryText: 'Minta Penawaran Harga',
    primaryLink: '/quote',
    secondaryText: 'Lihat Produk',
    secondaryLink: '/products',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600',
    overlayOpacity: 40,
    isActive: true,
    sortOrder: 1,
  };

  if (existing) {
    await prisma.heroBanner.update({ where: { id: existing.id }, data: bannerData });
  } else {
    await prisma.heroBanner.create({ data: bannerData });
  }
  console.log('✅ Hero Banner seeded');
}

export async function seedHomeSections(prisma: PrismaClient): Promise<void> {
  for (const s of homeSectionsList) {
    await prisma.homeSection.upsert({
      where: { key: s.key },
      update: { title: s.title, subtitle: s.subtitle, sortOrder: s.sortOrder, isVisible: true },
      create: { key: s.key, title: s.title, subtitle: s.subtitle, sortOrder: s.sortOrder, isVisible: true },
    });
  }
  await seedHeroBanner(prisma);
  console.log(`✅ ${homeSectionsList.length} Home sections seeded`);
}
