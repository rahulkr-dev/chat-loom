import { Schema, model } from "mongoose";
import { Iuser } from "./auth-types";

const userSchema = new Schema<Iuser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export default model("User", userSchema);
