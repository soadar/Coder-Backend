import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductMockSchema = new Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: String, required: false },
});

ProductMockSchema.plugin(mongoosePaginate);

export const ProductMockModel = model('productsMock', ProductMockSchema);
