import mongoose from "mongoose";

interface IOrder {
    customer: mongoose.Types.ObjectId | undefined;
    vendor: mongoose.Types.ObjectId | undefined;
    product: mongoose.Types.ObjectId | undefined;
    status?: string;
    confirmationCode?: string;
    issueDate: Date;
    duebyDate: Date;
}

const OrderSchema = new mongoose.Schema<IOrder>({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    vendor: {
        type: mongoose.Types.ObjectId,
        ref: "Vendor",
        required: true,
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    status: {
        type: String,
        enum: ["issued", "confirmed", "canceled", "refunded"],
        default: "issued",
    },
    confirmationCode: {
        type: String,
    },
    issueDate: {
        type: Date,
    },
    duebyDate: {
        type: Date,
    },
});

const Order = mongoose.model<IOrder>("orders", OrderSchema);

export default Order;
