import { createApp } from './app.js';
import { env } from './config/env.js';
import { checkDatabase, disconnectPrisma } from './config/prisma.js';

const app = createApp();

const server = app.listen(env.PORT, async () => {
  console.log(`🚀 Everfresh Backend running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  await checkDatabase();
});

async function handleShutdown(signal: string): Promise<void> {
  console.log(`Received ${signal}, shutting down gracefully...`);
  server.close(async () => {
    await disconnectPrisma();
    process.exit(0);
  });
}

process.on('SIGTERM', () => void handleShutdown('SIGTERM'));
process.on('SIGINT', () => void handleShutdown('SIGINT'));
