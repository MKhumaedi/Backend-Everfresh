import { PrismaClient, PublishStatus } from '@prisma/client';

export const articlesList = [
  {
    catSlug: 'peluang-bisnis',
    catName: 'Peluang Bisnis',
    slug: 'panduan-lengkap-memulai-bisnis-es-kristal',
    title: 'Panduan Lengkap Memulai Bisnis Pabrik Es Kristal di Indonesia',
    excerpt: 'Analisis peluang keuntungan, estimasi modal mesin es tube 5 - 20 ton, hingga strategi distribusi ke jaringan F&B.',
    content: 'Kebutuhan es batu higienis di perkotaan Indonesia meningkat drastis seiring pesatnya pertumbuhan industri kuliner dan minuman kekinian. Berbeda dari es balok baluran lantai, es tube kristal dengan lubang di tengah diproduksi dengan standar higienis tinggi menggunakan stainless steel SS304...',
    coverUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
  },
  {
    catSlug: 'teknologi-rekayasa',
    catName: 'Teknologi Rekayasa',
    slug: 'studi-kasus-efisiensi-energi-pabrik-es-bitung',
    title: 'Studi Kasus: Efisiensi Energi Pabrik Es Bitung dengan Kontrol Otomasi PLC',
    excerpt: 'Bagaimana integrasi kompresor semi-hermetik dan kontroler digital memangkas biaya operasional listrik hingga 28%.',
    content: 'Biaya listrik merupakan komponen beban operasional terbesar dalam industri pendingin es balok dan cold storage di wilayah pelabuhan perikanan. Dengan menerapkan variable frequency drive (VFD) dan siklus harvest otomatis...',
    coverUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
  },
  {
    catSlug: 'industri-maritim',
    catName: 'Industri Maritim',
    slug: 'memilih-jenis-es-untuk-perikanan-laut',
    title: 'Memilih Jenis Es yang Tepat untuk Perikanan: Flake vs Slurry vs Balok',
    excerpt: 'Perbandingan komprehensif karakteristik es untuk menjaga kesegaran ikan ekspor tuna, cakalang, dan udang budidaya.',
    content: 'Menjaga kesegaran hasil laut selama pelayaran berhari-hari di laut lepas menuntut pemahaman mendalam tentang titik beku dan bentuk es. Es flake dengan suhu -7 derajat Celcius memberikan luas permukaan kontak tertinggi...',
    coverUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
  },
];

export async function seedArticles(prisma: PrismaClient, authorId: string): Promise<void> {
  for (const art of articlesList) {
    const category = await prisma.articleCategory.upsert({
      where: { slug: art.catSlug },
      update: { name: art.catName },
      create: { slug: art.catSlug, name: art.catName },
    });

    await prisma.article.upsert({
      where: { slug: art.slug },
      update: {
        title: art.title,
        excerpt: art.excerpt,
        content: art.content,
        coverUrl: art.coverUrl,
        categoryId: category.id,
        status: PublishStatus.PUBLISHED,
      },
      create: {
        title: art.title,
        slug: art.slug,
        excerpt: art.excerpt,
        content: art.content,
        coverUrl: art.coverUrl,
        categoryId: category.id,
        authorId,
        status: PublishStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });
  }
  console.log(`✅ ${articlesList.length} Knowledge base articles seeded`);
}
