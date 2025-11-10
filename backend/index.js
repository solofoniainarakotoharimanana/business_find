import experess from "express";
import dotenv from "dotenv"
import { connectDB } from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser";

import cors from "cors"


const app = experess();
dotenv.config();


const PORT = process.env.PORT || 5000

app.use(cors({ origin: "http://localhost:5173", credentials: true }));   
// app.use(cors({origin: "http://localhost:5173", credentials: true}))//Allow to send data from server to client side -  Credentials=true To allow cookies ...
app.use(experess.json()) //Allows us to parse incoming requests with json payloads
app.use(cookieParser()); //Allow us to parse incoming cookies

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on ${PORT}`)
})
