
import { NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, REQUEST_FAILED } from "../utils/constants";
import { logger } from "../config/logger";


export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction) => {
  logger.error(REQUEST_FAILED , {
    requestId: req.headers["x-request-id"],
    userId: (req as any).userId || null,
    method: req.method,
    route: req.originalUrl,
    error: err.message,
    stack: err.stack,
  });

  const statusCode = err.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || INTERNAL_SERVER_ERROR,
  });
};