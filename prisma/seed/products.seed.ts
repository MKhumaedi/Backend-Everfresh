import { PrismaClient, PublishStatus } from '@prisma/client';

export const productsData = [
  {
    catSlug: 'tube',
    slug: 'mesin-es-tube-10-ton',
    name: 'Mesin Es Tube IceTronic 10 Ton',
    shortDesc: 'Mesin es batu tabung kristal higienis food-grade untuk restoran dan pabrik.',
    description: 'Mesin es kristal tabung berlubang dengan kompresor Bitzer Jerman dan sistem PLC otomatis Siemens.',
    capacityLabel: '10 Ton / 24 Jam',
    coverUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
    sortOrder: 1,
    specs: [
      { label: 'Kompresor', value: 'Bitzer Semi-Hermetic (Jerman)' },
      { label: 'Refrigerant', value: 'R404A Eco-Friendly' },
      { label: 'Daya Listrik', value: '38.5 kW / 380V' },
    ],
    faqs: [
      { question: 'Berapa lama siklus panen es?', answer: 'Siklus panen berkisar antara 22 hingga 26 menit secara otomatis.' },
    ],
  },
  {
    catSlug: 'cube',
    slug: 'mesin-es-cube-2-ton',
    name: 'Mesin Es Cube Komersial 2 Ton',
    shortDesc: 'Mesin es kristal kotak padat dengan daya lebur lambat untuk kafe dan hotel.',
    description: 'Menghasilkan es kotak bening berukuran 22x22x22mm atau 28x28x28mm dengan konsumsi listrik hemat.',
    capacityLabel: '2 Ton / 24 Jam',
    coverUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
    sortOrder: 2,
    specs: [
      { label: 'Kompresor', value: 'Danfoss Maneurop' },
      { label: 'Kapasitas', value: '2.000 kg / 24 Jam' },
    ],
    faqs: [
      { question: 'Apakah es yang dihasilkan food grade?', answer: 'Ya, seluruh material evaporator menggunakan stainless steel SUS304.' },
    ],
  },
  {
    catSlug: 'block',
    slug: 'mesin-es-balok-direct-cooling-20-ton',
    name: 'Mesin Es Balok Direct Cooling 20 Ton',
    shortDesc: 'Mesin es balok pendinginan langsung tanpa air garam (brine water).',
    description: 'Evaporator aluminium alloy food grade dengan sistem panen hidrolik otomatis tanpa korosi air garam.',
    capacityLabel: '20 Ton / 24 Jam',
    coverUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800',
    sortOrder: 3,
    specs: [
      { label: 'Kompresor', value: 'Hanbell Screw Compressor' },
      { label: 'Ukuran Balok', value: '25 kg atau 50 kg' },
    ],
    faqs: [
      { question: 'Berapa lama waktu pembekuan balok?', answer: 'Waktu pembekuan rata-rata 4.8 hingga 5.5 jam per batch.' },
    ],
  },
  {
    catSlug: 'flake',
    slug: 'mesin-es-flake-marine-5-ton',
    name: 'Mesin Es Flake Marine 5 Ton',
    shortDesc: 'Mesin es serpihan kering sub-zero (-7°C) anti korosi air laut.',
    description: 'Evaporator drum stainless steel SUS316 dirancang khusus untuk kapal nelayan dan industri perikanan.',
    capacityLabel: '5 Ton / 24 Jam',
    coverUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800',
    sortOrder: 4,
    specs: [
      { label: 'Suhu Es', value: '-7°C (Kering Sub-Zero)' },
      { label: 'Ketebalan Es', value: '1.5 mm - 2.2 mm' },
    ],
    faqs: [
      { question: 'Mengapa es flake cocok untuk ikan?', answer: 'Bentuk serpihan tidak memiliki sudut tajam sehingga tidak merusak sisik dan daging ikan.' },
    ],
  },
  {
    catSlug: 'slurry',
    slug: 'mesin-es-slurry-liquid-15-ton',
    name: 'Mesin Es Slurry Liquid Flow 15 Ton',
    shortDesc: 'Sistem es cair mengalir kristal mikro pendinginan instan.',
    description: 'Generator es bubur sub-zero yang bisa dipompa langsung melalui pipa pipa ke palka kapal.',
    capacityLabel: '15 Ton / 24 Jam',
    coverUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    sortOrder: 5,
    specs: [
      { label: 'Konsentrasi Es', value: '20% - 40% Liquid Ice' },
      { label: 'Jarak Pompa', value: 'Hingga 100 meter' },
    ],
    faqs: [
      { question: 'Bagaimana cara mendistribusikan es slurry?', answer: 'Es slurry dapat dipompa melalui pipa fleksibel langsung ke palka kapal.' },
    ],
  },
  {
    catSlug: 'kaleng-es',
    slug: 'kaleng-es-baja-galvanis-25kg',
    name: 'Kaleng Es Baja Galvanis SS304 25kg',
    shortDesc: 'Cetakan kaleng es berstandar industri tahan korosi larutan garam.',
    description: 'Dibuat dengan pengelasan presisi dan pelapisan galvanis celup panas atau material stainless steel 304.',
    capacityLabel: 'Ukuran 25 kg / Balok',
    coverUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
    sortOrder: 6,
    specs: [
      { label: 'Material', value: 'Baja Galvanis Hot-Dip / SS304' },
      { label: 'Ketebalan', value: '1.8 mm - 2.0 mm' },
    ],
    faqs: [
      { question: 'Berapa masa pakai kaleng es?', answer: 'Dengan perawatan air garam teratur, masa pakai mencapai 5-8 tahun.' },
    ],
  },
  {
    catSlug: 'cold-room',
    slug: 'cold-storage-walk-in-50-ton',
    name: 'Cold Storage Modular Walk-in 50 Ton',
    shortDesc: 'Ruangan pendingin modular Chiller (+2°C) dan Freezer (-20°C).',
    description: 'Panel insulasi polyurethane densitas 45 kg/m3 dengan pengunci camlock kedap udara maksimal.',
    capacityLabel: 'Kapasitas 50 Ton',
    coverUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    sortOrder: 7,
    specs: [
      { label: 'Ketebalan Panel', value: '100 mm / 150 mm PUF' },
      { label: 'Suhu Operasional', value: '-18°C s/d -25°C' },
    ],
    faqs: [
      { question: 'Berapa lama waktu perakitan panel?', answer: 'Perakitan modular ukuran 50 ton memakan waktu 7-10 hari kerja di lokasi.' },
    ],
  },
];

