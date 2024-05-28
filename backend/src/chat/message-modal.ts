import { Schema, model, Types, Document } from "mongoose";

interface IMessage extends Document {
    chatId: Types.ObjectId;
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    message: string;
}

const messageSchema = new Schema<IMessage>(
    {
        chatId: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        message: String,
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default model<IMessage>("Message", messageSchema);
