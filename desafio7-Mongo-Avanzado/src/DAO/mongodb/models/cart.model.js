import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            required: true
        }
    }]

});

export const CartModel = mongoose.model('carts', CartSchema);