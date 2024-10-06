import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model("user", UserSchema);

export default User;
