import mongoose from "mongoose";

interface IProduct {
    title: string;
    description: string;
    price: number;
    stock: number;
    has_delivery?: boolean;
    pictures?: Array<mongoose.Types.ObjectId>;
}

const ProductSchema = new mongoose.Schema<IProduct>(
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

const Product = mongoose.model<IProduct>("products", ProductSchema);

export default Product;
