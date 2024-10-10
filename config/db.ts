import mongoose from "mongoose";
import { config } from "dotenv";
config();

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL!);
        console.log("Successfully connected to database");
    } catch (error) {
        console.error("Database connection error", error);
        process.exit(1);
    }
};

export default connectDB;
