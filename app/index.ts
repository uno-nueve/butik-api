import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import authRouter from "./routes/auth-router";
import productsRouter from "./routes/products";
import usersRouter from "./routes/users";
import vendorsRouter from "./routes/vendors";

export const app = express();
const corsOptions: CorsOptions = {
    origin: "*",
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api", authRouter);
app.use("/api", productsRouter);
app.use("/api", usersRouter);
app.use("/api", vendorsRouter);

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});
