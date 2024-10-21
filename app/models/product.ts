import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        has_delivery: {
            type: Boolean,
            default: false,
        },
        pictures: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Picture",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("products", ProductSchema);

export default Product;
