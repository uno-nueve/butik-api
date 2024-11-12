import mongoose from "mongoose";

interface IPicture {
    url: string;
    height: number;
    width: number;
}

const PictureSchema = new mongoose.Schema<IPicture>(
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

const Picture = mongoose.model<IPicture>("pictures", PictureSchema);

export default Picture;
