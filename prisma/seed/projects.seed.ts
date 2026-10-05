import { PrismaClient, PublishStatus } from '@prisma/client';

export const projectsList = [
  {
    slug: 'instalasi-cold-storage-50-ton-sidoarjo',
    title: 'Instalasi Cold Storage 50 Ton Sidoarjo',
    clientName: 'PT Segar Abadi Berkah',
    location: 'Sidoarjo, Jawa Timur',
    capacityLabel: '50 Ton Freezer (-22°C)',
    description: 'Pembangunan gudang beku komoditas udang vaname dan fillet ikan untuk pasar ekspor Jepang dengan panel PU 150mm dan Bitzer ganda.',
    coverUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    isFeatured: true,
    status: PublishStatus.PUBLISHED,
    sortOrder: 1,
  },
  {
    slug: 'pabrik-es-tube-30-ton-bitung',
    title: 'Pabrik Es Tube Otomatis 30 Ton Bitung',
    clientName: 'Koperasi Nelayan Mina Samudera',
    location: 'Bitung, Sulawesi Utara',
    capacityLabel: '30 Ton / 24 Jam',
    description: 'Fabrikasi 3 unit mesin es tube 10 ton paralel untuk kebutuhan pendaratan armada kapal cakalang dan tuna di dermaga Bitung.',
    coverUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    isFeatured: true,
    status: PublishStatus.PUBLISHED,
    sortOrder: 2,
  },
  {
    slug: 'pabrik-es-balok-direct-cooling-muara-baru',
    title: 'Pabrik Es Balok Direct Cooling 40 Ton Muara Baru',
    clientName: 'PT Bahari Prima Nusantara',
    location: 'Muara Baru, Jakarta Utara',
    capacityLabel: '40 Ton / 24 Jam',
    description: 'Konversi pabrik es balok konvensional air garam menjadi sistem pendingin direct cooling modern ramah lingkungan dan hemat listrik.',
    coverUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800',
    isFeatured: true,
    status: PublishStatus.PUBLISHED,
    sortOrder: 3,
  },
  {
    slug: 'instalasi-es-flake-pelabuhan-benoa-bali',
    title: 'Instalasi Mesin Es Flake 15 Ton Benoa Bali',
    clientName: 'PT Samudera Bali Mandiri',
    location: 'Benoa, Denpasar, Bali',
    capacityLabel: '15 Ton / 24 Jam (-7°C)',
    description: 'Pemasangan generator es serpihan sub-zero untuk preservasi tangkapan ikan tuna segar kualitas sashimi sebelum diekspor udara.',
    coverUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800',
    isFeatured: false,
    status: PublishStatus.PUBLISHED,
    sortOrder: 4,
  },
];

export async function seedProjects(prisma: PrismaClient): Promise<void> {
  for (const proj of projectsList) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: proj,
      create: proj,
    });
  }
  console.log(`✅ ${projectsList.length} Portfolio projects seeded`);
}
