import { PrismaClient, PublishStatus } from '@prisma/client';

export const servicesList = [
  {
    slug: 'maintenance-mesin-es',
    title: 'Maintenance Mesin Es & Overhaul Kompresor',
    summary: 'Layanan servis berkala pembersihan kondensor, penggantian oli freon sintetis, dan overhaul kompresor Bitzer.',
    content: 'Dukungan teknisi pendingin siaga di seluruh Indonesia untuk menjaga stabilitas produksi pabrik es Anda tanpa kendala downtime.',
    coverUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
    status: PublishStatus.PUBLISHED,
    showInNav: true,
    sortOrder: 1,
  },
  {
    slug: 'pembangunan-pabrik-es',
    title: 'Pembangunan Pabrik Es & Rancang Bangun Cold Storage',
    summary: 'Rancang bangun lengkap pabrik es tube, flake, dan balok direct cooling dari kapasitas 5 ton hingga 100 ton per hari.',
    content: 'Solusi terintegrasi fabrikasi mesin, struktur pipa refrigerasi, ruang cold storage walk-in, dan instalasi kelistrikan berstandar SNI.',
    coverUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    status: PublishStatus.PUBLISHED,
    showInNav: true,
    sortOrder: 2,
  },
];

export async function seedServices(prisma: PrismaClient): Promise<void> {
  for (const s of servicesList) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log(`✅ ${servicesList.length} Engineering services seeded`);
}
