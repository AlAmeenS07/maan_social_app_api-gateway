import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { USER_SERVICE_URL } from "../utils/constants";
import { adminAuthCheck, checkAuth, tempTokenCheck } from "../middlewares/user.auth";

const router = Router();

// router.use((req , res , next)=>{
//     console.log("here" , req.headers , req.body , req.url)
//     next()
// })

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
    if (!req.path.startsWith("/auth") && req.path !== "/refresh-token") {
        return checkAuth(req, res, next);
    }
    next();
});

router.use("/api/v1/admin", (req, res, next) => {
    if (!req.path.startsWith("/auth")) {
        return adminAuthCheck(req, res, next);
    }
    next();
});

router.use(
    process.env.BACK_SLASH_ROUTE as string,
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