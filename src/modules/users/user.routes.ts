import { Router } from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  resetPassword,
  deleteUser,
} from './user.controller.js';
import { validate } from '../../middleware/validate.js';
import {
  createUserSchema,
  updateUserSchema,
  resetPasswordSchema,
} from './user.schema.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const router = Router();

router.use(requireAuth, roleGuard('SUPERADMIN'));

router.get('/', getUsers);
router.post('/', validate(createUserSchema), createUser);
router.patch('/:id', validate(updateUserSchema), updateUser);
router.post('/:id/reset-password', validate(resetPasswordSchema), resetPassword);
router.delete('/:id', deleteUser);

export default router;
