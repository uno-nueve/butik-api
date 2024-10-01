import express, { Express, Request, Response } from "express";

export const app: Express = express();

app.use(express.json());

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});
