import { Router } from 'express';
import { login, logout, getMe, changePassword } from './auth.controller.js';
import { validate } from '../../middleware/validate.js';
import { loginSchema, changePasswordSchema } from './auth.schema.js';
import { requireAuth } from '../../middleware/auth.js';
import { authRateLimiter } from '../../middleware/rateLimiter.js';

const router = Router();

router.post('/login', authRateLimiter, validate(loginSchema), login);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, getMe);
router.post('/change-password', requireAuth, validate(changePasswordSchema), changePassword);

export default router;
