import { prisma } from '../../config/prisma.js';
import { logActivity } from '../../utils/activityLogger.js';
import { NotFoundError } from '../../utils/errors.js';

export async function listFeatureFlags() {
  return prisma.featureFlag.findMany({ orderBy: { key: 'asc' } });
}

export async function getPublicFeatureFlags() {
  const flags = await prisma.featureFlag.findMany();
  const map: Record<string, boolean> = {};
  flags.forEach((f) => { map[f.key] = f.isEnabled; });
  return map;
}

export async function updateFeatureFlag(
  key: string,
  input: { isEnabled: boolean; description?: string },
  actorId?: string
) {
  const flag = await prisma.featureFlag.findUnique({ where: { key } });
  if (!flag) throw new NotFoundError('Fitur tidak ditemukan');

  const updated = await prisma.featureFlag.update({
    where: { key },
    data: input,
  });

  await logActivity({
    userId: actorId,
    action: 'TOGGLE_FEATURE_FLAG',
    entity: 'FEATURE_FLAG',
    entityId: key,
  });
  return updated;
}
