import { prisma } from '../../config/prisma.js';
import { logActivity } from '../../utils/activityLogger.js';

export async function getSiteSettings(): Promise<Record<string, unknown>> {
  const rows = await prisma.siteSetting.findMany();
  const result: Record<string, unknown> = {};
  for (const r of rows) result[r.key] = r.value;
  return result;
}

export async function updateSiteSettings(input: Record<string, unknown>, userId?: string) {
  for (const [key, value] of Object.entries(input)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: value as object },
      create: { key, value: value as object },
    });
  }

  await logActivity({ userId, action: 'UPDATE', entity: 'SITE_SETTING', entityId: 'all' });
  return getSiteSettings();
}