export async function seedProducts(prisma: PrismaClient, catMap: Record<string, string>): Promise<void> {
  for (const item of productsData) {
    const categoryId = catMap[item.catSlug];
    if (!categoryId) continue;

    const product = await prisma.product.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        shortDesc: item.shortDesc,
        description: item.description,
        capacityLabel: item.capacityLabel,
        coverUrl: item.coverUrl,
        status: PublishStatus.PUBLISHED,
        sortOrder: item.sortOrder,
      },
      create: {
        categoryId,
        name: item.name,
        slug: item.slug,
        shortDesc: item.shortDesc,
        description: item.description,
        capacityLabel: item.capacityLabel,
        coverUrl: item.coverUrl,
        status: PublishStatus.PUBLISHED,
        sortOrder: item.sortOrder,
        publishedAt: new Date(),
      },
    });

    await prisma.productSpec.deleteMany({ where: { productId: product.id } });
    await prisma.productSpec.createMany({
      data: item.specs.map((s, idx) => ({ productId: product.id, label: s.label, value: s.value, sortOrder: idx + 1 })),
    });

    await prisma.productFaq.deleteMany({ where: { productId: product.id } });
    await prisma.productFaq.createMany({
      data: item.faqs.map((f, idx) => ({ productId: product.id, question: f.question, answer: f.answer, sortOrder: idx + 1 })),
    });
  }
  console.log(`✅ ${productsData.length} Published products seeded with specs and FAQs`);
}
