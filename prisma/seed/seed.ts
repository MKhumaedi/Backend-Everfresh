import bcrypt from 'bcryptjs';
import { PrismaClient, Role } from '@prisma/client';
import { env } from '../../src/config/env.js';

export async function seedAdmin(prisma: PrismaClient): Promise<string> {
  if (!env.SEED_SUPERADMIN_EMAIL || !env.SEED_SUPERADMIN_PASSWORD) {
    throw new Error('SEED_SUPERADMIN_EMAIL and SEED_SUPERADMIN_PASSWORD must be set in environment.');
  }

  const superHash = await bcrypt.hash(env.SEED_SUPERADMIN_PASSWORD, 10);
  const superadmin = await prisma.user.upsert({
    where: { email: env.SEED_SUPERADMIN_EMAIL },
    update: { role: Role.SUPERADMIN, isActive: true, passwordHash: superHash },
    create: {
      email: env.SEED_SUPERADMIN_EMAIL,
      name: 'Super Administrator',
      passwordHash: superHash,
      role: Role.SUPERADMIN,
      isActive: true,
      mustChangePassword: false,
    },
  });
  console.log(`✅ SUPERADMIN verified: ${superadmin.email}`);

  // Akun ADMIN demo (sesuai tombol demo di halaman login)
  const adminHash = await bcrypt.hash('AdminPass123!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@everfresh.id' },
    update: { role: Role.ADMIN, isActive: true, passwordHash: adminHash },
    create: {
      email: 'admin@everfresh.id',
      name: 'Administrator',
      passwordHash: adminHash,
      role: Role.ADMIN,
      isActive: true,
      mustChangePassword: false,
    },
  });
  console.log(`✅ ADMIN verified: ${admin.email}`);

  return superadmin.id;
}