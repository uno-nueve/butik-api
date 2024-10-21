import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        storeName: {
            type: String,
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
    },
    {
        timestamps: true,
    }
);

const Vendor = mongoose.model("vendor", VendorSchema);

export default Vendor;
