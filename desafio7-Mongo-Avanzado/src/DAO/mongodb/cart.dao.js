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
                } else {
                    return "El chango no existe";
                }
            } else {
                return "El producto no existe";
            };
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

    async updateCant(cId, pId, cant) {
        try {
            const cart = await CartModel.findById(cId);
            if (cart) {
                const prod = await ProductModel.findById(pId);
                if (prod) {
                    return await this.addProdToCart(cId, pId, cant);
                } else {
                    return "El producto no existe";
                }
            } else {
                return "El chango no existe";
            }
        } catch (error) {
            console.log(error);
        }
    }

    async addProdToCart(cId, pId, cant) {
        try {
            const cart = await CartModel.findById(cId);
            if (cart) {
                const found = cart.products.find(element => element["_id"].equals(pId));
                if (found) {
                    found.quantity = cant;
                } else {
                    cart.products.push({ _id: pId, quantity: cant });
                }
                cart.save();
                return cart;
            } else {
            }

        } catch (error) {
            console.log(error);
        }
    }

    async delProdInCart(cId, pId) {
        try {
            const cart = await CartModel.findById(cId);
            if (cart) {
                const prod = await ProductModel.findById(pId);
                if (prod) {
                    const found = cart.products.find(element => element["_id"].equals(pId));
                    if (found) {
                        const newProducts = cart.products.filter(element => !element["_id"].equals(pId));
                        cart.products = newProducts;
                        cart.save();
                        return cart;
                    } else {
                        return "El chango no contiene el producto indicado";
                    }
                } else {
                    return "El producto no existe";
                }
            } else {
                return "El chango no existe";
            }
        } catch (error) {
            console.log(error);
        }
    }

    async delProdsInCart(cId) {
        try {
            const cart = await CartModel.findById(cId);
            if (cart) {
                if (cart.products.length) {
                    cart.products = [];
                    cart.save();
                    return cart;
                } else {
                    return "El chango ya esta vacio";
                }
            } else {
                return "El chango no existe";
            }
        } catch (error) {
            console.log(error);
        }
    }
}