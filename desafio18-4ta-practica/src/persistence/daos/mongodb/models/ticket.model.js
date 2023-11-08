import { Schema, model } from "mongoose";

const TicketSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    purchase_datetime: {
        type: Date,
        default: (new Date()).getTime()
    },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }
});

export const TicketModel = model('tickets', TicketSchema);