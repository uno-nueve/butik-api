import mongoose from "mongoose";

const PictureSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },
        height: {
            type: Number,
        },
        width: {
            type: Number,
        },
    },
    { timestamps: true }
);

const Picture = mongoose.model("picture", PictureSchema);

export default Picture;
