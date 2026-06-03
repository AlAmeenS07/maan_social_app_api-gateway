"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const constants_1 = require("../utils/constants");
const user_auth_1 = require("../middlewares/user.auth");
const router = (0, express_1.Router)();
// router.use((req , res , next)=>{
//     console.log("here" , req.headers , req.body , req.url)
//     next()
// })
router.post("/api/v1/user/auth/forgot-password", user_auth_1.tempTokenCheck, (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: constants_1.USER_SERVICE_URL,
    changeOrigin: true,
    on: {
        proxyReq: (proxyReq, req) => {
            if (req.userId) {
                proxyReq.setHeader("x-user-id", req.userId);
            }
            if (req.headers["x-request-id"]) {
                proxyReq.setHeader("x-request-id", req.headers["x-request-id"]);
            }
        },
    },
}));
router.use("/api/v1/user", (req, res, next) => {
    if (!req.path.startsWith("/auth") && req.path !== "/refresh-token") {
        return (0, user_auth_1.checkAuth)(req, res, next);
    }
    next();
});
router.use("/api/v1/admin", (req, res, next) => {
    if (!req.path.startsWith("/auth")) {
        return (0, user_auth_1.adminAuthCheck)(req, res, next);
    }
    next();
});
router.use("/", (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: constants_1.USER_SERVICE_URL,
    changeOrigin: true,
    on: {
        proxyReq: (proxyReq, req) => {
            if (req.userId) {
                proxyReq.setHeader("x-user-id", req.userId);
            }
            if (req.headers["x-request-id"]) {
                proxyReq.setHeader("x-request-id", req.headers["x-request-id"]);
            }
        },
    },
}));
exports.default = router;
