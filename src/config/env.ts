import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env') });

function sanitizeUrl(raw?: string): string {
  if (!raw) return '';
  return raw.trim().replace(/(:\s+)(?=[^@]*@)/g, ':');
}

function hasPlaceholder(val: string): boolean {
  const upper = val.toUpperCase();
  return upper.includes('[YOUR-PASSWORD]') || upper.includes('[PASSWORD]');
}

const dbUrlValidator = z
  .string({ required_error: 'DATABASE_URL is required' })
  .min(1, 'DATABASE_URL cannot be empty')
  .refine((val) => !hasPlaceholder(val), {
    message: 'DATABASE_URL still contains placeholder password [YOUR-PASSWORD]',
  })
  .refine((val) => !val.includes('pooler.supabase.com:6543') || val.includes('pgbouncer=true'), {
    message: 'DATABASE_URL Supabase pooler (port 6543) harus memakai "?pgbouncer=true"',
  });

const directUrlValidator = z
  .string({ required_error: 'DIRECT_URL is required' })
  .min(1, 'DIRECT_URL cannot be empty')
  .refine((val) => !hasPlaceholder(val), {
    message: 'DIRECT_URL still contains placeholder password [YOUR-PASSWORD]',
  });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: dbUrlValidator,
  DIRECT_URL: directUrlValidator,
  JWT_SECRET: z.string({ required_error: 'JWT_SECRET is required' }).min(16),
  SEED_SUPERADMIN_EMAIL: z.string({ required_error: 'SEED_SUPERADMIN_EMAIL is required' }).email(),
  SEED_SUPERADMIN_PASSWORD: z.string({ required_error: 'SEED_SUPERADMIN_PASSWORD is required' }).min(8),
  COOKIE_SECRET: z.string().default('everfresh_secret_cookie_signing_token'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
});

if (process.env.DATABASE_URL) {
  process.env.DATABASE_URL = sanitizeUrl(process.env.DATABASE_URL);
}
if (process.env.DIRECT_URL) {
  process.env.DIRECT_URL = sanitizeUrl(process.env.DIRECT_URL);
}
if (!process.env.JWT_SECRET && process.env.JWT_ACCESS_SECRET) {
  process.env.JWT_SECRET = process.env.JWT_ACCESS_SECRET;
}

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => ` - ${i.path.join('.')}: ${i.message}`).join('\n');
  console.error(`❌ [ENV ERROR] Invalid environment configuration:\n${issues}`);
  process.exit(1);
}

export const env = parsed.data;