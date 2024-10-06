import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import bcrypt from "bcrypt";
import User from "./models/user";

export const app = express();
const corsOptions: CorsOptions = {
    origin: "*",
};

app.use(express.json());
app.use(cors(corsOptions));

app.post("/signup", async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User successfully registered",
            user: newUser,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !user.password) {
            return res.status(401).json({ error: "Authentication failed" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Authentication failed" });
        }

        return res
            .status(200)
            .json({ message: "User logged in", userId: user._id });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});
