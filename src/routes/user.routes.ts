import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { USER_SERVICE_URL } from "../utils/constants";

const router = Router()

router.use("/" , 
    createProxyMiddleware({
        target : USER_SERVICE_URL,
        changeOrigin : true,
    })
)


export default router