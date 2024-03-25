import mongoose from "mongoose";

let isConnected = false;
export const dbConnect = async () => {
    mongoose.set("strictQuery" , true)
    if (isConnected) {
        return;
    }

    const MONGO_URI = process.env.MONGO_URI
    if (!MONGO_URI) {
        throw new Error(
            "Please define the MONGO_URI environment variable inside .env.local"
        );
    }
    
    try {
        await mongoose.connect(MONGO_URI, {bufferCommands: false})
        isConnected = true
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB", error)
    }
}