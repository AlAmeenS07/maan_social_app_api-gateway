"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdMiddleware = void 0;
const uuid_1 = require("uuid");
const requestIdMiddleware = (req, res, next) => {
    const requestId = (0, uuid_1.v4)();
    req.headers["x-request-id"] = requestId;
    res.setHeader("x-request-id", requestId);
    next();
};
exports.requestIdMiddleware = requestIdMiddleware;
