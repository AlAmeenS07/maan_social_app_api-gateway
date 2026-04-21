import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes"

dotenv.config()

const app = express()

app.use("/user-service" , userRoutes)

app.get("/" , (req , res)=>{
    res.send("Api gateway is running...")
})

const PORT : number = Number(process.env.PORT)

app.listen(PORT , ()=>{
    console.log(`Api gateway is running on http://localhost:${PORT}`)
})