import express, { Request, Response } from "express";
import Product from "../models/product";

const router = express.Router();

//----------------------------------- CRUD OPERATIONS -----------------------------------//

// INDEX all product records in the collection
router.get("/products", async (req: Request, res: Response) => {
    try {
        const products = await Product.find();

        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

//SHOW a single product record by ID
router.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).send(product);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

//STORE a new product record in the collection
router.post("/products", async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const newProduct = await Product.create(data); //lazy way, update to presave check method later
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(400).send(error);
    }
});

//UPDATE a single product record form the collection
router.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(400).send({ message: "Error updating product", error });
    }
});

//REMOVE a single product record from the collection
router.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).send({ message: "Product successfully deleted" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting product", error });
    }
});

//----------------------------------- BUSINESS LOGIC -----------------------------------//

//UPDATE a product record state when purchasing
router.put("/products/:id/buy", async (req: Request, res: Response) => {
    try {
        //process order here
    } catch (error) {
        res.status(400).send({ message: "Error processing order", error });
    }
});

export default router;
