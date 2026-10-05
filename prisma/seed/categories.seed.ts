import { PrismaClient } from '@prisma/client';

export const categoriesData = [
  { slug: 'tube', name: 'Tube', description: 'Mesin es batu tabung berlubang kristal higienis.', sortOrder: 1 },
  { slug: 'cube', name: 'Cube', description: 'Mesin es kotak komersial food-grade.', sortOrder: 2 },
  { slug: 'block', name: 'Block', description: 'Mesin es balok pendinginan langsung hemat energi.', sortOrder: 3 },
  { slug: 'flake', name: 'Flake', description: 'Mesin es serpihan kering sub-zero untuk preservasi ikan.', sortOrder: 4 },
  { slug: 'slurry', name: 'Slurry', description: 'Sistem es cair mengalir pendinginan cepat tanpa merusak kulit ikan.', sortOrder: 5 },
  { slug: 'kaleng-es', name: 'Kaleng Es', description: 'Cetakan kaleng es baja galvanis berstandar industri.', sortOrder: 6 },
  { slug: 'cold-room', name: 'Cold Room', description: 'Ruangan pendingin modular Chiller dan Freezer.', sortOrder: 7 },
];

export async function seedCategories(prisma: PrismaClient): Promise<Record<string, string>> {
  const categoryMap: Record<string, string> = {};

  for (const cat of categoriesData) {
    const record = await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, sortOrder: cat.sortOrder },
      create: { name: cat.name, slug: cat.slug, description: cat.description, sortOrder: cat.sortOrder },
    });
    categoryMap[cat.slug] = record.id;
  }

  console.log(`✅ ${categoriesData.length} Product categories seeded`);
  return categoryMap;
}
