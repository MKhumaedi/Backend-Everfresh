import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = (await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })) as { body?: unknown; query?: unknown; params?: unknown };

      req.body = parsed.body ?? req.body;
      req.query = (parsed.query as typeof req.query) ?? req.query;
      req.params = (parsed.params as typeof req.params) ?? req.params;
      next();
    } catch (error) {
      next(error);
    }
  };
}
