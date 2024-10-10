import { app } from "./app";
import connectDB from "./config/db";
import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port: http://${HOST}:${PORT}`);
        });
    })
    .catch((error) => console.error("Error initializing server", error));
