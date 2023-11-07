import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: String, required: false },
    owner: { type: String, required: false, default: 'admin' },
}, {
    preserveKeyOrder: true
});

ProductSchema.plugin(mongoosePaginate);

export const ProductModel = model('products', ProductSchema);
