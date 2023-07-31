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
            if (id.length != 24) {
                return false;
            }
            const response = await CartModel.findById(id).populate('products._id');
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
            if (cid.length != 24 || pid.length != 24) {
                return false
            }
            const product = await ProductModel.findById(pid);
            if (product) {
                const idSearch = new ObjectId(pid);
                const cart = await CartModel.findById(cid);
                if (cart) {
                    const found = cart.products.find(element => element["_id"].equals(idSearch));
                    if (found) {
                        found.quantity += 1;
                    } else {
                        cart.products.push({ _id: pid, quantity: 1 });
                    }
                    cart.save();
                    return cart;
                }
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            if (id.length != 24) {
                return false;
            }
            const response = await CartModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateCant(cid, pid, cant) {
        try {
            if (cid.length != 24 || pid.length != 24) {
                return false
            }
            const cart = await CartModel.findById(cid);
            if (cart) {
                const prod = await ProductModel.findById(pid);
                if (prod) {
                    return await this.addProdToCart(cid, pid, cant);
                }
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    async addProdToCart(cid, pid, cant) {
        try {
            const cart = await CartModel.findById(cid);
            const found = cart.products.find(element => element["_id"].equals(pid));
            if (found) {
                found.quantity = cant;
            } else {
                cart.products.push({ _id: pid, quantity: cant });
            }
            cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async delProdInCart(cid, pid) {
        try {
            if (cid.length != 24 || pid.length != 24) {
                return false
            }
            const cart = await CartModel.findById(cid);
            if (cart) {
                const prod = await ProductModel.findById(pid);
                if (prod) {
                    const found = cart.products.find(element => element["_id"].equals(pid));
                    if (found) {
                        const newProducts = cart.products.filter(element => !element["_id"].equals(pid));
                        cart.products = newProducts;
                        cart.save();
                        return cart;
                    }
                }
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    async delProdsInCart(id) {
        try {
            if (id.length != 24) {
                return false;
            }
            const cart = await CartModel.findById(id);
            if (cart) {
                if (cart.products.length) {
                    cart.products = [];
                    cart.save();
                    return cart;
                }
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }
}