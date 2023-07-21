import mongoose from "mongoose";
import { CartModel } from "./models/cart.model.js";
import { ProductModel } from "./models/product.model.js";
const ObjectId = mongoose.Types.ObjectId;

export default class CartDaoMongoDB {

    async getAll() {
        try {
            const response = await CartModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const response = await CartModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await CartModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(cid, pid) {
        try {
            const product = await ProductModel.findById(pid);
            if (product) {
                let idSearch = new ObjectId(pid)
                const cart = await CartModel.findById(cid);
                if (cart) {
                    const found = cart.products.find(element => element["_id"].equals(idSearch));
                    if (found) {
                        found.quantity += 1;
                        const response = await CartModel.findByIdAndUpdate(cid, { products: found }, { new: true })
                        return response
                    } else {
                        cart.products.push({ _id: pid, quantity: 1 });
                        const response = await CartModel.findByIdAndUpdate(cid, cart, { new: true });
                        return response
                    }
                } else {
                    return "El chango no existe"
                }
            } else {
                return "El producto no existe"
            };
            //return response;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const response = await CartModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

}