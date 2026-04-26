import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { USER_SERVICE_URL } from "../utils/constants";
import { checkAuth, tempTokenCheck } from "../middlewares/user.auth";

const router = Router();

router.post(
    "/api/v1/user/auth/forgot-password",
    tempTokenCheck,
    createProxyMiddleware({
        target: USER_SERVICE_URL,
        changeOrigin: true,
        on: {
            proxyReq: (proxyReq, req: any) => {
                if (req.userId) {
                    proxyReq.setHeader("x-user-id", req.userId);
                }
            },
        },
    })

);

router.use("/api/v1/user", (req, res, next) => {
    if (!req.path.startsWith("/auth")) {
        return checkAuth(req, res, next);
    }
    next();
});

router.use(
    "/",
    createProxyMiddleware({
        target: USER_SERVICE_URL,
        changeOrigin: true,
        on: {
            proxyReq: (proxyReq, req: any) => {
                if (req.userId) {
                    proxyReq.setHeader("x-user-id", req.userId);
                }
            },
        },
    })
);

export default router;