import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        dni: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        telephone: {
            type: String,
            required: true,
        },
        purchases: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Order",
            },
        ],
        paymentMethods: [],
    },
    {
        timestamps: true,
    }
);

const Customer = mongoose.model("customers", CustomerSchema);

export default Customer;
