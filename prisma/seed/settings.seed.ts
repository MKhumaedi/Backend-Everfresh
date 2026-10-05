import { PrismaClient } from '@prisma/client';

export const defaultSettings: Record<string, unknown> = {
  site_name: 'EVERFRESH',
  site_tagline: 'Industrial Ice & Cold Storage',
  whatsapp: '+628118899721',
  email: 'sales@everfresh-ice.co.id',
  business_hours: 'Senin-Jumat 09:00-16:00 WIB',
  social_links: {
    youtube: 'https://youtube.com/@everfresh-industrial',
    linkedin: 'https://linkedin.com/company/everfresh-ice',
    instagram: 'https://instagram.com/everfresh.industrial',
  },
  logo_url: '',
  logo_dark_url: '',
  favicon_url: '',
};

export async function seedSiteSettings(prisma: PrismaClient): Promise<void> {
  for (const [key, value] of Object.entries(defaultSettings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: value as object },
      create: { key, value: value as object },
    });
  }
  console.log('✅ SiteSetting defaults seeded');
}

export async function seedOffices(prisma: PrismaClient): Promise<void> {
  const offices = [
    {
      name: 'Kantor Pusat & Engineering',
      city: 'Jakarta',
      address: 'Sentra Bisnis Artha Gading Blok D-08, Kelapa Gading, Jakarta Utara',
      phone: '+62 21 8990 4120',
      mapUrl: 'https://maps.google.com/?q=Jakarta',
      sortOrder: 1,
    },
    {
      name: 'Pabrik Perakitan & Workshop',
      city: 'Surabaya',
      address: 'Kawasan Industri Rungkut Megah Raya Blok B-12, Surabaya, Jawa Timur',
      phone: '+62 31 848 9911',
      mapUrl: 'https://maps.google.com/?q=Surabaya',
      sortOrder: 2,
    },
    {
      name: 'Kantor Layanan Kelautan',
      city: 'Makassar',
      address: 'Kawasan Pergudangan Parangloe Indah Blok I-5, Tamalanrea, Makassar',
      phone: '+62 411 582 301',
      mapUrl: 'https://maps.google.com/?q=Makassar',
      sortOrder: 3,
    },
  ];

  for (const off of offices) {
    const existing = await prisma.office.findFirst({ where: { city: off.city } });
    if (existing) {
      await prisma.office.update({ where: { id: existing.id }, data: off });
    } else {
      await prisma.office.create({ data: off });
    }
  }
  console.log(`✅ ${offices.length} Regional offices seeded`);
}
