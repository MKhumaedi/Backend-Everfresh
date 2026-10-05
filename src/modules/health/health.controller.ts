import { Request, Response } from 'express';
import { checkDatabase, getTableCount } from '../../config/prisma.js';

export async function getHealthStatus(_req: Request, res: Response): Promise<void> {
  const isConnected = await checkDatabase();
  const tables = isConnected ? await getTableCount() : 0;
  res.status(isConnected ? 200 : 503).json({
    success: isConnected,
    data: {
      database: isConnected ? 'connected' : 'error',
      tables,
    },
    message: isConnected ? 'System is healthy' : 'Database disconnected',
  });
}
