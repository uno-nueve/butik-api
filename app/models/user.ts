import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["guest", "user", "admin"],
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("user", UserSchema);

export default User;
