import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";
import { REQUEST_COMPLETED } from "../utils/constants";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {

    const start = Date.now();

    res.on("finish", () => {

        logger.info(REQUEST_COMPLETED, {
            requestId: req.headers["x-request-id"],
            userId: (req as any).userId || null,
            method: req.method,
            route: req.originalUrl,
            statusCode: res.statusCode,
            duration: Date.now() - start,
        });

    });

    next();
};