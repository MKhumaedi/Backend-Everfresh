import { Router } from 'express';
import {
  getHomeData,
  getProducts,
  getProductBySlug,
  getArticles,
  getArticleBySlug,
  getProjects,
} from './public.controller.js';

const router = Router();

router.get('/home', getHomeData);
router.get('/products', getProducts);
router.get('/products/:slug', getProductBySlug);
router.get('/articles', getArticles);
router.get('/articles/:slug', getArticleBySlug);
router.get('/projects', getProjects);

export default router;
