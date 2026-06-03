import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes"
import cors from "cors"
import { errorHandler } from "./middlewares/error.middleware"
import cookieParser from "cookie-parser"
import mediaRoutes from "./routes/media.routes"
import postRoutes from "./routes/post.routes"
import { metricsMiddleware } from "./middlewares/metrics.middleware"
import { requestIdMiddleware } from "./middlewares/req.id.middleware"
import register from "./config/prom.client"
import { requestLogger } from "./middlewares/req.logger.middleware"


dotenv.config()

const app = express()
app.use(cookieParser())

app.use(requestIdMiddleware)
app.use(requestLogger)
app.use(metricsMiddleware)

app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  })
);

app.use(process.env.USER_SERVICE_ROUTE as string, userRoutes)
app.use(process.env.MEDIA_SERVICE_ROUTE as string, mediaRoutes)
app.use(process.env.POST_SERVICE_ROUTE as string, postRoutes)

app.get(process.env.BACK_SLASH_ROUTE as string, (_req, res) => {
  res.send("Api gateway is running...")
})

app.get(process.env.METRICS_ROUTE as string, async (_req, res) => {
  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());

});


app.use(errorHandler)

const PORT: number = Number(process.env.PORT)

app.listen(PORT, () => {
  console.log(`Api gateway is running on http://localhost:${PORT}`)
})