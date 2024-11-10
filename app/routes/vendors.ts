import express, { Request, Response } from "express";
import Vendor from "../models/vendor";

const router = express.Router();

//INDEX all vendor records
router.get("/vendors", async (req: Request, res: Response) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).send(vendors);
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
    }
});

// STORE new vendor record in the collection
router.post("/vendors", async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const newVendor = await Vendor.create(data);
        res.status(201).send(newVendor);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;
