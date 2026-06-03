"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const error_middleware_1 = require("../middlewares/error.middleware");
const successResponse = (res, data, message = "Success", status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data,
    });
};
exports.successResponse = successResponse;
const errorResponse = (message, status = 500) => {
    throw new error_middleware_1.AppError(message, status);
};
exports.errorResponse = errorResponse;
