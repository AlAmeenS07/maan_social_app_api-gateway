"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_1 = require("../config/logger");
const constants_1 = require("../utils/constants");
const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        logger_1.logger.info(constants_1.REQUEST_COMPLETED, {
            requestId: req.headers["x-request-id"],
            userId: req.userId || null,
            method: req.method,
            route: req.originalUrl,
            statusCode: res.statusCode,
            duration: Date.now() - start,
        });
    });
    next();
};
exports.requestLogger = requestLogger;
