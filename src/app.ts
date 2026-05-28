import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes"
import cors from "cors"
import { errorHandler } from "./middlewares/error.middleware"
import cookieParser from "cookie-parser"
import mediaRoutes from "./routes/media.routes"
import postRoutes from "./routes/post.routes"


dotenv.config()

const app = express()
app.use(cookieParser())

const PORT : number = Number(process.env.PORT)


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(process.env.USER_SERVICE_ROUTE as string , userRoutes)
app.use(process.env.MEDIA_SERVICE_ROUTE as string, mediaRoutes)
app.use(process.env.POST_SERVICE_ROUTE as string, postRoutes)

app.get(process.env.BACK_SLASH_ROUTE as string, (req , res)=>{
    res.send("Api gateway is running...")
})


app.use(errorHandler)

app.listen(PORT , ()=>{
    console.log(`Api gateway is running on http://localhost:${PORT}`)
})