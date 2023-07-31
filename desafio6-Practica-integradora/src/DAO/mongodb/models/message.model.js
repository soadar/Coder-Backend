import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    username: { type: String, required: true },
    message: { type: String, required: true },
});

export const ProductModel = mongoose.model('messages', messageSchema);
