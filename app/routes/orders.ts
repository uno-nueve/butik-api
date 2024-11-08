import express, { Request, Response } from "express";
import Order from "../models/order";

const router = express.Router();

//----------------------------------- CRUD OPERATIONS -----------------------------------//

//INDEX all orders in the collection
router.get("/orders", async (req: Request, res: Response) => {
    try {
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

//SHOW a single order record by ID
router.get("/orders/:id", async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send({ message: "Order not found" });
        }

        res.status(200).send(order);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

//STORE a new order record in the collection
router.post("/orders", async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const newOrder = await Order.create(data);
        res.status(201).send(newOrder);
    } catch (error) {
        res.status(400).send(error);
    }
});

//UPDATE a single order record by ID
router.put("/orders/:id", async (req: Request, res: Response) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedOrder) {
            return res.status(404).send({ message: "Order not found" });
        }

        res.status(200).send(updatedOrder);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

//REMOVE a single order record by ID
router.delete("/orders/:id", async (req: Request, res: Response) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).send({ message: "Order not found" });
        }

        res.status(200).send({ message: "Order successfully deleted" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});
