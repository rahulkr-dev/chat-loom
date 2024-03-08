import { Schema, model } from "mongoose";

interface Iuser {
    userId: string;
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<Iuser>(
    {
        userId: {
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
