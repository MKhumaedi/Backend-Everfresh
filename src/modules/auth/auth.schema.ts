import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string().optional(),
    newPassword: z.string().min(8, 'Password baru minimal 8 karakter'),
  }),
});
