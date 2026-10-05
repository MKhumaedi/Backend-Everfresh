import { Response } from 'express';
import { ApiResponse } from '../types/response.js';

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = 'Operation successful',
  statusCode = 200
): void {
  const payload: ApiResponse<T> = {
    success: true,
    data,
    message,
  };
  res.status(statusCode).json(payload);
}

export function sendCreated<T>(
  res: Response,
  data: T,
  message = 'Created successfully'
): void {
  sendSuccess(res, data, message, 201);
}

export function sendError(
  res: Response,
  message: string,
  statusCode = 500
): void {
  const payload: ApiResponse<null> = {
    success: false,
    data: null,
    message,
  };
  res.status(statusCode).json(payload);
}
