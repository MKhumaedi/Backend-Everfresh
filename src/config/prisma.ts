import { PrismaClient } from '@prisma/client';
import { env } from './env.js';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: env.DATABASE_URL } },
    log: env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export async function disconnectPrisma(): Promise<void> {
  try {
    await prisma.$disconnect();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error disconnecting database:', msg);
  }
}

export async function checkDatabase(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1 as connected`;
    console.log('✅ Database connected successfully via SELECT 1.');
    return true;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Connection failed';
    console.error(`❌ Database connection failed: ${msg}`);
    return false;
  }
}

export async function getTableCount(): Promise<number> {
  try {
    const res = await prisma.$queryRaw<Array<{ count: number }>>`
      SELECT count(*)::int as count 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `;
    return Number(res[0]?.count ?? 0);
  } catch {
    return 0;
  }
}

process.on('beforeExit', () => {
  void disconnectPrisma();
});

export default prisma;
