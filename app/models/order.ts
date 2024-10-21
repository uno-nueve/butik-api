import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
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

const Order = mongoose.model("orders", OrderSchema);

export default Order;
