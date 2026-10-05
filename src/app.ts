import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { env } from './config/env.js';
import { corsConfig } from './config/cors.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { createApiRouter } from './routes.js';
import { getHealthStatus } from './modules/health/health.controller.js';

export function createApp(): Express {
  const app = express();

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(cors(corsConfig));
  app.use(cookieParser(env.COOKIE_SECRET));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
  app.use('/api', apiRateLimiter);
  app.get('/api/health', getHealthStatus);
  app.get('/health', getHealthStatus);
  app.use('/api/v1', createApiRouter());

  app.use(errorHandler);
  return app;
}
