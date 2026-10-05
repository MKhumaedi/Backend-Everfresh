import { Router } from 'express';
import {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from './testimonial.controller.js';
import { validate } from '../../middleware/validate.js';
import {
  createTestimonialSchema,
  updateTestimonialSchema,
  testimonialQuerySchema,
} from './testimonial.schema.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const router = Router();

router.use(requireAuth, roleGuard('ADMIN', 'SUPERADMIN'));

router.get('/', validate(testimonialQuerySchema), getTestimonials);
router.get('/:id', getTestimonial);
router.post('/', validate(createTestimonialSchema), createTestimonial);
router.patch('/:id', validate(updateTestimonialSchema), updateTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;
