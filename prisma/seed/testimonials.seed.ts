import { PrismaClient } from '@prisma/client';

export const testimonialsList = [
  {
    name: 'Ir. Budi Santoso',
    role: 'Direktur Operasional, PT Sumber Es Makmur',
    quote: 'Mesin es tube 10 Ton dari Everfresh beroperasi 24 jam non-stop dengan kestabilan suhu luar biasa. Pemakaian listrik sangat hemat berkat kompresor Bitzer asli.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 5,
    isVisible: true,
    sortOrder: 1,
  },
  {
    name: 'Ibu Stefanie Wijaya',
    role: 'Head of QA, PT Bahari Prima Seafood Bali',
    quote: 'Fasilitas cold storage modular 50 ton di instalasi kami sangat memuaskan. Fluktuasi suhu di bawah 1 derajat Celcius, dan tim servis tanggap 24/7.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    rating: 5,
    isVisible: true,
    sortOrder: 2,
  },
  {
    name: 'Ronald Papilaya',
    role: 'Ketua Unit Usaha, Koperasi Nelayan Bitung',
    quote: 'Beralih ke mesin es balok direct cooling Everfresh membuat proses panen es menjadi otomatis tanpa tenaga angkat berat manual dan bebas amonia.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    rating: 5,
    isVisible: true,
    sortOrder: 3,
  },
];

export async function seedTestimonials(prisma: PrismaClient): Promise<void> {
  for (const t of testimonialsList) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (existing) {
      await prisma.testimonial.update({ where: { id: existing.id }, data: t });
    } else {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log(`✅ ${testimonialsList.length} Testimonials seeded`);
}
