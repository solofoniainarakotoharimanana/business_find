import mongoose from "mongoose";


export const connectDB = async() => {
    try {
        // console.log("Mongo URI >>>", process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected : ${conn.connection.host}`)
    } catch (error) {
        console.log("Error connection mongodb ", error.message)
        process.exit(1);//1 is failure, 0 status code is success
    }
}