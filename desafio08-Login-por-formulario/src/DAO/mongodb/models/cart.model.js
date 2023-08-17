import { Schema, model } from "mongoose";

const CartSchema = new Schema({
    products: [{
        _id: { type: Schema.Types.ObjectId, ref: 'products' },
        quantity: { type: Number, required: true }
    }]
});

export const CartModel = model('carts', CartSchema);