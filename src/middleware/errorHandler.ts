import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { AppError } from '../utils/errors.js';
import { sendError } from '../utils/response.js';

function formatZodMessage(err: ZodError): string {
  return err.issues.map((i: ZodIssue) => `${i.path.join('.')}: ${i.message}`).join(', ');
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    sendError(res, `Validation error: ${formatZodMessage(err)}`, 400);
    return;
  }
  if (err instanceof AppError) {
    sendError(res, err.message, err.statusCode);
    return;
  }
  const fallback = err instanceof Error ? err.message : 'Internal Server Error';
  sendError(res, fallback, 500);
}
