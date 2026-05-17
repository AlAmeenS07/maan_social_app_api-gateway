import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { MEDIA_SERVICE_URL } from "../utils/constants";
import { checkAuth } from "../middlewares/user.auth";


const router = Router()

router.use(
    "/",
    checkAuth,
    createProxyMiddleware({
        target: MEDIA_SERVICE_URL,
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

export default router