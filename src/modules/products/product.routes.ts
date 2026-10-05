import { Router } from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from './product.controller.js';
import { validate } from '../../middleware/validate.js';
import {
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
} from './product.schema.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const router = Router();

router.use(requireAuth, roleGuard('ADMIN', 'SUPERADMIN'));

router.get('/', validate(productQuerySchema), getProducts);
router.get('/:id', getProduct);
router.post('/', validate(createProductSchema), createProduct);
router.patch('/:id', validate(updateProductSchema), updateProduct);
router.delete('/:id', roleGuard('SUPERADMIN'), deleteProduct);

export default router;
