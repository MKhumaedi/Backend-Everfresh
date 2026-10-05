import { PrismaClient } from '@prisma/client';

const flags = [
  { key: 'maintenance_mode', label: 'Mode Pemeliharaan', description: 'Alihkan publik ke halaman pemeliharaan sistem', isEnabled: false },
  { key: 'quote_form', label: 'Formulir Penawaran', description: 'Izinkan pengunjung mengirim permohonan penawaran harga', isEnabled: true },
  { key: 'whatsapp_button', label: 'Tombol WhatsApp', description: 'Tampilkan tombol kontak cepat WhatsApp', isEnabled: true },
  { key: 'news_section', label: 'Bagian Berita & Artikel', description: 'Tampilkan modul berita di beranda publik', isEnabled: true },
  { key: 'testimonial_section', label: 'Bagian Testimoni', description: 'Tampilkan ulasan mitra di beranda publik', isEnabled: true },
];

export async function seedFeatureFlags(prisma: PrismaClient): Promise<void> {
  for (const flag of flags) {
    await prisma.featureFlag.upsert({
      where: { key: flag.key },
      update: { label: flag.label, description: flag.description, isEnabled: flag.isEnabled },
      create: flag,
    });
  }
  console.log(`✅ ${flags.length} Feature flags seeded.`);
}
