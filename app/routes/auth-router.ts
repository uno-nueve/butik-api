import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send({ message: "Signup error", error });
    }
});

router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !user.password) {
            return res.status(401).send("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send("Invalid credentials");
        }

        res.status(200).send({ message: "User logged in", user: user._id });
    } catch (error) {
        res.status(400).send({ message: "Authentication error", error });
    }
});

export default router;
