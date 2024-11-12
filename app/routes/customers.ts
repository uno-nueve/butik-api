import express, { Request, Response } from "express";
import Customer from "../models/customer";

const router = express.Router();

//----------------------------------- CRUD OPERATIONS -----------------------------------//

//INDEX all orders in the collection
router.get("/customers", async (req: Request, res: Response) => {
    try {
        const customers = await Customer.find();
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

//SHOW a single customer record by ID
router.get("/customers/:id", async (req: Request, res: Response) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).send({ message: "Customer not found" });
        }

        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

//STORE a new customer record in the collection
router.post("/customers", async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const newCustomer = await Customer.create(data);
        res.status(201).send(newCustomer);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

//UPDATE a single customer record by ID
router.put("/customers/:id", async (req: Request, res: Response) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedCustomer) {
            return res.status(404).send("Customer not found");
        }

        res.status(200).send(updatedCustomer);
    } catch (error) {
        res.status(400).send({ message: "Error updating customer", error });
    }
});

//REMOVE a single customer record by ID
router.delete("/customers/:id", async (req: Request, res: Response) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).send({ message: "Customer not found" });
        }

        res.status(200).send({ message: "Customer successfully deleted" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting customer", error });
    }
});

export default router;
