import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import productRoutes from './modules/products/product.routes.js';
import categoryRoutes from './modules/products/category.routes.js';
import projectRoutes from './modules/projects/project.routes.js';
import serviceRoutes from './modules/services/service.routes.js';
import articleRoutes from './modules/articles/article.routes.js';
import articleCategoryRoutes from './modules/articles/articleCategory.routes.js';
import testimonialRoutes from './modules/testimonials/testimonial.routes.js';
import homeRoutes from './modules/home/home.routes.js';
import quoteRoutes from './modules/quotes/quote.routes.js';
import mediaRoutes from './modules/media/media.routes.js';
import userRoutes from './modules/users/user.routes.js';
import settingRoutes from './modules/settings/setting.routes.js';
import officeRoutes from './modules/settings/office.routes.js';
import featureFlagRoutes from './modules/featureFlags/featureFlag.routes.js';
import activityLogRoutes from './modules/activityLogs/activityLog.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';
import publicRoutes from './modules/public/public.routes.js';
import healthRoutes from './modules/health/health.routes.js';

export function createApiRouter(): Router {
  const router = Router();

  router.use('/public', publicRoutes);
  router.use('/auth', authRoutes);
  router.use('/products', productRoutes);
  router.use('/product-categories', categoryRoutes);
  router.use('/projects', projectRoutes);
  router.use('/services', serviceRoutes);
  router.use('/articles', articleRoutes);
  router.use('/article-categories', articleCategoryRoutes);
  router.use('/testimonials', testimonialRoutes);
  router.use('/home', homeRoutes);
  router.use('/quotes', quoteRoutes);
  router.use('/inquiries', quoteRoutes);
  router.use('/media', mediaRoutes);
  router.use('/users', userRoutes);
  router.use('/settings', settingRoutes);
  router.use('/offices', officeRoutes);
  router.use('/feature-flags', featureFlagRoutes);
  router.use('/activity-logs', activityLogRoutes);
  router.use('/dashboard', dashboardRoutes);
  router.use('/', healthRoutes);

  return router;
}
