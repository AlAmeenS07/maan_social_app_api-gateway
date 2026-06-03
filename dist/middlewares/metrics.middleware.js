"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsMiddleware = void 0;
const metrices_1 = require("../observability/metrices");
const metricsMiddleware = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = (Date.now() - start) / 1000;
        const route = req.originalUrl;
        metrices_1.httpRequestsTotal.inc({
            method: req.method,
            route,
            status: String(res.statusCode)
        });
        metrices_1.httpRequestDuration.observe({
            method: req.method,
            route
        }, duration);
        if (res.statusCode >= 400) {
            metrices_1.httpErrorsTotal.inc({
                route,
                status: String(res.statusCode)
            });
        }
    });
    next();
};
exports.metricsMiddleware = metricsMiddleware;
