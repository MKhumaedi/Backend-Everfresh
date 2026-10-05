import { prisma } from '../config/prisma.js';

export interface LogActivityParams {
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
}

export async function logActivity(params: LogActivityParams): Promise<void> {
  if (!params.userId) return;
  try {
    await prisma.activityLog.create({
      data: {
        userId: params.userId,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('⚠️ Failed to record activity log:', msg);
  }
}
