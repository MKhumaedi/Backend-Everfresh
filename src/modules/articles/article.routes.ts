import { Router } from 'express';
import {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from './article.controller.js';
import { validate } from '../../middleware/validate.js';
import {
  createArticleSchema,
  updateArticleSchema,
  articleQuerySchema,
} from './article.schema.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const router = Router();

router.use(requireAuth, roleGuard('ADMIN', 'SUPERADMIN'));

router.get('/', validate(articleQuerySchema), getArticles);
router.get('/:id', getArticle);
router.post('/', validate(createArticleSchema), createArticle);
router.patch('/:id', validate(updateArticleSchema), updateArticle);
router.delete('/:id', roleGuard('SUPERADMIN'), deleteArticle);

export default router;
