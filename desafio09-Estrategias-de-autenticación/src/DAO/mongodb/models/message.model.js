import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    username: { type: String, required: true },
    message: { type: String, required: true },
});

export const ProductModel = model('messages', messageSchema);
