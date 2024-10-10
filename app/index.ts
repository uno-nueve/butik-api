import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import authRouter from "./routes/auth-router";

export const app = express();
const corsOptions: CorsOptions = {
    origin: "*",
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/", authRouter);

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});
