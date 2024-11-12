import express, { Request, Response } from "express";
import Vendor from "../models/vendor";

const router = express.Router();

//----------------------------------- CRUD OPERATIONS -----------------------------------//

//INDEX all vendor records
router.get("/vendors", async (req: Request, res: Response) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).send(vendors);
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
    }
});

//SHOW a single vendor record by ID
router.get("/vendors/:id", async (req: Request, res: Response) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).send({ message: "Vendor not found" });
        }

        res.status(200).send(vendor);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

//STORE new vendor record in the collection
router.post("/vendors", async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const newVendor = await Vendor.create(data);
        res.status(201).send(newVendor);
    } catch (error) {
        res.status(400).send(error);
    }
});

//UPDATE a single vendor record by ID
router.put("/vendors/:id", async (req: Request, res: Response) => {
    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedVendor) {
            return res.status(404).send({ message: "Vendor not found" });
        }

        res.status(200).send(updatedVendor);
    } catch (error) {
        res.status(400).send({ message: "Error updating vendor", error });
    }
});

//REMOVE a single vendor record by ID
router.delete("/vendors/:id", async (req: Request, res: Response) => {
    try {
        const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!deletedVendor) {
            return res.status(404).send({ message: "Vendor not found" });
        }

        res.status(200).send({ message: "Vendor successfully deleted" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting vendor", error });
    }
});

export default router;
