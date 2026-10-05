import { Router } from 'express';
import {
  getArticleCategories,
  createArticleCategory,
  deleteArticleCategory,
} from './articleCategory.controller.js';
import { validate } from '../../middleware/validate.js';
import { articleCategorySchema } from './article.schema.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const router = Router();

router.use(requireAuth, roleGuard('ADMIN', 'SUPERADMIN'));

router.get('/', getArticleCategories);
router.post('/', validate(articleCategorySchema), createArticleCategory);
router.delete('/:id', deleteArticleCategory);

export default router;
