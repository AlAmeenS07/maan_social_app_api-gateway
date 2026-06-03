"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthCheck = exports.checkAuth = exports.tempTokenCheck = void 0;
const jwt_util_1 = require("../utils/jwt.util");
const constants_1 = require("../utils/constants");
const response_handle_1 = require("../utils/response.handle");
const tempTokenCheck = async (req, res, next) => {
    try {
        const { tempToken } = req.cookies;
        if (!tempToken) {
            return (0, response_handle_1.errorResponse)(constants_1.TOKEN_MISSING, constants_1.statusCodes.UNAUTHORIZED);
        }
        const decoded = (0, jwt_util_1.veriftyToken)(tempToken);
        if (decoded.role != "user") {
            return (0, response_handle_1.errorResponse)(constants_1.INVALID_USER, constants_1.statusCodes.BAD_REQUEST);
        }
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            return (0, response_handle_1.errorResponse)(error.message, constants_1.statusCodes.SERVER_ERROR);
        }
        return (0, response_handle_1.errorResponse)(constants_1.SOMETHING_ERROR, constants_1.statusCodes.SERVER_ERROR);
    }
};
exports.tempTokenCheck = tempTokenCheck;
const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return (0, response_handle_1.errorResponse)(constants_1.TOKEN_MISSING, constants_1.statusCodes.UNAUTHORIZED);
        }
        const decoded = (0, jwt_util_1.veriftyToken)(token);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            return (0, response_handle_1.errorResponse)(error.message, constants_1.statusCodes.UNAUTHORIZED);
        }
        return (0, response_handle_1.errorResponse)(constants_1.SOMETHING_ERROR, constants_1.statusCodes.UNAUTHORIZED);
    }
};
exports.checkAuth = checkAuth;
const adminAuthCheck = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return (0, response_handle_1.errorResponse)(constants_1.TOKEN_MISSING, constants_1.statusCodes.UNAUTHORIZED);
        }
        const decoded = (0, jwt_util_1.veriftyToken)(token);
        if (decoded.role != "admin") {
            return (0, response_handle_1.errorResponse)(constants_1.INVALID_USER, constants_1.statusCodes.FORBIDDEN);
        }
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            return (0, response_handle_1.errorResponse)(error.message, constants_1.statusCodes.UNAUTHORIZED);
        }
        return (0, response_handle_1.errorResponse)(constants_1.SOMETHING_ERROR, constants_1.statusCodes.UNAUTHORIZED);
    }
};
exports.adminAuthCheck = adminAuthCheck;
