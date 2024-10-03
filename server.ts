import { app } from "./app";
import mongoose from "mongoose";
import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const MONGO_URL = process.env.MONGO_URL;

mongoose
    .connect(MONGO_URL!)
    .then(() => {
        console.log("connected to database");
    })
    .catch((error) => console.error("connection", error));

app.listen(PORT, () => {
    console.log(`Server running on port: http://${HOST}:${PORT}`);
});
