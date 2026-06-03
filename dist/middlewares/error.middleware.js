"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
const constants_1 = require("../utils/constants");
const logger_1 = require("../config/logger");
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, _next) => {
    logger_1.logger.error(constants_1.REQUEST_FAILED, {
        requestId: req.headers["x-request-id"],
        userId: req.userId || null,
        method: req.method,
        route: req.originalUrl,
        error: err.message,
        stack: err.stack,
    });
    const statusCode = err.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message || constants_1.INTERNAL_SERVER_ERROR,
    });
};
exports.errorHandler = errorHandler;
