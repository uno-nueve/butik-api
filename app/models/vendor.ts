import mongoose from "mongoose";

interface IVendor {
    user: mongoose.Types.ObjectId | undefined;
    cuil: string;
    address?: string;
    telephone: string;
    catalog: Array<mongoose.Types.ObjectId>;
    accountTier?: string;
    paymentMethods?: Array<any>;
    links?: Array<string>;
}

const VendorSchema = new mongoose.Schema<IVendor>(
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

const Vendor = mongoose.model<IVendor>("vendors", VendorSchema);

export default Vendor;
