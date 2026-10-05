import { prisma } from '../../src/config/prisma.js';
import { seedAdmin } from './admin.seed.js';
import { seedCategories } from './categories.seed.js';
import { seedHomeSections } from './sections.seed.js';
import { seedSiteSettings, seedOffices } from './settings.seed.js';
import { seedFeatureFlags } from './featureFlags.seed.js';
import { seedProducts } from './products.seed.js';
import { seedProjects } from './projects.seed.js';
import { seedServices } from './services.seed.js';
import { seedTestimonials } from './testimonials.seed.js';
import { seedArticles } from './articles.seed.js';

async function runSeed(): Promise<void> {
  console.log('❄️ Starting EVERFRESH database seed...');
  const adminId = await seedAdmin(prisma);
  const catMap = await seedCategories(prisma);
  await seedHomeSections(prisma);
  await seedSiteSettings(prisma);
  await seedOffices(prisma);
  await seedFeatureFlags(prisma);
  await seedProducts(prisma, catMap);
  await seedProjects(prisma);
  await seedServices(prisma);
  await seedTestimonials(prisma);
  await seedArticles(prisma, adminId);
  console.log('🎉 EVERFRESH database seeding completed successfully!');
}

runSeed()
  .catch((e: unknown) => {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    console.error('❌ Database seeding failed:', msg);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
