"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const constants_1 = require("../utils/constants");
const user_auth_1 = require("../middlewares/user.auth");
const router = (0, express_1.Router)();
router.use("/api/v1/user", user_auth_1.checkAuth);
router.use("/api/v1/admin", user_auth_1.adminAuthCheck);
router.use("/", (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: constants_1.POST_SERVICE_URL,
    changeOrigin: true,
    on: {
        proxyReq: (proxyReq, req) => {
            if (req.userId) {
                proxyReq.setHeader("x-user-id", req.userId);
            }
            if (req.headers["x-request-id"]) {
                proxyReq.setHeader("x-request-id", req.headers["x-request-id"]);
            }
        }
    }
}));
exports.default = router;
