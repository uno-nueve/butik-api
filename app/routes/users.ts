import express, { Request, Response } from "express";
import User from "../models/user";

const router = express.Router();

//----------------------------------- CRUD OPERATIONS -----------------------------------//

//INDEX all user records
router.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

//SHOW a single user record by ID
router.get("/users/:id", async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

//UPDATE a single user record by ID
router.put("/users/:id", async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(400).send({ message: "Error updating user", error });
    }
});

//REMOVE a single user record by ID
router.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ message: "User successfully deleted" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting user", error });
    }
});

export default router;
