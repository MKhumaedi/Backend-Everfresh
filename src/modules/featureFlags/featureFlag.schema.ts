import { z } from 'zod';

export const updateFeatureFlagSchema = z.object({
  params: z.object({ key: z.string() }),
  body: z.object({
    isEnabled: z.boolean(),
    description: z.string().optional(),
  }),
});
