import bcrypt from 'bcryptjs';
import { PrismaClient, Role } from '@prisma/client';
import { env } from '../../src/config/env.js';

export async function seedAdmin(prisma: PrismaClient): Promise<string> {
  if (!env.SEED_SUPERADMIN_EMAIL || !env.SEED_SUPERADMIN_PASSWORD) {
    throw new Error('SEED_SUPERADMIN_EMAIL and SEED_SUPERADMIN_PASSWORD must be set in environment.');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(env.SEED_SUPERADMIN_PASSWORD, salt);

  const superadmin = await prisma.user.upsert({
    where: { email: env.SEED_SUPERADMIN_EMAIL },
    update: {
      role: Role.SUPERADMIN,
      isActive: true,
    },
    create: {
      email: env.SEED_SUPERADMIN_EMAIL,
      name: 'Super Administrator',
      passwordHash,
      role: Role.SUPERADMIN,
      isActive: true,
      mustChangePassword: true,
    },
  });

  console.log(`✅ SUPERADMIN verified: ${superadmin.email} (mustChangePassword=true)`);
  return superadmin.id;
}
