import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
    username: { type: String, required: true },
    message: { type: String, required: true },
});

export const MessageModel = model('messages', MessageSchema);
