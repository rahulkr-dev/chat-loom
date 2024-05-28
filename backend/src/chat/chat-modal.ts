import { Schema, model, Types, Document } from "mongoose";

interface IChat extends Document {
    isGroup: boolean;
    chatOwner: Types.ObjectId;
    participants: Types.ObjectId[];
    lastMessage: Types.ObjectId;
}

const chatSchema = new Schema<IChat>(
    {
        isGroup: {
            type: Boolean,
            default: false,
        },
        chatOwner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default model<IChat>("Chat", chatSchema);
