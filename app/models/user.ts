import mongoose from "mongoose";

interface IUser {
    username: string;
    fullName: string;
    email: string;
    password: string;
    role?: string;
}

const UserSchema = new mongoose.Schema<IUser>(
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

const User = mongoose.model<IUser>("users", UserSchema);

export default User;
