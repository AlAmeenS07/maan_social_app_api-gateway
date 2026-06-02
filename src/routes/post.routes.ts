import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { POST_SERVICE_URL } from "../utils/constants";
import { adminAuthCheck, checkAuth } from "../middlewares/user.auth";


const router = Router()


router.use(
   "/api/v1/user",
   checkAuth
);

router.use(
   "/api/v1/admin",
   adminAuthCheck
);


router.use(
   "/",
   createProxyMiddleware({
      target: POST_SERVICE_URL,
      changeOrigin: true,

      on: {
         proxyReq: (proxyReq, req: any) => {
            if (req.userId) {
               proxyReq.setHeader("x-user-id", req.userId);
            }
            if (req.headers["x-request-id"]) {
               proxyReq.setHeader("x-request-id", req.headers["x-request-id"]);
            }
         }
      }
   })
);


export default router