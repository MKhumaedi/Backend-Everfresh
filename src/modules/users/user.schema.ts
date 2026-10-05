import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(8, 'Kata sandi minimal 8 karakter'),
    name: z.string().min(2, 'Nama pengguna minimal 2 karakter'),
    role: z.enum(['ADMIN', 'SUPERADMIN']).optional(),
    department: z.string().optional(),
    avatarUrl: z.string().url().optional(),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    role: z.enum(['ADMIN', 'SUPERADMIN']).optional(),
    isActive: z.boolean().optional(),
    department: z.string().optional(),
  }),
});

export const resetPasswordSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    newPassword: z.string().min(8, 'Kata sandi baru minimal 8 karakter'),
  }),
});
