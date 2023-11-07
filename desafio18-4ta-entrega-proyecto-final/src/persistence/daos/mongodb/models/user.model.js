import { Schema, model } from "mongoose";

// mongoose.models = {};
// mongoose.modelSchemas = {};

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true, default: 0 },
    last_connection: { type: Date, default: new Date() },
    password: { type: String, required: true, unique: true },
    documents: [{
        name: { type: String },
        reference: { type: String }
    }],
    cart: { type: Schema.Types.ObjectId, ref: 'carts' },
    role: { type: String, default: 'user' },
    isGitHub: { type: Boolean, required: true, default: false }
});

export const UserModel = model('users', UserSchema);