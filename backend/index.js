import experess from "express";
import dotenv from "dotenv"
import { connectDB } from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js"

const app = experess();
dotenv.config();
app.use(experess.json()) //Allows us to parse incoming requests with json payloads

const PORT = process.env.PORT || 5000


app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on ${PORT}`)
})
