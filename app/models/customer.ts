import mongoose from "mongoose";

interface ICustomer {
    user: mongoose.Types.ObjectId | undefined;
    dni: string;
    address: string;
    telephone: string;
    purchases: Array<mongoose.Types.ObjectId>;
    paymentMethods: Array<any>;
}

const CustomerSchema = new mongoose.Schema<ICustomer>(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        dni: {
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

const Customer = mongoose.model<ICustomer>("customers", CustomerSchema);

export default Customer;
