import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: [{
        id: { type: String, required: true },
        quantity: { type: Number, required: true }
    }]
});

export const CartModel = mongoose.model('carts', CartSchema);
