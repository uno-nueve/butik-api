import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        cuil: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        telephone: {
            type: String,
            required: true,
        },
        catalog: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Product",
            },
        ],
        accountTier: {
            type: String,
            enum: ["free", "subscription", "premium"],
            default: "free",
        },
        paymentMethods: [],
        links: [],
    },
    {
        timestamps: true,
    }
);

const Vendor = mongoose.model("vendors", VendorSchema);

export default Vendor;
