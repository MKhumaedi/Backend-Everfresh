import { Router } from 'express';
import { submitInquiry, getInquiries } from './inquiry.controller.js';
import { validate } from '../../middleware/validate.js';
import { createInquirySchema, inquiryQuerySchema } from './inquiry.schema.js';
import { publicQuoteRateLimiter } from '../../middleware/rateLimiter.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const router = Router();

router.post(
  '/',
  publicQuoteRateLimiter,
  validate(createInquirySchema),
  submitInquiry
);

router.get(
  '/',
  requireAuth,
  roleGuard('ADMIN', 'SUPERADMIN'),
  validate(inquiryQuerySchema),
  getInquiries
);

export default router;
